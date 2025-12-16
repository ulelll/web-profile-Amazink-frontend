import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function ProtectedRoute({ allowedRoles }) {
    const token = localStorage.getItem("access_token");
    const role = localStorage.getItem("role");
    const location = useLocation();

    // not logged in
    if (!token) {
        return <Navigate to={`/login?next=${location.pathname}`} replace />;
    }

    // logged in but wrong role
    if (allowedRoles && !allowedRoles.includes(role)) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}
