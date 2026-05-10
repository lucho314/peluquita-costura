// @ts-check
import { defineConfig } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://peluquita-costura.luciano-zapata314.workers.dev',
  output: 'server',
  adapter: cloudflare(),

  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      exclude: [
        'astro:transitions/client',
        'astro/virtual-modules/transitions-router.js',
        'astro/virtual-modules/transitions-types.js',
        'astro/virtual-modules/transitions-events.js',
        'astro/virtual-modules/transitions-swap-functions.js'
      ]
    }
  }
});
