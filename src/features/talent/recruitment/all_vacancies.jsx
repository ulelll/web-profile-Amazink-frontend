import { Search, MapPin, Briefcase, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const API_BASE_URL = "http://localhost:8000/api/v1";

// ====== VACANCY CARD ======
function VacancyCard({ vacancy }) {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/recruitment/vacancies/${vacancy.id}`)}
            className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-indigo-200 cursor-pointer"
        >
            <div className="h-32 sm:h-40 bg-gradient-to-br from-indigo-50 to-purple-50 relative overflow-hidden">
                {vacancy.image && (
                    <img 
                        src={vacancy.image} 
                        alt={vacancy.title}
                        className="w-full h-full object-cover"
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            
            <div className="p-4">
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 line-clamp-2 hover:text-indigo-600 transition-colors">
                    {vacancy.title}
                </h3>
                
                <div className="space-y-2 mb-4">
                    <div className="flex items-center text-xs sm:text-sm text-gray-600">
                        <Briefcase className="w-4 h-4 mr-2 text-indigo-500" />
                        <span className="truncate font-medium">{vacancy.company?.name || 'Unknown Company'}</span>
                    </div>
                    
                    <div className="flex items-center text-xs sm:text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-2 text-indigo-500" />
                        <span className="capitalize">{vacancy.penempatan || 'Onsite'} • {vacancy.division?.name || 'Unknown Division'}</span>
                    </div>
                    
                    <div className="flex items-center text-xs sm:text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-2 text-indigo-500" />
                        <span>Diunggah pada {new Date(vacancy.created_at).toLocaleDateString('id-ID')}</span>
                    </div>
                </div>
                
                <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-3 py-1.5 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-full border border-indigo-200">
                        {vacancy.status_pekerjaan || 'Fulltime'}
                    </span>

                    <span
                        className={`px-3 py-1.5 text-xs font-semibold rounded-full border ${
                            vacancy.is_open
                                ? 'bg-green-50 text-green-700 border-green-200'
                                : 'bg-red-50 text-red-700 border-red-200'
                        }`}
                    >
                        {vacancy.is_open ? 'Aktif' : 'Tutup'}
                    </span>
                </div>
            </div>
        </div>
    );
}

// ====== PAGINATION ======
function Pagination({ currentPage, totalPages, onPageChange }) {
    const pages = [];
    const maxVisible = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);

    if (endPage - startPage < maxVisible - 1) {
        startPage = Math.max(1, endPage - maxVisible + 1);
    }

    for (let i = startPage; i <= endPage; i++) pages.push(i);

    return (
        <div className="flex items-center justify-center gap-2 mt-10">
            <button 
                onClick={() => onPageChange(currentPage - 1)} 
                disabled={currentPage === 1} 
                className="p-2 rounded-lg border border-gray-200 disabled:opacity-40 hover:bg-indigo-50 hover:border-indigo-300 transition-all"
            >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>

            {pages.map(page => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`min-w-[40px] px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                        page === currentPage 
                            ? 'bg-indigo-700 text-white border-indigo-700 shadow-md' 
                            : 'border-gray-200 hover:bg-indigo-50 hover:border-indigo-300 text-gray-700'
                    }`}
                >
                    {page}
                </button>
            ))}

            <button 
                onClick={() => onPageChange(currentPage + 1)} 
                disabled={currentPage === totalPages} 
                className="p-2 rounded-lg border border-gray-200 disabled:opacity-40 hover:bg-indigo-50 hover:border-indigo-300 transition-all"
            >
                <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
        </div>
    );
}

// ====== MAIN COMPONENT ======
export default function AllVacancies() {
    const [vacancies, setVacancies] = useState([]);
    const [divisions, setDivisions] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [divisionFilter, setDivisionFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const itemsPerPage = 6;

    useEffect(() => {
        fetchDivisions();
    }, []);

    useEffect(() => {
        fetchVacancies();
    }, [currentPage, divisionFilter]);

    const fetchDivisions = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/division/`);
            const data = await res.json();
            setDivisions(data);
        } catch (err) {
            console.error('Error fetching divisions:', err);
        }
    };

    const fetchVacancies = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams({
                skip: (currentPage - 1) * itemsPerPage,
                limit: itemsPerPage,
            });

            if (divisionFilter) {
                params.append("division_id", divisionFilter);
            }

            const res = await fetch(`${API_BASE_URL}/vacancies/?${params.toString()}`);
            const data = await res.json();

            setVacancies(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Error fetching vacancies:", err);
        } finally {
            setLoading(false);
        }
    };

    const filteredVacancies = vacancies.filter(v =>
        v.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.company?.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 py-10 px-4 sm:px-6 lg:px-8 shadow-xl">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-4xl font-bold text-white mb-3">Lowongan Kerja Tersedia</h1>
                    <p className="text-indigo-100 text-sm">Temukan peluang karir terbaik</p>

                    <div className="flex flex-col sm:flex-row gap-3 mt-6">

                        {/* Search */}
                        <div className="relative flex-1 max-w-xl">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Cari judul lowongan atau perusahaan..."
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3.5 rounded-xl shadow-lg focus:ring-2 focus:ring-white/40 outline-none"
                            />
                        </div>

                        {/* Division Filter */}
                        <Select value={divisionFilter} onValueChange={setDivisionFilter}>
                            <SelectTrigger className="w-full sm:w-[200px] bg-white shadow-lg border-0 rounded-xl py-3.5 text-sm font-medium">
                                <SelectValue placeholder="Semua Divisi" />
                            </SelectTrigger>
                            <SelectContent>
                                {divisions.map(div => (
                                    <SelectItem key={div.id} value={div.id.toString()}>
                                        {div.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 py-10">
                {loading ? (
                    <div className="text-center py-20">
                        <div className="animate-spin h-16 w-16 border-4 border-indigo-200 rounded-full border-t-indigo-600 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Memuat lowongan...</p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredVacancies.map(v => (
                                <VacancyCard key={v.id} vacancy={v} />
                            ))}
                        </div>

                        {filteredVacancies.length > 0 && (
                            <Pagination 
                                currentPage={currentPage} 
                                totalPages={3} 
                                onPageChange={setCurrentPage} 
                            />
                        )}

                        {filteredVacancies.length === 0 && (
                            <div className="text-center py-20 bg-white rounded-2xl shadow-sm border">
                                <Search className="mx-auto w-10 h-10 text-gray-400 mb-4" />
                                <p className="text-gray-500 text-lg font-medium">Tidak ada lowongan ditemukan</p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
