import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import type Lenis from "lenis";

/**
 * Las herramientas de movimiento del portfolio: GSAP con ScrollTrigger y SplitText, al
 * ritmo del scroll suave de Lenis (ver smooth-scroll.ts). Importa gsap y sus plugins
 * desde aquí para que se registren una sola vez. Los <script> de Astro solo se ejecutan
 * en el navegador, así que aquí no hay SSR que proteger.
 */
gsap.registerPlugin(ScrollTrigger, SplitText);

export { gsap, ScrollTrigger, SplitText };

/**
 * Media queries para `gsap.matchMedia()`. Toda animación depende de `motion`, así que
 * quien navegue con movimiento reducido ve la maquetación final y estática. `desktop` es
 * para los efectos que solo tienen sentido con espacio y puntero (pins, scroll horizontal).
 */
export const MQ = {
	motion: "(prefers-reduced-motion: no-preference)",
	desktop: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
	mobile: "(max-width: 1023px) and (prefers-reduced-motion: no-preference)",
	pointer: "(pointer: fine) and (prefers-reduced-motion: no-preference)",
} as const;

/** El easing de la casa: arranque rápido, frenada larga. */
export const EASE = "expo.out";

let lenis: Lenis | null = null;

/** Lo fija smooth-scroll.ts mientras está activo. */
export function setLenis(instance: Lenis | null) {
	lenis = instance;
}

/** La instancia de Lenis en marcha, o null donde el scroll suave está desactivado. */
export function getLenis() {
	return lenis;
}

/** Sube al principio sin pelearse con Lenis; con movimiento reducido, de golpe. */
export function scrollToTop() {
	if (lenis) lenis.scrollTo(0);
	else window.scrollTo({ top: 0, behavior: window.matchMedia(MQ.motion).matches ? "smooth" : "auto" });
}
