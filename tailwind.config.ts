/* eslint-disable global-require */
/** @type {import('tailwindcss').Config} */

const px50 = { ...Array.from(Array(51)).map((_, i) => `${i}px`) };
const px600 = { ...Array.from(Array(601)).map((_, i) => `${i}px`) };
const px800 = { ...Array.from(Array(801)).map((_, i) => `${i}px`) };

export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontSize: px50,
      width: px800,
      height: px800,
      spacing: px600,
      zIndex: {
        "-1": "-1",
      },
      keyframes: {
        floatUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        sdb: {
          "0%": {
            transform: "rotate(-45deg) translate(0, 0)",
            opacity: "0",
          },
          "50%": {
            opacity: "1",
          },
          "100%": {
            transform: "rotate(-45deg) translate(-20px, 20px)",
            opacity: "0",
          },
        },
      },
      animation: {
        floatUp: "floatUp 3s ease-out forwards",
        sdb: "sdb 3s infinite",
      },
    },
  },
  plugins: [],
};
