import { Route } from "react-router-dom";
import TalentLoginPage from "@/features/talent/auth/login_talent";
import TalentRegisterPage from "@/features/talent/auth/register_talent";
import RecruitmentLayout from "@/layouts/Recruitment_Layout";
import AllVacancies from "@/features/talent/recruitment/all_vacancies";


export default function TalentRoutes() {
    return (
        <>
        <Route path= "/recruitment" element={<RecruitmentLayout />} />
        <Route path= "/recruitment/register" element={<TalentRegisterPage />} />
        <Route path= "/recruitment/login" element={<TalentLoginPage />} />
        <Route path= "/recruitment/all-vacancies" element={<AllVacancies />} />
        {/* <Route path="/hr/vacancies/create-vacancy" element={<CreateVacancy />} /> */}
        </>
    );
}
