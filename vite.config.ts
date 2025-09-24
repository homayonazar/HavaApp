import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base: "/projects/weather/",
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Weather App",
        short_name: "Weather",
        start_url: "/projects/weather/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#0ea5e9",
        icons: [
          {
            src: "/projects/weather/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/projects/weather/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png"
          },
          {
            src: "/projects/weather/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable"
          }
        ]
      }
    })
  ]
});