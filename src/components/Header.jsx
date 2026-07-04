import React from 'react';

export default function Header({ 
  searchQuery, 
  setSearchQuery, 
  cartCount, 
  onCartClick, 
  onPreferencesClick, 
  theme, 
  toggleTheme, 
  userName 
}) {
  return (
    <header className="navbar-header">
      <div className="navbar-container">
        {/* Logotipo */}
        <div className="logo-section" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <h1>⚡ NEXUS GAMING</h1>
        </div>

        {/* Buscador */}
        <div className="nav-search-bar">
          <span>🔍</span>
          <input 
            type="text" 
            placeholder="Buscar periféricos..." 
            className="nav-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Acciones */}
        <div className="nav-actions">
          {/* Saludo de Usuario */}
          <div className="profile-greeting" onClick={onPreferencesClick}>
            👤 <span>{userName ? `Hola, ${userName}` : 'Mi Perfil'}</span>
          </div>

          {/* Selector de Tema */}
          <button 
            className="icon-btn" 
            onClick={toggleTheme} 
            title={theme === 'dark' ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro'}
            aria-label="Cambiar tema"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          {/* Botón Carrito */}
          <button 
            className="icon-btn" 
            onClick={onCartClick} 
            title="Ver Carrito de Compras"
            aria-label="Ver carrito"
          >
            🛒
            {cartCount > 0 && <span className="badge">{cartCount}</span>}
          </button>
        </div>
      </div>
    </header>
  );
}
