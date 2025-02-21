import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage_1";
import LoginSignup from "./components/LoginSignup";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./components/PrivateRoute_1"; // ✅ Ensure this is correct
import TokenGenerate from "./components/TokenGenerate";
import AgentDashboard from "./components/AgentDashboard";
import FAQPage from "./components/FAQPage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginSignup />} />
                <Route path="/signup" element={<LoginSignup />} />
                
                {/* ✅ Wrap Dashboard with PrivateRoute correctly */}
                <Route path="/dashboard" element={ <Dashboard />} />
                <Route path="/generate-token" element={<TokenGenerate />} />
                <Route path="/agent-dashboard" element={<AgentDashboard />} />
                <Route path="/faq" element={<FAQPage />} /> 
            </Routes>
        </Router>
    );
}

export default App;
