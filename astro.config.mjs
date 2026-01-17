// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import keystatic from '@keystatic/astro';
import react from '@astrojs/react';
import netlify from '@astrojs/netlify';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.webuyyourjunk.net',
  output: 'server',
  adapter: netlify(),
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [
    sitemap(),
    react(),
    mdx(),
    keystatic()
  ],
  build: {
    format: 'directory'
  }
});