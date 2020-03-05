const fs: typeof import("fs-extra") = require("fs-extra");
const path: typeof import("path") = require("path");

export class File {
    private path: string;
    private oldFile: string | undefined = undefined;
    private oldRegions: Array<File.RegionDataType> = [];
    private newFile: string | undefined = undefined;
    private newRegions: Array<File.RegionDataType> = [];
    // -------------
    private fileOverwrite: boolean = false;
    private fileOverwriteRegions: boolean = false;
    private fileCreateFile: boolean = true;
    // -------------
    private fileOutput: string | undefined = undefined;
    // -------------
    constructor(path: string) { this.path = path; }
    public render(content: string) {
        this.loadOldFileIFExists();
        this.newFile = content;
        this.newRegions = this.extractAllRegions(this.newFile);
        return this;
    }
    public createFile(createFile: boolean) {
        this.fileCreateFile = createFile;
        return this;
    }
    public overwrite(overwrite: boolean) {
        this.fileOverwrite = overwrite;
        return this;
    }
    public overwriteRegions(overwriteRegions: boolean) {
        this.fileOverwriteRegions = overwriteRegions;
        return this;
    }
    public save() {
        if (this.newFile === undefined) { throw new Error("render() -  something before trying to save."); }
        this.frankensteinMe();
        this.write();
    }
    private frankensteinMe() {
        if (this.oldFile === undefined || (this.fileOverwrite === true && this.fileOverwriteRegions === true)) {
            this.fileOutput = this.newFile;
        } else if (this.fileOverwrite === false && this.fileOverwriteRegions === false) {
            // Keep the oldFile. Don't do anything.
            return;
        } else if (this.fileOverwrite === true && this.fileOverwriteRegions === false) {
            // New file with old regions
            let r: string = this.newFile || "";
            this.oldRegions.forEach((v, i) => {
                r = r.replace(this.regionExtractByNameRegex(v.regionName), this.mountRegion(v));
            });
            this.fileOutput = r;
        } else if (this.fileOverwrite === false && this.fileOverwriteRegions === true) {
            let r: string = this.oldFile || "";
            this.newRegions.forEach((v, i) => {
                r = r.replace(this.regionExtractByNameRegex(v.regionName), this.mountRegion(v));
            });
            this.fileOutput = r;
        }
    }
    private loadOldFileIFExists(): void {
        if (this.oldFile === undefined && fs.existsSync(this.path) && fs.statSync(this.path).isFile) {
            const oldFile: string = fs.readFileSync(this.path, "utf8");
            this.oldFile = oldFile;
            this.oldRegions = this.extractAllRegions(this.oldFile);
        }
    }
    private write(): void {
        if (this.fileOutput) {
            const fileExist = fs.existsSync(this.path);
            if (this.fileCreateFile === false && fileExist === false) {
                return;
            }
            fs.ensureDirSync(path.dirname(this.path));
            fs.writeFileSync(this.path, this.fileOutput);
        }
    }
    /* #region  helper */
    private mountRegion(regionData: File.RegionDataType): string {
        let regionTip: File.RegionDataType = this.oldRegions.find((v) => {
            return v.regionName.toLowerCase() === regionData.regionName.toLowerCase();
        }) || regionData;
        return `${regionTip.top}\n` +
            `${regionData.content}` +
            `${regionTip.bottom}`;
    }
    private extractAllRegions(content: string): File.RegionDataType[] {
        let r: File.RegionDataType[] = [];
        const regex = this.regionExtractAllRegex();
        let m: RegExpExecArray | null;
        while ((m = regex.exec(content)) !== null) {
            if (m.groups !== undefined && m.groups !== null) {
                r.push({
                    regionName: m.groups.name1 || m.groups.name2 || m.groups.name3 || "",
                    top: m.groups.top1 || m.groups.top2 || m.groups.top3 || "",
                    bottom: m.groups.bottom1 || m.groups.bottom2 || m.groups.bottom3 || "",
                    content: m.groups.content1 || m.groups.content2 || m.groups.content3 || ""
                });
            }
        }
        return r;
    }
    private regionExtractAllRegex() {
        return this.regionExtractByNameRegex("[\\w\\-]*");
    }
    private regionExtractByNameRegex(name: string) {
        const re = `(?<top1>(?:[^\\n\\S]*?\\/\\*)[\\s]*?#region\\s(?<name1>${name})(?:[\\s]*?\\*\\/))\\n(?<content1>[\\s\\S]*?)(?<bottom1>(?:[^\\n\\S]*?\\/\\*[\\s]*?)#endregion(?:[\\s\\S]*?(?:\\*\\/)))|(?<top2>(?:[^\\n\\S]*?\\/\\/)[\\s]*?#region\\s(?<name2>${name})(?:[\\s]*?))\\n(?<content2>[\\s\\S]*?)(?<bottom2>(?:[^\\n\\S]*?\\/\\/[\\s]*?)#endregion(?:[\\s\\S]*?))`;
        return new RegExp(re, 'gmi');
    }
}
export module File {
    export type RegionDataType = {
        regionName: string;
        top: string;
        content: string;
        bottom: string;
    };
}
