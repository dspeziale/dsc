/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2d3e50',
          light: '#3d5266',
          dark: '#1a252f',
        },
        accent: {
          DEFAULT: '#e74c3c',
          light: '#ec7063',
          dark: '#c0392b',
        },
        secondary: {
          DEFAULT: '#3498db',
          light: '#5dade2',
          dark: '#2980b9',
        },
        success: '#27ae60',
        warning: '#f39c12',
      },
      fontFamily: {
        sans: ['PT Sans Narrow', 'Arial', 'sans-serif'],
      },
      borderRadius: {
        'lg': '16px',
      },
      boxShadow: {
        'custom': '0 4px 15px rgba(0, 0, 0, 0.08)',
        'custom-lg': '0 10px 30px rgba(0, 0, 0, 0.12)',
        'accent': '0 4px 15px rgba(231, 76, 60, 0.2)',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
