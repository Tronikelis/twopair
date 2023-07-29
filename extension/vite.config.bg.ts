import path from "node:path";

import { ConfigEnv, defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

import __dirname from "./utils/__dirname";

export default ({ mode }: ConfigEnv) => {
    return defineConfig({
        plugins: [tsconfigPaths()],
        root: "./bg",
        build: {
            minify: mode === "production" ? "esbuild" : false,
            lib: {
                entry: path.join(__dirname(import.meta.url), "./bg/src/index.ts"),
                name: "BackgroundScript",
                fileName: "index",
            },
        },
    });
};
