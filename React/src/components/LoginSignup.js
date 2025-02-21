

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { login, signup } from "../services/authService";
// import "./LoginSignup.css";

// const LoginSignup = () => {
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//     const [token, setToken] = useState(""); // For Agent Login
//     const [isSignup, setIsSignup] = useState(false);
//     const [isAdmin, setIsAdmin] = useState(true); // Toggle between Admin & Agent
//     const navigate = useNavigate();

//     const handleAuth = async (e) => {
//         e.preventDefault();
//         try {
//             if (!isAdmin && isSignup && token !== "SECRET-TOKEN") {
//                 alert("Invalid Agent Token!");
//                 return;
//             }

//             if (isSignup) {
//                const data =  await signup(username, password);
//                 alert(data.message);
//                 setIsSignup(false);
//             } else {
//                 const data = await login(username, password);

//                 // Ensure correct keys are used
//                 const accessToken = data.access_Token || data["access_Token"]?.trim();
//                 const refreshToken = data.refresh_Token || data["refresh_token"];
    
//                 if (accessToken && refreshToken) {
//                     localStorage.setItem("accessToken", accessToken);
//                     localStorage.setItem("refreshToken", refreshToken);
//                     console.log("Tokens saved to localStorage!");
//                 } else {
//                     console.error("Invalid token response:", data);
//                     alert("Login failed. No valid tokens received.");
//                     return;
//                 }

//                 alert("Login successful!");
//                 navigate("/dashboard");
//             }
//         } catch (error) {
//             alert(error.message);
//         }
//     };

//     return (
//         <div className="auth-container">
//             <div className="panel left-panel">
//                 <div className="content">
//                     <h2>{isSignup ? "New Here?" : "Welcome Back!"}</h2>
//                     <p>{isSignup ? "Sign up to get started." : "Login to continue."}</p>
//                     <button className="btn" onClick={() => setIsSignup(!isSignup)}>
//                         {isSignup ? "Login" : "Sign Up"}
//                     </button>
//                 </div>
//             </div>

//             <div className="panel right-panel">
//                 <div className="content">
//                     <h2>{isAdmin ? "Admin Access" : "Agent Access"}</h2>
//                     <button className="btn" onClick={() => setIsAdmin(!isAdmin)}>
//                         Switch to {isAdmin ? "Agent" : "Admin"}
//                     </button>
//                 </div>
//             </div>

//             <div className="form-container">
//                 <h2>{isSignup ? "Sign Up" : "Login"} as {isAdmin ? "Admin" : "Agent"}</h2>
//                 <form onSubmit={handleAuth}>
//                     <input
//                         type="text"
//                         placeholder="Username"
//                         value={username}
//                         onChange={(e) => setUsername(e.target.value)}
//                         required
//                     />
//                     <input
//                         type="password"
//                         placeholder="Password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                     />
//                     {!isAdmin && isSignup && (
//                         <input
//                             type="text"
//                             placeholder="Enter Agent Token"
//                             value={token}
//                             onChange={(e) => setToken(e.target.value)}
//                             required
//                         />
//                     )}
//                     <button type="submit">{isSignup ? "Sign Up" : "Login"}</button>
//                 </form>
//                 <p onClick={() => setIsSignup(!isSignup)}>
//                     {isSignup ? "Already have an account? Login" : "Don't have an account? Sign Up"}
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default LoginSignup;



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, signup } from "../services/authService";
import "./LoginSignup.css";

const LoginSignup = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState(""); // For Agent Signup
    const [isSignup, setIsSignup] = useState(false);
    const [role, setRole] = useState("Admin"); // ✅ Default role is Admin
    const navigate = useNavigate();

    const handleAuth = async (e) => {
        e.preventDefault();

        try {
            if (role === "Agent" && isSignup && !token) {
                alert("Agent Token is required for signup!");
                return;
            }
            

            if (isSignup) {
                const data = await signup(username, password, role, token); // ✅ Send role & token
                alert(data.message);
            
                if (role === "Admin") {
                    navigate("/generate-token"); // ✅ Admins go to token generation
                } else if (role === "Agent") {
                    try {
                        const response = await fetch("http://192.168.1.7:8080/agent", {
                            method: "GET",
                            headers: { "Content-Type": "application/json" },
                        });
            
                        if (!response.ok) throw new Error(`Failed to get Agent Token! Status: ${response.status}`);
            
                        const agentToken = await response.text();
                        alert(`Your Agent Token: ${agentToken}`);
                        setToken(agentToken); // ✅ Store the token if needed
                    } catch (error) {
                        alert(error.message);
                    }
                }
            
                setIsSignup(false);
            }
            else {
                const data = await login(username, password, role); // ✅ Send role

                const accessToken = data.access_Token || data["access_Token"];
                const refreshToken = data.refresh_Token || data["refresh_token"];

                if (accessToken && refreshToken) {
                    localStorage.setItem("accessToken", accessToken);
                    localStorage.setItem("refreshToken", refreshToken);
                    localStorage.setItem("userRole", role);  // ✅ Store role
                    console.log("Tokens & Role saved!");
                } else {
                    alert("Login failed. No valid tokens received.");
                    return;
                }

                alert(`Login successful as ${role}!`);
                if (role === "Admin") {
                    navigate("/Dashboard"); // ✅ Redirect Admin to Admin Dashboard
                } else {
                    navigate("/agent-dashboard"); // ✅ Redirect Agent to Agent Dashboard
                }
            }
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="auth-container">
            <div className="panel left-panel">
                <div className="content">
                    <h2>{isSignup ? "New Here?" : "Welcome Back!"}</h2>
                    <p>{isSignup ? "Sign up to get started." : "Login to continue."}</p>
                    <button className="btn" onClick={() => setIsSignup(!isSignup)}>
                        {isSignup ? "Login" : "Sign Up"}
                    </button>
                </div>
            </div>

            <div className="panel right-panel">
                <div className="content">
                    <h2>{role === "Admin" ? "Admin Access" : "Agent Access"}</h2>
                    <button className="btn" onClick={() => setRole(role === "Admin" ? "Agent" : "Admin")}>
                        Switch to {role === "Admin" ? "Agent" : "Admin"}
                    </button>
                </div>
            </div>

            <div className="form-container">
                <h2>{isSignup ? "Sign Up" : "Login"} as {role === "Admin" ? "Admin" : "Agent"}</h2>
                <form onSubmit={handleAuth}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {role === "Agent" && isSignup && (
                        <input
                            type="text"
                            placeholder="Enter Agent Token"
                            value={token}
                            onChange={(e) => setToken(e.target.value)}
                            required
                        />
                    )}
                    <button type="submit">{isSignup ? "Sign Up" : "Login"}</button>
                </form>
                <p onClick={() => setIsSignup(!isSignup)}>
                    {isSignup ? "Already have an account? Login" : "Don't have an account? Sign Up"}
                </p>
            </div>
        </div>
    );
};

export default LoginSignup;



