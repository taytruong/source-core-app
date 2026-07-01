// tailwind.config.ts
import type { Config } from 'tailwindcss';
import { withUt } from 'uploadthing/tw';

export default withUt({
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@uploadthing/react/dist/**/*.js',
  ],
  theme: {
    extend: {
      screens: {
        '3xl': '1600px',
      },
      colors: {
        primary: '#DD9E59',
      },
    },
  },
} satisfies Config);
