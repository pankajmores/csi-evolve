// import React, { useState } from "react";
// import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Legend } from "recharts";
// import { PlusCircle } from "lucide-react";
// import "./Dashboard.css";

// const pieData = [
//   { name: "Received", value: 120, color: "#8884d8" },
//   { name: "Resolved", value: 90, color: "#82ca9d" },
//   { name: "Pending", value: 30, color: "#ff7300" },
// ];

// const barData = [
//   { month: "January", Solved: 50, Pending: 20, Ongoing: 25 },
//   { month: "February", Solved: 60, Pending: 25, Ongoing: 30 },
//   { month: "March", Solved: 70, Pending: 30, Ongoing: 35 },
// ];

// const agents = [
//   { id: 1, name: "John Doe", status: "Idle" },
//   { id: 2, name: "Jane Smith", status: "Assigned" },
//   { id: 3, name: "Emily Johnson", status: "Idle" },
//   { id: 4, name: "Michael Brown", status: "Assigned" },
// ];

// const Button = ({ children, className, ...props }) => {
//   return (
//     <button className={`custom-button ${className}`} {...props}>
//       {children}
//     </button>
//   );
// };

// const AdminDashboard = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [agentPanelOpen, setAgentPanelOpen] = useState(false);
//   const [assignedAgents, setAssignedAgents] = useState(agents);

//   const handleAssignAgent = (id) => {
//     setAssignedAgents((prevAgents) =>
//       prevAgents.map((agent) =>
//         agent.id === id ? { ...agent, status: "Assigned" } : agent
//       )
//     );
//   };

//   return (
//     <div className="dashboard-container">
//       {/* Navbar */}
//       <div className="navbar">
//         <h1 className="dashboard-title">Admin Dashboard</h1>
//         <div className="profile-menu">
//           <img
//             src="https://via.placeholder.com/40"
//             alt="Admin Profile"
//             className="profile-pic"
//             onClick={() => setMenuOpen(!menuOpen)}
//           />
//         </div>
//       </div>

//       {/* Sliding Menu */}
//       <div className={`sliding-menu ${menuOpen ? "open" : ""}`}>
//         <button className="menu-item">Home</button>
//         <button className="menu-item">Settings</button>
//         <button className="menu-item">Agents</button>
//         <button className="menu-item logout">Logout</button>
//       </div>

//       {/* Dashboard Layout */}
//       <div className="dashboard-content">
//         {/* Pie Chart Section */}
//         <div className="chart-card">
//           <h2 className="chart-title">Complaints Overview</h2>
//           <ResponsiveContainer width="100%" height={300}>
//             <PieChart>
//               <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100}>
//                 {pieData.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={entry.color} />
//                 ))}
//               </Pie>
//               <Tooltip />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Bar Chart Section */}
//         <div className="chart-card">
//           <h2 className="chart-title">Monthly Complaint Status</h2>
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={barData}>
//               <XAxis dataKey="month" />
//               <YAxis />
//               <Legend />
//               <Tooltip />
//               <Bar dataKey="Solved" fill="#82ca9d" />
//               <Bar dataKey="Pending" fill="#ff7300" />
//               <Bar dataKey="Ongoing" fill="#8884d8" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Add Agent Section */}
//         <div className="agent-card">
//           <h2 className="section-title">Manage Agents</h2>
//           <Button className="add-agent-button" onClick={() => setAgentPanelOpen(true)}>
//             <PlusCircle className="icon" />
//             <span>Manage Agents</span>
//           </Button>
//         </div>
//       </div>

//       {/* Agent Panel */}
//       {agentPanelOpen && (
//         <div className="agent-panel">
//           <h2>Agent List</h2>
//           <ul>
//             {assignedAgents.map((agent) => (
//               <li key={agent.id} className={agent.status === "Assigned" ? "assigned" : "idle"}>
//                 {agent.name} - {agent.status}
//                 {agent.status === "Idle" && (
//                   <button className="assign-btn" onClick={() => handleAssignAgent(agent.id)}>
//                     Assign
//                   </button>
//                 )}
//               </li>
//             ))}
//           </ul>
//           <button className="close-btn" onClick={() => setAgentPanelOpen(false)}>Close</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminDashboard;










// import React, { useState, useEffect } from "react";
// import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Legend } from "recharts";
// import { PlusCircle } from "lucide-react";
// import "./Dashboard.css";

// const AdminDashboard = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [complaints, setComplaints] = useState({ received: 120, resolved: 90, pending: 30 });
//   const [barData, setBarData] = useState([
//     { month: "January", Solved: 50, Pending: 20, Ongoing: 25 },
//     { month: "February", Solved: 60, Pending: 25, Ongoing: 30 },
//     { month: "March", Solved: 70, Pending: 30, Ongoing: 35 },
//   ]);
//   const [agents, setAgents] = useState([
//     { id: 1, name: "Agent A", status: "Idle" },
//     { id: 2, name: "Agent B", status: "Assigned" },
//   ]);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setComplaints(prev => ({
//         received: prev.received + Math.floor(Math.random() * 5),
//         resolved: prev.resolved + Math.floor(Math.random() * 3),
//         pending: prev.pending + Math.floor(Math.random() * 2),
//       }));
//     }, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   const pieData = [
//     { name: "Received", value: complaints.received, color: "#8884d8" },
//     { name: "Resolved", value: complaints.resolved, color: "#82ca9d" },
//     { name: "Pending", value: complaints.pending, color: "#ff7300" },
//   ];

