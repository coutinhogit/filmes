# 🎬 Simon Filmes - IMDB Top 1000

Aplicação Full Stack desenvolvida para explorar, filtrar e visualizar os 1000 melhores filmes avaliados no IMDB. O projeto consiste em uma **API RESTful** robusta que processa dados de um arquivo CSV e um **Front-End** moderno e responsivo.

---

## 🔗 Links do Projeto (Deploy)

| Aplicação | Status | Link de Acesso | Hospedagem |
| :--- | :--- | :--- | :--- |
| **Front-End (Site)** | ✅ Online | [**Acessar Site**](https://simon-filmes.vercel.app/) | Vercel |
| **Back-End (API)** | ✅ Online | [**Acessar API**](https://api-simon-filmes.onrender.com/) | Render |

> **Nota:** Como a API está hospedada no plano gratuito do Render, o primeiro carregamento pode levar cerca de 1 minuto para "acordar" o servidor.

---

## 🖼️ Preview do Projeto

Abaixo uma visualização da tela inicial do projeto, exibindo o catálogo de filmes, os cards e a barra lateral de filtros.

<div align="center">
  <img src="https://i.ibb.co/dxM94q7/Captura-de-tela-2025-12-23-190327.png" alt="Screenshot da tela inicial do Simon Filmes" width="100%">
</div>

---

## 🛠️ Tecnologias Utilizadas

### Front-End
* **React + Vite:** Performance e desenvolvimento ágil.
* **Axios:** Gerenciamento de requisições HTTP.
* **CSS Modules:** Estilização organizada e responsiva.
* **Hooks:** Uso de `useState` e `useEffect` para controle de estado e ciclo de vida.

### Back-End
* **Node.js & Express:** Servidor para gerenciamento de rotas.
* **CSV-Parser:** Processamento e leitura do dataset `data.csv`.
* **CORS:** Controle de acesso para permitir requisições do Front-End.
* **File System (fs) & Path:** Manipulação segura de arquivos em diferentes sistemas operacionais (Linux/Windows).

---

## ⚡ Funcionalidades

### Interface (Front-End)
* **Catálogo Visual:** Exibição dos filmes em cards com pôsteres originais.
* **Filtros Dinâmicos:** * Busca por nome (Search).
    * Filtro por Gênero (Drama, Action, Crime, etc.).
    * Filtro por Nota IMDB (ex: 8.0+, 9.0+).
* **Modal de Detalhes:** Visualização expandida com sinopse, diretor, duração e ano.
* **Feedback Visual:** Indicadores de carregamento e mensagens de erro amigáveis.

### API (Back-End)
A API suporta filtros avançados via *Query Params*:
* **Filtragem de Texto:** `?series_title=Godfather`, `?genre=Action`
* **Filtragem Numérica:** `?imdb_rating_gt=9` (maior que), `?released_year_eq=2008` (igual a).
* **Ordenação:** `?sort=imdb_rating:desc`
* **Paginação:** `?pag=1&pag-size=20`

---

## 📚 Documentação da API

### 1. Listar Filmes
Retorna a lista de filmes (pode ser filtrada).

* **Rota:** `GET /movies`
* **Exemplos de Uso:**
    * Todos os filmes: `/movies`
    * Filmes de Ação: `/movies?genre=Action`
    * Nota maior que 9.0: `/movies?imdb_rating_gt=9`
    * Ordenado por ano: `/movies?sort=released_year:desc`

### 2. Detalhes do Filme
Retorna os dados completos de um único filme.

* **Rota:** `GET /movies/:id`
* **Parâmetro:** `:id` (ID numérico do filme na lista)
* **Exemplo:** `/movies/1` (Retorna "The Shawshank Redemption")

---

## 🚀 Como Rodar Localmente

Siga estes passos para clonar e rodar o projeto na sua máquina:

### 1. Clonar o Repositório
```bash
git clone [https://github.com/coutinhogit/filmes.git](https://github.com/coutinhogit/filmes.git)
cd filmes
