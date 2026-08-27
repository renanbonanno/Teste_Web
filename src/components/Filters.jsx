import React from 'react';

export default function Filters({ 
  categories, 
  selectedCategory, 
  onSelectCategory, 
  maxPrice, 
  onMaxPriceChange,
  sortBy,
  onSortChange,
  onResetFilters 
}) {
  return (
    <aside className="filters-container">
      <div className="filters-header">
        <h3><i className="fa-solid fa-sliders"></i> Filtros</h3>
        <button className="reset-filters-btn" onClick={onResetFilters}>
          Limpar
        </button>
      </div>

      <div className="filter-group">
        <label className="filter-title">Categorias</label>
        <div className="category-buttons">
          <button 
            className={`cat-btn ${selectedCategory === 'Todas' ? 'active' : ''}`}
            onClick={() => onSelectCategory('Todas')}
          >
            Todas
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`cat-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => onSelectCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <div className="price-label-row">
          <label className="filter-title">Preço Máximo:</label>
          <span className="price-value">R$ {Number(maxPrice).toFixed(2)}</span>
        </div>
        <input 
          type="range" 
          min="20" 
          max="300" 
          step="10" 
          value={maxPrice}
          onChange={(e) => onMaxPriceChange(Number(e.target.value))}
          className="price-slider"
        />
      </div>

      <div className="filter-group">
        <label className="filter-title">Ordenar por</label>
        <select 
          value={sortBy} 
          onChange={(e) => onSortChange(e.target.value)}
          className="sort-select"
        >
          <option value="default">Destaques</option>
          <option value="price-asc">Menor Preço</option>
          <option value="price-desc">Maior Preço</option>
          <option value="rating">Melhor Avaliação</option>
        </select>
      </div>
    </aside>
  );
}

