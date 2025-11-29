import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // For GitHub Pages deployment
  // Change 'polygon-practice' to your repository name
  base: process.env.GITHUB_PAGES ? '/polygon-practice/' : '/',
})
