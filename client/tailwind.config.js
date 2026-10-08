/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        govt: {
          dark: '#0f2942',
          primary: '#1a4971',
          accent: '#2563eb',
          light: '#f0f5fa',
        },
        status: {
          paid: '#15803d',       // Green for Paid
          paidBg: '#dcfce7',
          pending: '#b45309',    // Amber for Pending
          pendingBg: '#fef3c7',
          delayed: '#b91c1c',    // Red for Delayed
          delayedBg: '#fee2e2',
        }
      },
      fontSize: {
        'elder-base': '1.125rem',  // 18px base text
        'elder-lg': '1.35rem',    // ~21px
        'elder-xl': '1.65rem',    // ~26px
        'elder-2xl': '2.1rem',    // ~33px
      }
    },
  },
  plugins: [],
}
