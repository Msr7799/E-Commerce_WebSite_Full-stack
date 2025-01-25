import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: '#1E40AF', // لون أزرق غامق
                secondary: '#F97316', // لون برتقالي
                accent: '#D97708', // لون أصفر
                background: '#1E293B', // لون رمادي داكن
                surface: '#1334d4', // لون رمادي داكن جداً
                // أضف المزيد من الألوان حسب احتياجك
            },
        },
    },
    plugins: [forms],
};