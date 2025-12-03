import React, { useEffect, useState } from 'react';

function App() {
  const [projects, setProjects] = useState([]);

  // Cargar proyectos desde el backend
  useEffect(() => {
    fetch('https://hojadevida-ko6m.onrender.com/api/projects')
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error('Error cargando proyectos', err));
  }, []);


  // Scroll suave a secciones
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Animaciones al hacer scroll (secciones + proyectos)
  useEffect(() => {
    const animatedElements = document.querySelectorAll('.animate-on-scroll, .project-card');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    animatedElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [projects]);

  // Botón "volver arriba"
  useEffect(() => {
    const btn = document.getElementById('toTopBtn');
    const onScroll = () => {
      if (window.scrollY > 400) {
        btn?.classList.add('show');
      } else {
        btn?.classList.remove('show');
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* NAVBAR SUPERIOR */}
      <header className="topbar">
        <div className="topbar-inner">
          <div className="topbar-logo">
            <span className="logo-dot" />
            <span className="logo-text">
              LM<span>Dev</span>
            </span>
          </div>
          <nav className="topbar-nav">
            <button className="nav-btn active" onClick={() => scrollToSection('summary')}>
              Resumen
            </button>
            <button className="nav-btn" onClick={() => scrollToSection('experience')}>
              Experiencia
            </button>
            <button className="nav-btn" onClick={() => scrollToSection('projects')}>
              Proyectos
            </button>
            <button className="nav-btn" onClick={() => scrollToSection('education')}>
              Educación
            </button>
            <button className="nav-btn" onClick={() => scrollToSection('skills')}>
              Habilidades
            </button>
          </nav>
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main className="page">
        <div className="container fade-in">
          {/* HERO */}
          <section className="hero">
            <div className="hero-main">
              <img src="foto.png" alt="Foto de perfil de Luis Mateo Muñoz" className="hero-avatar" />
              <div>
                <p className="hero-tag">Desarrollo de Software · Frontend</p>
                <h1 className="hero-name">Luis Mateo Muñoz Jaramillo</h1>
                <p className="hero-role">
                  Tecnólogo en Desarrollo de Software (en formación) | Desarrollador Web
                </p>
                <div className="hero-chips">
                  <span>React</span>
                  <span>Angular</span>
                  <span>JavaScript</span>
                  <span>Trabajo en equipo</span>
                </div>
              </div>
            </div>

            <div className="hero-contact">
              <p>
                <strong>Email</strong>
                <br />
                <a href="mailto:luis.mateo.munoz@correounivalle.edu.co">
                  luis.mateo.munoz@correounivalle.edu.co
                </a>
              </p>
              <p>
                <strong>Teléfono</strong>
                <br />
                +57 323 476 4589
              </p>
              <p>
                <strong>LinkedIn</strong>
                <br />
                <a
                  href="https://www.linkedin.com/in/luis-mateo-mu%C3%B1oz-jaramillo-684b8a381"
                  target="_blank"
                  rel="noreferrer"
                >
                  /in/luis-mateo-muñoz-jaramillo-684b8a381
                </a>
              </p>
              <p>
                <strong>GitHub</strong>
                <br />
                <a href="https://github.com/Teo204" target="_blank" rel="noreferrer">
                  github.com/Teo204
                </a>
              </p>
            </div>
          </section>

          {/* RESUMEN */}
          <section id="summary" className="section animate-on-scroll">
            <h2>Resumen Profesional</h2>
            <p>
              Estudiante de Tecnología en Desarrollo de Software en la Universidad del Valle, con interés en el
              desarrollo frontend y la construcción de aplicaciones web funcionales y mantenibles. Cuento con
              experiencia académica en <strong>HTML, CSS, JavaScript, Angular y React</strong>, así como en el uso
              de <strong>Git y GitHub</strong> para el control de versiones. Me caracterizo por el trabajo
              colaborativo, la responsabilidad y una actitud constante de aprendizaje.
            </p>
          </section>

          {/* EXPERIENCIA */}
          <section id="experience" className="section animate-on-scroll">
            <h2>Experiencia Relevante</h2>
            <article className="card job-card">
              <h3>Desarrollador Web – Proyectos académicos y personales</h3>
              <p className="job-meta">
                <em>Universidad del Valle | 2023 - Actualidad</em>
              </p>
              <ul>
                <li>
                  Desarrollo de interfaces web utilizando{' '}
                  <strong>HTML5, CSS3, JavaScript, Angular y React</strong>.
                </li>
                <li>Implementación de diseño responsivo orientado a mejorar la experiencia de usuario.</li>
                <li>Construcción de módulos para gestión de datos (CRUD) y consumo básico de APIs.</li>
                <li>
                  Uso de <strong>Git</strong> para el control de versiones y organización del código en GitHub.
                </li>
                <li>Participación en retos de programación y proyectos integradores durante el semestre.</li>
              </ul>
            </article>
          </section>

          {/* PROYECTOS (desde backend) */}
          <section id="projects" className="section animate-on-scroll">
            <h2>Proyectos Destacados</h2>

            <div className="projects-grid">
              {projects.map((project) => (
                <article key={project.id} className="project-card animate-on-scroll">
                  <div className="project-header">
                    <h3>{project.title}</h3>
                    <span
                      className={
                        'pill ' + (project.tagVariant === 'outline' ? 'pill-outline' : '')
                      }
                    >
                      {project.tag}
                    </span>
                  </div>
                  <p className="project-role">Rol: {project.role}</p>
                  <p>{project.description}</p>
                  {project.extra && <p>{project.extra}</p>}
                  <p className="project-tech">
                    Tecnologías:{' '}
                    {project.techs.map((tech) => (
                      <span key={tech}>{tech}</span>
                    ))}
                  </p>
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="project-link"
                  >
                    Ver repositorio en GitHub
                  </a>
                </article>
              ))}
            </div>
          </section>

          {/* EDUCACIÓN */}
          <section id="education" className="section animate-on-scroll">
            <h2>Educación</h2>
            <article className="card">
              <p>
                <strong>Tecnología en Desarrollo de Software</strong>
                <br />
                Universidad del Valle
                <br />
                <span className="edu-dates">2023 - 2026 (En curso)</span>
              </p>
            </article>
          </section>

          {/* HABILIDADES */}
          <section id="skills" className="section animate-on-scroll">
            <h2>Habilidades</h2>
            <div className="skills-grid">
              <article className="card">
                <h3>Habilidades Técnicas</h3>
                <ul className="chips-list">
                  <li>
                    <span>HTML5</span>
                  </li>
                  <li>
                    <span>CSS3 · Responsive Design</span>
                  </li>
                  <li>
                    <span>JavaScript (básico-intermedio)</span>
                  </li>
                  <li>
                    <span>React</span>
                  </li>
                  <li>
                    <span>Angular (proyectos académicos)</span>
                  </li>
                  <li>
                    <span>Python (fundamentos)</span>
                  </li>
                  <li>
                    <span>SQL (consultas básicas)</span>
                  </li>
                  <li>
                    <span>Git y GitHub</span>
                  </li>
                </ul>
              </article>
              <article className="card">
                <h3>Habilidades Blandas</h3>
                <ul className="chips-list">
                  <li>
                    <span>Trabajo en equipo</span>
                  </li>
                  <li>
                    <span>Comunicación asertiva</span>
                  </li>
                  <li>
                    <span>Organización y manejo del tiempo</span>
                  </li>
                  <li>
                    <span>Resolución de problemas</span>
                  </li>
                  <li>
                    <span>Adaptabilidad</span>
                  </li>
                  <li>
                    <span>Aprendizaje continuo</span>
                  </li>
                </ul>
              </article>
            </div>
          </section>

          {/* DESCARGA CV */}
          <section className="download animate-on-scroll">
            <a href="CV_Luis_Mateo_Munoz.pdf" className="download-btn" target="_blank" rel="noreferrer">
              Descargar CV en PDF
            </a>
          </section>
        </div>
      </main>

      {/* BOTÓN VOLVER ARRIBA */}
      <button className="to-top" id="toTopBtn" aria-label="Volver arriba">
        ▲
      </button>

      <footer>
        <p>
          @mateo_munoz.j · Luis Mateo Muñoz · 323 476 4589 ·{' '}
          <a href="mailto:luis.mateo.munoz@correounivalle.edu.co">
            luis.mateo.munoz@correounivalle.edu.co
          </a>
        </p>
      </footer>
    </>
  );
}

export default App;
