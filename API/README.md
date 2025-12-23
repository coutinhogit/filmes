# API de Filmes IMDB

## Descrição

Esta é uma **API RESTful em Node.js** que consome dados do arquivo CSV **`imdb_top_1000.csv`** (top 1000 filmes do IMDB) e expõe endpoints para consulta.

As rotas permitem:

* Retornar todos os filmes com **filtragem flexível** (busca por *contains* em qualquer campo)
* Retornar todos os filems com filtragem de **menor, igual, ou maior**, para campos numéricos
* **Ordenação** por qualquer campo do dataset
* **Paginação opcional**
* Busca de um filme específico por **ID** (índice baseado em 1)

O servidor utiliza **Express.js** e carrega os dados em memória, garantindo **simplicidade e performance rápida**.

A rota raiz (`GET /`) fornece uma mensagem de boas-vindas e uma **listagem automática das rotas**, parâmetros e campos disponíveis, facilitando a exploração da API.

---

## Campos Disponíveis

Os campos abaixo podem ser usados para **filtragem e ordenação**:

* `poster_link`
* `series_title`
* `released_year`
* `certificate`
* `runtime`
* `genre`
* `imdb_rating`
* `overview`
* `meta_score`
* `director`
* `star1`
* `star2`
* `star3`
* `star4`
* `no_of_votes`
* `gross`

---

## Instalação

