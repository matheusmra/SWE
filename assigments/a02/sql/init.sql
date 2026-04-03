-- ============================================
-- ORDER MANAGEMENT SYSTEM - MySQL SQL Script
-- Inheritance Strategy: Single Table
-- ============================================

CREATE DATABASE IF NOT EXISTS order_management;
USE order_management;

-- --------------------------------------------
-- Table: produto (Single Table for all types)
-- --------------------------------------------
CREATE TABLE produto (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  preco DECIMAL(10, 2) NOT NULL CHECK (preco > 0),
  estoque INT NOT NULL DEFAULT 0 CHECK (estoque >= 0),
  tipo VARCHAR(50) NOT NULL, -- Discriminator column
  -- Specific fields (nullable)
  voltagem VARCHAR(50),      -- Only for electronics
  data_validade DATE         -- Only for perishables
);

-- --------------------------------------------
-- Table: pedido (Order)
-- --------------------------------------------
CREATE TABLE pedido (
  id INT AUTO_INCREMENT PRIMARY KEY,
  data DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  valor_total DECIMAL(10, 2) NOT NULL DEFAULT 0.00
);

-- --------------------------------------------
-- Table: item
-- --------------------------------------------
CREATE TABLE item (
  id INT AUTO_INCREMENT PRIMARY KEY,
  codigo_item VARCHAR(100) NOT NULL,
  qtde INT NOT NULL CHECK (qtde > 0),
  valor_item DECIMAL(10, 2) NOT NULL CHECK (valor_item >= 0),
  pedido_id INT NOT NULL,
  produto_id INT NOT NULL,
  CONSTRAINT fk_item_pedido
    FOREIGN KEY (pedido_id) REFERENCES pedido(id) ON DELETE CASCADE,
  CONSTRAINT fk_item_produto
    FOREIGN KEY (produto_id) REFERENCES produto(id)
);
