import React from 'react';

export default function Footer() {
  return (
    <footer className="app-footer">
      <p>
        <strong>Contacto Nexus Gaming:</strong> leonardo.rivera18@inacapmail.cl | Teléfono: +56 9 87581977
      </p>
      <p style={{ fontSize: '11px', marginTop: '10px' }}>
        © {new Date().getFullYear()} Nexus Gaming. Todos los derechos reservados. Evaluación 3 - Front End INACAP.
      </p>
    </footer>
  );
}
