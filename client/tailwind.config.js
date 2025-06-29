/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust path as needed
    "./public/index.html",
  ],
  theme: {
    extend: {
      writingMode: {
        "vertical-rl": "vertical-rl",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".writing-vertical-rl": {
          writingMode: "vertical-rl",
        },
      });
    },
  ],
};
