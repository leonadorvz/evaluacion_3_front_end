import React, { useState } from 'react';

export default function ContactForm({ onSaveUserName }) {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar error al escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    // 1. Validar Nombre (solo letras y espacios, correspondiendo al label Nombre Completo)
    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre completo es requerido.';
    } else {
      const nombreValido = /^[A-Za-zÀ-ÿ\s]+$/;
      if (!nombreValido.test(formData.nombre)) {
        newErrors.nombre = 'El nombre sólo puede contener letras y espacios.';
      }
    }

    // 2. Validar Email (formato de correo electrónico, correspondiendo al label Correo Electrónico)
    if (!formData.email.trim()) {
      newErrors.email = 'El correo electrónico es requerido.';
    } else {
      const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailValido.test(formData.email)) {
        newErrors.email = 'Ingresa un correo electrónico válido.';
      }
    }

    // 3. Validar Teléfono (9 dígitos, correspondiendo al label Teléfono)
    if (!formData.telefono.trim()) {
      newErrors.telefono = 'El teléfono es requerido.';
    } else {
      const soloNums = formData.telefono.replace(/\D/g, '');
      if (soloNums.length !== 9) {
        newErrors.telefono = 'El teléfono debe tener exactamente 9 dígitos.';
      }
    }

    // 4. Validar Mensaje (al menos 5 caracteres, correspondiendo al label Mensaje)
    if (!formData.mensaje.trim()) {
      newErrors.mensaje = 'El mensaje es requerido.';
    } else if (formData.mensaje.length < 5) {
      newErrors.mensaje = 'El mensaje debe tener al menos 5 caracteres.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      alert("Por favor corrige los errores antes de enviar.");
      return;
    }

    // Generar archivo CSV
    function escapeCSV(text) {
      if (typeof text !== 'string') return '';
      let escaped = text.replace(/"/g, '""');
      if (escaped.includes(',') || escaped.includes('\n') || escaped.includes('"')) {
        escaped = `"${escaped}"`;
      }
      return escaped;
    }

    const headers = ["Nombre", "Email", "Telefono", "Mensaje"];
    const rows = [
      escapeCSV(formData.nombre),
      escapeCSV(formData.email),
      escapeCSV(formData.telefono),
      escapeCSV(formData.mensaje)
    ];

    const csvContent = headers.join(",") + "\n" + rows.join(",");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `contacto_${formData.nombre.replace(/\s+/g, '_')}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Guardar nombre del usuario en las preferencias globales (lo que actualiza localStorage y cookies)
    if (onSaveUserName) {
      onSaveUserName(formData.nombre);
    }

    // Mostrar alerta requerida: "formulario enviado"
    alert("formulario enviado");

    // Limpiar formulario
    setFormData({
      nombre: '',
      email: '',
      telefono: '',
      mensaje: ''
    });
  };

  return (
    <section className="section-container" id="contacto">
      <div className="contact-section-react">
        <div className="contact-layout">
          <div className="contact-info-panel">
            <h3>Contacto</h3>
            <p>
              ¿Tienes dudas sobre compatibilidad, envíos a regiones o quieres cotizar configuraciones corporativas? Escríbenos.
            </p>
            <div className="contact-details-list">
              <div className="contact-detail-item">
                <div className="contact-detail-icon">✉️</div>
                <div className="contact-detail-text">
                  <h5>Correo Electrónico</h5>
                  <p>leonardo.rivera18@inacapmail.cl</p>
                </div>
              </div>
              <div className="contact-detail-item">
                <div className="contact-detail-icon">📞</div>
                <div className="contact-detail-text">
                  <h5>Teléfono Directo</h5>
                  <p>+56 9 87581977</p>
                </div>
              </div>
              <div className="contact-detail-item">
                <div className="contact-detail-icon">🛡️</div>
                <div className="contact-detail-text">
                  <h5>Soporte Técnico</h5>
                  <p>Disponible 24/7 para clientes Nexus</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label className="form-label" htmlFor="nombre">Nombre Completo</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  className="form-input"
                  placeholder="Ej. Juan Pérez"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                />
                {errors.nombre && <span style={{ color: 'var(--color-error)', fontSize: '12px' }}>{errors.nombre}</span>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="email">Correo Electrónico</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-input"
                  placeholder="Ej. juan@correo.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                {errors.email && <span style={{ color: 'var(--color-error)', fontSize: '12px' }}>{errors.email}</span>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="telefono">Teléfono (9 dígitos)</label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  className="form-input"
                  placeholder="Ej. 987654321"
                  value={formData.telefono}
                  onChange={handleChange}
                  required
                />
                {errors.telefono && <span style={{ color: 'var(--color-error)', fontSize: '12px' }}>{errors.telefono}</span>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="mensaje">Mensaje</label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  className="form-input form-textarea"
                  placeholder="Escribe tu mensaje aquí..."
                  rows="4"
                  value={formData.mensaje}
                  onChange={handleChange}
                  required
                ></textarea>
                {errors.mensaje && <span style={{ color: 'var(--color-error)', fontSize: '12px' }}>{errors.mensaje}</span>}
              </div>

              <button type="submit" className="btn-form-submit">
                Enviar Mensaje & Generar CSV
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
