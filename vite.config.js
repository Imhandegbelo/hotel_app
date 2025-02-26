import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // preview: {
  //   origin: 'http://127.0.0.1:5173',
  //   port: 5173,
  // },
})
