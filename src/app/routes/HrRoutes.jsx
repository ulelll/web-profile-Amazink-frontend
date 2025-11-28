import { Route } from "react-router-dom";
import DashboardHr from "@/features/hr/pages/dashboard-hr.jsx";
import CreateVacancy from "@/features/hr/pages/create_vacancy.jsx";
import HrLoginPage from "@/features/hr/auth/login_page";


export default function HrRoutes() {
    return (
        <>
        <Route path="/hr" element={<DashboardHr />} />
        <Route path= "/hr/login-hr" element={<HrLoginPage />} />
        <Route path="/hr/vacancies/create-vacancy" element={<CreateVacancy />} />
        </>
    );
}
