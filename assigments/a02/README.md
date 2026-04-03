# Sistema de Gestão de Pedidos 360 (A02)

Bem-vindo ao Módulo de Gestão de Vendas e Inventário. Este projeto foi desenvolvido como o segundo trabalho (A02) da disciplina de Engenharia de Software II (SWE-II).

## 🎯 Objetivo do Projeto
Demonstrar a implementação de um sistema Full-Stack utilizando **Spring Boot**, **Hibernate** com estratégia de herança (**Single Table**) e orquestração via **Docker**.

## 🛠️ Funcionalidades Principais
- **Herança em Banco de Dados**: Uso de tabela única para Produtos, Eletrônicos e Perecíveis.
- **REST API Completa**: Endpoints para CRUD de produtos e criação de pedidos.
- **Regras de Negócio**: Redução automática de estoque e validação de disponibilidade.
- **Dashboard Premium**: Interface baseada em Windows Glassmorphism com tradução para Português.

## 🚀 Como Rodar o Projeto

A forma mais simples de subir o sistema é utilizando o **Docker Desktop**.

1.  Certifique-se de que o **Docker Desktop** esteja aberto e rodando no seu computador.
2.  Abra o seu terminal (Powershell ou CMD) nesta pasta (`assigments/a02`).
3.  Execute o comando de build e orquestração:
    ```bash
    docker compose up --build
    ```
4.  Aguarde o download das imagens e a compilação do Maven.
5.  Quando o terminal mostrar que a aplicação Java subiu com sucesso, acesse:
    **[http://localhost:8080/](http://localhost:8080/)**

## 📂 Estrutura de Pastas
- `/src/main/java`: Código fonte Backend (Spring Boot).
- `/src/main/resources/static`: Frontend (HTML, CSS, JS).
- `/sql`: Script de inicialização do banco de dados (MySQL).
- `Dockerfile` & `docker-compose.yml`: Arquivos de orquestração.

## 📋 Requisitos Mínimos
- Docker Desktop instalado.
- Conexão com a internet para baixar as dependências (Maven e Imagens Docker).

---

