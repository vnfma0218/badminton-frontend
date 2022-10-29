/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        Noto: ['Noto Sans KR'],
      },
    },
  },
  plugins: [require('daisyui'), require('tailwind-scrollbar-hide')],
  daisyui: {
    themes: ['pastel'],
  },
};
