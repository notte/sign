/** @type {import('tailwindcss').Config} * */

module.exports = {
  darkMode: "class",
  important: true,
  purge: false,
  content: [],
  theme: {
    extend: {
      boxShadow: {
        light: "0 2px 8px rgb(17 17 36 / 5%), 0 16px 32px rgb(70 70 132 / 14%)",
        dark: "1px 2px 10px rgb(22 22 31 / 50%), 2px 16px 32px rgb(22 22 31 / 30%)",
      },
      colors: {
        primary: {
          darker: "#084FCB",
          main: "#055FFC",
          lighter: "#5E98FF",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
