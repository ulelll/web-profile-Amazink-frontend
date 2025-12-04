import Navbar from '@/features/public/home/pages/Navbar'
import Header from '@/features/public/home/pages/Header'
import About from '@/features/public/home/pages/About'
import Visimisi from '@/features/public/home/pages/Visimisi'
import CompanyStructure from '@/features/public/home/pages/Company_structure'
import Company from '@/features/public/home/pages/Company'
import Footer from '@/features/public/home/pages/Footer'
import RecruitmentNavbar from '@/features/talent/landingpage/recruitment_navbar'
import HeroSection from '@/features/talent/landingpage/hero_section'

export default function RecruitmentLayout() {
    return (
        <div className="w-full overflow-hidden">
            <RecruitmentNavbar />
            <HeroSection />
            <Footer />
        </div>
    )
}
