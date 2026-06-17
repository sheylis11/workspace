// ============================================================
//  🛠️ COMPONENTE PARA COMPLETAR — TAREA ESTUDIANTE
//  WhyUs.jsx  (¿Por qué elegirnos?)
//
//  INSTRUCCIONES:
//  1. Define el array "razones" con al menos 4 objetos.
//     Cada objeto debe tener: icono, titulo, descripcion.
//  2. Agrega una imagen en la columna izquierda.
//  3. Escribe 2 párrafos sobre la empresa.
//  4. Usa .map() para renderizar la lista de razones.
//
//  PISTAS:
//  - <div className="row align-items-center"> para las columnas
//  - className="list-unstyled" en <ul> quita los bullets
//  - Placeholder: https://placehold.co/500x400/1a1e2e/f5c518?text=VoltTec
// ============================================================

// 🛠️ PASO 1: Define tu array de razones
const razones = [
  {
    icono: '🏆',
    titulo: 'Certificación RETIE',
    descripcion: 'Todo nuestro personal cuenta con certificación RETIE (Reglamento Técnico de Instalaciones Eléctricas) vigente y se actualiza constantemente.',
  },
  {
    icono: '⏱️',
    titulo: 'Respuesta rápida',
    descripcion: 'Atendemos emergencias en menos de 24 horas. Disponemos de equipo móvil en toda el Área Metropolitana de Medellín.',
  },
  {
    icono: '✅',
    titulo: 'Garantía de 1 año',
    descripcion: 'Respaldamos nuestro trabajo con garantía integral de mano de obra. Calidad sin compromisos.',
  },
  {
    icono: '🎯',
    titulo: 'Presupuesto sin costo',
    descripcion: 'Realizamos diagnósticos y cotizaciones gratuitas. Sin obligación de contratación.',
  },
  {
    icono: '24/7',
    titulo: 'Soporte 24/7',
    descripcion: 'Emergencias eléctricas disponibles todas las noches, fines de semana y festivos.',
  },
];

function WhyUs() {
  return (
    <section id="nosotros" className="py-5">
      <div className="container">
        <div className="row align-items-center g-5">

          {/* Columna izquierda: imagen */}
          <div className="col-lg-5">
            <img
              src="https://placehold.co/500x400/1a1e2e/f5c518?text=VoltTec"
              alt="Técnicos de VoltTec trabajando en instalación eléctrica"
              className="img-fluid rounded shadow"
            />
          </div>

          {/* Columna derecha: texto y razones */}
          <div className="col-lg-7">
            <h2 className="section-titulo mb-3">¿Por qué elegirnos?</h2>

            {/* 🛠️ TODO: Escribe 2-3 párrafos sobre la empresa */}
            <p className="text-muted mb-4">
              VoltTec es una empresa con más de 15 años de experiencia en soluciones eléctricas residenciales y comerciales. Nacimos en Medellín y nos hemos expandido por todo el Área Metropolitana, ganando la confianza de miles de clientes satisfechos. Nuestro equipo de técnicos certificados y comprometidos es el corazón de nuestro servicio.
            </p>
            <p className="text-muted mb-4">
              Creemos que la seguridad eléctrica es fundamental para proteger vidas y bienes. Por eso cada proyecto que realizamos cumple con la normativa RETIE vigente y los más altos estándares de calidad. Desde pequeñas reparaciones hasta proyectos complejos de industriales, estamos listos para servirte.
            </p>

            {/* 🛠️ PASO 2: Renderiza las razones con .map() */}
            <ul className="list-unstyled">
              {razones.map((razon, index) => (
                <li key={index} className="d-flex gap-3 mb-3">
                  <span style={{ fontSize: '1.5rem' }}>{razon.icono}</span>
                  <div>
                    <strong>{razon.titulo}</strong>
                    <p className="text-muted mb-0 small">{razon.descripcion}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}

export default WhyUs;