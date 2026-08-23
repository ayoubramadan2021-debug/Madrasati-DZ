import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  server: {
    host: true,

    // المنفذ الثابت للمشروع
    port: 5173,
    strictPort: true,

    // Termux: لا تراقب آلاف ملفات الـ static assets
    // الملفات ستبقى متاحة طبيعيًا في التطبيق.
    watch: {
      ignored: [
        "**/public/audio/**",
        "**/public/lessons/**",
        "**/public/scenes/**",
      ],
    },
  },
});
