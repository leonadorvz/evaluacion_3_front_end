import React from 'react';

const formatPrice = (priceInCLP, currency = 'CLP') => {
  if (currency === 'USD') {
    const priceInUSD = Math.round(priceInCLP / 900);
    return `USD $${priceInUSD.toLocaleString('en-US')}`;
  }
  return `$${priceInCLP.toLocaleString('es-CL')}`;
};

export default function ProductCard({ product, onViewDetails, onAddToCart, currency }) {
  return (
    <div className="product-card">
      <div className="product-image-wrapper" onClick={() => onViewDetails(product)}>
        <img src={product.image} alt={product.name} />
        <span className="product-tag">{product.category}</span>
      </div>
      <div className="product-info">
        <h3 className="product-name" onClick={() => onViewDetails(product)} style={{ cursor: 'pointer' }}>
          {product.name}
        </h3>
        <p className="product-desc-short">{product.description}</p>
        <div className="product-footer">
          <span className="product-price">{formatPrice(product.price, currency)}</span>
          <button 
            className="btn-card-action" 
            onClick={() => onAddToCart(product)} 
            title="Agregar al Carrito"
            aria-label={`Agregar ${product.name} al carrito`}
          >
            🛒+
          </button>
        </div>
      </div>
    </div>
  );
}
export { formatPrice };
