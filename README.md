# EshoBN (Eshop Bom negócio)

Uma aplicação frontend moderna de e-commerce construída com Angular 19, inspirada na interface de usuário da Amazon. Este projeto oferece uma experiência completa de compra com navegação de produtos, gerenciamento de carrinho e funcionalidade de checkout.


## 🚀 Funcionalidades

Catálogo de Produtos: Navegue por uma variedade de produtos com informações detalhadas

Carrinho de Compras: Adicione produtos ao carrinho e gerencie as quantidades

Autenticação de Usuário: Funcionalidade de login

Processo de Checkout: Fluxo completo de compra com informações de endereço e pagamento (Em andamento)

Design Responsivo: Otimizado para dispositivos desktop e mobile utilizando Tailwind CSS

Página de Sucesso do Pagamento: Página de confirmação após a finalização da compra

## 🛠️ Stack de Tecnologias

Framework: Angular 19.x

Estilização: Tailwind CSS 4.x com componentes Flowbite

Gerenciamento de Estado: Serviços nativos do Angular

Roteamento: Angular Router

Dados Mockados: Dados simulados de produtos e usuários

## 📋 Pré-requisitos

Node.js (v18.x ou superior)

npm (v9.x ou superior)

Angular CLI (v19.x)

🔧 Instalação

Clone o repositório:

git clone https://github.com/mayconbaptista/BomNegocio_v2.git

cd BomNegocio_v2

Instale as dependências:

npm install

Inicie o servidor de desenvolvimento:

npm start

Abra o navegador e acesse:

http://localhost:4200

## 🏗️ Arquitetura

📁 Estrutura do Projeto

Arquitetura Baseada em Funcionalidades (Feature-Based Architecture).

```plaintext
src/app/
├── core/
│   ├── services/         # Serviços Singleton (AuthService, LoggerService)
│   ├── guards/           # Guardas de rota (AuthGuard)
│   ├── interceptors/     # Interceptadores HTTP
│   └── models/           # Modelos globais
│
├── features/
│   ├── products/
│   │   ├── components/
│   │   │   ├── product-list/
│   │   │   └── product-detail/
│   │   ├── services/
│   │   │   └── product.service.ts
│   │   ├── models/
│   │   │   └── product.model.ts
│   │   ├── products-routing.module.ts
│   │   └── products.module.ts
│   │
│   ├── cart/
│   │   ├── components/
│   │   │   └── cart-summary/
│   │   ├── services/
│   │   │   └── cart.service.ts
│   │   ├── cart-routing.module.ts
│   │   └── cart.module.ts
│
├── shared/
│   ├── components/
│   ├── directives/
│   ├── pipes/
│   └── shared.module.ts
│
├── app-routing.module.ts
├── app.component.ts
└── app.module.ts
```

npm start: Inicia o servidor de desenvolvimento

npm run build: Gera a build para produção

npm test: Executa os testes unitários

npm run watch: Compila e observa alterações no modo de desenvolvimento

## 📦 Deploy

Gere a aplicação para produção:

npm run build

Isso irá gerar arquivos estáticos otimizados no diretório dist/, que podem ser publicados em qualquer serviço de hospedagem estática.

## 🤝 Contribuindo

Faça um fork do repositório

Crie uma branch para sua funcionalidade (git checkout -b feature/minha-feature-incrivel)

Faça commit das alterações (git commit -m 'Adiciona funcionalidade incrível')

Envie para a branch (git push origin feature/minha-feature-incrivel)

Abra um Pull Request