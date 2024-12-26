/** @type {import('tailwindcss').Config} */

import daisyui from 'daisyui';

const config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: ['night'],
  },
};

export default config;
