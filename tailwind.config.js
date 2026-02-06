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
                // MindMesh Inspired - Vibrant Red & Deep Dark
                background: '#050202', // Very deep red-black
                surface: '#0C0707',    // Slightly lighter dark
                border: '#211313',     // Dark red border
                
                // Brand Accent - Vibrant Brand Red
                primary: {
                    DEFAULT: '#DC2626', // Red 600
                    hover: '#EF4444',   // Red 500
                    light: '#F87171',   // Red 400
                    50: '#FEF2F2',
                    100: '#FEE2E2',
                    200: '#FECACA',
                    300: '#FCA5A5',
                    400: '#F87171',
                    500: '#EF4444',     // Main Brand Color
                    600: '#DC2626', 
                    700: '#B91C1C',
                    800: '#991B1B',
                    900: '#7F1D1D',
                },

                // Text Colors - Keeping crisp white
                text: {
                    primary: '#FFFFFF',
                    secondary: '#9CA3AF', // Gray-400
                    muted: '#6B7280',     // Gray-500
                },
                
                // Functional
                success: '#10B981',
                warning: '#FBBF24',
                info: '#3B82F6',
                danger: '#EF4444',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            boxShadow: {
                'glow': '0 0 20px -5px rgba(220, 38, 38, 0.4)', // Red Glow
                'glow-strong': '0 0 50px -10px rgba(220, 38, 38, 0.5)',
                'glass-card': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
            },
            animation: {
                'shine': 'shine 1.5s infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'float': 'float 6s ease-in-out infinite',
            },
            keyframes: {
                shine: {
                    '0%': { transform: 'translateX(-100%)' },
                    '100%': { transform: 'translateX(100%)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                }
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
            }
        },
    },
    plugins: [],
}
