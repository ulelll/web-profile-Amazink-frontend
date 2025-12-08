import CreateVacancy from "@/features/hr/pages/create_vacancy.jsx";
import DashboardHr from "@/features/hr/pages/dashboard-hr.jsx";
import Profile from "@/features/hr/pages/profile";
import { Route } from "react-router-dom";
import HrLoginPage from "@/features/hr/auth/login_page";


export default function HrRoutes() {
    return (
        <>
            <Route path="/hr" name="hrDashboard" element={<DashboardHr />} />
            <Route path= "/hr/login-hr" element={<HrLoginPage />} />
        <Route path="/hr/vacancies/create-vacancy" name="createVacancy" element={<CreateVacancy />} />
            <Route path="/hr/profile" name="hrProfile" element={<Profile />} />
        </>
    );
}
