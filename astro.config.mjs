import { defineConfig } from 'astro/config';

import icon from "astro-icon";
import vercel from '@astrojs/vercel';
import preact from '@astrojs/preact';
import tailwind from '@astrojs/tailwind';


// https://astro.build/config
export default defineConfig({
  integrations: [icon(), tailwind(), preact()],
  output: "hybrid",
  adapter: vercel(),
});