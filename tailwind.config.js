/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#6341EA',
        'primary-pressed': '#4B30B6',
        kakao: '#FDDC3F',
        secondary: '#FFFFFF',
        background: '#FFFFFF',
        surface: '#FFFFFF',
        error: '#FFE014',
        'button-on': '#EC524A',
        'icon-on': '#999999',
        off: '#E0E0E0',
        'on-primary': '#FFFFFF',
        'on-secondary': '#000000',
        'on-background': '#000000',
        'on-surface': '#000000',
        'on-error': '#000000',
        'on-button-on': '#FFFFFF',
        'on-off': '#FFFFFF',
        banner: '#F5F5F5',
        'light-color': '#5B5B5B',
        'warn-red': '#E31C1C',
        'basic-black': '#333333',
        'semi-black': '#666666',
      },
      opacity: {
        outline: '0.27',
      },
    },
  },
  plugins: [],
};
