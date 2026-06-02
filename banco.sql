-- Execute este arquivo no SQL Editor do Supabase

-- Tabela 1: clientes
CREATE TABLE IF NOT EXISTS clientes (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  telefone VARCHAR(20),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabela 2: produtos (FK para clientes)
CREATE TABLE IF NOT EXISTS produtos (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  preco DECIMAL(10,2) NOT NULL,
  estoque INTEGER DEFAULT 0,
  cliente_id INTEGER REFERENCES clientes(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Inserções iniciais
INSERT INTO clientes (nome, email, telefone) VALUES
  ('Ana Souza', 'ana@email.com', '11999990001'),
  ('Carlos Lima', 'carlos@email.com', '11999990002'),
  ('Maria Oliveira', 'maria@email.com', '11999990003')
ON CONFLICT (email) DO NOTHING;

INSERT INTO produtos (nome, preco, estoque, cliente_id) VALUES
  ('Notebook Dell', 3499.99, 10, 1),
  ('Mouse Logitech', 149.90, 50, 1),
  ('Teclado Mecânico', 299.90, 25, 2),
  ('Monitor 24"', 899.00, 8, 3)
ON CONFLICT DO NOTHING;
