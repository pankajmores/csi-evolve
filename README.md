# csi-evolve routes
# 🛠 AI-Powered SaaS Customer Support APi

1.organisations, 2.agent, 3.complaint, 4.chatbot, 5.auth & usermanagement, 6.report & analysis


### 📌 **1. Organization Routes (`/organizations`)**
Organizations represent businesses using the SaaS platform.  

| Method | Endpoint | Description |
|--------|---------|-------------|
| `POST` | `/organizations` | Register a new organization |
| `GET` | `/organizations` | Get all registered organizations |
| `GET` | `/organizations/:orgId` | Get organization details |
| `PUT` | `/organizations/:orgId` | Update organization details |
| `DELETE` | `/organizations/:orgId` | Remove an organization |
| `GET` | `/organizations/:orgId/agents` | Get all agents in an organization |
| `GET` | `/organizations/:orgId/complaints` | Get all complaints of an organization |

code::   routes/organisationRoutes.js

const express = require("express");
const router = express.Router();
const {
  registerOrganization,
  getAllOrganizations,
  getOrganizationById,
  updateOrganization,
  deleteOrganization,
  getOrganizationAgents,
  getOrganizationComplaints
} = require("../controllers/organizationController");

/**
 * @route   POST /organizations
 * @desc    Register a new organization
 * @access  Private (Admin Only)
 */
router.post("/", registerOrganization);

/**
 * @route   GET /organizations
 * @desc    Get all registered organizations
 * @access  Private (Authenticated Users)
 */
router.get("/", getAllOrganizations);

/**
 * @route   GET /organizations/:orgId
 * @desc    Get details of a specific organization
 * @access  Private (Organization Admins)
 */
router.get("/:orgId", getOrganizationById);

/**
 * @route   PUT /organizations/:orgId
 * @desc    Update organization details
 * @access  Private (Organization Admins)
 */
router.put("/:orgId", updateOrganization);

/**
 * @route   DELETE /organizations/:orgId
 * @desc    Remove an organization
 * @access  Private (Admin Only)
 */
router.delete("/:orgId", deleteOrganization);

/**
 * @route   GET /organizations/:orgId/agents
 * @desc    Get all agents in an organization
 * @access  Private (Organization Admins)
 */
router.get("/:orgId/agents", getOrganizationAgents);

/**
 * @route   GET /organizations/:orgId/complaints
 * @desc    Get all complaints of an organization
 * @access  Private (Organization Admins & Agents)
 */
router.get("/:orgId/complaints", getOrganizationComplaints);

module.exports = router;



### 🧑‍💼 **2. Agent Routes (`/agents`)**
Agents manage and resolve complaints.

| Method | Endpoint | Description |
|--------|---------|-------------|
| `POST` | `/agents` | Register a new support agent |
| `GET` | `/agents` | Get all registered agents |
| `GET` | `/agents/:agentId` | Get agent details |
| `PUT` | `/agents/:agentId` | Update agent details |
| `DELETE` | `/agents/:agentId` | Remove an agent |
| `GET` | `/agents/:agentId/complaints` | Get complaints assigned to an agent |
| `PATCH` | `/agents/:agentId/status` | Update agent status (Online/Offline) |

code::  routes/agentRoutes.js  

const express = require("express");
const router = express.Router();
const {
  registerAgent,
  getAllAgents,
  getAgentById,
  updateAgent,
  deleteAgent,
  getAgentComplaints,
  updateAgentStatus
} = require("../controllers/agentController");

/**
 * @route   POST /agents
 * @desc    Register a new support agent
 * @access  Private (Admin Only)
 */
router.post("/", registerAgent);

/**
 * @route   GET /agents
 * @desc    Get all registered agents
 * @access  Private (Authenticated Users)
 */
router.get("/", getAllAgents);

/**
 * @route   GET /agents/:agentId
 * @desc    Get details of a specific agent
 * @access  Private (Organization Admins & Agents)
 */
router.get("/:agentId", getAgentById);

/**
 * @route   PUT /agents/:agentId
 * @desc    Update agent details
 * @access  Private (Admin & Agent)
 */
router.put("/:agentId", updateAgent);

