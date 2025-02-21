import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TokenGenerate = () => {
    const [agentToken, setAgentToken] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const generateAgentToken = async () => {
            const accessToken = localStorage.getItem("accessToken");
            const userRole = localStorage.getItem("userRole");
    
            if (!accessToken) {
                console.error("No access token found. Please log in.");
                setError("No access token found. Please log in.");
                return;
            }
    
            if (userRole.toLowerCase() !== "admin") {  // Fix role case sensitivity
                console.error("Only admins can generate agent tokens.");
                setError("Only admins can generate agent tokens.");
                return;
            }
    
            try {
                const response = await fetch("http://192.168.1.7:8080/org/token", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${accessToken}`
                    }
                });
    
                console.log("API Response Status:", response.status);
                console.log("API Response Headers:", response.headers);
    
                if (!response.ok) {
                    throw new Error(`Token generation failed! Status: ${response.status}`);
                }
    
                const data = await response.text();  // Check if backend sends text or JSON
    
                console.log("Generated Token:", data);
                setAgentToken(data);  
            } catch (err) {
                console.error("Token Generation Error:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
    
        generateAgentToken();
    }, []);
    

    const handleCopy = () => {
        navigator.clipboard.writeText(agentToken);
        alert("Token copied to clipboard!");
    };

    const goToDashboard = () => {
        navigate("/dashboard");
    };

    return (
        <div className="container">
            <h2>Agent Token Generation</h2>
            {loading ? (
                <p>Generating token...</p>
            ) : error ? (
                <p style={{ color: "red" }}>{error}</p>
            ) : (
                <div>
                    <p><strong>Generated Agent Token:</strong></p>
                    <textarea value={agentToken} readOnly rows="3" style={{ width: "100%" }} />
                    <button onClick={handleCopy}>Copy Token</button>
                    <button onClick={goToDashboard} style={{ marginLeft: "10px" }}>Go to Dashboard</button>
                </div>
            )}
        </div>
    );
};

export default TokenGenerate;
