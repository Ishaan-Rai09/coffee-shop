/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'coffee': {
          'primary': '#5C3A2E',    // Deep Brown - primary color
          'secondary': '#DAA06D',  // Caramel - accent color
          'tertiary': '#8B593E',   // Medium Brown - complementary
          'dark': '#3A2418',       // Dark Brown - dark shade
          'black': '#1E1412',      // Almost Black - extra dark
          'light': '#F8F4E3',      // Cream - light background
          'muted': '#E6DED1',      // Muted Beige - subtle accent
        },
      },
      fontFamily: {
        'sans': ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        'serif': ['Playfair Display', 'ui-serif', 'Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(0, 0, 0, 0.05)',
        'medium': '0 8px 30px rgba(0, 0, 0, 0.1)',
      },
      backgroundImage: {
        'coffee-pattern': "url('https://images.unsplash.com/photo-1580933073521-dc49bba0a53a?q=80&w=1752&auto=format&fit=crop')",
        'beans-texture': "url('https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=1740&auto=format&fit=crop')",
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
} 