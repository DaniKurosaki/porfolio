import { EASE, MQ, gsap, SplitText } from "./motion";

/**
 * Las primitivas de movimiento, por atributos. El marcado (o los componentes de
 * src/components/motion/, que solo ponen estos atributos) pinta el estado final y
 * legible; aquí solo se fija un estado inicial cuando hay permiso para moverse.
 * app.ts llama a `initPrimitives()` una vez para toda la página.
 *
 * | Atributo                 | Qué hace                                                    | Opciones (data-*)                  |
 * | ------------------------ | ----------------------------------------------------------- | ---------------------------------- |
 * | `data-reveal-lines`      | Las líneas suben desde detrás de una máscara                | `delay`, `stagger`, `start`        |
 * | `data-scrub-words`       | Las palabras pasan de tenues a sólidas con el scroll        | `start`, `end`                     |
 * | `data-fade-up`           | Los hijos directos suben uno tras otro al entrar            | `delay`, `stagger`, `start`        |
 * | `data-reveal-image`      | Un clip-path destapa el marco y la imagen hace parallax     | `image-parallax` (0 lo quita)      |
 * | `data-parallax`          | El elemento se desplaza a otra velocidad que el scroll      | `speed` (negativo sube más rápido) |
 * | `data-draw`              | Los trazos SVG de dentro (`pathLength="1"`) se dibujan      | `start`, `end`, `scrub` ("false")  |
 * | `data-counter`           | Un número cuenta hasta su valor al entrar                   | `to`, `decimals`                   |
 * | `data-section-label`     | El filete `[data-rule]` de la etiqueta se dibuja al entrar  | —                                  |
 * | `data-magnetic`          | Atrae su contenido hacia el puntero (solo ratón)            | `strength`                         |
 *
 * Nunca dentro de una pista horizontal fijada: allí se anima con `containerAnimation`.
 */

function num(el: HTMLElement, key: string, fallback: number) {
	const v = el.dataset[key];
	return v === undefined || v === "" ? fallback : Number(v);
}

function all(root: ParentNode, selector: string) {
	return Array.from(root.querySelectorAll<HTMLElement>(selector));
}

