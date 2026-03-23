/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        medical: {
          900: '#0f172a', // Deep slate
          800: '#1e293b', 
          Teal: '#0d9488', // Teal accent
          TealLight: '#14b8a6',
        },
        enamel: {
          White: '#f8fafc',
          Card: '#ffffff'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Merriweather', 'serif']
      }
    },
  },
  plugins: [],
}
