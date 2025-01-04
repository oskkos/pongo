/** @type {import('tailwindcss').Config} */

import daisyui from 'daisyui';

const config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      height: {
        content: 'calc(100dvh - 4rem)',
      },
      maxHeight: {
        content: 'calc(100dvh - 4rem)',
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: ['night'],
  },
};

export default config;
