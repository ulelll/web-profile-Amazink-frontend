import PublicLayout from "@/layouts/public_layout.jsx";
import { Route } from "react-router-dom";

export default function PublicRoutes() {
    return (
        <>
            <Route path="/" element={<PublicLayout />} />
            <Route path="/news/:id" element={<PublicLayout />} />
        </>
    );
}
