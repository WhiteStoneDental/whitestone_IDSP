import type { Config } from "tailwindcss";

export default {
  content: [],
  theme: {
    extend: {
      colors: {
        'navy-blue': '#00154C',
        'lighter-mint': '#ECFAF7',
        'light-lavendar': '#F6DFFF',
        'pinkish-purple': '#9D32A5',
        'custom-purple': '#641A99',
        'custom-blue': '#24008C',
        'dark-mode': '#312737',
        'dark-gray': '#251C26',
        'lighter-gray': '#40304B',
      },
      fontFamily: {
        'mulish': ['Mulish_400Regular', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
} satisfies Config;

