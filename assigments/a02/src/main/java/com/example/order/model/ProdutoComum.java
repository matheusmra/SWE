package com.example.order.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("common")
public class ProdutoComum extends Produto {

    public ProdutoComum() {
        super();
    }

    public ProdutoComum(Long id, String nome, Double preco, Integer estoque) {
        super(id, nome, preco, estoque);
    }
}
