import React from 'react';

export default function Cart({ 
  isOpen, 
  onClose, 
  cartItems, 
  onUpdateQuantity, 
  onRemoveItem, 
  onOpenCheckout 
}) {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity, 
    0
  );

  return (
    <div className="cart-backdrop" onClick={onClose}>
      <aside className="cart-sidebar" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h3>
            <i className="fa-solid fa-bag-shopping"></i> Seu Carrinho
          </h3>
          <button className="close-cart-btn" onClick={onClose}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="cart-items-container">
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <i className="fa-solid fa-cart-arrow-down"></i>
              <p>Seu carrinho está vazio.</p>
              <button className="continue-shopping-btn" onClick={onClose}>
                Explorar Produtos
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-img" />
                <div className="cart-item-details">
                  <h4 className="cart-item-name">{item.name}</h4>
                  <p className="cart-item-price">R$ {item.price.toFixed(2)}</p>

                  <div className="cart-item-actions">
                    <div className="quantity-controls">
                      <button 
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        aria-label="Diminuir quantidade"
                      >
                        <i className="fa-solid fa-minus"></i>
                      </button>
                      <span>{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        aria-label="Aumentar quantidade"
                      >
                        <i className="fa-solid fa-plus"></i>
                      </button>
                    </div>

                    <button 
                      className="remove-item-btn" 
                      onClick={() => onRemoveItem(item.id)}
                      title="Remover produto"
                    >
                      <i className="fa-regular fa-trash-can"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="cart-summary-line">
              <span>Frete Ecológico:</span>
              <span className="free-shipping">Grátis (Neutralizado)</span>
            </div>
            <div className="cart-summary-line total-line">
              <span>Total:</span>
              <span className="total-amount">R$ {subtotal.toFixed(2)}</span>
            </div>

            <button className="checkout-btn" onClick={onOpenCheckout}>
              <i className="fa-solid fa-lock"></i> Finalizar Compra
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}