//   return (
//     <div className="dashboard-container">
//       {/* Navbar */}
//       <div className="navbar">
//         <h1 className="dashboard-title">Admin Dashboard</h1>
//         <div className="profile-menu">
//           <img
//             src="https://via.placeholder.com/40"
//             alt="Admin Profile"
//             className="profile-pic"
//             onClick={() => setMenuOpen(!menuOpen)}
//           />
//         </div>
//       </div>

//       {/* Sliding Menu */}
//       <div className={`sliding-menu ${menuOpen ? "open" : ""}`}>
//         <button className="menu-item">Home</button>
//         <button className="menu-item">Settings</button>
//         <button className="menu-item">Agents</button>
//         <button className="menu-item logout">Logout</button>
//       </div>

//       {/* Dashboard Layout */}
//       <div className="dashboard-content">
//         {/* Pie Chart Section */}
//         <div className="chart-card">
//           <h2 className="chart-title">Complaints Overview</h2>
//           <ResponsiveContainer width="100%" height={300}>
//             <PieChart>
//               <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100}>
//                 {pieData.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={entry.color} />
//                 ))}
//               </Pie>
//               <Tooltip />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Bar Chart Section */}
//         <div className="chart-card">
//           <h2 className="chart-title">Monthly Complaint Status</h2>
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={barData}>
//               <XAxis dataKey="month" />
//               <YAxis />
//               <Legend />
//               <Tooltip />
//               <Bar dataKey="Solved" fill="#82ca9d" />
//               <Bar dataKey="Pending" fill="#ff7300" />
//               <Bar dataKey="Ongoing" fill="#8884d8" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Agent Section */}
//         <div className="agent-card">
//           <h2 className="section-title">Agents</h2>
//           <ul className="agent-list">
//             {agents.map(agent => (
//               <li key={agent.id} className={`agent-item ${agent.status.toLowerCase()}`}>
//                 {agent.name} - {agent.status}
//               </li>
//             ))}
//           </ul>
//           <button className="add-agent-button">
//             <PlusCircle className="icon" />
//             <span>Add Agent</span>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;








import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Legend } from "recharts";
import { PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";




const AdminDashboard = () => {
  //  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [complaints, setComplaints] = useState({ received: 120, resolved: 90, pending: 30 });
  const [barData, setBarData] = useState([
    { month: "January", Solved: 50, Pending: 20, Ongoing: 25 },
    { month: "February", Solved: 60, Pending: 25, Ongoing: 30 },
    { month: "March", Solved: 70, Pending: 30, Ongoing: 35 },
  ]);
  const [agents, setAgents] = useState([
    { id: 1, name: "Agent A", status: "Idle" },
    { id: 2, name: "Agent B", status: "Assigned" },
  ]);
  const navigate = useNavigate();

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    if (userRole !== "Admin") {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear(); // Clears all stored data
    navigate("/");   // Redirects to login page
  };
  
  useEffect(() => {
    const interval = setInterval(() => {
      setComplaints(prev => ({
        received: prev.received + Math.floor(Math.random() * 5),
        resolved: prev.resolved + Math.floor(Math.random() * 3),
        pending: prev.pending + Math.floor(Math.random() * 2),
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const pieData = [
    { name: "Received", value: complaints.received, color: "#8884d8" },
    { name: "Resolved", value: complaints.resolved, color: "#82ca9d" },
    { name: "Pending", value: complaints.pending, color: "#ff7300" },
  ];

  return (
    <div className="dashboard-container">
      {/* Navbar */}
      <div className="navbar">
        <h1 className="dashboard-title">Admin Dashboard</h1>
        <div className="profile-menu">
          <img
            src="https://via.placeholder.com/40"
            alt="Admin Profile"
            className="profile-pic"
            onClick={() => setMenuOpen(!menuOpen)}
          />
        </div>
      </div>
    

      {/* Sliding Menu */}
      <div className={`sliding-menu ${menuOpen ? "open" : ""}`}>
        <button className="menu-item">Home</button>
        <button className="menu-item">Settings</button>
        <button className="menu-item">Agents</button>
        <button className="menu-item logout" onClick={handleLogout}>Logout</button>
      </div>

      {/* Dashboard Layout */}
      <div className="dashboard-content">
        {/* Pie Chart Section */}
        <div className="chart-card">
          <h2 className="chart-title">Complaints Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100}>
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart Section */}
        <div className="chart-card">
          <h2 className="chart-title">Monthly Complaint Status</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Legend />
              <Tooltip />
              <Bar dataKey="Solved" fill="#82ca9d" />
              <Bar dataKey="Pending" fill="#ff7300" />
              <Bar dataKey="Ongoing" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Agent Section */}
        <div className="agent-card">
          <h2 className="section-title">Agents</h2>
          <ul className="agent-list">
            {agents.map(agent => (
              <li key={agent.id} className={`agent-item ${agent.status.toLowerCase()}`}>
                {agent.name} - {agent.status}
              </li>
            ))}
          </ul>
          <button className="add-agent-button">
            <PlusCircle className="icon" />
            <span>Add Agent</span>
          </button>
        </div>
      </div>
    </div>
  );
};



export default AdminDashboard;

