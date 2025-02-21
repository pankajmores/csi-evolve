# csi-evolve

## 🛠  SaaS Customer Support API

This project is an AI-powered SaaS-based customer support application. It provides various productivity features and functionalities for managing customer complaints, agents, authentication, user management, and reports & analytics.

### 🚀 Features
1. *Organizations Management*
2. *Agent Management*
3. *Complaint Handling*
4. *Authentication & User Management*
5. *Reports & Analytics*

---

## 📌 Organization Routes (/organizations)
Organizations represent businesses using the SaaS platform.  

| Method | Endpoint | Description |
|--------|---------|-------------|
| POST | /organizations | Register a new organization |
| GET | /organizations | Get all registered organizations |
| GET | /organizations/:orgId | Get organization details |
| PUT | /organizations/:orgId | Update organization details |
| DELETE | /organizations/:orgId | Remove an organization |
| GET | /organizations/:orgId/agents | Get all agents in an organization |
| GET | /organizations/:orgId/complaints | Get all complaints of an organization |

---

## 🧑‍💼 Agent Routes (/agents)
Agents manage and resolve complaints.

| Method | Endpoint | Description |
|--------|---------|-------------|
| POST | /agents | Register a new support agent |
| GET | /agents | Get all registered agents |
| GET | /agents/:agentId | Get agent details |
| PUT | /agents/:agentId | Update agent details |
| DELETE | /agents/:agentId | Remove an agent |
| GET | /agents/:agentId/complaints | Get complaints assigned to an agent |
| PATCH | /agents/:agentId/status | Update agent status (Online/Offline) |

---

## 📢 Complaint Routes (/complaints)
Customers submit complaints, which are assigned to agents.

| Method | Endpoint | Description |
|--------|---------|-------------|
| POST | /complaints | Submit a new complaint |
| GET | /complaints | Get all complaints (Admin view) |
| GET | /complaints/:complaintId | Get complaint details |
| PUT | /complaints/:complaintId | Update complaint details |
| DELETE | /complaints/:complaintId | Delete a complaint |
| PATCH | /complaints/:complaintId/status | Update complaint status |
| PATCH | /complaints/:complaintId/assign/:agentId | Assign complaint to an agent |
| GET | /complaints/status/:status | Filter complaints by status |
| GET | /complaints/org/:orgId | Get complaints for an organization |

---

## 🔒 Authentication & User Management (/auth)
Handles user login and access control.

| Method | Endpoint | Description |
|--------|---------|-------------|
| POST | /auth/register | Register a new user (Admin, Agent, etc.) |
| POST | /auth/login | Login and receive a token |
| GET | /auth/profile | Get logged-in user profile |
| PUT | /auth/profile | Update user profile |

---

## 📊 Reports & Analytics (/reports)
Track complaint resolutions & agent efficiency.

| Method | Endpoint | Description |
|--------|---------|-------------|
| GET | /reports/complaint-summary | Get summary of complaints (open, closed, etc.) |
| GET | /reports/agent-performance/:agentId | Get agent performance stats |
| GET | /reports/organization/:orgId | Organization-wide complaint resolution report |
| GET | /reports/chatbot-accuracy | Chatbot accuracy and efficiency |

---

### 🚧 Status
This is not a fully completed project and is still under development.

---

### 🏗 Tech Stack
- *Frontend:* React.js
- *Backend:* Java Spring Boot
- *Database:* MongoDB

---

### 📜 License
This project is licensed under MIT.
