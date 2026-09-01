/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Warm wood-inspired neutrals
        bone: '#F5F1EA',
        cream: '#EDE6D6',
        sand: '#E2D7C0',
        clay: '#C9B89A',
        wood: {
          50: '#FAF6EF',
          100: '#F0E8D8',
          200: '#E2D2B8',
          300: '#CBB491',
          400: '#B0936A',
          500: '#96764E',
          600: '#7A5D3A',
          700: '#5E4628',
          800: '#43321B',
          900: '#2B1F12',
        },
        ink: '#1A1612',
        charcoal: '#221E18',
        ember: '#B5651D',
      },
      fontFamily: {
        serif: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'editorial': '0.02em',
        'wide-sm': '0.08em',
      },
      maxWidth: {
        'editorial': '1400px',
      },
      transitionTimingFunction: {
        'craft': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};
