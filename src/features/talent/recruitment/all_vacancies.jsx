import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Briefcase, Search, Menu, X } from 'lucide-react';
import RecruitmentNavbar from '../landingpage/recruitment_navbar';

const VacancyCard = ({ vacancy }) => {
    return (
        <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer group">
        <div className="relative overflow-hidden bg-gradient-to-br from-green-400 to-blue-500 h-48">
            <img 
            src={vacancy.gambar} 
            alt={vacancy.judul_lowongan}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-opacity" />
        </div>
        <CardContent className="p-5">
            <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 min-h-[3.5rem]">
            {vacancy.judul_lowongan}
            </h3>
            <div className="mt-4 flex items-center justify-between">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {vacancy.active ? 'Aktif' : 'Tidak Aktif'}
            </span>
            </div>
        </CardContent>
        </Card>
    );
    };

    export default function App() {
    const [vacancies, setVacancies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const dummyVacancies = [
        {
            id: 1,
            judul_lowongan: "Senior Frontend Developer",
            gambar: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop",
            start_periode: "2025-01-01",
            end_periode: "2025-02-28",
            deskripsi: "Mencari frontend developer berpengalaman",
            active: 1
        },
        {
            id: 2,
            judul_lowongan: "Backend Engineer - Node.js",
            gambar: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=300&fit=crop",
            start_periode: "2025-01-15",
            end_periode: "2025-03-15",
            deskripsi: "Membangun API dan microservices",
            active: 1
        },
        {
            id: 3,
            judul_lowongan: "UI/UX Designer",
            gambar: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop",
            start_periode: "2025-02-01",
            end_periode: "2025-03-30",
            deskripsi: "Merancang pengalaman pengguna yang menarik",
            active: 1
        },
        {
            id: 4,
            judul_lowongan: "Data Scientist",
            gambar: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
            start_periode: "2025-01-20",
            end_periode: "2025-03-20",
            deskripsi: "Analisis data dan machine learning",
            active: 1
        },
        {
            id: 5,
            judul_lowongan: "DevOps Engineer",
            gambar: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=400&h=300&fit=crop",
            start_periode: "2025-02-10",
            end_periode: "2025-04-10",
            deskripsi: "Mengelola infrastructure dan CI/CD",
            active: 1
        },
        {
            id: 6,
            judul_lowongan: "Mobile App Developer",
            gambar: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop",
            start_periode: "2025-01-25",
            end_periode: "2025-03-25",
            deskripsi: "Pengembangan aplikasi iOS dan Android",
            active: 1
        }
        ];
        
        setVacancies(dummyVacancies);
    }, []);

    const filteredVacancies = vacancies.filter(vacancy =>
        vacancy.judul_lowongan.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <RecruitmentNavbar />

            <div className="min-h-screen bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                    <div className="mb-8">
                        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                            Lowongan Kerja Tersedia
                        </h1>
                        <p className="text-gray-600 mb-6">
                            Temukan peluang karir terbaik untuk Anda
                        </p>

                        <div className="relative max-w-xl">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Cari lowongan..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredVacancies.map((vacancy) => (
                            <VacancyCard key={vacancy.id} vacancy={vacancy} />
                        ))}
                    </div>

                    {filteredVacancies.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg">Tidak ada lowongan yang ditemukan</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );   
}

