/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sasspink: '#f472b6',
        sassrose: '#fb7185',
        sassblack: '#111827',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        sexy: ['"Playfair Display"', 'serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    // Optional: DaisyUI if you want sassy pre-built components
    // require('daisyui'),
  ],
};
