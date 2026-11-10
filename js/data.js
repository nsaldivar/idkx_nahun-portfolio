export const profile = {
  name: "Nahun Saldivar",
  domain: "nsaldivarvercelapp.vercel.app",           
  email: "nahun987654321@gmail.com",
  github: "https://github.com/nsaldivar",
  linkedin: "https://www.linkedin.com/in/nahunsaldivar/",
  timezone: "America/Lima",
};

const C = { py: "#3b82f6", js: "#facc15", html: "#f97316", css: "#38bdf8", git: "#f05133", sql: "#22d3ee", node: "#84cc16", docker: "#2496ed", java: "#ef4444", gen: "#a78bfa" };
export const tech = (name, c = "gen") => ({ name, c: C[c] });

export const heroStack = [tech("Python", "py"), tech("SQL Server", "sql"), tech("JavaScript", "js"), tech("Power BI"), tech("Git", "git"), tech("HTML/CSS", "html")];

export const projects = [
  {
    id: "agendamiento",
    es: { feat: "Plataforma web de citas y orientación ciudadana: reserva de turnos sin cruces, directorio de agencias y paneles por rol. Next.js, TypeScript y Supabase.", tag: "Web · Full stack", title: "Agendamiento de citas · Banco de la Nación", desc: "Proyecto académico de Taller de Proyectos 2: plataforma web para agendar citas y orientar a ciudadanos en trámites bancarios. Incluye catálogo de trámites y requisitos, directorio de agencias, reserva de turnos sin cruces y paneles por rol (cliente, ventanilla, admin de agencia y admin general). Arquitectura por capas con Supabase y PostgreSQL." },
    en: { feat: "Web platform for appointments and citizen guidance: conflict-free slot booking, branch directory and role-based dashboards. Next.js, TypeScript and Supabase.", tag: "Web · Full stack", title: "Appointment Scheduling · Banco de la Nación", desc: "Academic project for Taller de Proyectos 2: a web platform to book appointments and guide citizens through banking procedures. Includes a procedure and requirements catalog, branch directory, conflict-free slot booking and role-based dashboards (client, teller, branch admin and general admin). Layered architecture with Supabase and PostgreSQL." },
    image: "img/agendamiento-portada.png",
    stack: [tech("Next.js"), tech("TypeScript"), tech("Tailwind CSS", "css"), tech("Supabase"), tech("PostgreSQL", "sql"), tech("Vercel")],
    href: "https://agendamiento-citas-banco-nacion.vercel.app",
    repo: "https://github.com/nsaldivar/agendamiento-citas-banco-nacion",
  },
  {
    id: "unifood",
    es: { tag: "Web · Microservicios", title: "UniFood", desc: "Sistema web de reserva anticipada de menús universitarios, del curso de Cloud Computing. Desarrollé el microservicio de validación universitaria con API REST y SQLite." },
    en: { tag: "Web · Microservices", title: "UniFood", desc: "Web system for pre-booking university lunch menus, built for the Cloud Computing course. I developed the university validation microservice with a REST API and SQLite." },
    stack: [tech("Node.js", "node"), tech("SQLite"), tech("API REST"), tech("Microservicios")],
    href: "https://github.com/nsaldivar/UniFood_Microservicios",
  },
  {
    id: "monolito-microservicios",
    es: { tag: "Arquitectura · CI/CD", title: "Monolito vs microservicios", desc: "Repositorio con una versión monolítica y otra con microservicios, flujos de CI/CD con GitHub Actions y evidencias del trabajo." },
    en: { tag: "Architecture · CI/CD", title: "Monolith vs microservices", desc: "Repository with a monolithic version and a microservices version, CI/CD workflows with GitHub Actions and documented evidence." },
    stack: [tech("Microservicios"), tech("GitHub Actions"), tech("Git", "git")],
    href: "https://github.com/nsaldivar/proyecto-monolito-microservicios",
  },
  {
    id: "service-desk",
    es: { tag: "Web · Gestión de TI", title: "Service Desk de TI (PA3)", desc: "" },
    en: { tag: "Web · IT management", title: "IT Service Desk (PA3)", desc: "" },
    stack: [tech("HTML", "html")],
    href: "https://github.com/nsaldivar/PA3_Service-desk_TI",
  },
  {
    id: "gestion-ti",
    es: { tag: "Web · Gestión de TI", title: "Gestión de TI (PA1)", desc: "" },
    en: { tag: "Web · IT management", title: "IT Management (PA1)", desc: "" },
    stack: [tech("HTML", "html")],
    href: "https://github.com/nsaldivar/PA1_GESTION_TI",
  },
  {
    id: "laboratorio-web",
    es: { tag: "Web · Laboratorio", title: "Laboratorio web", desc: "" },
    en: { tag: "Web · Lab", title: "Web lab", desc: "" },
    stack: [tech("HTML", "html")],
    href: "https://github.com/nsaldivar/laboratorio-web",
  },
  {
    id: "algebra-relacional",
    es: { tag: "Bases de datos", title: "Álgebra relacional", desc: "" },
    en: { tag: "Databases", title: "Relational algebra", desc: "" },
    stack: [],
    href: "https://github.com/nsaldivar/Algebra_Relacional",
  },
];

