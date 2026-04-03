package com.example.order.controller;

import com.example.order.model.Pedido;
import com.example.order.service.PedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pedidos")
@CrossOrigin(origins = "*")
public class PedidoController {

    @Autowired
    private PedidoService pedidoService;

    @GetMapping
    public List<Pedido> getAll() {
        return pedidoService.findAll();
    }

    @PostMapping
    public Pedido create(@RequestBody Pedido pedido) {
        // Ensure bidirectional relationship for persistence
        if (pedido.getItens() != null) {
            pedido.getItens().forEach(item -> item.setPedido(pedido));
        }
        return pedidoService.save(pedido);
    }
}
