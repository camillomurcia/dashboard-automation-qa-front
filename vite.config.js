import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // <-- Importamos el nuevo motor

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),  tailwindcss()], // <-- Agregamos el nuevo motor a los plugins
})