export const experience = [
  {
    now: true,
    es: { role: "Apoyo en Matrículas y Gestión Académica", org: "Universidad Continental · Registros Académicos", when: "2026-20 · Actualidad",
      bullets: ["Apoyé el proceso de matrículas 2026-20: verificación y registro de información académica.", "Gestioné actas académicas, asegurando su registro oportuno y la consistencia de los datos.", "Usé sistemas CRM para el seguimiento y atención de solicitudes y consultas de estudiantes."] },
    en: { role: "Enrollment & Academic Management Support", org: "Universidad Continental · Academic Records", when: "2026-20 · Present",
      bullets: ["Supported the 2026-20 enrollment process: verification and recording of academic information.", "Managed academic grade records, ensuring timely registration and data consistency.", "Used CRM systems to track and answer student requests and inquiries."] },
    stack: [tech("CRM"), tech("Agilize"), tech("Excel")],
  },
  {
    now: false,
    es: { role: "Apoyo Administrativo", org: "Municipalidad Distrital de Vilcabamba", when: "Ago – Sep 2024",
      bullets: ["Reduje 30 % el tiempo de búsqueda de expedientes al reorganizar el foliado de más de 1,500 archivos.", "Digitalicé y catalogué más de 500 documentos clave, reduciendo errores administrativos en 40 %.", "Automaticé el registro y seguimiento documental, disminuyendo 35 % la carga manual y cumpliendo la normativa municipal."] },
    en: { role: "Administrative Support", org: "Municipalidad Distrital de Vilcabamba", when: "Aug – Sep 2024",
      bullets: ["Cut file search time by 30% by reorganizing the numbering of 1,500+ records.", "Digitized and cataloged 500+ key documents, reducing administrative errors by 40%.", "Automated document registration and tracking, reducing manual workload by 35% while meeting municipal regulations."] },
    stack: [tech("Digitalización"), tech("Excel"), tech("Gestión documental")],
  },
  {
    now: false,
    es: { role: "Apoyo de Soporte Técnico", org: "Municipalidad Distrital de Vilcabamba", when: "Feb – Mar 2024",
      bullets: ["Apoyé la configuración de equipos, con una mejora estimada del 20 % en el rendimiento del sistema.", "Contribuí a reducir 25 % los tiempos de inactividad de red mediante diagnóstico básico de conectividad.", "Orienté a más de 10 empleados sobre mantenimiento preventivo, reduciendo fallos recurrentes en 15 %."] },
    en: { role: "Technical Support", org: "Municipalidad Distrital de Vilcabamba", when: "Feb – Mar 2024",
      bullets: ["Helped configure equipment, with an estimated 20% system performance improvement.", "Helped cut network downtime by 25% through basic connectivity diagnostics.", "Trained 10+ employees on preventive maintenance, reducing recurring failures by 15%."] },
    stack: [tech("Redes"), tech("Hardware"), tech("Soporte")],
  },
];

