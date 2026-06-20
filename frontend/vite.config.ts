import { defineConfig } from 'vite'

import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0',
    allowedHosts: [
      '47dd-110-235-238-101.ngrok-free.app'
    ]
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
