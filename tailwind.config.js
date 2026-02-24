/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        atlassian: {
          primary: '#0052CC', // B400
          background: {
            default: '#FFFFFF',
            gray: '#F4F5F7', // N20
          },
          border: '#DFE1E6', // N30
        }
      },
      fontFamily: {
        sans: ['Inter', 'Charlie', 'sans-serif'],
      },
      spacing: {
        '1': '8px',
        '2': '16px',
        '3': '24px',
        '4': '32px',
        '5': '40px',
        '6': '48px',
      },
      borderRadius: {
        'jira': '2px', // Specific 2px border radius
      }
    },
  },
  plugins: [],
}
