import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      'sm': '568px',
      'md': '1280px',
      'lg': '1440px',
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-varela-round)', 'sans-serif']
      },
    },
  },
  plugins: [],
}
export default config
