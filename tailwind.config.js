/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  safelist: [
    'bg-[#977A25]', 'border-[#F5C842]', 'bg-[#671A1A]', 'border-[#B22A2A]',
    'bg-[#2D2A6E]', 'border-transparent',
  ],
  theme: {
    extend: {
      colors: {
        'brand-bg': '#0D0B2B',
        'brand-card': '#2D2A6E',
        'brand-accent': '#F5C842',
        'brand-sub': '#C4BFEF',
        'brand-navy': '#1A1848',
        'brand-dark': '#1A1600',
      },
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        notifDown: {
          from: { transform: 'translateY(-110%)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        notifUp: {
          from: { transform: 'translateY(0)', opacity: '1' },
          to: { transform: 'translateY(-110%)', opacity: '0' },
        },
        btnFadeIn: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        bubbleIn: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        girlShrink: {
          from: { transform: 'scale(1)' },
          to: { transform: 'scale(0.2)' },
        },
        girlGrow: {
          from: { transform: 'scale(0.2)' },
          to: { transform: 'scale(1)' },
        },
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
        'notif-down': 'notifDown 0.4s ease forwards',
        'notif-up': 'notifUp 0.4s ease forwards',
        'btn-fade-in': 'btnFadeIn 0.5s ease 1.2s both',
        'bubble-in': 'bubbleIn 0.35s ease both',
      },
    },
  },
  plugins: [],
};
