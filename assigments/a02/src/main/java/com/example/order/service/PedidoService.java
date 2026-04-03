package com.example.order.service;

import com.example.order.model.Item;
import com.example.order.model.Pedido;
import com.example.order.model.Produto;
import com.example.order.repository.PedidoRepository;
import com.example.order.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class PedidoService {

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private ProdutoRepository produtoRepository;

    public List<Pedido> findAll() {
        return pedidoRepository.findAll();
    }

    @Transactional
    public Pedido save(Pedido pedido) {
        // 1. Processar estoque para cada item
        for (Item item : pedido.getItens()) {
            if (item.getProduto() == null || item.getProduto().getId() == null) {
                throw new RuntimeException("Item do pedido sem produto vinculado.");
            }

            // Precisamos buscar o produto atualizado do banco
            Optional<Produto> produtoOpt = produtoRepository.findById(item.getProduto().getId());
            if (produtoOpt.isEmpty()) {
                throw new RuntimeException("Produto ID " + item.getProduto().getId() + " não encontrado.");
            }

            Produto produtoDb = produtoOpt.get();

            // Verificar se há estoque suficiente
            if (produtoDb.getEstoque() < item.getQtde()) {
                throw new RuntimeException("Estoque insuficiente para o produto: " + produtoDb.getNome());
            }

            // Reduzir estoque
            produtoDb.setEstoque(produtoDb.getEstoque() - item.getQtde());
            produtoRepository.save(produtoDb);
            
            // Garantir que o item aponte para o produto completo do banco
            item.setProduto(produtoDb);
        }

        // 2. Recalcular e Salvar Pedido
        pedido.recalcularValorTotal();
        return pedidoRepository.save(pedido);
    }
}
