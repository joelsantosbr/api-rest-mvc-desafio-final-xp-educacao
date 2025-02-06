# Objetivo

Este projeto tem como objetivo a implementação de uma API REST para gerenciamento de produtos genéricos. O projeto foi desenvolvido para fins de estudo e validação de conhecimento no curso de Pós-Graduação em Arquitetura de Software da XP Educação.

A API foi projetada seguindo o padrão arquitetural MVC (Model-View-Controller), garantindo uma separação clara entre a camada de dados (Model), a lógica de aplicação (Controller) e as rotas (View no contexto da API). Além disso, foram aplicadas boas práticas de arquitetura, utilizando TypeScript, Fastify e SQLite3, com documentação e validação das rotas por meio de Swagger e TypeBox.

A API foi configurada para rodar na porta 5050, evitando conflitos com outros projetos pessoais.
A documentação foi gerada automaticamente com Swagger e pode ser acessada em http://localhost:5050/docs ao iniciar a aplicação.

Todos os endpoints listados abaixo utilizam a seguinte URL base: http://localhost:5050.
Exemplo de consumo: http://localhost:5050/products.

## Tech stack

As principais ferramentas/tecnologias utilizadas no projeto:

- Nodejs@^22.13.1
- Typescript
- Fastify
- Swagger
- Typebox
- Sqlite3

## Como rodar a aplicação

Realizar build dos arquivos
```npm run build``` 

Rodar o servidor
```npm run start``` 

🚀 Servidor rodando em http://localhost:5050
📄 Swagger Docs disponível em http://localhost:5050/docs
