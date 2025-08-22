/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Noto Sans', 'sans-serif'],
      },
      colors: {
        primary: '#ffffff',
        secondary: '#888888',
        dark: '#111111',
        darker: '#0a0a0a',
        light: '#f5f5f5',
        accent: '#333333',
        card: { light: 'rgba(255,255,255,0.8)', dark: 'rgba(0,0,0,0.6)' },
        border: { light: 'rgba(255,255,255,0.4)', dark: 'rgba(255,255,255,0.08)' },
      },
      animation: {
        'cube-rotate': 'cube-rotate 10s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        spinCube: 'spinCube 60s linear infinite',
        'spin-slow': 'spin-slow 6s linear infinite',
        'lift': 'lift 200ms ease-out forwards',
        'pulse-subtle': 'pulse-subtle 1200ms ease-in-out infinite',
      },
      keyframes: {
        'cube-rotate': {
          '0%': { transform: 'rotateX(0deg) rotateY(0deg)' },
          '100%': { transform: 'rotateX(360deg) rotateY(360deg)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        spinCube: {
          '0%': { transform: 'rotateX(0deg) rotateY(0deg)' },
          '100%': { transform: 'rotateX(360deg) rotateY(360deg)' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        lift: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-2px)' },
        },
        'pulse-subtle': {
          '0%,100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.03)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      spacing: {
        '128': '32rem',
      },
      dropShadow: {
        glow: '0 0 0.35rem rgba(255,255,255,0.55)',
      },
    },
  },
  plugins: [],
};
