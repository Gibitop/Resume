import type { AstroI18nextConfig } from 'astro-i18next'

const config: AstroI18nextConfig = {
    defaultLanguage: "en",
    supportedLanguages: ["en", "ru"],
    i18next: {
        initImmediate: false,
        defaultNS: 'translation',
        backend: {
            loadPath: "./src/translations/{{lng}}.json",
        },
    },
    i18nextPlugins: { fsBackend: "i18next-fs-backend" },
};

export default config;