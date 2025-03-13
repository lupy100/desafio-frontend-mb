<h1 align="center">
  <br>
  <a href="https://desafio-frontend-mb-client.vercel.app/"><img src="https://github.com/user-attachments/assets/3081b43a-0c60-4a8f-9197-5f30d7bff550" alt="Logo Mercado Bitcoin" width="200"></a>
  <br>
  Desafio Frontend Mercado Bitcoin
  <br>
</h1>
<p align="center">
  <img alt="desafio" src="https://img.shields.io/badge/-Desafio-orange">
  <img alt="front-end" src="https://img.shields.io/badge/-Front-red">
  <img alt="vue" src="https://img.shields.io/badge/-Vue-42b883">
  <img alt="node" src="https://img.shields.io/badge/-Node-339933">
  <img alt="web" src="https://img.shields.io/badge/-Web-green">
</p>
<h4 align="center">O principal objetivo desse desafio é demonstrar minhas habilidades no desenvolvimento de aplicações web utilizando Vue.js.</h4>

<p align="center">
  <a href="#-demonstração">Demonstração</a> •
  <a href="#%EF%B8%8F-rodando-o-projeto-localmente">Rodando o projeto localmente</a> •
  <a href="#-estrutura-do-projeto">Estrutura do projeto</a> •
  <a href="#-tecnologias">Tecnologias</a> •
  <a href="#-design">Design</a>•
  <a href="#-funcionalidades">Funcionalidades</a> •
  <a href="#-notas">Notas</a>
</p>

## 💻 Demonstração

### Acesse [desafio-mb.com](https://desafio-frontend-mb-client.vercel.app/) para live demo.

### Demonstração do fluxo simples

https://github.com/user-attachments/assets/db47a1cb-09fd-4dc7-8820-34a1e09b63bf

## ⚛️ Rodando o projeto localmente

### Requisitos

É necessário ter o [Node.js](https://nodejs.org/en/) e o [Git](https://git-scm.com/downloads) instalado.

> [!IMPORTANT]
> Durante o desenvolvimento foi utilizada a versão [22.12.0](https://nodejs.org/dist/v22.12.0/) do node e a versão [10.9.0](https://www.npmjs.com/package/npm/v/10.9.0) do npm dentro de um ambiente windows 11.

Para rodar o projeto entre no terminal e digite os comandos:

```bash
# Clone o repositório
$ git clone https://github.com/lupy100/desafio-frontend-mb.git

# Entre na pasta do repositório
$ cd desafio-frontend-mb

# Instale as dependências
$ npm install

# Rode o projeto localmente em modo de desenvolvimento
$ npm run dev

# Acesse:
# Frontend: http://localhost:3000/
# Backend: http://localhost:5000/
```

Ou para executar em modo de produção

```bash
$ npm run start

# Acesse a página de registro:
# http://localhost:5000/registration
```

Para rodar os testes utilize o comando:

```bash
$ npm run test
```

## 📁 Estrutura do projeto

O projeto utiliza uma arquitetura de monorepo com Turborepo, organizando o código em client, server e pacotes compartilhados.

```
📦desafio-frontend-mb
 ┣ 📂apps
 ┃ ┣ 📂client (Frontend Vue.js)
 ┃ ┃ ┣ 📂src
 ┃ ┃ ┃ ┣ 📂api
 ┃ ┃ ┃ ┣ 📂assets
 ┃ ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┣ 📂composables
 ┃ ┃ ┃ ┣ 📂pages
 ┃ ┃ ┃ ┃ ┣ 📂RegistrationForm
 ┃ ┃ ┃ ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜WelcomeStep.vue
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜PersonInfoStep.vue
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜PasswordStep.vue
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜ReviewStep.vue
 ┃ ┃ ┃ ┃ ┃ ┗ 📜RegistrationForm.vue
 ┃ ┃ ┃ ┣ 📜App.vue
 ┃ ┃ ┃ ┗ 📜main.js
 ┃ ┃ ┣ 📂tests
 ┃ ┃ ┣ 📂public
 ┃ ┃ ┗ 📜package.json
 ┃ ┗ 📂server (Backend Node.js/Express)
 ┃ ┃ ┣ 📂src
 ┃ ┃ ┃ ┗ 📜index.js
 ┃ ┃ ┗ 📜package.json
 ┣ 📂packages
 ┃ ┗ 📂shared (Código compartilhado entre client e server)
 ┃ ┃ ┣ 📂constants
 ┃ ┃ ┗ 📂utils
 ┣ 📜package.json
 ┣ 📜turbo.json
 ┗ 📜README.md
```

## 🚀 Tecnologias

### Gerenciador de pacotes

Durante o desenvolvimento o [npm](https://www.npmjs.com/) foi escolhido como gerenciador de dependências.

### Principais dependências

#### Frontend (Vue.js)

- [Vue 3](https://vuejs.org/) como framework principal
- [Vite](https://vitejs.dev/) para build e desenvolvimento
- [Vitest](https://vitest.dev/) para testes unitários
- [SASS](https://sass-lang.com/) para estilo CSS

#### Backend (Node.js)

- [Express](https://expressjs.com/) como framework web
- [Cors](https://www.npmjs.com/package/cors) para habilitar CORS
- [Nodemon](https://nodemon.io/) para desenvolvimento

#### Ferramentas de desenvolvimento

- [Turborepo](https://turbo.build/) para gerenciamento do monorepo
- [ESLint](https://eslint.org/) para linting de código
- [Prettier](https://prettier.io/) para formatação de código
- [Stylelint](https://stylelint.io/) para linting de CSS
- [Husky](https://typicode.github.io/husky/) para git hooks

## 🎨 Design

### Layout sugerido

![layout sugerido](https://github.com/user-attachments/assets/02b11b39-2ebc-4d53-9b74-2bd913b44076)

## 🔍 Funcionalidades

Como descrito no escopo do [teste](https://github.com/mercadobitcoin/desafio-mb-web), o projeto consiste em um formulário de cadastro com validação em múltiplas etapas:

1. **Etapa de Boas-vindas**: Coleta de e-mail e tipo de pessoa (física/jurídica)
2. **Etapa de Informações Pessoais**: Coleta de nome, documento (CPF/CNPJ), data(nascimento/abertura) e telefone
3. **Etapa de Senha**: Definição de senha com requisitos de segurança
4. **Etapa de Revisão**: Confirmação dos dados antes do envio

Todas as etapas possuem validação tanto no frontend quanto no backend, garantindo a integridade dos dados.

## 📝 Notas

Meu ambiente de desenvolvimento foi recentemente montado, pois precisei formatar o Windows do meu computador. Caso encontre dificuldades para rodar o projeto, por favor, tente utilizar a mesma versão do Node.js e npm citadas na seção de <a href="#requisitos">Requisitos</a>.

---

Feito com 🤍 por João Matheus
