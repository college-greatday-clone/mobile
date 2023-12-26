/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{ts,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: '#FE881A',
				secondary: '#FE881A',
				black: '#192928',
				success: '#41B55A',
				error: '#FF0000'
			}
		}
	},
	plugins: []
}
