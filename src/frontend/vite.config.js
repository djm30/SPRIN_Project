import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), svgr()],
    server: {
        proxy: {
            "/api": {
                target: "http://localhost:3000/",
                changeOrigin: true,
                secure: false,
            },
        },
    },
    build: {
        sourcemap: true,
    },
});
