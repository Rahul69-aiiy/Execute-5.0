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
          DEFAULT: '#16a34a', // Green-600
          dark: '#14532d',    // Green-900
          light: '#dcfce7',   // Green-100
        },
        secondary: {
          DEFAULT: '#0ea5e9', // Sky-500
          dark: '#0369a1',    // Sky-700
          light: '#e0f2fe',   // Sky-100
        },
        neutral: {
          bg: '#f8fafc',      // Slate-50
          panel: '#ffffff',   // White
          text: '#1e293b',    // Slate-800
          muted: '#64748b',   // Slate-500
          border: '#e2e8f0',  // Slate-200
        },
        accent: {
          orange: '#f97316',
          purple: '#8b5cf6',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
