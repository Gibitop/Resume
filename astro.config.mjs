import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import compress from "astro-compress";
import astroI18next from "astro-i18next";

// https://astro.build/config
export default defineConfig({
    integrations: [
        tailwind(),
        compress(),
        astroI18next(),
    ],
});
