# 🌱 EcoTrend - E-commerce Sustentável (Projeto Acadêmico)

O **EcoTrend** é um e-commerce especializado em produtos ecológicos e sustentáveis (moda consciente, cosméticos biodegradáveis, utilidades domésticas e tecnologia verde), desenvolvido com **React** e **JavaScript Moderno**.

---

## 🚀 Como Executar no seu Computador

Você tem **duas formas** de rodar o projeto:

### Opção 1: Execução com 1 Clique (Sem precisar instalar nada!)
1. Abra a pasta `ecotrend` na sua Área de Trabalho.
2. Dê um duplo-clique no arquivo **`rodar_loja.bat`**.
3. O servidor local iniciará e seu navegador abrirá automaticamente em `http://localhost:3000`.

*(Alternativamente, você também pode dar duplo-clique diretamente no arquivo `index.html` e abrir em qualquer navegador).*

---

### Opção 2: Modo de Desenvolvimento Profissional (Vite + React)
Caso queira rodar via terminal com recarregamento instantâneo (HMR) e instalar o Node.js:
1. Instale o [Node.js LTS](https://nodejs.org/).
2. Abra o terminal na pasta `ecotrend` e execute:
```bash
npm install
npm run dev
```

---

## 🛠️ Tecnologias & Conceitos Implementados

| Funcionalidade | Implementação Técnica |
| :--- | :--- |
| **Fake API & Fetch** | Carregamento assíncrono do `produtos.json` usando `async/await` com tratamento de erro (`try/catch/finally`). |
| **Feedback Visual (Loading)** | Componente `LoadingSpinner` com ícone animado durante a espera da requisição. |
| **Filtros Dinâmicos** | Filtragem por busca textual, categoria, preço máximo e ordenação em tempo real via `useMemo`. |
| **Carrinho Persistente** | Gerenciamento de estado com inicialização preguiçosa (*lazy initialization*) e persistência no `localStorage`. |
| **Checkout Simulado** | Execução de **Promises** com validação de campos, simulação de latência de rede e retorno de sucesso/erro assíncrono. |
| **Design & Ícones** | Google Fonts (*Plus Jakarta Sans*) e Font Awesome 6. |

---

## 📂 Estrutura de Arquivos

```text
ecotrend/
├── produtos.json         # Base de dados dos produtos sustentáveis
├── index.html            # Aplicação React 18 completa executável
├── style.css             # Estilização moderna e responsiva
├── rodar_loja.bat        # Executável para abrir a loja com um clique
├── package.json          # Dependências do ecossistema Vite
├── vite.config.js        # Configuração do bundler Vite
├── public/
│   └── produtos.json
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── App.css
    └── components/
        ├── Navbar.jsx
        ├── Filters.jsx
        ├── ProductCard.jsx
        ├── ProductList.jsx
        ├── Cart.jsx
        ├── CheckoutModal.jsx
        └── LoadingSpinner.jsx
```

---

## 🌐 Deploy na Nuvem

### Vercel (Recomendado)
1. Suba esta pasta para um repositório no seu GitHub (`git init`, `git add .`, `git commit -m "feat: initial commit"`, `git push`).
2. Acesse [vercel.com](https://vercel.com), faça login com o GitHub e selecione o repositório `ecotrend`.
3. O build Vite será detectado automaticamente. Clique em **Deploy**.

