/**
 * El fondo del hero: una placa de circuito dibujada en un shader (WebGL 1, sin
 * librerías). Pistas de 1 px sobre una rejilla con quiebros a 45°, vías en los extremos
 * y uniones en los cruces. Tres luces la recorren:
 * - el encendido, una onda que nace en el led del titular y descubre la placa (`power`);
 * - la señal, pulsos que salen del led sin parar, como corriente por las pistas;
 * - la linterna, que sigue al ratón (en táctil pasea sola).
 * Se pausa fuera de pantalla y con la pestaña oculta. Devuelve null sin WebGL.
 */

const VERT = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;

uniform vec2 uRes;
uniform float uDpr;
uniform float uTime;
uniform vec2 uMouse;
uniform float uLight;
uniform vec2 uOrigin;
uniform float uPower;
uniform float uFade;
uniform vec3 uInk;
uniform vec3 uPaper;
uniform vec3 uVolt;

float hash(vec2 p) {
	p = fract(p * vec2(234.34, 435.345));
	p += dot(p, p + 34.23);
	return fract(p.x * p.y);
}

// ¿Hay pista en este borde? La clave del borde es la misma para las dos celdas que lo
// comparten, así que la red queda conectada. La densidad cambia por zonas.
float edge(vec2 k) {
	float zone = hash(floor(k / 7.0) + 11.0);
	float density = mix(0.14, 0.46, zone);
	return step(hash(k * 1.37 + 3.1), density);
}

float seg(vec2 p, vec2 a, vec2 b) {
	vec2 pa = p - a;
	vec2 ba = b - a;
	float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
	return length(pa - ba * h);
}

