import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui';
import VacancyCard from '@/components/vacancy-card';
import HrLayout from '@/layouts/hr_layout';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function VacancysSetting() {
    const [vacancies, setVacancies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [availableDivisions, setAvailableDivisions] = useState([]);
    const [statusFilter, setStatusFilter] = useState("all");
    const [divisionFilter, setDivisionFilter] = useState("all");



    useEffect(() => {
        const dummyVacancies = [
            {
                id: 1,
                judul_lowongan: "Senior Frontend Developer",
                gambar: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop",
                start_periode: "2025-01-01",
                end_periode: "2025-02-28",
                divisions: "IT",
                deskripsi: "Mencari frontend developer berpengalaman",
                active: 1
            },
            {
                id: 2,
                judul_lowongan: "Backend Engineer - Node.js",
                gambar: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=300&fit=crop",
                start_periode: "2025-01-15",
                end_periode: "2025-03-15",
                divisions: "IT",
                deskripsi: "Membangun API dan microservices",
                active: 1
            },
            {
                id: 3,
                judul_lowongan: "UI/UX Designer",
                gambar: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop",
                start_periode: "2025-02-01",
                end_periode: "2025-03-30",
                divisions: "Desain grafis",
                deskripsi: "Merancang pengalaman pengguna yang menarik",
                active: 1
            },
            {
                id: 4,
                judul_lowongan: "Data Scientist",
                gambar: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
                start_periode: "2025-01-20",
                end_periode: "2025-03-20",
                divisions: "IT",
                deskripsi: "Analisis data dan machine learning",
                active: 1
            },
            {
                id: 5,
                judul_lowongan: "DevOps Engineer",
                gambar: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=400&h=300&fit=crop",
                divisions: "IT",
                start_periode: "2025-02-10",
                end_periode: "2025-04-10",
                deskripsi: "Mengelola infrastructure dan CI/CD",
                active: 1
            },
            {
                id: 6,
                judul_lowongan: "Mobile App Developer",
                gambar: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop",
                divisions: "IT",
                start_periode: "2025-01-25",
                end_periode: "2025-03-25",
                deskripsi: "Pengembangan aplikasi iOS dan Android",
                active: 0
            }
        ];

        setVacancies(dummyVacancies);
        const divisions = Array.from(new Set(dummyVacancies.map(v => v.divisions.split(" ")[0])));
        setAvailableDivisions(divisions);
    }, []);



    const filteredVacancies = vacancies.filter((vacancy) => {
        const matchSearch =
            vacancy.judul_lowongan.toLowerCase().includes(searchTerm.toLowerCase());

        const matchStatus =
            statusFilter === "all" || String(vacancy.active) === statusFilter;

        const divisionName = vacancy.divisions.split(" ")[0];
        const matchDivision =
            divisionFilter === "all" || divisionName === divisionFilter;

        return matchSearch && matchStatus && matchDivision;
    });


    return (
        <HrLayout>

            <div className="min-h-screen bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                    <div className="mb-8">
                        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                            Atur Lowongan Kerja yang tersedia
                        </h1>

                        {/* Search + Filters Container */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-3">

                            {/* Search */}
                            <div className="relative w-full sm:max-w-sm">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Cari lowongan..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                                />
                            </div>

                            {/* Status Filter */}
                            <DropdownMenu>
                                <DropdownMenuTrigger className="px-4 py-3 bg-white border rounded-lg cursor-pointer w-full sm:w-auto text-left sm:text-center">
                                    Status: {statusFilter === "all" ? "Semua" : statusFilter === "1" ? "Active" : "Not Active"}
                                </DropdownMenuTrigger>

                                <DropdownMenuContent>
                                    <DropdownMenuItem onClick={() => setStatusFilter("all")}>
                                        Semua
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setStatusFilter("1")}>
                                        Active
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setStatusFilter("0")}>
                                        Not Active
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            {/* Division Filter */}
                            <DropdownMenu>
                                <DropdownMenuTrigger className="px-4 py-3 bg-white border rounded-lg cursor-pointer w-full sm:w-auto text-left sm:text-center">
                                    Divisi: {divisionFilter === "all" ? "Semua" : divisionFilter}
                                </DropdownMenuTrigger>

                                <DropdownMenuContent>
                                    <DropdownMenuItem onClick={() => setDivisionFilter("all")}>
                                        Semua
                                    </DropdownMenuItem>

                                    {availableDivisions.map((d) => (
                                        <DropdownMenuItem key={d} onClick={() => setDivisionFilter(d)}>
                                            {d}
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>

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
        </HrLayout>
    );
}

