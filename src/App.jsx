import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import Filters from './components/Filters';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import CheckoutModal from './components/CheckoutModal';
import LoadingSpinner from './components/LoadingSpinner';
import './App.css';

export default function App() {
  // --- Estados de Produtos & Requisição ---
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  // --- Estados dos Filtros ---
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [maxPrice, setMaxPrice] = useState(300);
  const [sortBy, setSortBy] = useState('default');

  // --- Estado do Carrinho com Persistência em LocalStorage ---
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem('ecotrend_cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (e) {
      console.error('Erro ao ler localStorage:', e);
      return [];
    }
  });

  // --- Estados de Modais ---
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Salva no LocalStorage sempre que o carrinho for modificado
  useEffect(() => {
    try {
      localStorage.setItem('ecotrend_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Erro ao salvar no localStorage:', e);
    }
  }, [cartItems]);

  // --- Requisição da Fake API com Async/Await e Spinner de Loading ---
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      setFetchError(null);

      try {
        // Simulação de latência de rede para exibição do spinner
        await new Promise((res) => setTimeout(res, 800));

        const response = await fetch('./produtos.json');
        if (!response.ok) {
          throw new Error(`Erro HTTP: ${response.status} - Falha ao carregar produtos`);
        }

        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error('Erro na requisição dos produtos:', err);
        setFetchError(err.message || 'Não foi possível carregar os produtos.');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // --- Manipulação do Carrinho ---
  const handleAddToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId, delta) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) => {
          if (item.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const handleRemoveItem = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const handlePurchaseSuccess = () => {
    setCartItems([]);
    localStorage.removeItem('ecotrend_cart');
  };

  // --- Extração Dinâmica das Categorias ---
  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category));
    return Array.from(set);
  }, [products]);

  // --- Filtros Dinâmicos em Tempo Real com useMemo ---
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const matchesCategory =
          selectedCategory === 'Todas' || product.category === selectedCategory;
        const matchesPrice = product.price <= maxPrice;
        const matchesSearch = product.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

        return matchesCategory && matchesPrice && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0;
      });
  }, [products, selectedCategory, maxPrice, searchTerm, sortBy]);

  const handleResetFilters = () => {
    setSelectedCategory('Todas');
    setMaxPrice(300);
    setSearchTerm('');
    setSortBy('default');
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="app-container">
      {/* Navbar Superior */}
      <Navbar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Hero Banner Educativo */}
      <section className="hero-banner">
        <div className="hero-content">
          <h2>Consumo Consciente, Futuro Sustentável</h2>
          <p>Descubra produtos ecológicos que reduzem sua pegada de carbono no planeta.</p>
        </div>
      </section>

      {/* Conteúdo Principal */}
      <main className="main-content">
        <Filters
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          maxPrice={maxPrice}
          onMaxPriceChange={setMaxPrice}
          sortBy={sortBy}
          onSortChange={setSortBy}
          onResetFilters={handleResetFilters}
        />

        <div className="content-area">
          {loading && <LoadingSpinner />}

          {fetchError && (
            <div className="error-banner">
              <i className="fa-solid fa-triangle-exclamation"></i>
              <p>{fetchError}</p>
              <button onClick={() => window.location.reload()}>Recarregar</button>
            </div>
          )}

          {!loading && !fetchError && (
            <ProductList
              products={filteredProducts}
              onAddToCart={handleAddToCart}
            />
          )}
        </div>
      </main>

      {/* Carrinho Lateral com LocalStorage */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onOpenCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Modal de Checkout Assíncrono com Promises */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        onPurchaseSuccess={handlePurchaseSuccess}
      />

      {/* Rodapé */}
      <footer className="footer">
        <p>© 2026 EcoTrend - Projeto Universitário Front-end Sustentável. Feito com React.</p>
      </footer>
    </div>
  );
}