void main() {
	vec2 frag = gl_FragCoord.xy;
	float cell = 46.0 * uDpr;
	vec2 g = frag / cell;
	vec2 id = floor(g);
	vec2 f = fract(g) - 0.5;

	float eR = edge(id + vec2(0.5, 0.0));
	float eL = edge(id + vec2(-0.5, 0.0));
	float eU = edge(id + vec2(0.0, 0.5));
	float eD = edge(id + vec2(0.0, -0.5));
	float n = eR + eL + eU + eD;

	float d = 10.0;
	vec2 h = eR > 0.5 ? vec2(0.5, 0.0) : vec2(-0.5, 0.0);
	vec2 v = eU > 0.5 ? vec2(0.0, 0.5) : vec2(0.0, -0.5);
	bool corner = n == 2.0 && (eR + eL) == 1.0 && (eU + eD) == 1.0;
	if (corner) {
		// Esquina achaflanada a 45°, como en una placa de verdad.
		vec2 a = h * 0.36;
		vec2 b = v * 0.36;
		d = min(min(seg(f, h, a), seg(f, v, b)), seg(f, a, b));
	} else {
		if (eR > 0.5) d = min(d, seg(f, vec2(0.0), vec2(0.5, 0.0)));
		if (eL > 0.5) d = min(d, seg(f, vec2(0.0), vec2(-0.5, 0.0)));
		if (eU > 0.5) d = min(d, seg(f, vec2(0.0), vec2(0.0, 0.5)));
		if (eD > 0.5) d = min(d, seg(f, vec2(0.0), vec2(0.0, -0.5)));
	}

	float px = 1.0 / cell;
	float lw = 0.55 * uDpr * px;
	float trace = 1.0 - smoothstep(lw, lw + px, d);

	// Vías al final de cada pista, uniones en los cruces y algún pad suelto.
	float r = length(f);
	float pad = 0.0;
	if (n == 1.0) {
		pad = 1.0 - smoothstep(lw, lw + px, abs(r - 0.12));
		pad = max(pad, 1.0 - smoothstep(0.035, 0.035 + px, r));
	} else if (n >= 3.0) {
		pad = 1.0 - smoothstep(0.055, 0.055 + px, r);
	} else if (n == 0.0 && hash(id + 9.1) > 0.94) {
		vec2 q = abs(f);
		pad = 1.0 - smoothstep(lw, lw + px, abs(max(q.x, q.y * 1.6) - 0.09));
	}
	float ink = max(trace, pad);

	// Distancias en píxeles CSS, para que la luz mida lo mismo en cualquier pantalla.
	float dO = length(frag - uOrigin) / uDpr;
	float dM = length(frag - uMouse) / uDpr;
	float reach = length(uRes) / uDpr;

	// Encendido: la placa aparece desde el led, con un frente amarillo.
	float radius = uPower * reach * 1.05;
	float shown = smoothstep(radius, radius - 140.0, dO);
	float front = exp(-pow((dO - radius) / 36.0, 2.0)) * (1.0 - smoothstep(0.85, 1.0, uPower));

	// Señal: pulsos que salen del led y se alejan.
	float wave = dO * 0.011 - uTime * 0.55 + hash(id) * 0.35;
	float pulse = pow(max(0.0, sin(wave)), 28.0) * smoothstep(reach, 0.0, dO);

	// Linterna del ratón.
	float lamp = exp(-pow(dM / 300.0, 2.0)) * uLight;

	float base = 0.07 + pad * 0.04;
	vec3 col = uInk;
	col += uPaper * ink * (base + lamp * 0.42) * shown * uFade;
	col += uVolt * ink * (pulse * 0.55 + lamp * 0.3 + front * 1.4) * shown * uFade;
	// Un halo muy suave alrededor del led.
	col += uVolt * 0.05 * exp(-dO / 420.0) * uPower * uFade;

	// Viñeta para que el titular respire.
	vec2 uv = frag / uRes - 0.5;
	uv.x *= uRes.x / uRes.y;
	col = mix(uInk, col, smoothstep(1.25, 0.35, length(uv)));

	gl_FragColor = vec4(col, 1.0);
}
`;

const rgb = (r: number, g: number, b: number) => [r / 255, g / 255, b / 255] as const;

export interface HeroShader {
	/** Valores que se animan desde fuera (GSAP): `power` de 0 a 1, `fade` de 1 a 0. */
	state: { power: number; fade: number };
	/** El punto de origen del encendido y de la señal, en px CSS relativos al canvas. */
	setOrigin(x: number, y: number): void;
	/** Arranca el bucle (solo corre mientras el canvas se ve). */
	start(): void;
	/** Pinta un fotograma quieto: para movimiento reducido. */
	still(): void;
}

export function createHeroShader(canvas: HTMLCanvasElement): HeroShader | null {
	const gl = canvas.getContext("webgl", { antialias: false, alpha: false, powerPreference: "low-power" });
	if (!gl) return null;

	const compile = (type: number, source: string) => {
		const shader = gl.createShader(type)!;
		gl.shaderSource(shader, source);
		gl.compileShader(shader);
		if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
			console.error(gl.getShaderInfoLog(shader));
			return null;
		}
		return shader;
	};
	const vs = compile(gl.VERTEX_SHADER, VERT);
	const fs = compile(gl.FRAGMENT_SHADER, FRAG);
	if (!vs || !fs) return null;
	const program = gl.createProgram()!;
	gl.attachShader(program, vs);
	gl.attachShader(program, fs);
	gl.linkProgram(program);
	if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null;
	gl.useProgram(program);

	// Un triángulo que cubre toda la pantalla.
	const buffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
	const aPos = gl.getAttribLocation(program, "aPos");
	gl.enableVertexAttribArray(aPos);
	gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

	const u = (name: string) => gl.getUniformLocation(program, name);
	const loc = {
		res: u("uRes"),
		dpr: u("uDpr"),
		time: u("uTime"),
		mouse: u("uMouse"),
		light: u("uLight"),
		origin: u("uOrigin"),
		power: u("uPower"),
		fade: u("uFade"),
	};
	gl.uniform3fv(u("uInk"), rgb(10, 10, 10));
	gl.uniform3fv(u("uPaper"), rgb(237, 234, 227));
	gl.uniform3fv(u("uVolt"), rgb(250, 204, 21));

	const state = { power: 0, fade: 1 };
	const finePointer = window.matchMedia("(pointer: fine)").matches;
	let dpr = 1;
	let width = 1;
	let height = 1;
	const origin = { x: 0, y: 0 };
	const mouse = { x: 0, y: 0, tx: 0, ty: 0, light: 0, tlight: finePointer ? 0 : 0.55 };
	let raf = 0;
	let running = false;
	let visible = true;
	const t0 = performance.now();

	const resize = () => {
		dpr = Math.min(window.devicePixelRatio || 1, 1.75);
		width = Math.max(1, Math.round(canvas.clientWidth * dpr));
		height = Math.max(1, Math.round(canvas.clientHeight * dpr));
		canvas.width = width;
		canvas.height = height;
		gl.viewport(0, 0, width, height);
	};

	const draw = (time: number) => {
		gl.uniform2f(loc.res, width, height);
		gl.uniform1f(loc.dpr, dpr);
		gl.uniform1f(loc.time, time);
		// WebGL cuenta la y desde abajo.
		gl.uniform2f(loc.mouse, mouse.x * dpr, height - mouse.y * dpr);
		gl.uniform1f(loc.light, mouse.light);
		gl.uniform2f(loc.origin, origin.x * dpr, height - origin.y * dpr);
		gl.uniform1f(loc.power, state.power);
		gl.uniform1f(loc.fade, state.fade);
		gl.drawArrays(gl.TRIANGLES, 0, 3);
	};

	const loop = (now: number) => {
		raf = requestAnimationFrame(loop);
		const time = (now - t0) / 1000;
		if (!finePointer) {
			// En táctil no hay ratón: la linterna pasea sola por la placa.
			mouse.tx = width / dpr / 2 + Math.sin(time * 0.31) * (width / dpr) * 0.38;
			mouse.ty = height / dpr / 2 + Math.cos(time * 0.23) * (height / dpr) * 0.3;
		}
		mouse.x += (mouse.tx - mouse.x) * 0.08;
		mouse.y += (mouse.ty - mouse.y) * 0.08;
		mouse.light += (mouse.tlight - mouse.light) * 0.05;
		draw(time);
	};

	const play = () => {
		if (running || !visible || document.hidden) return;
		running = true;
		raf = requestAnimationFrame(loop);
	};
	const pause = () => {
		running = false;
		cancelAnimationFrame(raf);
	};

	let wanted = false;
	new IntersectionObserver(([entry]) => {
		visible = entry.isIntersecting;
		if (visible && wanted) play();
		else pause();
	}).observe(canvas);
	document.addEventListener("visibilitychange", () => (document.hidden ? pause() : wanted && play()));
	new ResizeObserver(() => {
		resize();
		if (!running) draw((performance.now() - t0) / 1000);
	}).observe(canvas);

	if (finePointer) {
		window.addEventListener(
			"pointermove",
			(e) => {
				const r = canvas.getBoundingClientRect();
				mouse.tx = e.clientX - r.left;
				mouse.ty = e.clientY - r.top;
				mouse.tlight = 1;
			},
			{ passive: true },
		);
		document.documentElement.addEventListener("pointerleave", () => (mouse.tlight = 0));
	}

	resize();

	return {
		state,
		setOrigin(x, y) {
			origin.x = x;
			origin.y = y;
			if (!mouse.x && !mouse.y) {
				mouse.x = mouse.tx = x;
				mouse.y = mouse.ty = y;
			}
		},
		start() {
			wanted = true;
			play();
		},
		still() {
			wanted = false;
			pause();
			mouse.light = 0;
			draw(0);
		},
	};
}
