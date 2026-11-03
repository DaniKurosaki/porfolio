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
			// La escala de titulares: `text-mega` solo en el hero, `text-huge` para el h2 de cada
			// capítulo y `text-big` para titulares de ítem, cifras y frases.
			fontSize: {
				mega: ["clamp(4.5rem, 17.5vw, 20rem)", { lineHeight: "0.82" }],
				huge: ["clamp(3rem, 9vw, 10rem)", { lineHeight: "0.88" }],
				big: ["clamp(2rem, 4.6vw, 5rem)", { lineHeight: "0.95" }],
			},
			screens: {
				xs: "480px",
			},
		},
	},
	plugins: [],
};
