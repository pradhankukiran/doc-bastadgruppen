/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Lato", "sans-serif"],
      },
      colors: {
        // Refined brand palette with semantic naming
        brand: {
          primary: '#000000',
          secondary: '#333333',
          accent: '#0066cc',
          muted: '#757575',
          background: {
            light: '#f8f9fa',
            DEFAULT: '#f2f3f5',
            dark: '#e9ecef',
          },
          // Corporate UI states
          subtle: '#f5f7fa',
          success: '#2e7d32',
          warning: '#ed6c02',
          error: '#d32f2f',
          info: '#0288d1',
        },
      },
      fontFamily: {
        sans: [
          'Inter var', 
          'ui-sans-serif', 
          'system-ui', 
          '-apple-system', 
          'sans-serif'
        ],
        mono: [
          'JetBrains Mono', 
          'Menlo', 
          'Monaco', 
          'Consolas', 
          'monospace'
        ],
        // Corporate presentation font
        display: [
          'Inter var',
          'Helvetica Neue',
          'Arial',
          'sans-serif'
        ],
      },
      fontSize: {
        '2xs': '0.625rem', // 10px
        'md': '0.938rem', // 15px for better readability in corporate apps
      },
      borderRadius: {
        DEFAULT: '0.375rem',
        sm: '0.25rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem',
      },
      boxShadow: {
        'subtle': '0 2px 4px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.06)',
        'card': '0 4px 8px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.1)',
        'dropdown': '0 10px 15px -3px rgba(0,0,0,0.08), 0 4px 6px -2px rgba(0,0,0,0.05)',
        'modal': '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)',
      },
      spacing: {
        70: '70px',
        '4.5': '1.125rem',
        '13': '3.25rem',
      },
      height: {
        70: '70px',
      },
      transitionTimingFunction: {
        'corporate': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      },
      transitionDuration: {
        '250': '250ms', 
        '400': '400ms',
      },
      animation: {
        'fade-in': 'fadeIn 0.25s cubic-bezier(0.25, 0.1, 0.25, 1)',
        'slide-up': 'slideUp 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)',
        'slide-down': 'slideDown 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)',
        'scale': 'scale 0.2s cubic-bezier(0.25, 0.1, 0.25, 1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(8px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-8px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scale: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      letterSpacing: {
        'tightest': '-0.025em',
        'tighter': '-0.02em',
        'tight': '-0.01em',
        'normal': '0',
        'wide': '0.01em',
        'wider': '0.02em',
        'widest': '0.05em',
      },
      lineHeight: {
        'tighter': '1.1',
        'snug': '1.3',
        'relaxed': '1.625',
      },
      opacity: {
        '15': '0.15',
        '35': '0.35', 
        '85': '0.85',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
  ],
  safelist: [
    // Core utility classes that might be used dynamically
    'h-70',
    'animate-fade-in',
    'animate-slide-up',
    'animate-slide-down',
    'animate-scale',
    'shadow-subtle',
    'shadow-card',
  ],
};
