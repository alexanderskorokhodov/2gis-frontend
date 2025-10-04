
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      borderRadius: { '2xl': '1.25rem' },
      boxShadow: {
        soft: '0 6px 20px rgba(0,0,0,0.08)'
      }
    }
  },
  plugins: []
}
