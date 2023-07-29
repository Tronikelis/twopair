import react from "@vitejs/plugin-react";
import { ConfigEnv, defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default ({ mode }: ConfigEnv) => {
    return defineConfig({
        plugins: [react(), tsconfigPaths()],
        root: "./popup",
        base: "",
        build: {
            minify: mode === "production" ? "esbuild" : false,
        },
    });
};