/**
 * @route   DELETE /agents/:agentId
 * @desc    Remove an agent
 * @access  Private (Admin Only)
 */
router.delete("/:agentId", deleteAgent);

/**
 * @route   GET /agents/:agentId/complaints
 * @desc    Get all complaints assigned to a specific agent
 * @access  Private (Agent Only)
 */
router.get("/:agentId/complaints", getAgentComplaints);

/**
 * @route   PATCH /agents/:agentId/status
 * @desc    Update agent status (Online/Offline)
 * @access  Private (Agent Only)
 */
router.patch("/:agentId/status", updateAgentStatus);

module.exports = router;



### 📢 **3. Complaint Routes (`/complaints`)**
Customers submit complaints, which are assigned to agents.

| Method | Endpoint | Description |
|--------|---------|-------------|
| `POST` | `/complaints` | Submit a new complaint |
| `GET` | `/complaints` | Get all complaints (Admin view) |
| `GET` | `/complaints/:complaintId` | Get complaint details |
| `PUT` | `/complaints/:complaintId` | Update complaint details |
| `DELETE` | `/complaints/:complaintId` | Delete a complaint |
| `PATCH` | `/complaints/:complaintId/status` | Update complaint status |
| `PATCH` | `/complaints/:complaintId/assign/:agentId` | Assign complaint to an agent |
| `GET` | `/complaints/status/:status` | Filter complaints by status |
| `GET` | `/complaints/org/:orgId` | Get complaints for an organization |
| `POST` | `/complaints/:complaintId/chatbot-response` | Chatbot auto-response |

code::  routes/complaintRoutes.js

const express = require("express");
const router = express.Router();
const {
  submitComplaint,
  getAllComplaints,
  getComplaintById,
  updateComplaint,
  deleteComplaint,
  updateComplaintStatus,
  assignComplaintToAgent,
  filterComplaintsByStatus,
  getComplaintsByOrganization,
  chatbotResponse
} = require("../controllers/complaintController");

/**
 * @route   POST /complaints
 * @desc    Submit a new complaint
 * @access  Public (Customers)
 */
router.post("/", submitComplaint);

/**
 * @route   GET /complaints
 * @desc    Get all complaints (Admin view)
 * @access  Private (Admins Only)
 */
router.get("/", getAllComplaints);

/**
 * @route   GET /complaints/:complaintId
 * @desc    Get complaint details
 * @access  Private (Admin, Assigned Agent, Customer)
 */
router.get("/:complaintId", getComplaintById);

/**
 * @route   PUT /complaints/:complaintId
 * @desc    Update complaint details
 * @access  Private (Admin Only)
 */
router.put("/:complaintId", updateComplaint);

/**
 * @route   DELETE /complaints/:complaintId
 * @desc    Delete a complaint
 * @access  Private (Admin Only)
 */
router.delete("/:complaintId", deleteComplaint);

/**
 * @route   PATCH /complaints/:complaintId/status
 * @desc    Update complaint status (Open, In Progress, Resolved)
 * @access  Private (Admin & Assigned Agent)
 */
router.patch("/:complaintId/status", updateComplaintStatus);

/**
 * @route   PATCH /complaints/:complaintId/assign/:agentId
 * @desc    Assign complaint to a support agent
 * @access  Private (Admin Only)
 */
router.patch("/:complaintId/assign/:agentId", assignComplaintToAgent);

/**
 * @route   GET /complaints/status/:status
 * @desc    Filter complaints by status (Open, In Progress, Resolved)
 * @access  Private (Admin & Agents)
 */
router.get("/status/:status", filterComplaintsByStatus);

/**
 * @route   GET /complaints/org/:orgId
 * @desc    Get complaints for a specific organization
 * @access  Private (Admin & Organization Manager)
 */
router.get("/org/:orgId", getComplaintsByOrganization);

/**
 * @route   POST /complaints/:complaintId/chatbot-response
 * @desc    Chatbot auto-response to a complaint
 * @access  Private (System Triggered)
 */
router.post("/:complaintId/chatbot-response", chatbotResponse);

module.exports = router;





