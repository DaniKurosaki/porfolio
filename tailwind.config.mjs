/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {
			// Tres colores y nada más: tinta (fondo), papel (texto y capítulos claros) y voltio (el acento).
			colors: {
				ink: "rgb(var(--ink) / <alpha-value>)",
				"ink-2": "rgb(var(--ink-2) / <alpha-value>)",
				paper: "rgb(var(--paper) / <alpha-value>)",
				volt: "rgb(var(--volt) / <alpha-value>)",
			},
			fontFamily: {
				sans: ['"Archivo Variable"', "system-ui", "sans-serif"],
				display: ['"Archivo Variable"', "system-ui", "sans-serif"],
				serif: ['"Instrument Serif"', "Georgia", "serif"],
				mono: ['"JetBrains Mono Variable"', "ui-monospace", "monospace"],
			},
			screens: {
				xs: "480px",
			},
		},
	},
	plugins: [],
};
