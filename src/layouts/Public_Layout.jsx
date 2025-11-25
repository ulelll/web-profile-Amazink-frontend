import Navbar from '@/features/public/home/pages/Navbar'
import Header from '@/features/public/home/pages/Header'
import About from '@/features/public/home/pages/About'
import Visimisi from '@/features/public/home/pages/Visimisi'
import CompanyStructure from '@/features/public/home/pages/Company_structure'
import Company from '@/features/public/home/pages/Company'
import Footer from '@/features/public/home/pages/Footer'

export default function PublicLayout() {
    return (
        <div className="w-full overflow-hidden">
            <Navbar />
            <Header />
            <About />
            <Visimisi />
            <CompanyStructure />
            <Company />
            <Footer />
        </div>
    )
}
