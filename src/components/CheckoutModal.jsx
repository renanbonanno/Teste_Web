import React, { useState } from 'react';

export default function CheckoutModal({ isOpen, onClose, cartItems, onPurchaseSuccess }) {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    paymentMethod: 'pix'
  });

  const [status, setStatus] = useState('idle'); // 'idle' | 'processing' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');
  const [orderDetails, setOrderDetails] = useState(null);

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * Simulação da API de Checkout usando Promise com resolução ou rejeição assíncrona.
   */
  const processCheckoutPromise = (orderData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!orderData.name.trim() || !orderData.email.trim()) {
          reject(new Error('Por favor, preencha todos os campos obrigatórios.'));
          return;
        }

        if (!orderData.email.includes('@')) {
          reject(new Error('Insira um endereço de e-mail válido.'));
          return;
        }

        const isPaymentApproved = Math.random() > 0.05;

        if (isPaymentApproved) {
          resolve({
            orderId: `ECO-${Math.floor(100000 + Math.random() * 900000)}`,
            message: 'Pedido realizado com sucesso! Um certificado de árvore plantada foi enviado ao seu e-mail.',
            total: orderData.total
          });
        } else {
          reject(new Error('A operadora de pagamento recusou a transação. Tente novamente.'));
        }
      }, 2000);
    });
  };

  const handleFinalizeOrder = async (e) => {
    e.preventDefault();
    setStatus('processing');
    setErrorMessage('');

    try {
      const result = await processCheckoutPromise({
        ...formData,
        total,
        items: cartItems
      });

      setStatus('success');
      setOrderDetails(result);
      onPurchaseSuccess();
    } catch (err) {
      setStatus('error');
      setErrorMessage(err.message || 'Erro inesperado no checkout.');
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="checkout-modal">
        <div className="modal-header">
          <h3><i className="fa-solid fa-shield-halved"></i> Checkout Seguro</h3>
          {status !== 'processing' && (
            <button className="close-modal-btn" onClick={onClose}>
              <i className="fa-solid fa-xmark"></i>
            </button>
          )}
        </div>

        {status === 'idle' && (
          <form onSubmit={handleFinalizeOrder} className="checkout-form">
            <p className="checkout-intro">
              Total a pagar: <strong>R$ {total.toFixed(2)}</strong> ({cartItems.length} itens)
            </p>

            <div className="form-field">
              <label htmlFor="name">Nome Completo</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Ex: Maria Silva"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-field">
              <label htmlFor="email">E-mail para Confirmação</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Ex: maria@ecotrend.com"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-field">
              <label>Forma de Pagamento</label>
              <div className="payment-options">
                <label className="payment-radio">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="pix"
                    checked={formData.paymentMethod === 'pix'}
                    onChange={handleInputChange}
                  />
                  <span><i className="fa-brands fa-pix"></i> PIX (Aprovação Imediata)</span>
                </label>
                <label className="payment-radio">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={handleInputChange}
                  />
                  <span><i className="fa-regular fa-credit-card"></i> Cartão de Crédito</span>
                </label>
              </div>
            </div>

            <button type="submit" className="confirm-order-btn">
              Confirmar Pagamento de R$ {total.toFixed(2)}
            </button>
          </form>
        )}

        {status === 'processing' && (
          <div className="checkout-status-box">
            <div className="spinner">
              <i className="fa-solid fa-circle-notch fa-spin"></i>
            </div>
            <h4>Processando seu pedido...</h4>
            <p>Validando pagamento e calculando a compensação ecológica de carbono da entrega.</p>
          </div>
        )}

        {status === 'success' && (
          <div className="checkout-status-box success">
            <i className="fa-solid fa-circle-check success-icon"></i>
            <h4>Parabéns pela Escolha Sustentável!</h4>
            <p className="order-number">Código do Pedido: <strong>{orderDetails?.orderId}</strong></p>
            <p className="order-msg">{orderDetails?.message}</p>
            <button className="confirm-order-btn" onClick={onClose}>
              Voltar à Loja
            </button>
          </div>
        )}

        {status === 'error' && (
          <div className="checkout-status-box error">
            <i className="fa-solid fa-circle-exclamation error-icon"></i>
            <h4>Falha no Processamento</h4>
            <p className="error-msg">{errorMessage}</p>
            <button className="retry-btn" onClick={() => setStatus('idle')}>
              Tentar Novamente
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

