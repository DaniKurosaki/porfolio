import Lenis from "lenis";
import { MQ, ScrollTrigger, gsap, setLenis } from "./motion";
import { initPrimitives } from "./primitives";

/**
 * Arranque común de la página: scroll suave, primitivas, cursor propio y un último
 * refresco de ScrollTrigger cuando ya está todo (fuentes, imágenes y los pins de cada
 * capítulo, que crean sus propios <script>).
 */

/**
 * Scroll suave de Lenis, movido por el ticker de GSAP para que ScrollTrigger lea la misma
 * posición que pinta Lenis. Desactivado con movimiento reducido; en táctil se mantiene el
 * scroll nativo. Los enlaces `#ancla` los suaviza el propio Lenis.
 */
function initSmoothScroll() {
	if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
	const lenis = new Lenis({ lerp: 0.1, anchors: true, autoRaf: false });
	setLenis(lenis);
	lenis.on("scroll", ScrollTrigger.update);
	gsap.ticker.add((time) => lenis.raf(time * 1000));
	gsap.ticker.lagSmoothing(0);
}

/**
 * Un punto que sigue al ratón con mezcla por diferencia (se lee sobre tinta y sobre
 * papel). Crece sobre enlaces y botones, y sobre `[data-cursor="Texto"]` muestra el texto.
 */
function initCursor() {
	const mm = gsap.matchMedia();
	mm.add(MQ.pointer, () => {
		const cursor = document.createElement("div");
		cursor.className = "cursor";
		cursor.setAttribute("aria-hidden", "true");
		cursor.innerHTML = '<span class="cursor-dot"></span><span class="cursor-label"></span>';
		document.body.appendChild(cursor);
		const label = cursor.querySelector<HTMLElement>(".cursor-label")!;
		document.documentElement.classList.add("has-cursor");

		gsap.set(cursor, { autoAlpha: 0 });
		const xTo = gsap.quickTo(cursor, "x", { duration: 0.35, ease: "power3" });
		const yTo = gsap.quickTo(cursor, "y", { duration: 0.35, ease: "power3" });
		let visible = false;

		const move = (e: PointerEvent) => {
			if (e.pointerType !== "mouse") return;
			xTo(e.clientX);
			yTo(e.clientY);
			if (!visible) {
				gsap.set(cursor, { x: e.clientX, y: e.clientY });
				gsap.to(cursor, { autoAlpha: 1, duration: 0.3 });
				visible = true;
			}
		};
		const over = (e: PointerEvent) => {
			const target = e.target instanceof Element ? e.target : null;
			const withLabel = target?.closest<HTMLElement>("[data-cursor]");
			const interactive = target?.closest("a, button, [role='button']");
			cursor.classList.toggle("is-label", Boolean(withLabel));
			cursor.classList.toggle("is-link", !withLabel && Boolean(interactive));
			label.textContent = withLabel?.dataset.cursor ?? "";
		};
		const leave = () => {
			gsap.to(cursor, { autoAlpha: 0, duration: 0.3 });
			visible = false;
		};

		window.addEventListener("pointermove", move, { passive: true });
		document.addEventListener("pointerover", over, { passive: true });
		document.documentElement.addEventListener("pointerleave", leave);

		return () => {
			window.removeEventListener("pointermove", move);
			document.removeEventListener("pointerover", over);
			document.documentElement.removeEventListener("pointerleave", leave);
			document.documentElement.classList.remove("has-cursor");
			cursor.remove();
		};
	});
}

initSmoothScroll();
initPrimitives(document);
initCursor();

// Los capítulos crean sus ScrollTrigger en sus propios <script>, que pueden ejecutarse
// en cualquier orden: se ordenan por su posición en la página y se vuelven a medir
// cuando han cargado imágenes y fuentes, para que los pins empujen bien lo de abajo.
const refresh = () => {
	ScrollTrigger.sort();
	ScrollTrigger.refresh();
};
if (document.readyState === "complete") refresh();
else window.addEventListener("load", refresh, { once: true });
document.fonts?.ready.then(() => ScrollTrigger.refresh());
