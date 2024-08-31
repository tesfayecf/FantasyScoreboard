# FantasyScoreboard

FantasyScoreboard is a modern web application built using Astro, designed to track fantasy sports scores in real-time.

## Features

- Dynamic admin page with form submission functionality
- Backend processing using Astro Actions
- Responsive layout with a navigation bar
- Custom styling using Tailwind CSS
- Integration with a fantasy sports API

## Tech Stack

- Astro
- Preact
- Tailwind CSS
- TypeScript
- Vercel (for deployment)

## Setup

1. Clone the repository:

```bash
git clone https://github.com/your-username/fantasyscoreboard.git
cd fantasyscoreboard
```

2. Install dependencies:

```bash
npm install
```

3. Set up your environment variables:

Create a `.env` file in the root directory and add your API credentials and other necessary environment variables.

4. Run the development server:

```bash
npm run dev
```

## Project Structure

- `src/`: Source code
  - `components/`: Reusable Astro components
  - `layouts/`: Page layouts
  - `pages/`: Astro pages
  - `styles/`: Global CSS styles
- `public/`: Static assets

## API Integration

The project is set up to integrate with a fantasy sports API. The base URL and endpoints are defined in the `index.astro` file:


```7:17:src/pages/index.astro
// Define the base URL and endpoint
const baseUrl = "https://api-fantasy.llt-services.com";

const leagueId = "013805954";
const rankingEndpoint = `/api/v5/leagues/${leagueId}/ranking`;

const teamId = "17193364";
const teamInfoEndpoint = `/api/v3/leagues/${leagueId}/teams/${teamId}`;

const weekId = "1";
const teamLineup = `/api/v4/teams/${teamId}/lineup/week/${weekId}`;
```


## Deployment

This project is configured for deployment on Vercel. The `astro.config.mjs` file includes the Vercel adapter:


```1:15:astro.config.mjs
import { defineConfig } from 'astro/config';

import icon from "astro-icon";
import tailwind from '@astrojs/tailwind';
import preact from '@astrojs/preact';

import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  integrations: [icon(), tailwind(), preact()],
  output: "hybrid",
  adapter: vercel(),
  outDir: "./dist"
});
```


## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).