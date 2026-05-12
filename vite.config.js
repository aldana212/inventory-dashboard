import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    sourcemap: true,
  },
  server: {
     allowedHosts: true,
    host: "0.0.0.0", // Permite acceder desde la red local
    port: 4200, // Asegúrate de usar el puerto correcto
  },
  assetsInclude: ["**/*.ttf"],
});
