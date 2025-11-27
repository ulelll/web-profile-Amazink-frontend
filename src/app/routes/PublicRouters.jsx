import { Route } from "react-router-dom";
import PublicLayout from "@/layouts/public_layout.jsx";

export default function PublicRoutes() {
    return (
        <>
        <Route path="/" element={<PublicLayout />} />
        {/* Tambahin route publik lain di sini */}
        </>
    );
}
