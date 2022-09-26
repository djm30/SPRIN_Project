/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      display: ["Arvo", "serif"],
      body: ["Lato", "sans-serif"],
    },
    extend: {
      colors: {
        "border-color": "#DCDCDC",
        "grey-transparent": "rgba(193, 202, 225, 0.5)",
        bluegrey: {
          100: "#D5D9DB",
          200: "#B7B7B7",
          300: "#5D5D5E",
        },
        darkblue: { 100: "#023E8A", 200: "#03045E", 300: "#0F172A" },

        skyblue: {
          100: "#A9CDF4",
          200: "#71A5DE",
          300: "#689DEE",
        },
      },
    },
  },
  plugins: [],
};
