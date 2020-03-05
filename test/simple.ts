import { File, region, to } from "../src/createx";

new File("./test/person/person-model.ts").render(`
export class ${to.pascal("Person")} {
    ${region('generated', `
    name: string;
    phone: string;`)}
}
`).overwrite(false).overwriteRegions(true).save();
