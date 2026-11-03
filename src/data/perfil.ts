/** Datos de contacto y de cabecera: lo que aparece en varias partes de la página. */
export const PERFIL = {
	nombre: "Daniel Castillo Tamayo",
	nombreCorto: "Daniel Castillo",
	iniciales: "DC",
	rol: "Ingeniero de software · Frontend",
	email: "soy.daniel.castillo.tamayo@gmail.com",
	linkedin: "https://www.linkedin.com/in/daniel-castillo-tamayo/",
	disponible: "Disponible para trabajar",
	/** Año de las primeras prácticas: el arranque de la línea de tiempo. */
	desde: 2019,
} as const;

/** Los capítulos de la historia, en orden. Los usan la cabecera, la espina de circuito y las etiquetas. */
export const CAPITULOS = [
	{ id: "manifiesto", indice: "01", nombre: "Manifiesto", enNav: false, nav: "Manifiesto" },
	{ id: "sobre-mi", indice: "02", nombre: "Origen", enNav: true, nav: "Sobre mí" },
	{ id: "experiencia", indice: "03", nombre: "Trayectoria", enNav: true, nav: "Experiencia" },
	{ id: "proyectos", indice: "04", nombre: "Proyectos", enNav: true, nav: "Proyectos" },
	{ id: "contacto", indice: "05", nombre: "Contacto", enNav: true, nav: "Contacto" },
] as const;
