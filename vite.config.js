import { defineConfig } from 'vite';

// base relativa: funciona igual en Vercel (raíz) y en GitHub Pages (/<repo>/)
export default defineConfig({
  base: './',
});
