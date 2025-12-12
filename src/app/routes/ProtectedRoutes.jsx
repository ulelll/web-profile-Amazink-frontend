// src/components/ProtectedRoute.jsx
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function ProtectedRoute({ allowedRoles }) {
    const location = useLocation();
    const token = localStorage.getItem("access_token");
    const role = localStorage.getItem("role"); 

    if (!token) {
        return (
            <Navigate
                to={`/login?next=${encodeURIComponent(location.pathname)}`}
                replace
            />
        );
    }

    if (allowedRoles && !allowedRoles.includes(role)) {
        return <Navigate to="/not-authorized" replace />;
    }

    // lolos
    return <Outlet />;
}
