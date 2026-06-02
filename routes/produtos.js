const express = require('express');
const router = express.Router();
const db = require('../db');

// GET - Listar todos os produtos (com nome do cliente via JOIN)
router.get('/', async (req, res) => {
  try {
    const result = await db.query(`
      SELECT p.*, c.nome AS cliente_nome
      FROM produtos p
      LEFT JOIN clientes c ON p.cliente_id = c.id
      ORDER BY p.id
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// GET - Buscar produto por ID
router.get('/:id', async (req, res) => {
  try {
    const result = await db.query(`
      SELECT p.*, c.nome AS cliente_nome
      FROM produtos p
      LEFT JOIN clientes c ON p.cliente_id = c.id
      WHERE p.id = $1
    `, [req.params.id]);
    if (result.rows.length === 0)
      return res.status(404).json({ erro: 'Produto não encontrado' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// POST - Criar produto
router.post('/', async (req, res) => {
  const { nome, preco, estoque, cliente_id } = req.body;
  if (!nome || preco === undefined)
    return res.status(400).json({ erro: 'Nome e preço são obrigatórios' });
  try {
    const result = await db.query(
      'INSERT INTO produtos (nome, preco, estoque, cliente_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [nome, preco, estoque || 0, cliente_id || null]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// PUT - Atualizar produto
router.put('/:id', async (req, res) => {
  const { nome, preco, estoque, cliente_id } = req.body;
  if (!nome || preco === undefined)
    return res.status(400).json({ erro: 'Nome e preço são obrigatórios' });
  try {
    const result = await db.query(
      'UPDATE produtos SET nome=$1, preco=$2, estoque=$3, cliente_id=$4 WHERE id=$5 RETURNING *',
      [nome, preco, estoque || 0, cliente_id || null, req.params.id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ erro: 'Produto não encontrado' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// DELETE - Remover produto
router.delete('/:id', async (req, res) => {
  try {
    const result = await db.query(
      'DELETE FROM produtos WHERE id=$1 RETURNING *',
      [req.params.id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ erro: 'Produto não encontrado' });
    res.json({ mensagem: 'Produto removido com sucesso', produto: result.rows[0] });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

module.exports = router;
