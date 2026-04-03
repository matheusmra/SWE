package com.example.order.model;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import java.time.LocalDate;

@Entity
@DiscriminatorValue("perecivel")
public class ProdutoPerecivel extends Produto {

    @Column(name = "data_validade")
    private LocalDate dataValidade;

    public ProdutoPerecivel() {
    }

    public ProdutoPerecivel(Long id, String nome, Double preco, Integer estoque, LocalDate dataValidade) {
        super(id, nome, preco, estoque);
        this.dataValidade = dataValidade;
    }

    // Getter and Setter
    public LocalDate getDataValidade() { return dataValidade; }
    public void setDataValidade(LocalDate dataValidade) { this.dataValidade = dataValidade; }
}
