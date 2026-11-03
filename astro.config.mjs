import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import { inject } from "@vercel/analytics";

import robotsTxt from "astro-robots-txt";

// https://astro.build/config
export default defineConfig({
	// Las directivas de Tailwind van en src/styles/global.css, junto al sistema visual.
	integrations: [tailwind({ applyBaseStyles: false }), robotsTxt()],
	site: "https://porfolio.dev/",
});

inject();
