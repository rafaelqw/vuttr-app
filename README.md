# Introdução

Front-End para a API e banco de dados fornecidados na aplicação VUTTR (Very Useful Tools to Remember). A aplicação é um simples repositório para gerenciar ferramentas com seus respectivos nomes, links, descrições
e tags.

## Requisitos
- NodeJS

# Instalação

### 1 - NodeJS
- Faça download da versão LTS do [NodeJS](https://nodejs.org/en/) e instale-o.

### 2 - Projeto
- Dê um GIT CLONE nesse projeto.
- Abra seu terminal na pasta do projeto e instale as dependências necessárias com o comando abaixo:

```javascript
yarn
// ou
npm install
```

### 3 - Configuração de apontamento da API para consulta
No arquivo `./src/services/api.tsx` contém a url de apontamento da API, caso for preciso faça a alteração para o Host correto.

# Uso

### 1 - Aplicação
- Inicie a Aplicação com o comando abaixo:

```javascript
yarn dev
// ou
npm dev
```

Após rodar o comando acima, sua Aplicação estará disponível na porta 3001