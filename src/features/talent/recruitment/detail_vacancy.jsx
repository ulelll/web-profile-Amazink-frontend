import { Briefcase, Clock, MapPin, Building2, Calendar, ArrowLeft } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = "http://localhost:8000/api/v1";

function VacancyCardSmall({ vacancy, isActive, onClick }) {
    return (
        <div
            onClick={onClick}
            className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                isActive
                    ? "border-indigo-500 bg-indigo-50"
                    : "border-gray-200 bg-white hover:border-indigo-300 hover:shadow-md"
            }`}
        >
            <h3 className="font-bold text-gray-900 mb-2 text-sm">
                {vacancy.title}
            </h3>

            <div className="flex items-center text-xs text-gray-600 mb-3">
                <Building2 className="w-3.5 h-3.5 mr-1.5 flex-shrink-0" />
                <span className="truncate">{vacancy.company?.name}</span>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-1 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-full">
                    {vacancy.status_pekerjaan}
                </span>
                <span className="px-2.5 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                    {vacancy.is_open ? "Aktif" : "Tutup"}
                </span>
            </div>
        </div>
    );
}

export default function VacancyDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [selectedVacancy, setSelectedVacancy] = useState(null);
    const [otherVacancies, setOtherVacancies] = useState([]);

    // FETCH detail vacancy
    useEffect(() => {
        axios.get(`${API_BASE_URL}/vacancies/${id}`)
            .then((res) => {
                setSelectedVacancy(res.data);
            })
            .catch((err) => console.log("Failed fetch vacancy:", err));
    }, [id]);

    // FETCH vacancy lainnya
    useEffect(() => {
        axios.get(`${API_BASE_URL}/vacancies/`)
            .then((res) => setOtherVacancies(res.data))
            .catch(() => {});
    }, []);

    if (!selectedVacancy) {
        return <div className="p-10 text-center text-gray-600">Loading...</div>;
    }

    const daysPosted = Math.floor(
        (new Date() - new Date(selectedVacancy.created_at)) / (1000 * 60 * 60 * 24)
    );

    // APPLY HANDLER
    const handleApply = async () => {
    const token = localStorage.getItem("access_token");

    if (!token) {
        return navigate(`/login?next=/recruitment/vacancies/${id}`);
    }

    try {
        await axios.post(
            `${API_BASE_URL}/application/apply`,
            { vacancy_id: selectedVacancy.id },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        alert("Lamaran berhasil dikirim!");
    } catch (err) {
        console.log(err);

        if (err.response?.status === 401) {
            // token expired → fallback login
            return navigate(`/login?next=/recruitment/vacancies/${id}`);
        }

        alert("Gagal mengirim lamaran.");
    }
};



    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 py-6 px-4 sm:px-6 lg:px-8 shadow-xl">
                <div className="max-w-7xl mx-auto">
                    <button
                        onClick={() => window.history.back()}
                        className="flex items-center text-white hover:text-indigo-100 transition-colors mb-4"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        <span className="text-sm font-medium">Kembali ke Daftar Lowongan</span>
                    </button>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white">
                        Detail Lowongan Kerja
                    </h1>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Vacancy Detail */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="h-48 sm:h-64 relative bg-gray-200">
                                {selectedVacancy.image && (
                                    <img
                                        src={selectedVacancy.image}
                                        alt={selectedVacancy.title}
                                        className="w-full h-full object-cover"
                                    />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                            </div>

                            <div className="p-6">
                                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                                    {selectedVacancy.title}
                                </h2>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                                    <div className="flex items-start">
                                        <Building2 className="w-5 h-5 mr-3 text-indigo-600 mt-1" />
                                        <div>
                                            <p className="text-xs text-gray-500 mb-0.5">Perusahaan</p>
                                            <p className="text-sm font-semibold text-gray-900">
                                                {selectedVacancy.company?.name}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <MapPin className="w-5 h-5 mr-3 text-indigo-600 mt-1" />
                                        <div>
                                            <p className="text-xs text-gray-500 mb-0.5">
                                                {selectedVacancy.status_pekerjaan} / {selectedVacancy.penempatan}
                                            </p>
                                            <p className="text-sm font-semibold text-gray-900 capitalize">
                                                {selectedVacancy.status_pekerjaan} / {selectedVacancy.penempatan}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 mb-6">
                                    <p className="text-sm font-semibold text-green-800">
                                        <Clock className="w-4 h-4 inline mr-2" />
                                        Tayang {daysPosted} hari yang lalu
                                    </p>
                                </div>

                                <div className="border-t border-gray-200 pt-6">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4">Kualifikasi</h3>
                                    <ul className="space-y-2">
                                        {selectedVacancy.requirements
                                            ?.split("\n")
                                            .map((req, idx) => (
                                                <li key={idx} className="flex items-start text-gray-700">
                                                    <span className="inline-block w-1.5 h-1.5 bg-indigo-600 rounded-full mr-3 mt-2"></span>
                                                    <span className="text-sm">{req}</span>
                                                </li>
                                            ))}
                                    </ul>
                                </div>

                                <div className="mt-8">
                                    <button
                                        onClick={handleApply}
                                        className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl"
                                    >
                                        Lamar Sekarang
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Deskripsi</h3>
                            <p className="text-gray-700 text-sm whitespace-pre-line">
                                {selectedVacancy.description}
                            </p>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-6 space-y-6">
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Lowongan lainnya</h3>
                                <div className="space-y-3">
                                    {otherVacancies.map((vac) => (
                                        <VacancyCardSmall
                                            key={vac.id}
                                            vacancy={vac}
                                            isActive={vac.id === selectedVacancy.id}
                                            onClick={() => navigate(`/recruitment/vacancies/${vac.id}`)}
                                        />

                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
