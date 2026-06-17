// ============================================================
//  🛠️ COMPONENTE PARA COMPLETAR — TAREA ESTUDIANTE
//  Services.jsx
//
//  INSTRUCCIONES:
//  1. Define el array "servicios" con al menos 6 servicios.
//     Cada objeto debe tener: icono, titulo, descripcion.
//  2. Completa el JSX usando tarjetas Bootstrap (card).
//  3. Usa .map() para renderizar — NO copies el HTML 6 veces.
//
//  PISTAS:
//  - Usa <div className="row g-4"> para el grid
//  - Cada tarjeta va en <div className="col-md-6 col-lg-4">
//  - Clases Bootstrap útiles: card, card-body, card-title, card-text
// ============================================================

// 🛠️ PASO 1: Define aquí tu array de servicios
const servicios = [
  {
    icono: '🏠',
    titulo: 'Instalaciones residenciales',
    descripcion: 'Realizamos instalaciones eléctricas completas para viviendas nuevas y remodelaciones, cumpliendo la normativa RETIE vigente.',
  },
  {
    icono: '🏢',
    titulo: 'Instalaciones comerciales',
    descripcion: 'Sistemas eléctricos de alta capacidad para locales comerciales, oficinas y edificios empresariales con garantía profesional.',
  },
  {
    icono: '🔧',
    titulo: 'Mantenimiento preventivo',
    descripcion: 'Inspecciones periódicas y mantenimiento de sistemas eléctricos para evitar fallos y prolongar la vida útil de instalaciones.',
  },
  {
    icono: '📦',
    titulo: 'Tableros y breakers',
    descripcion: 'Instalación y reparación de tableros eléctricos, diferenciales y breakers automáticos de primera calidad.',
  },
  {
    icono: '💡',
    titulo: 'Iluminación LED y domótica',
    descripcion: 'Soluciones modernas de iluminación LED eficiente y sistemas de automatización para hogares y empresas.',
  },
  {
    icono: '⚙️',
    titulo: 'Plantas y UPS',
    descripcion: 'Instalación de plantas eléctricas y sistemas UPS para garantizar energía continua en emergencias.',
  },
];

function Services() {
  return (
    <section id="servicios" className="py-5 bg-light">
      <div className="container">

        <div className="text-center mb-5">
          <h2 className="section-titulo">Nuestros Servicios</h2>
          <p className="section-subtitulo text-muted">
            En VoltTec ofrecemos soluciones eléctricas integrales para viviendas y empresas. Nuestro equipo certificado RETIE garantiza instalaciones seguras, eficientes y duraderas.
          </p>
        </div>

        {/* 🛠️ PASO 2: Renderiza las tarjetas con servicios.map(...) */}
        <div className="row g-4">
          {servicios.map((servicio, index) => (
            <div key={index} className="col-md-6 col-lg-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-4">
                  <div style={{ fontSize: '2.5rem' }}>{servicio.icono}</div>
                  <h5 className="card-title fw-bold mt-2">{servicio.titulo}</h5>
                  <p className="card-text text-muted">{servicio.descripcion}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Services;