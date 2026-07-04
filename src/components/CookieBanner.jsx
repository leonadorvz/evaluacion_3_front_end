import React from 'react';

export default function CookieBanner({ show, onAccept, onDecline }) {
  if (!show) return null;

  return (
    <div className="cookie-banner">
      <div className="cookie-text">
        <strong>🍪 Uso de Cookies en Nexus Gaming</strong>
        <p style={{ marginTop: '5px' }}>
          Utilizamos cookies para guardar tus preferencias de tema, moneda y tus datos de usuario de manera local. Esto mejora tu experiencia en nuestro portal. ¿Aceptas su uso?
        </p>
      </div>
      <div className="cookie-actions">
        <button className="btn-cookie-decline" onClick={onDecline}>
          Rechazar
        </button>
        <button className="btn-cookie-accept" onClick={onAccept}>
          Aceptar Cookies
        </button>
      </div>
    </div>
  );
}
