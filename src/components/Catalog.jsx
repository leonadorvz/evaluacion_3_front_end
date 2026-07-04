import React, { useState, useEffect, useMemo } from 'react';
import ProductCard from './ProductCard';

export default function Catalog({ searchQuery, onAddToCart, onViewDetails, currency }) {
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Carga de productos desde el archivo API simulado usando fetch, async/await y useEffect
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Simular un leve delay para ver el spinner premium de carga
        await new Promise(resolve => setTimeout(resolve, 600));
        
        const response = await fetch('/api/products.json');
        if (!response.ok) {
          throw new Error('No se pudo cargar el catálogo de productos.');
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Uso de useMemo para filtrar productos dinámicamente según categoría y búsqueda
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, activeCategory, searchQuery]);

  const categories = [
    { id: 'all', label: 'Todos' },
    { id: 'mouse', label: '🖱️ Mouses' },
    { id: 'teclado', label: '⌨️ Teclados' },
    { id: 'audifonos', label: '🎧 Audífonos' },
    { id: 'silla', label: '🪑 Sillas' }
  ];

  return (
    <section className="section-container" id="catalogo">
      <div className="section-header">
        <h2 className="section-title">Nuestra Selección <span>Gamer</span></h2>
        <p className="section-subtitle">
          Elige los mejores periféricos del mercado para armar tu setup definitivo. Rendimiento extremo garantizado.
        </p>
      </div>

      {/* Barra de Filtros */}
      <div className="catalog-filters">
        {categories.map(cat => (
          <button
            key={cat.id}
            className={`filter-btn ${activeCategory === cat.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid de Productos */}
      {loading ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Cargando el arsenal gaming...</p>
        </div>
      ) : error ? (
        <div className="loading-spinner" style={{ color: 'var(--color-error)' }}>
          <p>❌ Error: {error}</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="loading-spinner">
          <p>🔍 No se encontraron productos que coincidan con tu búsqueda.</p>
        </div>
      ) : (
        <div className="products-grid">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onViewDetails={onViewDetails}
              onAddToCart={onAddToCart}
              currency={currency}
            />
          ))}
        </div>
      )}
    </section>
  );
}
