const express = require('express');
const router = express.Router();
const db = require('../db');

// GET - Listar todos os clientes
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM clientes ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// GET - Buscar cliente por ID
router.get('/:id', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM clientes WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0)
      return res.status(404).json({ erro: 'Cliente não encontrado' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// POST - Criar cliente
router.post('/', async (req, res) => {
  const { nome, email, telefone } = req.body;
  if (!nome || !email)
    return res.status(400).json({ erro: 'Nome e email são obrigatórios' });
  try {
    const result = await db.query(
      'INSERT INTO clientes (nome, email, telefone) VALUES ($1, $2, $3) RETURNING *',
      [nome, email, telefone || null]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    if (err.code === '23505')
      return res.status(409).json({ erro: 'Email já cadastrado' });
    res.status(500).json({ erro: err.message });
  }
});

// PUT - Atualizar cliente
router.put('/:id', async (req, res) => {
  const { nome, email, telefone } = req.body;
  if (!nome || !email)
    return res.status(400).json({ erro: 'Nome e email são obrigatórios' });
  try {
    const result = await db.query(
      'UPDATE clientes SET nome=$1, email=$2, telefone=$3 WHERE id=$4 RETURNING *',
      [nome, email, telefone || null, req.params.id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ erro: 'Cliente não encontrado' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// DELETE - Remover cliente
router.delete('/:id', async (req, res) => {
  try {
    const result = await db.query(
      'DELETE FROM clientes WHERE id=$1 RETURNING *',
      [req.params.id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ erro: 'Cliente não encontrado' });
    res.json({ mensagem: 'Cliente removido com sucesso', cliente: result.rows[0] });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

module.exports = router;
