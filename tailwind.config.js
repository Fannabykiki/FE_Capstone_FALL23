/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      boxShadow: {
        custom: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
      },
      fontSize: {
        custom: "56px",
      },
      lineHeight: {
        custom: "72px",
      },
      fontFamily: {
        batangas: ["Batangas", "sans"],
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
