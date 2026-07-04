import React, { useMemo } from 'react';
import { formatPrice } from './ProductCard';

export default function Cart({ 
  isOpen, 
  onClose, 
  cartItems, 
  onUpdateQuantity, 
  onRemoveItem, 
  onClearCart, 
  currency 
}) {
  if (!isOpen) return null;

  // Uso de useMemo para calcular la cantidad total de artículos
  const totalCount = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartItems]);

  // Uso de useMemo para calcular el subtotal y el total
  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }, [cartItems]);

  // Función para exportar la cotización a un archivo CSV
  const handleExportCSV = () => {
    if (cartItems.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }

    function escapeCSV(text) {
      if (typeof text !== 'string') return '';
      let escaped = text.replace(/"/g, '""');
      if (escaped.includes(',') || escaped.includes('\n') || escaped.includes('"')) {
        escaped = `"${escaped}"`;
      }
      return escaped;
    }

    const headers = ["ID Producto", "Nombre", "Precio Unitario (CLP)", "Cantidad", "Total (CLP)"];
    
    const rows = cartItems.map(item => [
      escapeCSV(item.id),
      escapeCSV(item.name),
      item.price,
      item.quantity,
      item.price * item.quantity
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "cotizacion_nexus_gaming.csv");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    alert("Cotización CSV generada y descargada.");
  };

  const handleCheckout = () => {
    alert("¡Pedido enviado! Muchas gracias por preferir Nexus Gaming. Recibirás detalles en tu correo.");
    onClearCart();
    onClose();
  };

  return (
    <>
      <div className="cart-drawer-overlay" onClick={onClose}></div>
      <div className="cart-drawer">
        <div className="cart-header">
          <h3>🛒 Carrito ({totalCount})</h3>
          <button className="btn-close-cart" onClick={onClose} aria-label="Cerrar carrito">
            &times;
          </button>
        </div>

        <div className="cart-items-list">
          {cartItems.length === 0 ? (
            <div className="cart-empty-state">
              <div className="cart-empty-icon">🛒</div>
              <p>Tu carrito está vacío.</p>
              <p style={{ fontSize: '12px', marginTop: '10px' }}>Agrega productos desde el catálogo.</p>
            </div>
          ) : (
            cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-img" />
                <div className="cart-item-details">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-price">{formatPrice(item.price, currency)}</div>
                  <div className="cart-item-quantity-control">
                    <button className="q-btn" onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button className="q-btn" onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                </div>
                <button 
                  className="cart-item-remove" 
                  onClick={() => onRemoveItem(item.id)} 
                  title="Eliminar producto"
                >
                  🗑️
                </button>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="cart-totals">
              <div className="cart-total-row">
                <span>Subtotal:</span>
                <span>{formatPrice(subtotal, currency)}</span>
              </div>
              <div className="cart-total-row">
                <span>Envío:</span>
                <span style={{ color: 'var(--color-success)', fontWeight: 'bold' }}>GRATIS</span>
              </div>
              <div className="cart-total-row grand-total">
                <span>Total:</span>
                <span>{formatPrice(subtotal, currency)}</span>
              </div>
            </div>

            <div className="cart-actions">
              <button className="btn-checkout" onClick={handleCheckout}>
                Finalizar Compra
              </button>
              <button className="btn-csv-download" onClick={handleExportCSV}>
                📄 Descargar Cotización (CSV)
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
