package com.example.order.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "pedido")
public class Pedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDateTime data = LocalDateTime.now();

    @Column(name = "valor_total", nullable = false)
    private Double valorTotal = 0.0;

    @OneToMany(mappedBy = "pedido", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Item> itens = new ArrayList<>();

    public Pedido() {
    }

    public Pedido(Long id, LocalDateTime data, Double valorTotal, List<Item> itens) {
        this.id = id;
        this.data = data != null ? data : LocalDateTime.now();
        this.valorTotal = valorTotal != null ? valorTotal : 0.0;
        this.itens = itens != null ? itens : new ArrayList<>();
    }

    public void adicionarItem(Item item) {
        itens.add(item);
        item.setPedido(this);
        recalcularValorTotal();
    }

    public void recalcularValorTotal() {
        this.valorTotal = itens.stream()
                .mapToDouble(i -> i.getValorItem() != null ? i.getValorItem() : 0.0)
                .sum();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public LocalDateTime getData() { return data; }
    public void setData(LocalDateTime data) { this.data = data; }

    public Double getValorTotal() { return valorTotal; }
    public void setValorTotal(Double valorTotal) { this.valorTotal = valorTotal; }

    public List<Item> getItens() { return itens; }
    public void setItens(List<Item> itens) { this.itens = itens; }
}
