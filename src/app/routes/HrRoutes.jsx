import DashboardHr from "@/features/hr/pages/dashboard-hr.jsx";
import Profile from "@/features/hr/pages/profile";
import SettingsPage from "@/features/hr/pages/setting/settings";
import CreateVacancy from "@/features/hr/pages/vacancys/create_vacancy.jsx";
import ApplicantPage from "@/features/hr/pages/vacancys/pelamar/applicant";
import ApplicantDetailPage from "@/features/hr/pages/vacancys/pelamar/detail";
import VacancyDetailPage from "@/features/hr/pages/vacancys/settings/detail-vacancy";
import VacancysSetting from "@/features/hr/pages/vacancys/settings/vacancys";
import { Route } from "react-router-dom";


export default function HrRoutes() {
    return (
        <>
            <Route path="/hr" name="hrDashboard" element={<DashboardHr />} />
            <Route path="/hr/vacancies/create-vacancy" name="createVacancy" element={<CreateVacancy />} />
            <Route path="/hr/vacancies/applicants" name="applicants" element={<ApplicantPage />}></Route>
            <Route path="/hr/vacancies/applicants/:id" name="applicants" element={<ApplicantDetailPage />}></Route>
            <Route path="/hr/vacancies/manage-vacancies" name="setting" element={<VacancysSetting />}> </Route>
            <Route path="/hr/vacancies/manage-vacancies/:id" name="setting" element={<VacancyDetailPage />}></Route>
            <Route path="/hr/settings" name="settings" element={<SettingsPage />}></Route>
            <Route path="/hr/profile" name="hrProfile" element={<Profile />} />
        </>
    );
}
