import React from 'react';

export default function LoadingSpinner() {
  return (
    <div className="spinner-container">
      <div className="spinner">
        <i className="fa-solid fa-seedling fa-spin"></i>
      </div>
      <p>Carregando produtos sustentáveis...</p>
    </div>
  );
}

