import type { Config } from 'tailwindcss'

const config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary1: '#00154c',
        primary2: '#24008c',
        primary3: '#641a99',
        primary4: '#9d32a5',
        primary5: '#e3baf5',
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;