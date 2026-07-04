import React, { useState } from 'react';

export default function PreferencesPanel({ 
  isOpen, 
  onClose, 
  userName, 
  theme, 
  currency, 
  onSavePreferences 
}) {
  if (!isOpen) return null;

  const [inputName, setInputName] = useState(userName || '');
  const [prefTheme, setPrefTheme] = useState(theme || 'dark');
  const [prefCurrency, setPrefCurrency] = useState(currency || 'CLP');
  const [notifications, setNotifications] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSavePreferences({
      userName: inputName.trim(),
      theme: prefTheme,
      currency: prefCurrency,
      notifications: notifications
    });
    alert("Preferencias guardadas correctamente en LocalStorage y Cookies.");
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="preferences-panel" onClick={(e) => e.stopPropagation()}>
        <button className="btn-close-modal" onClick={onClose} aria-label="Cerrar panel">
          &times;
        </button>
        <h3 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '20px', color: 'var(--color-primary)' }}>
          ⚙️ Ajustes y Preferencias
        </h3>
        
        <form onSubmit={handleSubmit}>
          {/* Nombre de Usuario */}
          <div className="pref-row">
            <label className="form-label">Nombre del Gamer</label>
            <input 
              type="text" 
              className="form-input" 
              value={inputName} 
              onChange={(e) => setInputName(e.target.value)}
              placeholder="Ej. Leonardo Rivera" 
            />
          </div>

          {/* Selector de Tema */}
          <div className="pref-row">
            <label className="form-label">Tema Visual</label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button 
                type="button" 
                className={`pref-toggle-btn ${prefTheme === 'dark' ? 'active' : ''}`}
                onClick={() => setPrefTheme('dark')}
              >
                🌌 Modo Oscuro
              </button>
              <button 
                type="button" 
                className={`pref-toggle-btn ${prefTheme === 'light' ? 'active' : ''}`}
                onClick={() => setPrefTheme('light')}
              >
                ☀️ Modo Claro
              </button>
            </div>
          </div>

          {/* Selector de Moneda */}
          <div className="pref-row">
            <label className="form-label">Moneda de Compra</label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button 
                type="button" 
                className={`pref-toggle-btn ${prefCurrency === 'CLP' ? 'active' : ''}`}
                onClick={() => setPrefCurrency('CLP')}
              >
                CLP ($)
              </button>
              <button 
                type="button" 
                className={`pref-toggle-btn ${prefCurrency === 'USD' ? 'active' : ''}`}
                onClick={() => setPrefCurrency('USD')}
              >
                USD (US$)
              </button>
            </div>
          </div>

          {/* Notificaciones */}
          <div className="pref-row">
            <label className="form-label">Alertas Especiales</label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button 
                type="button" 
                className={`pref-toggle-btn ${notifications ? 'active' : ''}`}
                onClick={() => setNotifications(true)}
              >
                Habilitadas
              </button>
              <button 
                type="button" 
                className={`pref-toggle-btn ${!notifications ? 'active' : ''}`}
                onClick={() => setNotifications(false)}
              >
                Silenciadas
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            className="btn-primary" 
            style={{ width: '100%', marginTop: '10px' }}
          >
            Guardar Cambios
          </button>
        </form>
      </div>
    </div>
  );
}
