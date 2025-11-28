import { Route } from "react-router-dom";
import Dashboard from "@/features/admin/pages/dashboard.jsx";
import HeaderLandingPage from "@/features/admin/cms/header_landing_page.jsx";
import NewsUploadPage from "@/features/admin/cms/custom_news.jsx";
import UserManagementPage from "@/features/admin/pages/user_management.jsx";
import CustomVisiMisiPage from "@/features/admin/cms/custom_visimisi.jsx";
import AdminLoginPage from "@/features/admin/auth/Admin_login";

export default function AdminRoutes() {
    return (
        <>
        <Route path="/admin" element={<Dashboard />} />
        <Route path= "/admin/login-admin" element={<AdminLoginPage />} />
        <Route path="/admin/cms/header" element={<HeaderLandingPage />} />
        <Route path="/admin/cms/news" element={<NewsUploadPage />} />
        <Route path="/admin/cms/visi-misi" element={<CustomVisiMisiPage />} />
        <Route path="/admin/users" element={<UserManagementPage />} />
        </>
    );
}