export const skills = [
  { es: "Lenguajes", en: "Languages", items: [["Python", 3, "py"], ["SQL", 3, "sql"], ["JavaScript", 2, "js"], ["C#", 2], ["Java", 2, "java"]] },
  { es: "Bases de datos", en: "Databases", items: [["SQL Server", 2, "sql"], ["MySQL", 2], ["Modelado", 2], ["Optimización de consultas", 2]] },
  { es: "Web y herramientas", en: "Web & tools", items: [["HTML", 3, "html"], ["CSS", 3, "css"], ["VS Code", 3], ["Git / GitHub", 3, "git"], ["Power BI", 2], ["Excel", 3], ["ERPs", 2], ["CRMs", 2]] },
  { es: "Metodologías", en: "Methodologies", items: [["Scrum", 2], ["BPMN", 2], ["UML", 2], ["Análisis y diseño de sistemas", 2]] },
  { es: "Competencias", en: "Core skills", items: [["Análisis de requerimientos", 3], ["Resolución de incidencias", 3], ["Trabajo en equipo", 3], ["Pensamiento crítico", 3], ["Digitalización documental", 2]] },
  { es: "Idiomas", en: "Languages (spoken)", items: [["Español · fluido", 3], ["Inglés · intermedio", 2], ["Quechua · intermedio", 2]] },
];

export const certs = [
  { es: { title: "Power BI", org: "Universidad Continental", when: "Ene 2025 · Abr–Jul 2024", desc: "Introducción a Power BI y Taller de Preparación para Certificación en Power BI." },
    en: { title: "Power BI", org: "Universidad Continental", when: "Jan 2025 · Apr–Jul 2024", desc: "Introduction to Power BI and Power BI Certification Preparation Workshop." } },
  { es: { title: "Agilidad, UX y desarrollo personal", org: "Universidad Continental", when: "Mar – Nov 2025", desc: "Gestión de Proyectos con Metodologías Ágiles y Enfoques Lean; Diseño de Experiencia de Usuario (UX) para Negocios; Desarrollo Personal y Autoliderazgo." },
    en: { title: "Agile, UX & personal development", org: "Universidad Continental", when: "Mar – Nov 2025", desc: "Project Management with Agile Methodologies and Lean Approaches; UX Design for Business; Personal Development and Self-leadership." } },
  { es: { title: "IV Congreso Internacional de Ingeniería: Industria 4.0", org: "Universidad Continental", when: "Nov 2023", desc: "Talleres de Gestión Ágil e Híbrida de Proyectos y de Prompt Engineering." },
    en: { title: "4th International Engineering Congress: Industry 4.0", org: "Universidad Continental", when: "Nov 2023", desc: "Workshops on Agile and Hybrid Project Management and Prompt Engineering." } },
  { es: { title: "Capacitaciones municipales", org: "Municipalidad Distrital de Vilcabamba", when: "2018", desc: "Transferencia de la Gestión Administrativa de los Gobiernos Locales; Computación, Ofimática y Diseño Gráfico; Políticas de Juventud." },
    en: { title: "Municipal training", org: "Municipalidad Distrital de Vilcabamba", when: "2018", desc: "Transfer of Administrative Management of Local Governments; Computing, Office Software and Graphic Design; Youth Policies." } },
];

