import React, { useState, useEffect } from 'react';
import { getCookie, setCookie, removeCookie } from './utils/cookies';

// Importación de Componentes Basados en Componentes
import Header from './components/Header';
import Hero from './components/Hero';
import Catalog from './components/Catalog';
import ProductModal from './components/ProductModal';
import Cart from './components/Cart';
import Testimonials from './components/Testimonials';
import ContactForm from './components/ContactForm';
import PreferencesPanel from './components/PreferencesPanel';
import CookieBanner from './components/CookieBanner';
import Footer from './components/Footer';

function App() {
  // Estados Globales (useState)
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [activeProduct, setActiveProduct] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [prefOpen, setPrefOpen] = useState(false);
  
  // Estados del Perfil y Preferencias
  const [userName, setUserName] = useState('');
  const [theme, setTheme] = useState('dark'); // 'dark' o 'light'
  const [currency, setCurrency] = useState('CLP'); // 'CLP' o 'USD'
  const [cookiesAccepted, setCookiesAccepted] = useState(null); // null, 'accepted', 'declined'
  const [showCookieBanner, setShowCookieBanner] = useState(false);

  // useEffect para cargar preferencias de LocalStorage y Cookies al montar la app
  useEffect(() => {
    // 1. Cargar consentimiento de cookies
    const cookieConsent = localStorage.getItem('nexus_cookies_consent') || getCookie('nexus_cookies_consent');
    if (cookieConsent) {
      setCookiesAccepted(cookieConsent);
    } else {
      setShowCookieBanner(true);
    }

    // 2. Cargar Nombre de Usuario
    const storedName = localStorage.getItem('nexus_user_name') || getCookie('nexus_user_name') || '';
    setUserName(storedName);

    // 3. Cargar Tema (Oscuro por defecto)
    const storedTheme = localStorage.getItem('nexus_theme') || getCookie('nexus_theme') || 'dark';
    setTheme(storedTheme);
    document.documentElement.classList.toggle('light-mode', storedTheme === 'light');

    // 4. Cargar Moneda
    const storedCurrency = localStorage.getItem('nexus_currency') || getCookie('nexus_currency') || 'CLP';
    setCurrency(storedCurrency);

    // 5. Cargar Carrito guardado si existe
    const storedCart = localStorage.getItem('nexus_cart');
    if (storedCart) {
      try {
        setCartItems(JSON.parse(storedCart));
      } catch (e) {
        console.error("Error al parsear el carrito guardado", e);
      }
    }
  }, []);

  // Guardar cambios del carrito en localStorage
  useEffect(() => {
    localStorage.setItem('nexus_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Manejo de Cookies Aceptadas
  const handleAcceptCookies = () => {
    setCookiesAccepted('accepted');
    setShowCookieBanner(false);
    
    // Guardar consentimiento en localStorage y cookies
    localStorage.setItem('nexus_cookies_consent', 'accepted');
    setCookie('nexus_cookies_consent', 'accepted', 365);

    // Persistir estados actuales en cookies
    if (userName) setCookie('nexus_user_name', userName, 365);
    setCookie('nexus_theme', theme, 365);
    setCookie('nexus_currency', currency, 365);
  };

  const handleDeclineCookies = () => {
    setCookiesAccepted('declined');
    setShowCookieBanner(false);
    
    // Guardar consentimiento denegado solo en localStorage
    localStorage.setItem('nexus_cookies_consent', 'declined');
    
    // Borrar cualquier cookie de preferencias existente
    removeCookie('nexus_cookies_consent');
    removeCookie('nexus_user_name');
    removeCookie('nexus_theme');
    removeCookie('nexus_currency');
  };

  // Alternar el tema visual directamente
  const handleToggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.classList.toggle('light-mode', nextTheme === 'light');
    
    localStorage.setItem('nexus_theme', nextTheme);
    if (cookiesAccepted === 'accepted') {
      setCookie('nexus_theme', nextTheme, 365);
    }
  };

  // Guardar y sincronizar todas las preferencias del panel de ajustes
  const handleSavePreferences = (prefs) => {
    setUserName(prefs.userName);
    setTheme(prefs.theme);
    setCurrency(prefs.currency);
    document.documentElement.classList.toggle('light-mode', prefs.theme === 'light');

    // Sincronizar con LocalStorage
    localStorage.setItem('nexus_user_name', prefs.userName);
    localStorage.setItem('nexus_theme', prefs.theme);
    localStorage.setItem('nexus_currency', prefs.currency);

    // Sincronizar con Cookies (si están aceptadas)
    if (cookiesAccepted === 'accepted') {
      setCookie('nexus_user_name', prefs.userName, 365);
      setCookie('nexus_theme', prefs.theme, 365);
      setCookie('nexus_currency', prefs.currency, 365);
    }
  };

  // Guardar nombre de usuario desde el formulario de contacto
  const handleSaveNameFromContact = (name) => {
    setUserName(name);
    localStorage.setItem('nexus_user_name', name);
    if (cookiesAccepted === 'accepted') {
      setCookie('nexus_user_name', name, 365);
    }
  };

  // --- Funciones del Carrito ---
  const handleAddToCart = (product) => {
    setCartItems(prevItems => {
      const existing = prevItems.find(item => item.id === product.id);
      if (existing) {
        return prevItems.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
    // Feedback sonoro/visual implícito abriendo el carrito o mostrando un alert si se prefiere
    setCartOpen(true);
  };

  const handleUpdateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCartItems(prevItems => 
      prevItems.map(item => item.id === id ? { ...item, quantity } : item)
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  return (
    <div className="app-container">
      {/* 1. Header (Navegación, Buscador, Selector de tema/moneda, Carrito) */}
      <Header 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        onCartClick={() => setCartOpen(true)}
        onPreferencesClick={() => setPrefOpen(true)}
        theme={theme}
        toggleTheme={handleToggleTheme}
        userName={userName}
      />

      {/* 2. Hero Portada */}
      <Hero />

      {/* Características / Ventajas */}
      <section className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">⚡</div>
          <h4 className="feature-title">Rendimiento Extremo</h4>
          <p className="feature-desc">Tecnología de switches mecánicos y sensores de precisión óptica avanzada.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🛡️</div>
          <h4 className="feature-title">Calidad Certificada</h4>
          <p className="feature-desc">Diseñado con materiales premium resistentes a las jornadas más exigentes.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🎧</div>
          <h4 className="feature-title">Soporte Gamer 24/7</h4>
          <p className="feature-desc">Atención especializada para resolver cualquier duda sobre tu hardware.</p>
        </div>
      </section>

      {/* 3. Catálogo de Productos (Consume API local con useEffect, filtra con useMemo) */}
      <Catalog 
        searchQuery={searchQuery}
        onAddToCart={handleAddToCart}
        onViewDetails={setActiveProduct}
        currency={currency}
      />

      {/* 4. Testimonios (Consume API externa con useEffect) */}
      <Testimonials />

      {/* 5. Formulario de Contacto (Validación, exportación CSV, Alerta) */}
      <ContactForm onSaveUserName={handleSaveNameFromContact} />

      {/* 6. Footer (Pie de página con datos del alumno) */}
      <Footer />

      {/* MODALES & PANELES FLOTANTES */}
      
      {/* Modal Detalle de Producto */}
      <ProductModal 
        product={activeProduct}
        onClose={() => setActiveProduct(null)}
        onAddToCart={handleAddToCart}
        currency={currency}
      />

      {/* Panel lateral del Carrito */}
      <Cart 
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        currency={currency}
      />

      {/* Modal de Preferencias */}
      <PreferencesPanel 
        isOpen={prefOpen}
        onClose={() => setPrefOpen(false)}
        userName={userName}
        theme={theme}
        currency={currency}
        onSavePreferences={handleSavePreferences}
      />

      {/* Banner de Aceptación de Cookies */}
      <CookieBanner 
        show={showCookieBanner}
        onAccept={handleAcceptCookies}
        onDecline={handleDeclineCookies}
      />
    </div>
  );
}

export default App;
