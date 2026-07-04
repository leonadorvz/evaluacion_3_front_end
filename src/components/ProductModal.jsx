import React from 'react';
import { formatPrice } from './ProductCard';

export default function ProductModal({ product, onClose, onAddToCart, currency }) {
  if (!product) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container-react" onClick={(e) => e.stopPropagation()}>
        <button className="btn-close-modal" onClick={onClose} aria-label="Cerrar modal">
          &times;
        </button>
        <div className="modal-content-grid">
          <div className="modal-image-panel">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="modal-details-panel">
            <div>
              <h2>{product.name}</h2>
              <p className="modal-desc">{product.description}</p>
              
              <div className="modal-specs-box">
                <h4>📋 Especificaciones Técnicas:</h4>
                <ul>
                  {product.specs && product.specs.map((spec, index) => (
                    <li key={index}>{spec}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="modal-action-row">
              <div className="modal-price-display">
                <span className="price-tag-label">Precio del Equipo</span>
                <span className="price-tag-value">{formatPrice(product.price, currency)}</span>
              </div>
              <button 
                className="btn-primary" 
                onClick={() => {
                  onAddToCart(product);
                  onClose();
                }}
              >
                🛒 Agregar al Carrito
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
