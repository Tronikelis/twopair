import path from "node:path";
import { defineConfig } from "vite";
import __dirname from "./utils/__dirname";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
    plugins: [tsconfigPaths()],
    root: "./content_script",
    build: {
        lib: {
            entry: path.join(
                __dirname(import.meta.url),
                "./content_script/src/index.ts"
            ),
            name: "ContentScript",
            fileName: "index",
        },
    },
});
