import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'text': {
          50: '#f7f0ed',
          100: '#f0e1db',
          200: '#e1c3b7',
          300: '#d2a593',
          400: '#c3876f',
          500: '#b4694b',
          600: '#90543c',
          700: '#6c3f2d',
          800: '#482a1e',
          900: '#24150f',
          950: '#120a08',
        },
        'background': {
          50: '#f8f0ec',
          100: '#f1e0da',
          200: '#e4c2b4',
          300: '#d6a38f',
          400: '#c98469',
          500: '#bb6644',
          600: '#965136',
          700: '#703d29',
          800: '#4b291b',
          900: '#25140e',
          950: '#130a07',
        },
        'primary': {
          50: '#ffede5',
          100: '#ffdbcc',
          200: '#ffb899',
          300: '#ff9466',
          400: '#ff7033',
          500: '#ff4d00',
          600: '#cc3d00',
          700: '#992e00',
          800: '#661f00',
          900: '#330f00',
          950: '#1a0800',
        },
        'secondary': {
          50: '#faefeb',
          100: '#f4e0d7',
          200: '#e9c0af',
          300: '#dea187',
          400: '#d3825f',
          500: '#c86237',
          600: '#a04f2c',
          700: '#783b21',
          800: '#502716',
          900: '#28140b',
          950: '#140a05',
        },
        'accent': {
          50: '#faefeb',
          100: '#f5dfd6',
          200: '#ebc0ad',
          300: '#e0a085',
          400: '#d6815c',
          500: '#cc6133',
          600: '#a34e29',
          700: '#7a3a1f',
          800: '#522714',
          900: '#29130a',
          950: '#140a05',
        },
       },
       
    },
  },
  plugins: [],
};
export default config;
