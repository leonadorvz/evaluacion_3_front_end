import React from 'react';

export default function Hero() {
  const scrollToCatalog = () => {
    const catalogElement = document.getElementById('catalogo');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero">
      <div className="hero-content">
        <p className="hero-subtitle">🎮 EQUIPAMIENTO PROFESIONAL PARA GAMERS</p>
        <h2 className="hero-title">
          Eleva tu Juego al Siguiente Nivel con <span>NEXUS</span>
        </h2>
        <p className="hero-desc">
          Explora nuestra selección exclusiva de periféricos de alto rendimiento, optimizados para ofrecerte precisión extrema, durabilidad de nivel eSports y la mayor comodidad durante tus partidas.
        </p>
        <div className="hero-buttons">
          <button className="btn-primary" onClick={scrollToCatalog}>
            Ver Catálogo →
          </button>
          <button 
            className="btn-secondary" 
            onClick={() => document.getElementById('contacto').scrollIntoView({ behavior: 'smooth' })}
          >
            Contacto & Soporte
          </button>
        </div>
      </div>
    </section>
  );
}
