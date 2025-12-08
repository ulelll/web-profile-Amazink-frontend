import Footer from '@/features/public/section/Footer'
import HeroSection from '@/features/talent/landingpage/hero_section'
import RecruitmentNavbar from '@/features/talent/landingpage/recruitment_navbar'

export default function RecruitmentLayout() {
    return (
        <div className="w-full overflow-hidden">
            <RecruitmentNavbar />
            <HeroSection />
            <Footer />
        </div>
    )
}
