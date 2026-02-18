# Distributed anime system

### The Team
Filippo Guanti 893412
Denis Budau 1049101


### The project
The goal of the assignment is to design and implement a distributed web system that allows users to explore and analyze anime-related data, using both SQL and NoSQL databases.

---

## Architecture Overview

The system is composed of three main components:

### 1. Main Server (Express.js)
- Acts as the **facade** of the system
- Handles page rendering using **Handlebars**
- Manages user interaction and navigation
- Uses **Axios** to communicate with the satellite servers
- Exposes public API endpoints under `/api/*`

### 2. SQL Satellite (Spring Boot + PostgreSQL)
- Stores structured anime-related data (anime details, characters, persons)
- Imports data from CSV files at startup
- Exposes a REST API returning JSON only
- Uses **Spring Data JPA** for database access
- Fully documented using **Swagger / OpenAPI**

### 3. NoSQL Satellite (Express.js + MongoDB)
- Stores user-related data (profiles, favorites, ratings, recommendations)
- Collections are preloaded via MongoDB
- Exposes REST APIs returning JSON
- Some endpoints are marked as **deprecated** when not used by the main server
- Documented using **Swagger (JSDoc style)**

---

## Technologies Used

- **Node.js / Express.js**
- **Handlebars (HBS)**
- **Spring Boot**
- **PostgreSQL**
- **MongoDB**
- **Axios**
- **Swagger / OpenAPI**
- **JavaScript & Java**

---

## API Documentation

Swagger is used to document all REST APIs in the system:

- **SQL Satellite**: documents all Spring Boot REST endpoints
- **NoSQL Satellite**: documents MongoDB-based REST endpoints
- **Main Server**: documents only `/api/*` proxy endpoints

Page-rendering routes (HTML views) are intentionally excluded from Swagger, as they are part of the presentation layer and not REST APIs.

---

## Notes
- The project follows a **satellite-based architecture**
- Error handling is centralized and consistent across services
- The system avoids unnecessary abstractions and keeps the implementation simple, following course guidelines
