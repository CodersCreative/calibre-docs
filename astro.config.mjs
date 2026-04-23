// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import catppuccin from "@catppuccin/starlight";

// https://astro.build/config
export default defineConfig({
  site: "https://coderscreative.github.io",
  base: "/calibre-docs",
  integrations: [
    starlight({
      plugins: [
        catppuccin({
          dark: { flavor: "mocha", accent: "blue" },
          light: { flavor: "latte", accent: "blue" },
        }),
      ],
      title: "Calibre",
      customCss: [
        "@fontsource/poppins/400.css",
        "@fontsource/poppins/600.css",
        "./src/styles/custom.css",
      ],
      logo: {
        light: "./src/assets/calibre.svg",
        dark: "./src/assets/calibrelight.svg",
        replacesTitle: true,
      },
      social: [
        {
          icon: "youtube",
          label: "YouTube",
          href: "https://www.youtube.com/@crvcode",
        },
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/CodersCreative/calibre-lang",
        },
      ],
      sidebar: [
        {
          label: "Language Tour",
          autogenerate: { directory: "tour" },
        },
        {
          label: "Reference",
          autogenerate: { directory: "reference" },
        },
      ],
    }),
  ],
});
