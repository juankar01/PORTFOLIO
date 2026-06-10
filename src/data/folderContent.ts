import type { FolderContent, FolderId } from "../types/portfolio";

export const folderContent: Record<FolderId, FolderContent> = {
  profile: {
    title: "Perfil",
    subtitle: "About me",
    description:
      "Soy estudiante de Análisis y Desarrollo de Software, con bases en desarrollo web frontend y backend. Me interesa crear soluciones funcionales, bien organizadas y fáciles de usar, combinando diseño de interfaces, lógica de programación y conexión con bases de datos.",
    items: [
      "Me interesa el frontend, el diseño de interfaces y la experiencia de usuario",
      "Disfruto entender la lógica detrás de cada funcionalidad",
      "Me gusta trabajar de forma organizada, colaborativa y con disposición para aprender",
    ],
  },

  skills: {
    title: "Habilidades",
    subtitle: "Toolkit",
    description:
      "Tecnologías y herramientas que uso para construir proyectos web, desde la estructura visual hasta la lógica, la integración de datos y la organización del código.",
    items: [
      "Frontend: HTML, CSS, JavaScript, React, vite, tailwindcss",
      "Backend: Node.js, Express",
      "Base de datos: SQL, MongoDB, mongoose",
      "Herramientas: Git, GitHub",
      "Aprendiendo/mejorando en nuevos lenguajes y frameworks",
    ],
  },

  projects: {
    title: "Proyectos",
    subtitle: "Work Folder",
    description:
      "Algunos proyectos donde he trabajado interfaces, rutas, conexión con backend e integración de funcionalidades.",
    items: [],
    projects: [
      {
        title: "UVOL — Red social de voluntariado",
        description:
          "Aplicación web enfocada en conectar personas con oportunidades de voluntariado.",
        technologies: ["React", "Node.js", "Express", "MongoDB"],
        role: "Lideré el proyecto formativo, coordinando tareas e integración de módulos. Desarrollé funcionalidades frontend y backend en perfil y mensajería.",
        url: "https://uvol-project-sena.vercel.app/login",
        actionLabel: "Abrir proyecto",
      },
      {
        title: "UVOL Landing",
        description:
          "Página de presentación para explicar la idea principal del proyecto UVOL.",
        technologies: ["React", "Vite", "Tailwind CSS"],
        role: "Maquetación, diseño visual y responsive",
        url: "https://uvol-landing.vercel.app/",
        actionLabel: "Abrir landing",
      },
    ],
  },

  contact: {
    title: "Contacto",
    subtitle: "Contact File",
    description: "Datos principales de contacto y hoja de vida.",
    items: [
      "Correo: juanjoseotalvaro283@gmail.com",
      "GitHub: pendiente",
      "LinkedIn: pendiente",
    ],
    links: [
      {
        label: "Descargar hoja de vida",
        url: "/cv-juan-jose-otalvaro.pdf",
        download: "cv-juan-jose-otalvaro.pdf",
      },
    ],
  },
};
