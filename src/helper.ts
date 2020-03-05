declare type CaseModule = {
    camel(value: string): string;
    capital(value: string): string;
    constant(value: string): string;
    dot(value: string): string;
    inverse(value: string): string;
    lower(value: string): string;
    pascal(value: string): string;
    sentence(value: string): string;
    slug(value: string): string;
    snake(value: string): string;
    space(value: string): string;
    title(value: string): string;
    upper(value: string): string;
    (value: string): "camel" | "capital" | "constant" | "dot" | "lower" | "pascal" | "sentence" | "slug" | "snake" | "space" | "title" | "upper";
}
export const to: CaseModule = require("to-case");

function extractRegionIndent(content: string) {
    const re = /(?<space>[^\n\S]*?)(?:[\S]{1,1})/mi;
    let m: RegExpExecArray | null = re.exec(content);
    let r = "";
    if (m !== null && m.groups !== undefined && m.groups !== null && m.groups.space) {
        r = m.groups.space || "";
    }
    return r;
}
export function region(regionName: string,
    content: string = "\\n",
    language: "javascript" | "typescript" | "dart" | "csharp" | "java" | "swift" | "kotlin" | "css" = "javascript") {
    if (language === "css") {
        return `/* #region ${regionName} */
${content}
${extractRegionIndent(content)}/* #endregion */`
    } else {
        return `// #region ${regionName}
${content}
${extractRegionIndent(content)}// #endregion
        `;
    }
}
