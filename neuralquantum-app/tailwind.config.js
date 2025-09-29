/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Quantum Purple (Primary Brand Color)
        quantum: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
          950: '#2e1065',
        },
        // Neural Blue (Secondary)
        neural: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        // Energy Cyan (Accent)
        energy: {
          50: '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63',
          950: '#083344',
        },
        // Dark Theme Colors
        dark: {
          primary: '#050038',
          secondary: '#212121',
          surface: '#111827',
        },
        // NVIDIA Partnership Badge
        nvidia: {
          green: '#76B900',
          glow: 'rgba(118, 185, 0, 0.3)',
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Cascadia Code', 'Consolas', 'monospace'],
        display: ['Inter', 'var(--font-primary)'],
      },
      fontSize: {
        '9xl': '8rem',
        '8xl': '6rem',
        '7xl': '4.5rem',
      },
      animation: {
        'quantum-wave': 'quantum-wave 3s ease-in-out infinite',
        'quantum-entangle': 'quantum-entangle 2s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'gradient-shift': 'gradient-shift 15s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
      keyframes: {
        'quantum-wave': {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.1)', opacity: '0.6' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'quantum-entangle': {
          '0%': { boxShadow: '0 0 0 0 rgba(123, 31, 162, 0.4)' },
          '70%': { boxShadow: '0 0 0 8px rgba(123, 31, 162, 0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(123, 31, 162, 0)' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
      backgroundImage: {
        'gradient-quantum': 'linear-gradient(135deg, #7c3aed 0%, #2563eb 50%, #0891b2 100%)',
        'gradient-neural': 'linear-gradient(135deg, #1d4ed8 0%, #6d28d9 100%)',
        'gradient-energy': 'linear-gradient(135deg, #0891b2 0%, #2563eb 100%)',
        'gradient-dark': 'linear-gradient(180deg, #111827 0%, #030712 100%)',
        'gradient-light': 'linear-gradient(180deg, #f9fafb 0%, #f3f4f6 100%)',
        'gradient-animated': 'linear-gradient(270deg, #7c3aed, #2563eb, #0891b2, #7c3aed)',
        'nvidia-gradient': 'linear-gradient(135deg, rgba(118, 185, 0, 0.05) 0%, rgba(0, 0, 0, 0.1) 100%)',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glow-sm': '0 0 10px rgba(139, 92, 246, 0.3)',
        'glow-md': '0 0 20px rgba(139, 92, 246, 0.4)',
        'glow-lg': '0 0 40px rgba(139, 92, 246, 0.5)',
        'quantum': '0 4px 14px rgba(123, 31, 162, 0.2)',
        'quantum-hover': '0 6px 20px rgba(123, 31, 162, 0.3)',
      },
    },
  },
  plugins: [],
}