export const education = [
  {
    es: { title: "Ingeniería de Sistemas e Informática", org: "Universidad Continental", progress: "10.º ciclo · 2022 – 2026", courses: ["Análisis y diseño de sistemas", "Bases de datos (SQL Server, MySQL)", "Cloud Computing", "Taller de Proyectos 2", "Gestión de la calidad por procesos"] },
    en: { title: "Systems & Computer Engineering", org: "Universidad Continental", progress: "10th cycle · 2022 – 2026", courses: ["Systems analysis and design", "Databases (SQL Server, MySQL)", "Cloud Computing", "Project Workshop 2", "Process quality management"] },
    pct: 95,
  },
];

export const i18n = {
  es: {
    skip: "Saltar al contenido", introHello: "Bienvenido a mi", skipIntro: "Saltar intro",
    "nav.home": "Inicio", "nav.about": "Sobre mí", "nav.projects": "Proyectos", "nav.experience": "Experiencia", "nav.contact": "Contacto",
    "hero.available": "Disponible para nuevas oportunidades",
    "hero.role": "Ingeniería de Sistemas e Informática",
    "hero.lead": "Construyo aplicaciones web y servicios, <b>del modelo de datos a la interfaz</b>: código ordenado, interfaces cuidadas y despliegues que se pueden mantener.",
    "hero.projects": "Ver proyectos", "hero.cv": "Descargar CV", "hero.copyEmail": "Copiar email", "hero.copied": "¡Copiado!",
    "hero.featured": "Proyecto destacado", "hero.case": "Ver demo en vivo", "hero.stack": "Stack principal",
    "hero.degree": "Ingeniería de Sistemas e Informática", "hero.degreeStatus": "En curso · Universidad Continental",
    "hero.localTime": "Mi hora local", "hero.location": "Cusco · Perú · remoto o híbrido", "hero.scroll": "Desliza",
    "about.eyebrow": "Sobre mí",
    "about.title": "Detrás de cada sistema, <em>una idea clara.</em>",
    "about.link": "Hablemos <svg viewBox='0 0 24 24' width='1em' height='1em'><path d='M5 12h14M13 6l6 6-6 6'/></svg>",
    "about.p1": "Soy estudiante de Ingeniería de Sistemas e Informática. Me gusta construir productos completos: entender el problema, diseñar los datos, escribir el servicio y cuidar cada detalle de la interfaz.",
    "about.p2": "Tengo formación en análisis de sistemas y <b>bases de datos (SQL Server, MySQL)</b>, y programo en <b>Python, SQL y JavaScript</b>. También uso <b>Power BI</b> y he trabajado en proyectos grupales con <b>microservicios</b>.",
    "about.p3": "Tengo experiencia en <b>optimización de procesos, automatización y gestión documental</b> en el sector público y universitario. Busco unirme a un equipo que construya productos reales.",
    "about.cards": [
      ["De punta a punta", "Base de datos, API, interfaz y despliegue: entiendo cómo encaja cada capa."],
      ["Calidad que se cuida", "Código legible, pruebas y buenas prácticas forman parte del trabajo, no un extra."],
      ["Curiosidad constante", "Aprendo en cada proyecto: nube, microservicios y gráficos 3D en la web."],
    ],
    "projects.eyebrow": "Proyectos", "projects.title": "Lo que he <em>construido.</em>", "projects.go": "Ver proyecto", "projects.demo": "Ver demo", "projects.code": "Ver código",
    "exp.eyebrow": "Experiencia", "exp.title": "Dónde he <em>trabajado.</em>",
    "skills.eyebrow": "Habilidades", "skills.title": "Con qué <em>trabajo.</em>", "skills.daily": "Uso a diario", "skills.exp": "Con experiencia", "skills.learning": "Aprendiendo",
    "edu.eyebrow": "Educación", "edu.title": "Dónde <em>estudio.</em>", "cert.eyebrow": "Certificaciones", "cert.title": "Lo que he <em>aprendido.</em>",
    "contact.eyebrow": "Contacto", "contact.title": "¿Hablamos?", "contact.text": "Escríbeme y te respondo en menos de 24 horas.", "contact.copy": "clic para copiar",
    "contact.name": "Nombre", "contact.email": "Email", "contact.msg": "Mensaje", "contact.send": "Enviar mensaje", "contact.ok": "Se abrirá tu app de correo para enviar el mensaje.",
    "footer.tag": "Estudiante de Ingeniería de Sistemas. Este sitio está hecho con HTML, CSS, JavaScript y un robot 3D en Three.js.",
    "footer.nav": "Navegación", "footer.social": "Social", "footer.rights": "Todos los derechos reservados.",
  },
  en: {
    skip: "Skip to content", introHello: "Welcome to my", skipIntro: "Skip intro",
    "nav.home": "Home", "nav.about": "About", "nav.projects": "Projects", "nav.experience": "Experience", "nav.contact": "Contact",
    "hero.available": "Available for new opportunities",
    "hero.role": "Systems & Computer Engineering",
    "hero.lead": "I build web apps and services, <b>from the data model to the interface</b>: clean code, polished interfaces and maintainable deployments.",
    "hero.projects": "View projects", "hero.cv": "Download CV", "hero.copyEmail": "Copy email", "hero.copied": "Copied!",
    "hero.featured": "Featured project", "hero.case": "View live demo", "hero.stack": "Main stack",
    "hero.degree": "Systems & Computer Engineering", "hero.degreeStatus": "In progress · Universidad Continental",
    "hero.localTime": "My local time", "hero.location": "Cusco · Peru · remote or hybrid", "hero.scroll": "Scroll",
    "about.eyebrow": "About me",
    "about.title": "Engineering and product, <em>in the same place.</em>",
    "about.link": "Let's talk <svg viewBox='0 0 24 24' width='1em' height='1em'><path d='M5 12h14M13 6l6 6-6 6'/></svg>",
    "about.p1": "I'm a Systems & Computer Engineering student in Cusco (Peru). I like building complete products: understanding the problem, designing the data, writing the service and caring for every interface detail.",
    "about.p2": "I have a background in systems analysis and <b>databases (SQL Server, MySQL)</b>, and code in <b>Python, SQL and JavaScript</b>. I also use <b>Power BI</b> and have worked on group <b>microservices</b> projects.",
    "about.p3": "I have experience in <b>process optimization, automation and document management</b> in the public and university sectors. I'm looking to join a team building real products.",
    "about.cards": [
      ["End to end", "Database, API, interface and deployment: I understand how each layer fits."],
      ["Quality matters", "Readable code, tests and good practices are part of the work, not an extra."],
      ["Constant curiosity", "I learn on every project: cloud, microservices and 3D graphics on the web."],
    ],
    "projects.eyebrow": "Projects", "projects.title": "What I've <em>built.</em>", "projects.go": "View project", "projects.demo": "View demo", "projects.code": "View code",
    "exp.eyebrow": "Experience", "exp.title": "Where I've <em>worked.</em>",
    "skills.eyebrow": "Skills", "skills.title": "What I <em>work with.</em>", "skills.daily": "Daily use", "skills.exp": "Experienced", "skills.learning": "Learning",
    "edu.eyebrow": "Education", "edu.title": "Where I <em>study.</em>", "cert.eyebrow": "Certifications", "cert.title": "What I've <em>learned.</em>",
    "contact.eyebrow": "Contact", "contact.title": "Let's talk?", "contact.text": "Write to me and I'll reply within 24 hours.", "contact.copy": "click to copy",
    "contact.name": "Name", "contact.email": "Email", "contact.msg": "Message", "contact.send": "Send message", "contact.ok": "Your email app will open to send the message.",
    "footer.tag": "Systems Engineering student. This site is built with HTML, CSS, JavaScript and a 3D robot in Three.js.",
    "footer.nav": "Navigation", "footer.social": "Social", "footer.rights": "All rights reserved.",
  },
};