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
        angie: "/projets/angie/angie.jpg",
        axa: "/projets/axa/axa.jpg",
        guerlain: "/projets/guerlain/guerlain.jpg",
      },
      aspectRatio: {
        "8/5": "8 / 5",
      },
      fontFamily: {
        fugaz: ["var(--font-fugaz)"],
        ibm: ["var(--font-ibm)"],
        humane: ["var(--font-humane)"],
        roobert: ["var(--font-roobert)"],
        avenir: ["var(--font-avenir)"],
      },
      colors: {
        grey: {
          50: "#322F2E",
        },
      },
      letterSpacing: {
        widest: ".20em",
      },
      margin: {
        half: "-50%",
      },
    },
  },
  plugins: [],
};
export default config;
