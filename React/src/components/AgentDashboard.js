// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "./AgentDashboard.css";

// const AgentDashboard = () => {
//   const navigate = useNavigate();
//   const [complaints, setComplaints] = useState([
//     { id: 1, title: "Network Issue", status: "Pending" },
//     { id: 2, title: "Software Crash", status: "Ongoing" },
//   ]);

//   useEffect(() => {
//     const role = localStorage.getItem("userRole");
//     if (role !== "Agent") {
//       navigate("/");
//     }
//   }, [navigate]);

//   const markResolved = (id) => {
//     setComplaints((prev) =>
//       prev.map((complaint) =>
//         complaint.id === id ? { ...complaint, status: "Resolved" } : complaint
//       )
//     );
//   };

//   return (
//     <div className="agent-dashboard-container">
//       <div className="navbar">
//         <h1>Agent Dashboard</h1>
//         <button onClick={() => navigate("/")}>Logout</button>
//       </div>

//       <div className="complaints-section">
//         <h2>Assigned Complaints</h2>
//         <ul>
//           {complaints.map((complaint) => (
//             <li key={complaint.id} className={`complaint-item ${complaint.status.toLowerCase()}`}>
//               {complaint.title} - {complaint.status}
//               {complaint.status !== "Resolved" && (
//                 <button onClick={() => markResolved(complaint.id)}>Mark Resolved</button>
//               )}
//             </li>
//           ))}
//         </ul>
//       </div>
    
//      <div className="dashboard-container">
//      <h2>Agent Dashboard</h2>
//      <div className="dashboard-sections">
//        <div className="ticket-panel">
//          <h3>Active Tickets</h3>
//          <p>10 Open | 5 Pending | 20 Resolved</p>
//        </div>
//        <div className="performance-panel">
//          <h3>Performance Analytics</h3>
//          <p>Avg Response Time: 5 mins</p>
//          <p>Customer Satisfaction: 4.5/5</p>
//        </div>
//        <div className="customer-panel">
//          <h3>Customer Information</h3>
//          <p>VIP Customers: 3</p>
//          <p>Regular Customers: 15</p>
//        </div>
//        <div className="notifications">
//          <h3>Notifications</h3>
//          <p>New Ticket Assigned!</p>
//        </div>
//      </div>
//    </div>
//    </div>
//   );
// };

// export default AgentDashboard;



import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AgentDashboard.css";

const AgentDashboard = () => {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [stats, setStats] = useState({
    open: 0,
    pending: 0,
    resolved: 0,
    avgResponseTime: "N/A",
    customerSatisfaction: "N/A",
    vipCustomers: 0,
    regularCustomers: 0,
    notifications: [],
  });

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    if (role !== "Agent") {
      navigate("/");
    }
    fetchComplaints();
    fetchDashboardStats();
  }, [navigate]);

  const fetchComplaints = async () => {
    try {
      const response = await fetch("http://localhost:8080/complaints");
      const data = await response.json();
      setComplaints(data);
    } catch (error) {
      console.error("Error fetching complaints:", error);
    }
  };

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch("http://localhost:8080/stats");
      const data = await response.json();
      setStats({
        open: data.open,
        pending: data.pending,
        resolved: data.resolved,
        avgResponseTime: data.avgResponseTime,
        customerSatisfaction: data.customerSatisfaction,
        vipCustomers: data.vipCustomers,
        regularCustomers: data.regularCustomers,
        notifications: data.notifications,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const markResolved = async (id) => {
    try {
      await fetch(`http://localhost:8080/complaints/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Resolved" }),
      });

      setComplaints((prev) =>
        prev.map((complaint) =>
          complaint.id === id ? { ...complaint, status: "Resolved" } : complaint
        )
      );
      fetchDashboardStats();
    } catch (error) {
      console.error("Error updating complaint:", error);
    }
  };
  const handleLogout = () => {
    localStorage.clear(); // ✅ Clears local storage
    navigate("/"); // ✅ Redirects to the landing page
  };
  

  return (
    <div className="agent-dashboard-container">
      <div className="navbar">
        <h1>Agent Dashboard</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <div className="complaints-section">
        <h2>Assigned Complaints</h2>
        <ul>
          {complaints.map((complaint) => (
            <li key={complaint.id} className={`complaint-item ${complaint.status.toLowerCase()}`}>
              {complaint.title} - {complaint.status}
              {complaint.status !== "Resolved" && (
                <button onClick={() => markResolved(complaint.id)}>Mark Resolved</button>
              )}
            </li>
          ))}
        </ul>
      </div>
    
      <div className="dashboard-container">
        <h2>Agent Dashboard</h2>
        <div className="dashboard-sections">
          <div className="ticket-panel">
            <h3>Active Tickets</h3>
            <p>{stats.open} Open | {stats.pending} Pending | {stats.resolved} Resolved</p>
          </div>
          <div className="performance-panel">
            <h3>Performance Analytics</h3>
            <p>Avg Response Time: {stats.avgResponseTime}</p>
            <p>Customer Satisfaction: {stats.customerSatisfaction}/5</p>
          </div>
          <div className="customer-panel">
            <h3>Customer Information</h3>
            <p>VIP Customers: {stats.vipCustomers}</p>
            <p>Regular Customers: {stats.regularCustomers}</p>
          </div>
          <div className="notifications">
            <h3>Notifications</h3>
            {stats.notifications.length > 0 ? (
              stats.notifications.map((notif, index) => <p key={index}>{notif}</p>)
            ) : (
              <p>No new notifications</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentDashboard;

