import type { FolderContent, FolderId } from "../types/portfolio";

export const folderContent: Record<FolderId, FolderContent> = {
  profile: {
    title: "Perfil",
    subtitle: "About me",
    description:
      "Me gusta crear proyectos que combinen buen diseño, lógica y funcionalidad. Disfruto construir interfaces claras, entender cómo funciona cada parte por detrás y organizar el código para que el resultado sea fácil de usar, mantener y mejorar.",
    items: [
      "Me gusta el diseño limpio y las interfaces fáciles de usar",
      "Disfruto entender la lógica detrás de cada funcionalidad",
      "Trabajo con frontend, backend y bases de datos",
      "Cuido la organización del código y los detalles del proyecto",
    ],
  },

  skills: {
    title: "Habilidades",
    subtitle: "Toolkit",
    description:
      "Tecnologías y herramientas que uso para construir proyectos web, desde la estructura visual hasta la lógica, la integración de datos y la organización del código.",
    items: [
      "Frontend: HTML, CSS, JavaScript, React",
      "Backend: Node.js, Express",
      "Base de datos: SQL, MongoDB",
      "Herramientas: Git, GitHub, VS Code, Postman",
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
        role: "Trabajé en la estructura visual, presentación del contenido, diseño responsive y publicación del sitio.",
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
    description: "Datos principales de contacto y hoja de vida actualizada.",
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
