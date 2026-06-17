// ============================================================
//  🛠️ COMPONENTE PARA COMPLETAR — TAREA ESTUDIANTE
//  Contact.jsx
//
//  INSTRUCCIONES:
//  1. Completa el formulario: nombre, email, teléfono,
//     tipo de servicio (select), mensaje (textarea), botón.
//  2. Agrega la información de contacto en la columna izquierda.
//  3. Usa las clases Bootstrap: form-label, form-control,
//     form-select, btn.
//
//  ⚠️ DIFERENCIAS JSX vs HTML:
//     class="..."  →  className="..."
//     for="campo"  →  htmlFor="campo"
//
//  RETO ADICIONAL: usa useState para manejar el formulario
//  y mostrar una alerta al enviarlo.
// ============================================================

import { useState } from 'react';

function Contact() {
  const [formulario, setFormulario] = useState({
    nombre: '',
    email: '',
    telefono: '',
    servicio: '',
    mensaje: '',
  });

  const [enviado, setEnviado] = useState(false);

  const manejarCambio = (e) => {
    const { id, value } = e.target;
    setFormulario({ ...formulario, [id]: value });
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (formulario.nombre && formulario.email && formulario.telefono && formulario.servicio && formulario.mensaje) {
      setEnviado(true);
      setTimeout(() => setEnviado(false), 4000);
      setFormulario({
        nombre: '',
        email: '',
        telefono: '',
        servicio: '',
        mensaje: '',
      });
    }
  };
  return (
    <section id="contacto" className="py-5 bg-dark text-white">
      <div className="container">

        <div className="text-center mb-5">
          <h2 className="section-titulo text-white">Contáctenos</h2>
          <p className="text-light opacity-75">
            ¿Tienes una necesidad eléctrica? Completa el formulario y nos pondremos en contacto contigo en menos de 24 horas para ofrecerte una solución personalizada.
          </p>
        </div>

        <div className="row g-5">

          {/* Columna izquierda: información de contacto */}
          <div className="col-lg-4">
            <h4 className="mb-4">Información de contacto</h4>
            <ul className="list-unstyled">
              <li className="mb-3">
                <span className="me-2">📍</span>
                Calle 10 # 43A-15, El Poblado, Medellín
              </li>
              <li className="mb-3">
                <span className="me-2">📞</span>
                <a href="tel:+573001234567" className="text-warning text-decoration-none">
                  (300) 123-4567
                </a>
              </li>
              <li className="mb-3">
                <span className="me-2">📧</span>
                <a href="mailto:info@volttec.com.co" className="text-warning text-decoration-none">
                  info@volttec.com.co
                </a>
              </li>
              <li className="mb-3">
                <span className="me-2">🕐</span>
                Lun–Vie 7am–6pm · Sáb 8am–2pm
              </li>
              <li>
                <span className="badge bg-success">✅ Certificado RETIE</span>
              </li>
            </ul>
          </div>

          {/* Columna derecha: formulario */}
          <div className="col-lg-8">
            <div className="bg-white text-dark rounded-3 p-4">
              <div className="row g-3">

                {/* Campo: Nombre */}
                <div className="col-md-6">
                  <label htmlFor="nombre" className="form-label fw-semibold">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    className="form-control"
                    placeholder="Tu nombre"
                    value={formulario.nombre}
                    onChange={manejarCambio}
                  />
                </div>

                {/* Campo: Email */}
                <div className="col-md-6">
                  <label htmlFor="email" className="form-label fw-semibold">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    placeholder="tu@correo.com"
                    value={formulario.email}
                    onChange={manejarCambio}
                  />
                </div>

                {/* Campo: Teléfono */}
                <div className="col-md-6">
                  <label htmlFor="telefono" className="form-label fw-semibold">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    id="telefono"
                    className="form-control"
                    placeholder="(300) 123-4567"
                    value={formulario.telefono}
                    onChange={manejarCambio}
                  />
                </div>

                {/* Campo: Tipo de servicio — usa <select> con 5+ opciones */}
                <div className="col-md-6">
                  <label htmlFor="servicio" className="form-label fw-semibold">
                    Tipo de servicio
                  </label>
                  <select
                    id="servicio"
                    className="form-select"
                    value={formulario.servicio}
                    onChange={manejarCambio}
                  >
                    <option value="">Selecciona un servicio...</option>
                    <option value="residencial">Instalación residencial</option>
                    <option value="comercial">Instalación comercial</option>
                    <option value="mantenimiento">Mantenimiento preventivo</option>
                    <option value="tableros">Tableros y breakers</option>
                    <option value="iluminacion">Iluminación LED</option>
                    <option value="plantas">Plantas eléctricas</option>
                  </select>
                </div>

                {/* Campo: Mensaje — usa <textarea> */}
                <div className="col-12">
                  <label htmlFor="mensaje" className="form-label fw-semibold">
                    Mensaje
                  </label>
                  <textarea
                    id="mensaje"
                    className="form-control"
                    rows="4"
                    placeholder="Describe brevemente tu necesidad o proyecto eléctrico..."
                    value={formulario.mensaje}
                    onChange={manejarCambio}
                  ></textarea>
                </div>

                {/* Botón enviar */}
                <div className="col-12">
                  <button
                    type="button"
                    className="btn btn-voltec w-100 py-2 fw-bold"
                    onClick={manejarEnvio}
                  >
                    Enviar solicitud de cotización
                  </button>
                </div>

                {/* Alerta de éxito */}
                {enviado && (
                  <div className="col-12">
                    <div className="alert alert-success mb-0" role="alert">
                      ✅ ¡Gracias {formulario.nombre}! Tu solicitud ha sido recibida. Te contactaremos pronto.
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Contact;