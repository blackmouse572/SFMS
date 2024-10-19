import { animations, components, palettes, rounded, shade, visualizations } from '@tailus/themer';
import tailwindAnimations from 'tailwindcss-animate';
const defaultTheme = require('tailwindcss/defaultTheme');
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', './node_modules/@tailus/themer/dist/**/*.{js,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ...palettes.trust,
        'soft-bg': 'var(--ui-soft-bg)',
      },
      fontFamily: {
        sans: ['Geist', 'Inter', ...defaultTheme.fontFamily.sans],
        mono: ['GeistMono', 'fira-code', ...defaultTheme.fontFamily.mono],
      },
      rounded: {
        card: '0.75rem',
        btn: 'var(--btn-radius)',
      },
      keyframes: {
        'caret-blink': {
          '0%,70%,100%': { opacity: '1' },
          '20%,50%': { opacity: '0' },
        },
      },
      animation: {
        'caret-blink': 'caret-blink 1.25s ease-out infinite',
      },
    },
  },
  plugins: [animations, components, rounded, shade, visualizations, tailwindAnimations],
};
