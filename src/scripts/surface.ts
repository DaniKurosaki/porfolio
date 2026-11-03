/**
 * ¿Es claro el fondo que hay en este punto de la pantalla? Lo usan la cabecera y la
 * espina para pasar a tinta sobre los capítulos de papel (y sobre la cinta amarilla),
 * incluso mientras un fondo se anima. Se saltan las piezas fijas y lo transparente.
 */
export function isLightAt(x: number, y: number) {
	for (const el of document.elementsFromPoint(x, y)) {
		if (el.closest("[data-header], [data-spine], .cursor")) continue;
		const channels = getComputedStyle(el).backgroundColor.match(/[\d.]+/g);
		if (!channels) continue;
		const [r, g, b, a = 1] = channels.map(Number);
		if (a < 0.5) continue;
		return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255 > 0.55;
	}
	return false;
}
