import HrLoginPage from "@/features/hr/auth/login_page";
import CreateVacancy from "@/features/hr/pages/create_vacancy.jsx";
import DashboardHr from "@/features/hr/pages/dashboard-hr.jsx";
import ApplicantPage from "@/features/hr/pages/pelamar/applicant";
import ApplicantDetailPage from "@/features/hr/pages/pelamar/detail";
import Profile from "@/features/hr/pages/profile";
import { Route } from "react-router-dom";


export default function HrRoutes() {
    return (
        <>
            <Route path="/hr" name="hrDashboard" element={<DashboardHr />} />
            <Route path="/hr/login-hr" element={<HrLoginPage />} />
            <Route path="/hr/vacancies/create-vacancy" name="createVacancy" element={<CreateVacancy />} />
            <Route path="/hr/vacancies/applicants" name="applicants" element={<ApplicantPage />}></Route>
            <Route path="/hr/vacancies/applicants/:id" name="applicants" element={<ApplicantDetailPage />}></Route>
            <Route path="/hr/profile" name="hrProfile" element={<Profile />} />

        </>
    );
}
