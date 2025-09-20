/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        neon: '#7c3aed',
        'neon-green': '#39FF14',
        'neon-pink': '#FF00C8',
      },
      dropShadow: {
        neon: '0 0 8px #39FF14, 0 0 16px #FF00C8',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      animation: {
        'fade-in': 'fade-in 1.2s ease-out',
      },
    },
  },
  plugins: [],
};
