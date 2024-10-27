/** @type {import('tailwindcss').Config} */
console.log('using tailwindcss config');
export default {
    content: ['./src/**/*.{ts,tsx}'],
    theme: {
        extend: {},
    },
    mode: 'jit',
};
