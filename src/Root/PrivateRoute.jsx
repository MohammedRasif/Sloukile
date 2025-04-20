import { Navigate } from "react-router-dom";

const PrivateRoutes = ({ children }) => {
    const accessToken = localStorage.getItem("access_token");

    return accessToken ? children : <Navigate to="/login" replace />;
};

export default PrivateRoutes;