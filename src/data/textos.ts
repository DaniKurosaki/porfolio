/**
 * Los textos de cada capítulo. Las secciones no escriben copy propio: todo sale de aquí.
 * En los titulares, `acento` es la palabra que va en Instrument Serif cursiva y amarillo.
 */
export const TEXTOS = {
	meta: {
		titulo: "Daniel Castillo Tamayo — Ingeniero de software frontend",
		descripcion:
			"Portfolio de Daniel Castillo Tamayo, ingeniero de software especializado en frontend: de los circuitos de la infancia a interfaces en Angular para ministerios, aseguradoras, distribución y startups.",
	},

	hero: {
		etiqueta: "Portfolio",
		lineas: ["Daniel", "Castillo"],
		intro:
			"Ingeniero de software especializado en frontend. Entrego código de calidad en Angular para administraciones públicas, aseguradoras, distribución y startups, siguiendo los estándares web actuales.",
		scroll: "Desliza",
		lema: "Del circuito al código",
		stack: "Angular · TypeScript · Express",
	},

	manifiesto: {
		frase:
			"Del primer circuito a la última interfaz, el oficio es el mismo: entender cómo funciona algo por dentro para que, por fuera, parezca sencillo.",
		parrafo:
			"Soy Daniel Castillo Tamayo, licenciado en Ingeniería Multimedia y apasionado por la tecnología. Llevo más de cinco años construyendo aplicaciones web para ministerios, aseguradoras y startups.",
		fotoAlt: "Daniel Castillo Tamayo",
	},

	origen: {
		titulo: { antes: "Del circuito", acento: "al código" },
		pasos: [
			{
				clave: "10 años",
				titulo: "Todo empezó con mi padre",
				texto:
					"A los diez años me introdujo en el fascinante mundo de la electrónica. Aquellos primeros circuitos me dieron las habilidades técnicas que me acompañan desde entonces.",
			},
			{
				clave: "Ingeniería Multimedia",
				titulo: "Cambié el cobre por componentes",
				texto:
					"En la carrera las pistas de cobre se convirtieron en componentes, estados y eventos. Otro material, la misma lógica: señales que entran, se transforman y salen.",
			},
			{
				clave: "Hoy",
				titulo: "Interfaces que funcionan",
				texto:
					"Hoy desarrollo y mantengo aplicaciones web en Angular y TypeScript, rápidas, accesibles y fáciles de mantener, y contribuyo a crear soluciones innovadoras y eficientes.",
			},
		],
		esquemaAlt: "Esquema de un circuito sencillo: una pila, resistencias, un chip y un led",
		/** Lo que aparece en el editor cuando el circuito se convierte en código. */
		codigo: [
			"@Component({",
			"  selector: 'app-circuito',",
			"  template: `<led [on]=\"encendido()\" />`,",
			"})",
			"export class Circuito {",
			"  encendido = signal(false);",
			"  conectar() {",
			"    this.encendido.set(true);",
			"  }",
			"}",
		],
	},

	trayectoria: {
		titulo: { antes: "De las prácticas", acento: "a los ministerios" },
		intro: "Cada etapa, una pieza más del circuito. Desliza para recorrerlo.",
		actual: "Actualidad",
	},

	stack: {
		etiqueta: "Con lo que trabajo",
		items: ["Angular", "TypeScript", "JavaScript", "Vue", "SCSS", "Express", "MongoDB", "Lua", "PHP"],
	},

	proyectos: {
		titulo: { antes: "Lo que he", acento: "construido" },
		intro:
			"En mis proyectos personales he colaborado con creadores como AmpeterBy7 y MateoZ, lo que me ha permitido explorar nuevas tecnologías y seguir creciendo como profesional.",
		cursor: "Ver",
	},

	contacto: {
		titulo: { antes: "¿Construimos algo", acento: "juntos?" },
		texto: "Estoy disponible para nuevos proyectos y oportunidades. Escríbeme y hablamos.",
		boton: "Escríbeme",
		linkedin: "LinkedIn",
		email: "Correo",
	},

	pie: {
		derechos: "Todos los derechos reservados.",
		arriba: "Volver arriba",
	},
} as const;