1. Certifique-se de ter o **Node.js (versão 14 ou superior)** instalado:
   👉 [https://nodejs.org](https://nodejs.org)

2. Crie uma pasta para o projeto e navegue até ela:

    ```bash
    mkdir imdb-api
    cd imdb-api
    ```

3. Copie os arquivos para a raiz do projeto:

   * `package.json`
   * `index.js`
   * `README.md`
   * `imdb_top_1000.csv`

   > ⚠️ O arquivo CSV deve estar na **mesma hierarquia de index.js**.

4. Instale as dependências (você precisa estar no mesmo diretório de "package.json"):

    ```bash
    npm install
    ```

5. Inicie o servidor:

* Produção:

```bash
npm start
```

A API estará disponível em:

```http
http://localhost:3000
```

Observação: você pode sobrescrever a porta usando a variável de ambiente `PORT`. Exemplo (Windows cmd):

```cmd
set PORT=3001
node index.js
```

---

## Uso das Rotas

### GET `/`

#### Propósito da Rota

Fornece uma **introdução à API**, listando:

* Rotas disponíveis
* Exemplos de query strings
* Campos do dataset
* Observações importantes (como codificação de espaços)

Funciona como um **ponto de entrada** para desenvolvedores explorarem a API sem consultar documentação externa.

#### Exemplo de resposta

```json
{
  "message": "Bem-vindo à API de Filmes IMDB!",
  "availableRoutes": [...],
  "fieldsAvailable": ["poster_link", "series_title", "released_year", "genre", "imdb_rating", "director"],
  "note": "Use codificação URL para espaços em query params (ex: %20 para espaço)."
}
```

---

### GET `/movies`

#### Propósito

Retorna a lista completa de filmes ou uma versão **filtrada**, **ordenada** e/ou **paginada**. Ideal para buscas gerais, rankings e listagens customizadas.

#### Funcionamento

* **Sem query strings**: retorna todos os filmes
* **Filtragem**: busca parcial (*contains*), *case-insensitive*, em qualquer campo
* **Ordenação**: aplicada após a filtragem
* **Paginação**: opcional; se omitida, retorna todos os resultados

Campos numéricos são ordenados numericamente; strings são ordenadas alfabeticamente (*case-insensitive*).

---

## Query Strings Disponíveis

### Filtros por Campo

**Formato:**

```http
?campo=valor
```

#### Como funciona

* Aplica busca por **substring** (não exige correspondência exata)
* *Case-insensitive*
* Pode ser usado em **qualquer campo** do dataset
* Múltiplos filtros são combinados com **AND**

#### Exemplos de Filtros

```http
GET /movies?genre=Drama
GET /movies?director=Christopher%20Nolan
GET /movies?series_title=Godfather
GET /movies?genre=Action&director=Christopher

### Filtros Numéricos Comparativos (inteiros)

Para campos numéricos inteiros (`released_year`, `no_of_votes`, `gross`) você pode usar parâmetros especiais para comparação:

- `campo_gt=value` — maior que `value`
- `campo_lt=value` — menor que `value`
- `campo_eq=value` — igual a `value`

Exemplos:

```http
GET /movies?released_year_gt=2000      # filmes lançados após 2000
GET /movies?no_of_votes_gt=100000      # filmes com mais de 100k votos
GET /movies?gross_lt=50000000          # filmes com gross menor que 50M
GET /movies?released_year_eq=1994      # filmes do ano exato 1994
```

📌 **Dica para Frontend**: sempre use `encodeURIComponent()` para valores com espaços ou caracteres especiais.

---

### Ordenação (`sort`)

**Formato:**

```http
?sort=campo:ordem
```

* `ordem`: `asc` (padrão) ou `desc`
* Aceita qualquer campo do dataset

#### Exemplos de Uso

```http
GET /movies?sort=imdb_rating:desc
GET /movies?sort=released_year:asc
GET /movies?genre=Action&sort=gross:desc
```

---

### Paginação (`pag` e `pag-size`)

#### `pag`

Define o número da página:

```http
?pag=1
```

* Inteiro ≥ 1
* Erro **400** se inválido

#### `pag-size`

Define o número de itens por página:

```http
?pag-size=20
```

* Opcional (padrão: 10)
* Inteiro ≥ 1

#### Cálculo

```text
início = (pag - 1) * pag-size
fim     = início + pag-size
```

#### Exemplos

```http
GET /movies?pag=1&pag-size=50
GET /movies?sort=imdb_rating:desc&pag=1&pag-size=5
```

---

## Exemplos Completos

```http
GET http://localhost:3000/movies
GET http://localhost:3000/movies?genre=Crime&sort=director:asc
GET http://localhost:3000/movies?pag=1&pag-size=10
GET http://localhost:3000/movies?director=Quentin%20Tarantino&sort=released_year:desc&pag=1&pag-size=5
```

### Resposta de exemplo

```json
[
  {
    "series_title": "The Shawshank Redemption",
    "released_year": "1994",
    "genre": "Drama",
    "imdb_rating": "9.3",
    "director": "Frank Darabont"
  }
]
```

---

### GET `/movies/:id`

#### Propósito (id)

Busca um filme específico pelo **ID sequencial**, ideal para páginas de detalhes.

#### Funcionamento (id)

* ID válido: inteiro de **1 a 1000**
* Retorna o objeto completo do filme
* Erro **404** se inválido

#### Exemplo

```http
GET http://localhost:3000/movies/1
```

#### Resposta

```json
{
  "series_title": "The Shawshank Redemption",
  "released_year": "1994",
  "genre": "Drama",
  "imdb_rating": "9.3",
  "director": "Frank Darabont",
  "star1": "Tim Robbins",
  "overview": "Two imprisoned men bond over a number of years..."
}
```

---

## Tratamento de Erros

Todas as respostas de erro seguem o formato:

```json
{ "error": "Mensagem clara e descritiva" }
```

### Códigos

* **400 Bad Request** — Parâmetros inválidos (ex: `pag < 1`, `pag-size = 0`)
* **404 Not Found** — ID inexistente ou rota inválida
* **500 Internal Server Error** — Falhas internas ou erro ao carregar o CSV

---

## Estrutura do Projeto

```text
├── index.js           # Servidor Express e lógica de queries
├── package.json       # Dependências e scripts
├── imdb_top_1000.csv  # Dataset de filmes
└── README.md          # Documentação
```

---

## Testes

Ferramentas recomendadas:

* **Postman**
* **Insomnia**
* **curl**
* **Navegador**

Exemplo com curl:

```bash
curl "http://localhost:3000/movies?genre=Action"
```

---
