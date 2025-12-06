/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Dark Mode (Primary)
        background: {
          'primary': '#0A0A0A',    // Soft black
          'surface': '#1A1A1A',    // Elevated cards
          'elevated': '#2A2A2A',   // Hover states
        },
        text: {
          'primary': '#FFFFFF',    // High contrast
          'secondary': '#A0A0A0',  // Muted body copy
          'tertiary': '#6B7280',   // De-emphasized
        },
        accent: {
          'primary': '#6366F1',    // Indigo (CTAs)
          'primaryHover': '#4F46E5',
          'success': '#10B981',    // Green (AI magic moments)
          'warning': '#F59E0B',    // Amber (attention)
        },
        border: {
          'default': '#2A2A2A',
          'hover': '#3A3A3A',
        },
        // Vault brand colors for gradients
        'vault-purple': '#8B5CF6',
        'vault-indigo': '#6366F1',
        'vault-pink': '#EC4899',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      fontSize: {
        // Custom typography scale
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
      },
      fontWeight: {
        'medium': '500',
        'semibold': '600',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      animation: {
        'fadeIn': 'fadeIn 0.6s ease-out',
        'slideUp': 'slideUp 0.6s ease-out',
        'pulse-subtle': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
