/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        peach: "#f68255",
        dark: "#222222",
        hover: "#f7f7f7",
        light: "#fefefe",
        dark: "#171717",
      },
    },
  },
  plugins: [],
  darkMode: "selector",
};
