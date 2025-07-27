# 📆 Portfolio API (Fastify) · Private Repo

API pessoal desenvolvida para alimentar o meu portfólio. Esta aplicação foi construída com foco em performance, estrutura profissional e documentação automatizada via Swagger.

> ⚠️ Este repositório é privado e serve como backend da minha aplicação de portfólio pessoal.

---

## 🚀 Tecnologias Utilizadas

* [Fastify](https://www.fastify.dev/) - Web framework rápido e minimalista
* [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - Banco de dados NoSQL na nuvem
* [Mongoose](https://mongoosejs.com/) - ODM para MongoDB
* [Swagger](https://swagger.io/) + [@fastify/swagger-ui](https://github.com/fastify/fastify-swagger) - Documentação de API
* [Vercel](https://vercel.com/) - Deploy Serverless
* [dotenv](https://www.npmjs.com/package/dotenv) - Gerenciamento de variáveis ambiente

---

## 📂 Estrutura do Projeto

```
.
├── api/
│   └── index.js           # Função serverless da Vercel (Fastify + Swagger)
├── config/
│   └── db.config.js       # String de conexão MongoDB
├── controllers/           # Lógica das rotas
├── models/                # Esquemas Mongoose
├── routes/                # Plugins Fastify com validações e Swagger
├── server.js              # Ponto de entrada local para testes
└── .env                   # Variáveis de ambiente (não versionado)
```

---

## 📌 Objetivo

Essa API serve como backend para:

* Meu site pessoal (portfólio frontend)
* Página de serviços que eu presto
* Meus projetos com filtros por categoria
* Tecnologias que domino
* Formulário de contato com backend

---

## 📡 Rotas disponíveis

| Recurso      | Rota base           | Métodos                  |
| ------------ | ------------------- | ------------------------ |
| Perfil       | `/api/profile`      | `GET`, `POST`            |
| Projetos     | `/api/projects`     | `GET`, `GET/:id`, `POST` |
| Serviços     | `/api/services`     | `GET`, `POST`            |
| Tecnologias  | `/api/technologies` | `GET`, `POST`            |
| Contato      | `/api/contact`      | `POST`                   |
| Swagger Docs | `/api-docs`         | `GET` (interface visual) |

---

## 🛠️ Como usar localmente

1. Clone este repositório privado:

   ```bash
   git clone git@github.com:bfrpaulondev/portfolio-api.git
   cd portfolio-api
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Crie o arquivo `.env`:

   ```env
   MONGO_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/portfolio
   PORT=3000
   ```

4. Inicie o servidor local:

   ```bash
   node server.js
   ```

5. Acesse:

   * API: `http://localhost:3000/api/profile`
   * Docs: `http://localhost:3000/api-docs`

---

## 🔢 Testando na Vercel

* O entry point serverless está em `/api/index.js`
* Swagger funciona em `/api-docs`
* Sem necessidade de `listen()`, Vercel cuida disso

---

## 📁 Anotações internas

* Todas as rotas usam JSON Schema para validação
* `controllers/` seguem padrão async/await com `reply.code().send()`
* `models/` usam timestamps automáticos
* MongoDB via Atlas (free tier)
* O projeto foi migrado de Express para Fastify

---

## 💡 Melhorias futuras

* [ ] Autenticação com JWT
* [ ] Painel admin com Next.js
* [ ] Envio de e-mails com Nodemailer
* [ ] Testes automatizados com Vitest
* [ ] Limitação de rate (`@fastify/rate-limit`)

---

## 👨‍💻 Autor

> **Bruno Paulon**
> [LinkedIn](https://www.linkedin.com/in/bruno-paulon)
> [bfrpaulondev@gmail.com](mailto:bfrpaulondev@gmail.com)
