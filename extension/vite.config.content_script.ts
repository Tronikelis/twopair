import path from "node:path";
import { defineConfig } from "vite";
import __dirname from "./utils/__dirname";

export default defineConfig({
    root: "./content_script",
    build: {
        lib: {
            entry: path.join(
                __dirname(import.meta.url),
                "./content_script/index.ts"
            ),
            name: "ContentScript",
            fileName: "index",
        },
        sourcemap: true,
    },
});
