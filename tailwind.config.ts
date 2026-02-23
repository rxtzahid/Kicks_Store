import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // ✅ Dark mode enable (IMPORTANT)

  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      colors: {
        primary: "#3D5AF1",
        orange: "#F5A623",

        // Light / Dark friendly colors
        dark: "#1C1C1C",
        bgGray: "#EFEFEB",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
      },
    },
  },

  plugins: [],
};

export default config;