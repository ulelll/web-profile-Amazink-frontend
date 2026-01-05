import {
  Search,
  MapPin,
  Briefcase,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Building2,
  Clock,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const API_BASE_URL = "http://localhost:8000/api/v1";

// ====== VACANCY CARD ======
function VacancyCard({ vacancy, index }) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const gradients = [
    "from-violet-500 via-purple-500 to-fuchsia-500",
    "from-cyan-500 via-blue-500 to-indigo-500",
    "from-amber-500 via-orange-500 to-red-500",
    "from-emerald-500 via-green-500 to-teal-500",
    "from-pink-500 via-rose-500 to-red-500",
    "from-blue-500 via-indigo-500 to-purple-500",
  ];

  return (
    <div
      onClick={() => navigate(`/recruitment/vacancies/${vacancy.id}`)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-transparent cursor-pointer transform hover:-translate-y-2"
      style={{
        animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
      }}
    >
      {/* Animated background gradient on hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${
          gradients[index % gradients.length]
        } opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
      ></div>

      {/* Image Section with Overlay */}
      <div className="relative h-48 overflow-hidden">
        {vacancy.image ? (
          <img
            src={vacancy.image}
            alt={vacancy.title}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
          />
        ) : (
          <div
            className={`w-full h-full bg-gradient-to-br ${
              gradients[index % gradients.length]
            } opacity-80`}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <Building2 className="w-16 h-16 text-white/30" />
            </div>
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

        {/* Floating Status Badge */}
        <div className="absolute top-4 right-4">
          <span
            className={`px-4 py-1.5 text-xs font-bold rounded-full backdrop-blur-md border-2 shadow-lg ${
              vacancy.is_open
                ? "bg-emerald-500/90 text-white border-emerald-300"
                : "bg-gray-500/90 text-white border-gray-300"
            }`}
          >
            {vacancy.is_open ? "🔥 Aktif" : "Tutup"}
          </span>
        </div>

        {/* Company Logo/Icon at bottom left */}
        <div className="absolute bottom-4 left-4">
          <div className="w-12 h-12 rounded-xl bg-white/95 backdrop-blur-sm shadow-lg flex items-center justify-center border border-white/50">
            <Building2 className="w-6 h-6 text-indigo-600" />
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 relative">
        {/* Sparkle icon for featured/new jobs */}
        {index < 3 && (
          <div className="absolute -top-3 left-6">
            <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
              <Sparkles className="w-3 h-3" />
              Trending
            </div>
          </div>
        )}

        <h3 className="text-xl font-bold text-gray-900 mb-4 line-clamp-2 group-hover:text-indigo-600 transition-colors duration-300 mt-2">
          {vacancy.title}
        </h3>

        <div className="space-y-3 mb-5">
          <div className="flex items-center text-sm text-gray-600 group/item hover:text-indigo-600 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center mr-3 group-hover/item:bg-indigo-100 transition-colors">
              <Briefcase className="w-4 h-4 text-indigo-600" />
            </div>
            <span className="truncate font-medium">
              {vacancy.company?.name || "Unknown Company"}
            </span>
          </div>

          <div className="flex items-center text-sm text-gray-600 group/item hover:text-teal-600 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center mr-3 group-hover/item:bg-teal-100 transition-colors">
              <MapPin className="w-4 h-4 text-teal-600" />
            </div>
            <span className="capitalize truncate">
              {vacancy.penempatan || "Onsite"} •{" "}
              {vacancy.division?.name || "Unknown"}
            </span>
          </div>

          <div className="flex items-center text-sm text-gray-600 group/item hover:text-purple-600 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center mr-3 group-hover/item:bg-purple-100 transition-colors">
              <Calendar className="w-4 h-4 text-purple-600" />
            </div>
            <span className="text-xs">
              {new Date(vacancy.created_at).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex items-center gap-2 flex-wrap pt-4 border-t border-gray-100">
          <span className="px-4 py-2 bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 text-xs font-bold rounded-xl border border-indigo-200/50 shadow-sm">
            {vacancy.status_pekerjaan || "Fulltime"}
          </span>

          <div className="ml-auto">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                isHovered
                  ? "bg-indigo-600 shadow-lg shadow-indigo-200"
                  : "bg-gray-100"
              }`}
            >
              <ChevronRight
                className={`w-5 h-5 transition-colors duration-300 ${
                  isHovered ? "text-white" : "text-gray-400"
                }`}
              />
            </div>
          </div>
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
    <div className="flex items-center justify-center gap-3 mt-12">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="group p-3 rounded-xl border-2 border-gray-200 disabled:opacity-40 hover:border-indigo-500 hover:bg-indigo-50 transition-all disabled:hover:border-gray-200 disabled:hover:bg-transparent"
      >
        <ChevronLeft className="w-5 h-5 text-gray-600 group-hover:text-indigo-600 transition-colors" />
      </button>

      <div className="flex gap-2">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`min-w-[44px] h-11 px-4 rounded-xl text-sm font-bold transition-all duration-300 ${
              page === currentPage
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-200 scale-110"
                : "border-2 border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 text-gray-700"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="group p-3 rounded-xl border-2 border-gray-200 disabled:opacity-40 hover:border-indigo-500 hover:bg-indigo-50 transition-all disabled:hover:border-gray-200 disabled:hover:bg-transparent"
      >
        <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-indigo-600 transition-colors" />
      </button>
    </div>
  );
}

// ====== MAIN COMPONENT ======
export default function AllVacancies() {
  const [vacancies, setVacancies] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [divisionFilter, setDivisionFilter] = useState("");
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
      console.error("Error fetching divisions:", err);
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

      const res = await fetch(
        `${API_BASE_URL}/vacancies/?${params.toString()}`
      );
      const data = await res.json();

      setVacancies(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching vacancies:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredVacancies = vacancies.filter(
    (v) =>
      v.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.company?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 8s ease infinite;
        }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pt-16">
        {/* Header with animated background */}
        <div className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 animate-gradient py-16 px-4 sm:px-6 lg:px-10 shadow-2xl overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-float"></div>
            <div
              className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-float"
              style={{ animationDelay: "1s" }}
            ></div>
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-float"
              style={{ animationDelay: "0.5s" }}
            ></div>
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <span className="text-white/90 text-sm font-semibold px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm">
                {filteredVacancies.length} Lowongan Tersedia
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tight">
              Temukan Karir
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-300">
                Impianmu
              </span>
            </h1>
            <p className="text-blue-100 text-lg max-w-2xl leading-relaxed">
              Bergabunglah dengan ribuan profesional yang telah menemukan
              peluang karir terbaik mereka bersama kami
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              {/* Search with enhanced styling */}
              <div className="relative flex-1 max-w-2xl group">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
                <div className="relative">
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-indigo-400" />
                  <input
                    type="text"
                    placeholder="Cari judul lowongan atau perusahaan..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-14 pr-6 py-4 rounded-2xl shadow-2xl focus:ring-4 focus:ring-white/30 outline-none text-gray-700 font-medium backdrop-blur-sm bg-white/95 border-2 border-white/50"
                  />
                </div>
              </div>

              {/* Division Filter with enhanced styling */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
                <Select
                  value={divisionFilter}
                  onValueChange={setDivisionFilter}
                >
                  <SelectTrigger className="relative w-full sm:w-[220px] bg-white/95 backdrop-blur-sm shadow-2xl border-2 border-white/50 rounded-2xl py-4 px-5 text-sm font-bold hover:bg-white transition-colors">
                    <SelectValue placeholder="🎯 Semua Divisi" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    {divisions.map((div) => (
                      <SelectItem key={div.id} value={div.id.toString()}>
                        {div.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          {loading ? (
            <div className="text-center py-32">
              <div className="relative inline-block">
                <div className="animate-spin h-20 w-20 border-4 border-indigo-200 rounded-full border-t-indigo-600 mx-auto"></div>
                <div className="absolute inset-0 animate-ping h-20 w-20 border-4 border-indigo-400 rounded-full opacity-20"></div>
              </div>
              <p className="mt-6 text-gray-600 font-medium text-lg">
                Memuat lowongan terbaik untuk Anda...
              </p>
            </div>
          ) : (
            <>
              {filteredVacancies.length > 0 && (
                <div className="mb-8 flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Lowongan untuk{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                      Anda
                    </span>
                  </h2>
                  <Clock className="w-5 h-5 text-gray-400" />
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredVacancies.map((v, index) => (
                  <VacancyCard key={v.id} vacancy={v} index={index} />
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
                <div className="text-center py-32 bg-white rounded-3xl shadow-xl border-2 border-gray-100">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <Search className="w-12 h-12 text-gray-400" />
                  </div>
                  <p className="text-gray-900 text-2xl font-bold mb-2">
                    Tidak ada lowongan ditemukan
                  </p>
                  <p className="text-gray-500 text-sm max-w-md mx-auto">
                    Coba ubah filter pencarian atau kata kunci Anda untuk
                    menemukan lebih banyak peluang
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
