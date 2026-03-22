import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#06c0d7",
        accent: "#f77024",
        "blue-chill": "#117297",
        bunting: "#1b2356",
        ironstone: "#894a3d",
      },
      fontFamily: {
        newsreader: ["var(--font-newsreader)", "serif"],
        roboto: ["var(--font-roboto)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
