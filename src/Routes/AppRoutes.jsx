import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoutes";

/* ===== PUBLIC ===== */
import PublicLayout from "@/layouts/public_layout.jsx";
import LoginPage from "../features/public/auth/login.jsx";
import TalentRegisterPage from "../features/talent/auth/register_talent";
import RecruitmentLayout from "@/layouts/recruitment_layout.jsx";
import AllVacancies from "../features/talent/recruitment/all_vacancies.jsx";
import VacancyDetail from "../features/talent/recruitment/detail_vacancy.jsx";
import RecruitmentLanding from "@/layouts/RecruitmentLanding.jsx";

/* ===== TALENT ===== */
import Profile from "../features/talent/profile/view.jsx";
import AddProfile from "../features/talent/profile/add.jsx";

/* ===== HR ===== */
import DashboardHr from "@/features/hr/pages/dashboard-hr.jsx";
import CreateVacancy from "@/features/hr/pages/vacancys/create_vacancy.jsx";
import ApplicantPage from "@/features/hr/pages/vacancys/pelamar/applicant";
import ApplicantDetailPage from "@/features/hr/pages/vacancys/pelamar/detail";
import VacancyDetailPage from "@/features/hr/pages/vacancys/settings/detail-vacancy";
import VacancysSetting from "@/features/hr/pages/vacancys/settings/vacancys";
import CompanyManagement from "@/features/hr/pages/setting/company-management.jsx";
import DivisionManagement from "@/features/hr/pages/setting/division-management.jsx";

/* ===== ADMIN ===== */
import Dashboard from "@/features/admin/pages/dashboard.jsx";
import HeaderLandingPage from "@/features/admin/cms/header_landing_page.jsx";
import NewsUploadPage from "@/features/admin/cms/custom_news.jsx";
import UserManagementPage from "@/features/admin/pages/user_management.jsx";
import CustomVisiMisiPage from "@/features/admin/cms/custom_visimisi.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      {/* ========== PUBLIC ========== */}
      <Route path="/" element={<PublicLayout />} />
      <Route path="/news/:id" element={<PublicLayout />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/recruitment/register" element={<TalentRegisterPage />} />

      <Route path="/recruitment" element={<RecruitmentLayout />}>
        {/* landing */}
        <Route index element={<RecruitmentLanding />} />

        {/* vacancies */}
        <Route path="vacancies" element={<AllVacancies />} />
        <Route path="vacancies/:id" element={<VacancyDetail />} />

        {/* profile (protected later) */}
        <Route path="profile" element={<Profile />} />
      </Route>

      {/* ========== TALENT ========== */}
      <Route element={<ProtectedRoute allowedRoles={["talent"]} />}>
        <Route path="/recruitment/profile/view" element={<Profile />} />
        <Route path="/recruitment/profile/add" element={<AddProfile />} />
      </Route>

      {/* ========== HR ========== */}
      <Route element={<ProtectedRoute allowedRoles={["hr"]} />}>
        <Route path="/hr" element={<DashboardHr />} />
        <Route
          path="/hr/vacancies/create-vacancy"
          element={<CreateVacancy />}
        />
        <Route path="/hr/vacancies/applicants" element={<ApplicantPage />} />
        <Route
          path="/hr/vacancies/applicants/:id"
          element={<ApplicantDetailPage />}
        />
        <Route
          path="/hr/vacancies/manage-vacancies"
          element={<VacancysSetting />}
        />
        <Route
          path="/hr/vacancies/manage-vacancies/:id"
          element={<VacancyDetailPage />}
        />
        <Route path="/hr/company-management" element={<CompanyManagement />} />
        <Route
          path="/hr/division-management"
          element={<DivisionManagement />}
        />
        <Route path="/hr/profile" element={<Profile />} />
      </Route>

      {/* ========== ADMIN ========== */}
      <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/cms/header" element={<HeaderLandingPage />} />
        <Route path="/admin/cms/news" element={<NewsUploadPage />} />
        <Route path="/admin/cms/visi-misi" element={<CustomVisiMisiPage />} />
        <Route path="/admin/users" element={<UserManagementPage />} />
      </Route>
    </Routes>
  );
}
