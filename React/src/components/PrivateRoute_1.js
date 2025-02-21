import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element }) => {
    const accessToken = localStorage.getItem("accessToken");

    return accessToken ? element : <Navigate to="/login" replace />;
};

// ✅ Export as default
export default PrivateRoute;
