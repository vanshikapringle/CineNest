import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5175,
    proxy: {
      '/api/movies': {
        target: 'http://127.0.0.1:8082',
        changeOrigin: true,
      },
      '/api/theatres': {
        target: 'http://127.0.0.1:8083',
        changeOrigin: true,
      },
      '/api/shows': {
        target: 'http://127.0.0.1:8083',
        changeOrigin: true,
      },
      '/api/auth': {
        target: 'http://127.0.0.1:8081',
        changeOrigin: true,
      },
      '/api/bookings': {
        target: 'http://127.0.0.1:8084',
        changeOrigin: true,
      },
      '/api/payments': {
        target: 'http://127.0.0.1:8084',
        changeOrigin: true,
      }
    }
  }
})
