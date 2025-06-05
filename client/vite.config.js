import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  server: {
    host: true,         // Allows access from local IP
    port: 5173,         // Or any other port you want
    strictPort: true,   // Ensures Vite uses this exact port
  }
})
