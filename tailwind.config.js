/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
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
