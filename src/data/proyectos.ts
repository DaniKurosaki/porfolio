/** Los proyectos, en el orden en que se cuentan. Las capturas están en public/projects (1200×675). */
export interface Proyecto {
	nombre: string;
	rol: string;
	fechas: string;
	descripcion: string;
	link: string;
	linkTexto: string;
	imagen: string;
	alt: string;
	tags: string[];
	/** Una cifra que cuenta la escala del proyecto, si la hay. */
	cifra?: { valor: number; sufijo: string; texto: string };
}

export const PROYECTOS: Proyecto[] = [
	{
		nombre: "Fivemon",
		rol: "Co-Founder · Lead Frontend Developer & System Designer",
		fechas: "Febrero 2023 — Actualidad",
		descripcion:
			"Modificación multijugador online del juego Grand Theft Auto V inspirada en Pokémon, en un entorno 3D de mundo abierto. Usando Angular y Lua.",
		link: "https://fivemon-ui.vercel.app/main",
		linkTexto: "UI Demo",
		imagen: "/projects/pokemon_rp.png",
		alt: "Interfaz de Fivemon dentro del juego",
		tags: ["Angular", "SCSS", "TypeScript", "Lua"],
	},
	{
		nombre: "AmpeterShop",
		rol: "Lead Frontend Developer",
		fechas: "Septiembre — Octubre 2023",
		descripcion:
			"Tienda online con moneda autogenerada a través de una integración con la plataforma de streaming Kick, para Ampeterby7.",
		link: "https://ampetershop.com",
		linkTexto: "Ver web",
		imagen: "/projects/ampeter_shop.png",
		alt: "Portada de la tienda AmpeterShop",
		tags: ["Angular", "SCSS", "TypeScript", "MongoDB"],
		cifra: { valor: 10, sufijo: "M", texto: "seguidores entre sus plataformas" },
	},
	{
		nombre: "MateoZShop",
		rol: "Frontend Developer",
		fechas: "Diciembre 2023 — Febrero 2024",
		descripcion:
			"Tienda online con moneda autogenerada jugando un mapa personalizado en Fortnite, para MateoZ.",
		link: "https://mateozshop.com",
		linkTexto: "Ver web",
		imagen: "/projects/mateoz_shop.png",
		alt: "Portada de la tienda MateoZShop",
		tags: ["Vue", "TypeScript", "MongoDB"],
		cifra: { valor: 1, sufijo: "M+", texto: "seguidores de media entre sus plataformas" },
	},
	{
		nombre: "Heroes Service",
		rol: "Fullstack Developer",
		fechas: "Junio 2024",
		descripcion:
			"Pequeña aplicación donde se pueden gestionar los héroes de una base de datos. Implantación de medidas de integración continua y despliegue a través de Vercel.",
		link: "https://pokemonrp.com",
		linkTexto: "Preview",
		imagen: "/projects/heroes_service.png",
		alt: "Panel de gestión de héroes de Heroes Service",
		tags: ["Angular", "TypeScript", "Express", "MongoDB"],
	},
];
