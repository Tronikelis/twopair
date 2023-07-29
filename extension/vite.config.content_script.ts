import path from "node:path";

import { ConfigEnv, defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

import __dirname from "./utils/__dirname";

export default ({ mode }: ConfigEnv) => {
    return defineConfig({
        plugins: [tsconfigPaths()],
        root: "./content_script",
        build: {
            minify: mode === "production" ? "esbuild" : false,
            lib: {
                entry: path.join(__dirname(import.meta.url), "./content_script/src/index.ts"),
                name: "ContentScript",
                fileName: "index",
            },
        },
    });
};
