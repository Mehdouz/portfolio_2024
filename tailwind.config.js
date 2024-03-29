import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      aspectRatio: {
        "8/5": "8 / 5",
      },
      fontFamily: {
        fugaz: ["var(--font-fugaz)"],
        ibm: ["var(--font-ibm)"],
        humane: ["var(--font-humane)"],
        roobert: ["var(--font-roobert)"],
      },
    },
  },
  plugins: [],
};
export default config;
