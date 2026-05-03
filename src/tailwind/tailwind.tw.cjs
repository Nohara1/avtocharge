const plugin = require("tailwindcss/plugin");

/** Конфиг Tailwind v3 CLI для страниц дампа (npm run tb / npm run tw). Пути content — от корня репозитория. */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.html",
    "./src/html/**/*.{html,json}",
    "./src/scripts/**/*.js",
  ],
  prefix: "tw-",
  theme: {
    extend: {
      colors: {
        dark: "#232631",
      },
    },
    screens: {
      sm: "576px",
      md: "768px",
      lg: "1024px",
      xl: "1230px",
      xlh: "1280px",
      "2xl": "1650px",
    },
    ratio: {
      "1x1": "100%",
      "3x2": "66.666%",
      "4x3": "75%",
      "16x9": "56.25%",
      A4: "140%",
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          ratio: (value) => ({
            "&:before": {
              paddingTop: value,
            },
          }),
        },
        { values: theme("ratio") }
      );
    }),
  ],
  safelist: [],
  corePlugins: {
    preflight: false,
  },
};
