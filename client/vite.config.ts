import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // Permet à Vite d'écouter sur toutes les interfaces
    port: 5173, // Le port que vous exposez dans Docker
  },
});
