import React from 'react';

export default function ProductCard({ product, onAddToCart }) {
  const { id, name, category, price, description, image, rating } = product;

  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <img src={image} alt={name} loading="lazy" />
        <span className="product-category-tag">{category}</span>
      </div>

      <div className="product-info">
        <div className="product-rating">
          <i className="fa-solid fa-star"></i>
          <span>{rating.toFixed(1)}</span>
        </div>

        <h3 className="product-name">{name}</h3>
        <p className="product-description">{description}</p>

        <div className="product-footer">
          <div className="product-price">
            <span className="currency">R$</span>
            <span className="amount">{price.toFixed(2)}</span>
          </div>

          <button 
            className="add-to-cart-btn"
            onClick={() => onAddToCart(product)}
            aria-label={`Adicionar ${name} ao carrinho`}
          >
            <i className="fa-solid fa-cart-plus"></i> Adicionar
          </button>
        </div>
      </div>
    </article>
  );
}

