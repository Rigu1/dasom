import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // eslint-disable-next-line no-undef
      "@": resolve(__dirname, "src"),
    },
  },
  server: {
    proxy: {
      "/direction": {
        target: "https://tory-lola-huitae-05796dff.koyeb.app",
        changeOrigin: true,
        secure: false,
      },
      "/battery": {
        target: "https://tory-lola-huitae-05796dff.koyeb.app",
        changeOrigin: true,
        secure: false,
      },
      "/collision": {
        target: "https://tory-lola-huitae-05796dff.koyeb.app",
        changeOrigin: true,
        secure: false,
      },
      "/pressure": {
        target: "https://tory-lola-huitae-05796dff.koyeb.app",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