export function initPrimitives(root: ParentNode = document) {
	const mm = gsap.matchMedia();

	mm.add(MQ.motion, () => {
		const splits: SplitText[] = [];

		for (const el of all(root, "[data-reveal-lines]")) {
			splits.push(
				SplitText.create(el, {
					type: "lines",
					linesClass: "split-line",
					mask: "lines",
					autoSplit: true,
					// Devolver el tween permite que SplitText lo rehaga al volver a partir.
					onSplit: (self) =>
						gsap.from(self.lines, {
							yPercent: 115,
							duration: 1.3,
							ease: EASE,
							stagger: num(el, "stagger", 0.08),
							delay: num(el, "delay", 0),
							scrollTrigger: { trigger: el, start: el.dataset.start || "top 85%", once: true },
						}),
				}),
			);
		}

		for (const el of all(root, "[data-scrub-words]")) {
			splits.push(
				SplitText.create(el, {
					type: "words",
					autoSplit: true,
					onSplit: (self) =>
						gsap.fromTo(
							self.words,
							{ opacity: 0.14 },
							{
								opacity: 1,
								ease: "none",
								stagger: 0.1,
								scrollTrigger: {
									trigger: el,
									start: el.dataset.start || "top 80%",
									end: el.dataset.end || "bottom 45%",
									scrub: true,
								},
							},
						),
				}),
			);
		}

		for (const el of all(root, "[data-fade-up]")) {
			gsap.from(el.children, {
				y: 40,
				autoAlpha: 0,
				duration: 1.1,
				ease: EASE,
				stagger: num(el, "stagger", 0.1),
				delay: num(el, "delay", 0),
				scrollTrigger: { trigger: el, start: el.dataset.start || "top 85%", once: true },
			});
		}

		for (const frame of all(root, "[data-reveal-image]")) {
			const img = frame.querySelector("img");
			if (!img) continue;
			const parallax = num(frame, "imageParallax", 10);
			// Margen para que el parallax nunca deje ver el borde del marco.
			gsap.set(img, { scale: 1.15 });
			gsap.fromTo(
				frame,
				{ clipPath: "inset(100% 0% 0% 0%)" },
				{
					clipPath: "inset(0% 0% 0% 0%)",
					duration: 1.5,
					ease: "expo.inOut",
					scrollTrigger: { trigger: frame, start: "top 88%", once: true },
				},
			);
			if (parallax) {
				gsap.fromTo(
					img,
					{ yPercent: -parallax / 2 },
					{
						yPercent: parallax / 2,
						ease: "none",
						scrollTrigger: { trigger: frame, start: "top bottom", end: "bottom top", scrub: true },
					},
				);
			}
		}

		for (const el of all(root, "[data-parallax]")) {
			const speed = num(el, "speed", -15);
			gsap.fromTo(
				el,
				{ yPercent: -speed / 2 },
				{
					yPercent: speed / 2,
					ease: "none",
					scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
				},
			);
		}

		for (const el of all(root, "[data-draw]")) {
			const paths = el.querySelectorAll("path, line, polyline, circle, rect");
			const scrub = el.dataset.scrub !== "false";
			gsap.fromTo(
				paths,
				{ strokeDasharray: 1, strokeDashoffset: 1 },
				{
					strokeDashoffset: 0,
					ease: scrub ? "none" : EASE,
					duration: scrub ? undefined : 1.6,
					stagger: scrub ? 0.05 : 0.04,
					scrollTrigger: {
						trigger: el,
						start: el.dataset.start || "top 80%",
						end: el.dataset.end || "bottom 50%",
						scrub: scrub ? 0.6 : false,
						once: !scrub,
					},
				},
			);
		}

		for (const el of all(root, "[data-counter]")) {
			const to = num(el, "to", Number(el.textContent) || 0);
			const decimals = num(el, "decimals", 0);
			const state = { v: 0 };
			el.textContent = (0).toFixed(decimals);
			gsap.to(state, {
				v: to,
				duration: 2,
				ease: "power3.out",
				scrollTrigger: { trigger: el, start: "top 85%", once: true },
				onUpdate: () => {
					el.textContent = state.v.toFixed(decimals);
				},
			});
		}

		for (const el of all(root, "[data-section-label]")) {
			const rule = el.querySelector("[data-rule]");
			if (!rule) continue;
			gsap.from(rule, {
				scaleX: 0,
				duration: 1.6,
				ease: EASE,
				scrollTrigger: { trigger: el, start: "top 90%", once: true },
			});
		}

		return () => {
			for (const split of splits) split.revert();
		};
	});

	mm.add(MQ.pointer, () => {
		const cleanups: (() => void)[] = [];
		for (const el of all(root, "[data-magnetic]")) {
			const strength = num(el, "strength", 0.3);
			const xTo = gsap.quickTo(el, "x", { duration: 0.9, ease: "elastic.out(1, 0.4)" });
			const yTo = gsap.quickTo(el, "y", { duration: 0.9, ease: "elastic.out(1, 0.4)" });
			const move = (e: PointerEvent) => {
				const r = el.getBoundingClientRect();
				xTo((e.clientX - (r.left + r.width / 2)) * strength);
				yTo((e.clientY - (r.top + r.height / 2)) * strength);
			};
			const leave = () => {
				xTo(0);
				yTo(0);
			};
			el.addEventListener("pointermove", move);
			el.addEventListener("pointerleave", leave);
			cleanups.push(() => {
				el.removeEventListener("pointermove", move);
				el.removeEventListener("pointerleave", leave);
			});
		}
		return () => cleanups.forEach((fn) => fn());
	});

	return mm;
}
