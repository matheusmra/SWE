package com.example.order.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("eletronico")
public class ProdutoEletronico extends Produto {

    private String voltagem;

    public ProdutoEletronico() {
    }

    public ProdutoEletronico(Long id, String nome, Double preco, Integer estoque, String voltagem) {
        super(id, nome, preco, estoque);
        this.voltagem = voltagem;
    }

    // Getter and Setter
    public String getVoltagem() { return voltagem; }
    public void setVoltagem(String voltagem) { this.voltagem = voltagem; }
}
