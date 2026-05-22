import type { FolderContent, FolderId } from "../types/portfolio";

export const folderContent: Record<FolderId, FolderContent> = {
  profile: {
    title: "Perfil",
    subtitle: "About this Student",
    description:
      "Soy estudiante de Análisis y Desarrollo de Software, con interés en el desarrollo web, las interfaces limpias y la construcción de soluciones digitales útiles.",
    items: [
      "Enfoque: Desarrollo web",
      "Estado: Buscando etapa práctica",
      "Interés: Frontend, UI y proyectos reales",
    ],
  },

  skills: {
    title: "Habilidades",
    subtitle: "Toolkit",
    description:
      "Tecnologías y herramientas que uso actualmente en mi proceso de formación.",
    items: [
      "Frontend: HTML, CSS, JavaScript, React",
      "Backend: Node.js, Express, MongoDB",
      "Herramientas: Git, GitHub, VS Code, Postman",
      "Aprendiendo: TypeScript, buenas prácticas y responsive design",
    ],
  },

  projects: {
    title: "Proyectos",
    subtitle: "Work Folder",
    description:
      "Proyectos académicos y prácticos donde he aplicado desarrollo web, organización de componentes e integración de funcionalidades.",
    items: [
      "UVOL — Red social de voluntariado",
      "Landing page responsive",
      "CRUD con frontend y backend",
    ],
  },

  contact: {
    title: "Contacto",
    subtitle: "Contact File",
    description:
      "Estoy disponible para realizar mi etapa práctica y abierto a oportunidades donde pueda aprender, aportar y crecer.",
    items: [
      "Correo: juanjoseotalvaro283@gmail.com",
      "GitHub: ",
      "LinkedIn: ",
      "CV: ",
    ],
  },
};