### 🤖 **4. Chatbot Routes (`/chatbot`)**
Chatbot generates AI-powered responses.

| Method | Endpoint | Description |
|--------|---------|-------------|
| `POST` | `/chatbot/response` | Generate chatbot response |
| `GET` | `/chatbot/history/:complaintId` | Get chatbot interaction history |
| `POST` | `/chatbot/feedback` | Collect chatbot feedback |

code::   routes/chatbotRoutes.js

const express = require("express");
const router = express.Router();
const {
  generateChatbotResponse,
  getChatbotHistory,
  collectChatbotFeedback
} = require("../controllers/chatbotController");

/**
 * @route   POST /chatbot/response
 * @desc    Generate chatbot response for a complaint
 * @access  Private (System Triggered)
 */
router.post("/response", generateChatbotResponse);

/**
 * @route   GET /chatbot/history/:complaintId
 * @desc    Get chatbot interaction history for a complaint
 * @access  Private (Admin, Assigned Agent, Customer)
 */
router.get("/history/:complaintId", getChatbotHistory);

/**
 * @route   POST /chatbot/feedback
 * @desc    Collect chatbot feedback from users
 * @access  Public
 */
router.post("/feedback", collectChatbotFeedback);

module.exports = router;



### 🔒 **5. Authentication & User Management (`/auth`)**
Handles user login and access control.

| Method | Endpoint | Description |
|--------|---------|-------------|
| `POST` | `/auth/register` | Register a new user (Admin, Agent, etc.) |
| `POST` | `/auth/login` | Login and receive a token |
| `GET` | `/auth/profile` | Get logged-in user profile |
| `PUT` | `/auth/profile` | Update user profile |

code::   routes/authRoutes.js

const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile
} = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

/**
 * @route   POST /auth/register
 * @desc    Register a new user (Admin, Agent, etc.)
 * @access  Public
 */
router.post("/register", registerUser);

/**
 * @route   POST /auth/login
 * @desc    Login and receive a JWT token
 * @access  Public
 */
router.post("/login", loginUser);

/**
 * @route   GET /auth/profile
 * @desc    Get logged-in user profile
 * @access  Private (Authenticated Users)
 */
router.get("/profile", protect, getUserProfile);

/**
 * @route   PUT /auth/profile
 * @desc    Update user profile (name, email, password, etc.)
 * @access  Private (Authenticated Users)
 */
router.put("/profile", protect, updateUserProfile);

module.exports = router;


### 📊 **6. Reports & Analytics (`/reports`)**
Track complaint resolutions & agent efficiency.

| Method | Endpoint | Description |
|--------|---------|-------------|
| `GET` | `/reports/complaint-summary` | Get summary of complaints (open, closed, etc.) |
| `GET` | `/reports/agent-performance/:agentId` | Get agent performance stats |
| `GET` | `/reports/organization/:orgId` | Organization-wide complaint resolution report |
| `GET` | `/reports/chatbot-accuracy` | Chatbot accuracy and efficiency |

code::  routes/reportRoutes.js

const express = require("express");
const router = express.Router();
const {
  getComplaintSummary,
  getAgentPerformance,
  getOrganizationReport,
  getChatbotAccuracy
} = require("../controllers/reportController");

/**
 * @route   GET /reports/complaint-summary
 * @desc    Get summary of complaints (open, closed, etc.)
 * @access  Private (Admin & Organization)
 */
router.get("/complaint-summary", getComplaintSummary);

/**
 * @route   GET /reports/agent-performance/:agentId
 * @desc    Get agent performance statistics (resolved complaints, avg response time)
 * @access  Private (Admin & Organization)
 */
router.get("/agent-performance/:agentId", getAgentPerformance);

/**
 * @route   GET /reports/organization/:orgId
 * @desc    Get organization-wide complaint resolution report
 * @access  Private (Admin & Organization)
 */
router.get("/organization/:orgId", getOrganizationReport);

/**
 * @route   GET /reports/chatbot-accuracy
 * @desc    Get chatbot accuracy and efficiency report
 * @access  Private (Admin)
 */
router.get("/chatbot-accuracy", getChatbotAccuracy);

module.exports = router;


