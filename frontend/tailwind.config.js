import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: '#000',
                secondary: '#F97316',
                accent: '#D97708',
                background: '#1E293B',
                surface: '#1334d4',
            },
            backgroundImage: {
                // 🌈 Main text gradient (replaces #colored-shadow)
                'text-gradient': 'linear-gradient(90deg, #202020 -0.55%, #3a566b 22.86%, #8b44ff 48.36%, #be6855 73.33%, #717a35 99.34%)',
                
                // 🧭 Navigation bar gradient (replaces #nav)
                'nav-gradient': 'linear-gradient(90deg, #202020 -0.55%, #3a566b 22.86%, #312d38 48.36%, #bd9d97 73.33%, #717a3544 99.34%)',
                
                // 🔘 Button gradient (replaces #colored-button)
                'button-gradient': 'linear-gradient(90deg, #1a1919 -0.55%, #3c627e 22.86%, #634e88 48.36%, #9e311d 73.33%, #7f8a3be5 99.34%)',
                
                // 🎨 Social media gradient (replaces #social-icon:hover)
                'social-gradient': 'linear-gradient(90deg, #44ff9a -0.55%, #44b0ff 22.86%, #8b44ff 48.36%, #ff6644 73.33%, #ebff70 99.34%)',
                
                // 🌃 Background images
                'bg-day': "url('/light.svg')",
                'bg-night': "url('/dark2.png')",
            },
            textColor: {
                transparent: 'transparent',
            },
            backdropBlur: {
                '3xl': '32px',
            },
            boxShadow: {
                'custom-dark': '7px 2px 10px 4px rgba(0,0,0,0.75)',
                'glow': '0 0 20px rgba(99, 102, 241, 0.3)',
            },
            animation: {
                'fade-in': 'fadeIn 0.6s ease-out',
                'slide-in-left': 'slideInFromLeft 0.5s ease-out',
                'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                fadeIn: {
                    'from': {
                        opacity: '0',
                        transform: 'translateY(20px)',
                    },
                    'to': {
                        opacity: '1',
                        transform: 'translateY(0)',
                    },
                },
                slideInFromLeft: {
                    'from': {
                        opacity: '0',
                        transform: 'translateX(-30px)',
                    },
                    'to': {
                        opacity: '1',
                        transform: 'translateX(0)',
                    },
                },
            },
        },
    },
    plugins: [forms],
};