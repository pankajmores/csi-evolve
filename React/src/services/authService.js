// export const login = async (username, password) => {
//     try {
//         const response = await fetch("http://192.168.1.7:8080/user/login", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ username, password }),
//         });

//         if (!response.ok) {
//             throw new Error(`Login failed! Status: ${response.status}`);
//         }

//         const data = await response.json();
//         console.log(data);

//         return data;
//     } catch (error) {
//         console.error("Login Error:", error.message);
//         throw new Error("Login failed. Check your network or credentials.");
//     }
// };

// export const signup = async (username, password) => {
//     try {
//         const response = await fetch("http://192.168.1.7:8080/user/signup", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ username, password }),
//         });


//         return await response.json();
//     } catch (error) {
//         console.error("Signup Error:", error.message);
//         throw new Error("Signup failed. Try again later.");
//     }
// };
// export const fetchProtectedData = async () => {
//     const accessToken = localStorage.getItem("accessToken");

//     if (!accessToken) {
//         throw new Error("No access token found. Please log in.");
//     }

//     try {
//         const response = await fetch("http://192.168.1.7:8080/api/test", {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Authorization": `Bearer ${accessToken}`
//             }
//         });

//         if (!response.ok) {
//             throw new Error(`Request failed! Status: ${response.status}`);
//         }

//         // Since API returns a plain string, use .text() instead of .json()
//         return await response.text();
//     } catch (error) {
//         console.error("Fetch Error:", error.message);
//         throw new Error("Failed to fetch protected data.");
//     }
// };






// export const login = async (username, password, role) => {  // Accept role
//     try {
//         const response = await fetch("http://192.168.1.7:8080/user/login", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ username, password, role }),  // Send role
//         });

//         if (!response.ok) {
//             throw new Error(`Login failed! Status: ${response.status}`);
//         }

//         const data = await response.json();
//         console.log("Login Response:", data);

//         // Store tokens & role
//         localStorage.setItem("accessToken", data.access_Token || data["access_Token"]);
//         localStorage.setItem("refreshToken", data.refresh_Token || data["refresh_token"]);
//         localStorage.setItem("userRole", role);  // ✅ Store role in localStorage

//         return data;
//     } catch (error) {
//         console.error("Login Error:", error.message);
//         throw new Error("Login failed. Check your network or credentials.");
//     }
// };

// export const signup = async (username, password, role) => {  // Accept role
//     try {
//         const response = await fetch("http://192.168.1.7:8080/user/signup", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ username, password, role }),  // Send role
//         });

//         const data = await response.json();
//         //const authHeader = response.headers.get("Authorization");
//         console.log("Login Response:", data);

//         // Store tokens & role
//         localStorage.setItem("accessToken", data.access_Token || data["access_Token"]);
//         localStorage.setItem("refreshToken", data.refresh_Token || data["refresh_token"]);
//         localStorage.setItem("userRole", role);  // ✅ Store role in localStorage

//         if (response.ok) {
//             console.log("Signup Response:", data);
//             alert(`Signup successful! Role: ${role}`);
//         } else {
//             throw new Error(data.message || "Signup failed.");
//         }

//         return data;
//     } catch (error) {
//         console.error("Signup Error:", error.message);
//         throw new Error("Signup failed. Try again later.");
//     }
// };

// export const fetchProtectedData = async () => {
//     const accessToken = localStorage.getItem("accessToken");

//     if (!accessToken) {
//         throw new Error("No access token found. Please log in.");
//     }

//     try {
//         const response = await fetch("http://192.168.1.7:8080/api/test", {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Authorization": `Bearer ${accessToken}`
//             }
//         });

//         if (!response.ok) {
//             throw new Error(`Request failed! Status: ${response.status}`);
//         }

//         return await response.text();
//     } catch (error) {
//         console.error("Fetch Error:", error.message);
//         throw new Error("Failed to fetch protected data.");
//     }
// };




import axios from "axios";

const BASE_URL = "http://192.168.1.7:8080/auth";

// 🔹 Helper function to get the correct API endpoint based on role
const getAuthEndpoint = (role, type) => {
    if (role.toLowerCase() === "admin") return `${BASE_URL}/org/${type}`;
    if (role.toLowerCase() === "agent") return `${BASE_URL}/agent/${type}`;
    throw new Error("Invalid Role!"); // 🚨 Prevent incorrect API calls
};

// 🔹 Login function
export const login = async (username, password, role) => {
    try {
        const endpoint = getAuthEndpoint(role, "login");
        const response = await axios.post(endpoint, { username, password, role });

        console.log("Login Response:", response.data);
        localStorage.setItem("accessToken", response.data.access_Token);
        localStorage.setItem("refreshToken", response.data.refresh_Token);
        localStorage.setItem("userRole", role);

        return response.data;
    } catch (error) {
        console.error("Login Error:", error.message);
        throw new Error("Login failed. Check credentials or network.");
    }
};

// 🔹 Signup function
export const signup = async (username, password, role, token = "") => {
    try {
        const endpoint = getAuthEndpoint(role, "signup");

        const response = await axios.post(endpoint, { username, password, role, token });
        console.log("Signup Response:", response.data);
        localStorage.setItem("accessToken", response.data.access_Token);
        localStorage.setItem("refreshToken", response.data.refresh_Token);
        localStorage.setItem("userRole", role);

        return response.data;
    } catch (error) {
        console.error("Signup Error:", error.message);
        throw new Error("Signup failed. Try again later.");
    }
};

//  Refresh Token function
// export const refreshToken = async (token, role) => {
//     try {
//         const endpoint =  "http://192.168.1.7:8080/org/token";

//         const response = await axios.post(endpoint, {}, {
//             headers: { Authorization: `Bearer ${token}` }
//         });

//         console.log("Token Refreshed:", response.data);
//         localStorage.setItem("accessToken", response.data.access_Token);
//         return response.data;
//     } catch (error) {
//         console.error("Token Refresh Error:", error.message);
//         throw new Error("Token refresh failed.");
//     }
// };

// export const refreshToken = async (token, role) => {
//     try {
//         const endpoint = getAuthEndpoint(role, "token");  // Use role-based endpoint

//         const response = await axios.post(endpoint, {}, {
//             headers: { Authorization: `Bearer ${token}` }
//         });

//         console.log("Token Refreshed:", response.data);
//         localStorage.setItem("accessToken", response.data.access_Token);
//         return response.data;
//     } catch (error) {
//         console.error("Token Refresh Error:", error.message);
//         throw new Error("Token refresh failed.");
//     }
// };

export const refreshToken = async (token) => {
    try {
        const endpoint = "http://192.168.1.7:8080/org/token"; // Use the correct endpoint

        const response = await axios.post(endpoint, {}, {
            headers: { Authorization: `Bearer ${token}` }
        });

        console.log("Token Refreshed:", response.data);
        localStorage.setItem("accessToken", response.data.access_Token);
        return response.data;
    } catch (error) {
        console.error("Token Refresh Error:", error.message);
        throw new Error("Token refresh failed.");
    }
};

