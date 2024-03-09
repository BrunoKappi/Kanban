/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        red: {
          light: "#cc6666",
          dark: "#bc5e5e",
        },
        blue: {
          light: "#0784b5",
          dark: "#0679a7",
        },
        green: {
          light: "#38858A",
          dark: "#347A7F",
        },
        black: {
          light: "#3e3e42",
          dark: "#37373b",
        },
      },
    },
  },
  plugins: [],
};
