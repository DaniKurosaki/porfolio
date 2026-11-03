/**
 * La trayectoria, de la más antigua a la actual: la pista horizontal la recorre en ese
 * orden. Para añadir un puesto, se añade al final y se quita `actual` del anterior.
 */
export interface Puesto {
	/** El año grande del panel. */
	anio: string;
	fechas: string;
	puesto: string;
	empresa: string;
	descripcion: string;
	actual?: boolean;
	link?: string;
}

export const EXPERIENCIA: Puesto[] = [
	{
		anio: "2019",
		fechas: "Julio — Agosto 2019",
		puesto: "Desarrollador Full Stack en prácticas",
		empresa: "Conwork S.L.",
		descripcion: "Responsable del mantenimiento y actualización de una plataforma PHP para empresas de transporte de mercancías.",
	},
	{
		anio: "2020",
		fechas: "Enero — Marzo 2020",
		puesto: "Instructor de cursos en prácticas",
		empresa: "NeoLand",
		descripcion: "Impartición de un curso de JavaScript ES6 a seis empleados de Telefónica S.L.",
	},
	{
		anio: "2021",
		fechas: "Octubre 2021 — Julio 2024",
		puesto: "Desarrollador Frontend",
		empresa: "Capgemini S.A.",
		descripcion: "Mejora y desarrollo de proyectos Angular para los ministerios franceses de sanidad y trabajo.",
	},
	{
		anio: "2024",
		fechas: "Julio 2024 — Actualidad",
		puesto: "Desarrollador Full Stack",
		empresa: "Tich Consulting",
		descripcion: "Mejora y desarrollo de proyectos Angular y Express con TypeScript para la empresa tecnológica de la aseguradora ASISA.",
		actual: true,
	},
];
