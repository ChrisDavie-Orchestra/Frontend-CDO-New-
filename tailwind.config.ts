import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef9e7',
          100: '#fef3cf',
          200: '#fde79f',
          300: '#fcdb6f',
          400: '#fbcf3f',
          500: '#cc9933',
          600: '#b8862e',
          700: '#a37329',
          800: '#8f6024',
          900: '#7a4d1f',
        },
        gold: {
          50: '#fef9e7',
          100: '#fef3cf',
          200: '#fde79f',
          300: '#fcdb6f',
          400: '#fbcf3f',
          500: '#cc9933',
          600: '#b8862e',
          700: '#a37329',
          800: '#8f6024',
          900: '#7a4d1f',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}
export default config
