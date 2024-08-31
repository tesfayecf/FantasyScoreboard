import { defineConfig } from 'astro/config';

import icon from "astro-icon";
import tailwind from '@astrojs/tailwind';
import preact from '@astrojs/preact';

// https://astro.build/config
export default defineConfig({
  integrations: [icon(), tailwind(), preact()],
  output: "hybrid",
});