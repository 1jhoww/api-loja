const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

pool.connect()
  .then(() => console.log('Conectado ao banco de dados Supabase!'))
  .catch(err => console.error('Erro ao conectar:', err.message));

module.exports = pool;
