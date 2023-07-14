import { fileURLToPath } from "node:url";

export default function __dirname(importMetaUrl: string) {
    const path = fileURLToPath(new URL("./", importMetaUrl));
    return path.at(-1) === "/" ? path.slice(0, -1) : path;
}
