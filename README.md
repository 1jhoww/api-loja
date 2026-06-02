# API Loja - Node.js + Supabase

## Setup

1. Instale as dependências:
```
npm install
```

2. Copie `.env.example` para `.env` e preencha com sua connection string do Supabase:
```
cp .env.example .env
```

3. Execute o `banco.sql` no SQL Editor do Supabase.

4. Inicie o servidor:
```
npm start
```

## Deploy no Railway
- Faça push para o GitHub
- Conecte o repositório no Railway.app
- Adicione a variável DATABASE_URL nas configurações do Railway

## Rotas
| Método | Endpoint        | Ação              |
|--------|-----------------|-------------------|
| GET    | /clientes       | Lista todos       |
| GET    | /clientes/:id   | Busca por ID      |
| POST   | /clientes       | Cria novo         |
| PUT    | /clientes/:id   | Atualiza          |
| DELETE | /clientes/:id   | Remove            |
| GET    | /produtos       | Lista todos       |
| GET    | /produtos/:id   | Busca por ID      |
| POST   | /produtos       | Cria novo         |
| PUT    | /produtos/:id   | Atualiza          |
| DELETE | /produtos/:id   | Remove            |
