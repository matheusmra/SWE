package com.example.order.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
@Table(name = "item")
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "codigo_item", nullable = false)
    private String codigoItem;

    @Column(nullable = false)
    private Integer qtde;

    @Column(name = "valor_item", nullable = false)
    private Double valorItem;

    @ManyToOne
    @JoinColumn(name = "pedido_id", nullable = false)
    @JsonBackReference
    private Pedido pedido;

    @ManyToOne
    @JoinColumn(name = "produto_id", nullable = false)
    private Produto produto;

    public Item() {
    }

    public Item(Long id, String codigoItem, Integer qtde, Double valorItem, Pedido pedido, Produto produto) {
        this.id = id;
        this.codigoItem = codigoItem;
        this.qtde = qtde;
        this.valorItem = valorItem;
        this.pedido = pedido;
        this.produto = produto;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getCodigoItem() { return codigoItem; }
    public void setCodigoItem(String codigoItem) { this.codigoItem = codigoItem; }

    public Integer getQtde() { return qtde; }
    public void setQtde(Integer qtde) { this.qtde = qtde; }

    public Double getValorItem() { return valorItem; }
    public void setValorItem(Double valorItem) { this.valorItem = valorItem; }

    public Pedido getPedido() { return pedido; }
    public void setPedido(Pedido pedido) { this.pedido = pedido; }

    public Produto getProduto() { return produto; }
    public void setProduto(Produto produto) { this.produto = produto; }
}
