import { defineConfig } from "astro/config";
import { loadEnv } from "vite";
import { sanityIntegration } from "@sanity/astro";
import tailwind from "@astrojs/tailwind";
import netlify from "@astrojs/netlify";

const { SANITY_PROJECT_ID, SANITY_DATASET } = loadEnv(
  process.env.NODE_ENV,
  process.cwd(),
  "",
);

// https://astro.build/config
export default defineConfig({
  output: "hybrid",
  integrations: [
    sanityIntegration({
      projectId: SANITY_PROJECT_ID,
      dataset: SANITY_DATASET,
      // Set useCdn to false if you're building statically.
      useCdn: false,
    }),
    tailwind(),
  ],
  adapter: netlify(),
});
