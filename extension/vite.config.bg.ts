import path from "node:path";

import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

import __dirname from "./utils/__dirname";

export default defineConfig({
    plugins: [tsconfigPaths()],
    root: "./bg",
    build: {
        lib: {
            entry: path.join(__dirname(import.meta.url), "./bg/src/index.ts"),
            name: "BackgroundScript",
            fileName: "index",
        },
    },
});
