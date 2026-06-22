import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Base path. Defaults to root ('/') for local dev and root-hosted deploys
  // (e.g. Netlify Drop). On GitHub Pages the project is served from /<repo>/,
  // so CI sets VITE_BASE to that subpath at build time.
  base: process.env.VITE_BASE || '/',
})
