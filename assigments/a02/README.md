# Order Management System 360 (A02)

Welcome to the Sales and Inventory Management Module. This project was developed as the second assignment (A02) for the Software Engineering II (SWE-II) discipline.

## 🎯 Project Objective
Demonstrate the implementation of a full-stack system using **Spring Boot**, **Hibernate** with inheritance strategy (**Single Table**), and orchestration via **Docker**.

## 🛠️ Core Features
- **Database Inheritance**: Use of a single table for Products, Electronics, and Perishables.
- **Full REST API**: Endpoints for product CRUD and order creation.
- **Business Rules**: Automatic stock reduction and availability validation.
- **Premium Dashboard**: Interface based on Windows Glassmorphism with multilingual support.

## 🚀 How to Run the Project

The simplest way to start the system is using **Docker Desktop**.

1.  Ensure that **Docker Desktop** is open and running on your computer.
2.  Open your terminal (Powershell or CMD) in this folder (`assigments/a02`).
3.  Run the build and orchestration command:
    ```bash
    docker compose up --build
    ```
4.  Wait for the images to download and the Maven compilation to complete.
5.  When the terminal shows that the Java application has started successfully, access:
    **[http://localhost:8080/](http://localhost:8080/)**

## 📂 Folder Structure
- `/src/main/java`: Backend source code (Spring Boot).
- `/src/main/resources/static`: Frontend (HTML, CSS, JS).
- `/sql`: Database initialization script (MySQL).
- `Dockerfile` & `docker-compose.yml`: Orchestration files.

## 📋 Minimum Requirements
- Docker Desktop installed.
- Internet connection to download dependencies (Maven and Docker images).

---
