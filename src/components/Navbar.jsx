import React from 'react';

export default function Navbar({ searchTerm, onSearchChange, cartCount, onOpenCart }) {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <i className="fa-solid fa-leaf brand-icon"></i>
          <h1>Eco<span>Trend</span></h1>
        </div>

        <div className="navbar-search">
          <i className="fa-solid fa-magnifying-glass search-icon"></i>
          <input
            type="text"
            placeholder="Buscar produtos ecológicos..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          {searchTerm && (
            <button className="clear-search-btn" onClick={() => onSearchChange('')}>
              <i className="fa-solid fa-xmark"></i>
            </button>
          )}
        </div>

        <button 
          className="cart-trigger-btn" 
          onClick={onOpenCart}
          aria-label="Abrir carrinho de compras"
        >
          <i className="fa-solid fa-bag-shopping"></i>
          <span className="cart-text">Carrinho</span>
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </button>
      </div>
    </header>
  );
}

