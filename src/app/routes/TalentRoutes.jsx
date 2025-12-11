import TalentLoginPage from "@/features/talent/auth/login_talent";
import TalentRegisterPage from "@/features/talent/auth/register_talent";
import Profile from "@/features/talent/profile/profile";
import Add from "@/features/talent/profile/add";
import AllVacancies from "@/features/talent/recruitment/all_vacancies";
import RecruitmentLayout from "@/layouts/Recruitment_Layout";
import { Route } from "react-router-dom";


export default function TalentRoutes() {
    return (
        <>
        <Route path= "/recruitment" element={<RecruitmentLayout />} />
        <Route path= "/recruitment/register" element={<TalentRegisterPage />} />
        <Route path= "/recruitment/login" element={<TalentLoginPage />} />
        <Route path= "/recruitment/all-vacancies" element={<AllVacancies />} />
        <Route path= "/recruitment/vacancies/:id" element={<AllVacancies />} />
        <Route path= "/recruitment/profile" element={<Profile />} />
        
        <Route path= "/recruitment/profile/Add" element={<Add />} />
        {/* <Route path="/hr/vacancies/create-vacancy" element={<CreateVacancy />} /> */}
        </>
    );
}
