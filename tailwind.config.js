/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        olive: "#979f8a",
        peach: "#ddb8a6",
        lightbrown: "#d49b7e",
        copper: "#c68044",
        darkbrown: "#8b3f05",
      },
      fontFamily: {
        heading: ["Playfair Display", "serif"],
        body: ["Inter", "sans-serif"],
      },
      backgroundImage: {
        'invitation': "url('/assets/FloralClusterFrame.png')",//'invitation': "url('/assets/FloralFrame.png')",
      },
    },
  },
  plugins: [],
};
