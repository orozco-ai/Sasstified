/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", 
    "./components/**/*.{js,ts,jsx,tsx}", 
    "./public/**/*.{html,js}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          light: "#f4e4ec",
          DEFAULT: "#e91e63",
          dark: "#b0003a",
        },
      },
      fontFamily: {
        display: ["Poppins", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        flirt: {
          primary: "#e91e63",
          secondary: "#f4e4ec",
          accent: "#ff80ab",
          neutral: "#291334",
          "base-100": "#ffffff",
          info: "#3abff8",
          success: "#36d399",
          warning: "#fbbd23",
          error: "#f87272",
        },
      },
    ],
    darkTheme: "flirt",
  },
};
