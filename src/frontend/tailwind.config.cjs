/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  variants: {
    extend: {
      padding: ["last"],
    },
  },
  theme: {
    fontFamily: {
      display: ["Arvo", "serif"],
      body: ["Lato", "sans-serif"],
    },

    extend: {
      backgroundImage: {
        hero: "url(./src/assets/CallToAction.svg)",
        "blue-gradient":
          "linear-gradient(40deg, rgba(72,97,228,1) 0%, rgba(9,9,121,1) 97%);",
        "red-gradient":
          "linear-gradient(34deg, rgba(245,92,92,1) 0%, rgba(199,41,41,1) 97%);",
        "green-gradient":
          "linear-gradient(34deg, rgba(134,228,90,1) 0%, rgba(57,198,35,1) 97%);",
      },
      colors: {
        "blue-gradient": "rgb(72,97,228);",
        "red-gradient": "rgb(245,92,92);",
        "green-gradient": "background: rgb(134,228,90);",
        "border-color": "#DCDCDC",
        "grey-transparent": "rgba(193, 202, 225, 0.5)",
        modal: "rgba(0,0,0,0.75)",
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
