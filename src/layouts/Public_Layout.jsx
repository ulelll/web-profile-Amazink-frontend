import About from '@/features/public/section/About'
import Company from '@/features/public/section/Company'
import CompanyStructure from '@/features/public/section/Company_structure'
import Footer from '@/features/public/section/Footer'
import Header from '@/features/public/section/Header'
import Navbar from '@/features/public/section/Navbar'
import News from '@/features/public/section/News'
import Visimisi from '@/features/public/section/Visimisi'

export default function PublicLayout() {
    return (
        <div className="w-full overflow-hidden">
            <Navbar />
            <Header />
            <About />
            <Visimisi />
            <CompanyStructure />
            <Company />
            <News/>
            <Footer />
        </div>
    )
}
