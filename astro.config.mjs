import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import { inject } from "@vercel/analytics";

import robotsTxt from "astro-robots-txt";

// https://astro.build/config
export default defineConfig({
	integrations: [tailwind(), robotsTxt()],
	site: "https://porfolio.dev/",
});

inject();
