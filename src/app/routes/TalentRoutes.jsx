import { Route } from "react-router-dom";
import TalentLoginPage from "@/features/talent/auth/login_talent";
import TalentRegisterPage from "@/features/talent/auth/register_talent";
import RecruitmentLayout from "@/layouts/Recruitment_Layout";


export default function TalentRoutes() {
    return (
        <>
        <Route path= "/recruitment" element={<RecruitmentLayout />} />
        <Route path= "/talent/register" element={<TalentRegisterPage />} />
        {/* <Route path="/hr/vacancies/create-vacancy" element={<CreateVacancy />} /> */}
        </>
    );
}
