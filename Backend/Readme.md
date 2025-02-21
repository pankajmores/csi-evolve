# Project1 Order Management Backend

This is the backend for the **Order Management System** built using **Spring Boot**. It provides API endpoints for handling organizations, agents, complaints, and authentication.

## Features
- Organization Management (CRUD operations)
- Agent Authentication & Management
- Complaint Handling & Status Updates
- JWT Authentication
- Spring Security Integration
- Serves Static Resources (WebJars, Public Files)

## Technologies Used
- **Spring Boot** (Web, Security, Data JPA)
- **Jakarta Servlet API**
- **JWT (JSON Web Token) Authentication**
- **Tomcat Embedded Server**
- **Spring Security**

## Running the Backend
### Prerequisites
- **Java 17+**
- **Maven** (for dependencies)
- **MySQL/PostgreSQL** (or any database you configure)

### Steps to Run
1. **Clone the repository**
   ```sh
   git clone <repo-url>
   cd order-management-backend
   ```

2. **Configure Database** (In `application.properties` or `application.yml`)
   ```properties
   

3. **Build and Run**
   ```sh
   mvn clean install
   mvn spring-boot:run
   ```

4. **Access the API**
   - Base URL: `http://localhost:8080`
   - API Documentation (if Swagger is enabled): `http://localhost:8080/swagger-ui.html`

## API Endpoints
### Organization APIs
- **Get Organization Details:** `GET /org/detail`
- **Remove Organization:** `DELETE /org/{orgId}`

### Agent APIs
- **Signup Agent:** `POST /auth/agent/signup`
- **Get All Agents:** `GET /agent`

### Complaint APIs
- **Update Complaint Status:** `PATCH /complaints/{complaintId}/status`

## Security & Middleware
- **JWT Authentication Filter:** `com.project1.orderproject.Filter.JwtFilter`
- **Spring Security Filter Chain**
- **Character Encoding Filter**
- **Request Context Filter**

## Static Resources
- **Serves WebJars:** `/webjars/**`
- **Public/Static Files:** `/static/**`, `/public/**`

## Notes
- If authentication is enabled, include a valid JWT token in the `Authorization` header for protected routes.
- Modify CORS settings in `WebSecurityConfig` if required.

---
This backend is structured to be **scalable** and **secure**, handling authentication and resource management efficiently. Let me know if you need any modifications!

