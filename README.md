<h1 align="center">
 Marvel Heroes Search
</h1>

<!-- Badges -->
<p align="center">
  <a href="https://marvel-universe-roan.vercel.app/" target="_blank"><img alt="Marvel Search Heroes" title="Marvel Search Heroes" src="https://img.shields.io/badge/Aplica%C3%A7%C3%A3o-Marvel Search Heroes-FF1510" />
  <img alt="Repository size" src="https://img.shields.io/github/repo-size/henrypadua/marvel-universe?color=FF1510">
  <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/henrypadua/marvel-universe?color=FF1510">
  <img alt="License" src="https://img.shields.io/badge/license-MIT-FF1510?color=FF1510">
</p>

<!-- Indice-->
<p align="center">
 <a href="#computer-sobre">Sobre</a> •
 <a href="#gear-funcionalidades">Funcionalidades</a> •
 <a href="#wrench-tecnologias-utilizadas">Tecnologias</a> •
 <a href="#rocket-executando-o-projeto">Executando</a> •
 <a href="#memo-licença">Licença</a>
</p>

## :computer: Sobre

O **Marvel Search Heroes** foi um projeto criado utilizando a [api da Marvel](https://developer.marvel.com/). Seu principal objetivo é desenvolver uma aplicação de listagem e detalhe de personagens de quadrinhos.

## :gear: Funcionalidades

- Tradução
  - [x] Inglês
  - [x] Português
  - [x] Espanhol

- Página de listagem de personagens (home):
  - [x] Exibir os 20 primeiros resultados da API;
  - [x] Permitir ordenação por nome do personagem;
  - [x] Permitir filtrar por nome, pelo campo de busca;
  - [x] Permitir mostrar apenas os personagens favoritos;
  - [x] Permitir o usuário favoritar/desfavoritar até 5 personagens;
- Página de detalhe do personagem:
  - [x] Exibir dados do personagem;
  - [x] Exibir últimos 10 quadrinhos lançados deste personagem (onSaleDate);
  - [x] Permitir o usuário favoritar/desfavoritar (dentro do limite de 5).

- Bônus
  - [x] Adicionar paginação a listagem para exibir além dos 20 personagens iniciais;
  - [x] Persistir os dados de favoritos (para manter os dados após o reload da página);
  - [x] Layout responsivo;
  - [x] Utilização de ES6+;
  - [x] Utilização de ferramentas para garantir a qualidade do código;
  - [x] Testes unitários
  - [x] CI/CD - Vercel

## :wrench: Tecnologias Utilizadas

Esse projeto foi desenvolvido com as seguintes tecnologias:

- React
- NextJs
- i18n
- React-query
- TailWind CSS
- Jest
- React Testing library
- EsLint
- Prettier

## :rocket: Executando o projeto

### Pré-requisitos

Para executar o projeto é necessário ter instalado as seguintes ferramentas:



### Baixando e configurando aplicação

```bash
# Clone este repositório
$ git clone https://github.com/henrypadua/marvel-universe.git

# Acesse a pasta do projeto no seu terminal/cmd
$ cd marvel-universe

# Instale as dependências
$ npm install

# Dentro do arquivo .env troque o valor da variável de ambiente NEXT_PUBLIC_API_KEY pela apikey disponibilizada pela api da Marvel em https://developer.marvel.com/

# NEXT_PUBLIC_API_KEY=[sua chave de api]
```

### Rodando aplicação web

```bash
# Execute a aplicação em modo de desenvolvimento
$ npm run dev

# A aplicação será aberta na porta:3000 - acesse http://localhost:3000
```

### Rodando testes

```bash
# Execute a aplicação em modo de teste
$ npm run test

# No terminal será mostrado um resultado como abaixo

 PASS  src/__tests__/components/HeroCard.test.tsx
 PASS  src/__tests__/components/Footer.test.tsx
 PASS  src/__tests__/components/Pagination.test.tsx
 PASS  src/__tests__/components/HeaderHome.test.tsx
 PASS  src/__tests__/services/useGetCharacters.test.tsx
 PASS  src/__tests__/modules/InfoHero.test.tsx
 PASS  src/__tests__/services/useGetComics.test.tsx
 PASS  src/__tests__/services/useGetDetailCharacter.test.tsx
 PASS  src/__tests__/pages/Home.test.tsx
 PASS  src/__tests__/components/AutoComplete.test.tsx
 PASS  src/__tests__/pages/DetalheHeroi.test.tsx
 PASS  src/__tests__/components/HeroList.test.tsx

Test Suites: 14 passed, 14 total
Tests:       48 passed, 48 total
Snapshots:   0 total
Time:        7.999 s
Ran all test suites.
Watch Usage: Press w to show more.
```