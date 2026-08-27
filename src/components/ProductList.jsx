import React from 'react';
import ProductCard from './ProductCard';

export default function ProductList({ products, onAddToCart }) {
  if (products.length === 0) {
    return (
      <div className="empty-products">
        <i className="fa-solid fa-box-open"></i>
        <h3>Nenhum produto encontrado</h3>
        <p>Tente ajustar os filtros ou os termos de busca para encontrar o que procura.</p>
      </div>
    );
  }

  return (
    <section className="product-grid">
      {products.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product} 
          onAddToCart={onAddToCart} 
        />
      ))}
    </section>
  );
}

