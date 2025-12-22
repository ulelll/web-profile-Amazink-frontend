import {
    Button,
    Input,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui"
import HrLayout from "@/layouts/hr_layout"
import {
    Trash2,
    Search,
    Edit2,
    ChevronLeft,
    ChevronRight,
    Plus,
} from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const API_BASE_URL = "http://localhost:8000/api/v1"
const LIMIT = 10

export default function VacancyManagementPage() {
    const navigate = useNavigate()

    const [vacancies, setVacancies] = useState([])
    const [divisions, setDivisions] = useState([])
    const [companies, setCompanies] = useState([])

    const [search, setSearch] = useState("")
    const [divisionFilter, setDivisionFilter] = useState("")
    const [companyFilter, setCompanyFilter] = useState("")
    const [statusFilter, setStatusFilter] = useState("")

    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)

    // ===== FETCH DIVISION & COMPANY (FIXED) =====
    useEffect(() => {
        fetch(`${API_BASE_URL}/division/`)
            .then(res => res.json())
            .then(setDivisions)
            .catch(console.error)

        fetch(`${API_BASE_URL}/company`)
            .then(res => res.json())
            .then(setCompanies)
            .catch(console.error)
    }, [])

    // ===== FETCH VACANCIES =====
    useEffect(() => {
        fetchVacancies()
    }, [page, divisionFilter, companyFilter, statusFilter])

    const fetchVacancies = async () => {
        try {
            setLoading(true)
            const token = localStorage.getItem("access_token")

            const params = new URLSearchParams({
                skip: (page - 1) * LIMIT,
                limit: LIMIT,
            })

            if (divisionFilter) params.append("division_id", divisionFilter)
            if (companyFilter) params.append("company_id", companyFilter)
            if (statusFilter) params.append("is_open", statusFilter)

            const res = await fetch(
                `${API_BASE_URL}/vacancies/?${params.toString()}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            )

            const data = await res.json()
            setVacancies(Array.isArray(data) ? data : [])
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    // ===== DELETE =====
    const handleDelete = async (id) => {
        if (!confirm("Hapus lowongan ini?")) return

        const token = localStorage.getItem("access_token")
        await fetch(`${API_BASE_URL}/vacancies/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
        })

        fetchVacancies()
    }

    // ===== CLIENT SEARCH =====
    const filteredData = vacancies.filter(v =>
        v.title.toLowerCase().includes(search.toLowerCase()) ||
        v.company?.name?.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <HrLayout>
            <div className="min-h-screen bg-gray-50 p-8">

                {/* PAGE HEADER */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Vacancy Management
                    </h1>
                    <p className="text-sm text-gray-500">
                        Kelola semua lowongan kerja
                    </p>
                </div>

                {/* CARD */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">

                    {/* CARD HEADER — SAME AS COMPANY */}
                    <div className="bg-gradient-to-r from-blue-500 to-purple-700 px-6 py-4">
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="text-lg font-semibold text-white">
                                    Daftar Lowongan
                                </h2>
                                <p className="text-sm text-blue-100">
                                    Kelola data lowongan pekerjaan
                                </p>
                            </div>

                            <Button
                                onClick={() => navigate("/recruitment/vacancies/create")}
                                className="bg-white text-blue-600 hover:bg-blue-50 gap-2 shadow-md"
                            >
                                <Plus className="w-4 h-4" />
                                Tambah Lowongan
                            </Button>
                        </div>
                    </div>

                    {/* FILTERS */}
                    <div className="px-6 py-4 border-b bg-gray-50 flex flex-wrap gap-3 items-center">
                        {/* SEARCH */}
                        <div className="relative max-w-sm w-full">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <Input
                                placeholder="Cari judul / company..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-10 bg-white"
                            />
                        </div>

                        {/* DIVISION */}
                        <Select value={divisionFilter} onValueChange={setDivisionFilter}>
                            <SelectTrigger className="w-[200px] bg-white">
                                <SelectValue placeholder="Semua Divisi" />
                            </SelectTrigger>
                            <SelectContent>
                                {divisions.map(d => (
                                    <SelectItem key={d.id} value={d.id.toString()}>
                                        {d.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {/* COMPANY */}
                        <Select value={companyFilter} onValueChange={setCompanyFilter}>
                            <SelectTrigger className="w-[200px] bg-white">
                                <SelectValue placeholder="Semua Perusahaan" />
                            </SelectTrigger>
                            <SelectContent>
                                {companies.map(c => (
                                    <SelectItem key={c.id} value={c.id.toString()}>
                                        {c.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {/* STATUS */}
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-[160px] bg-white">
                                <SelectValue placeholder="Semua Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="true">Aktif</SelectItem>
                                <SelectItem value="false">Tutup</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* TABLE */}
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-gray-100">
                                    <TableHead>No</TableHead>
                                    <TableHead>Judul</TableHead>
                                    <TableHead>Company</TableHead>
                                    <TableHead>Divisi</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-center">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center py-12">
                                            Loading...
                                        </TableCell>
                                    </TableRow>
                                ) : filteredData.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center py-12 text-gray-500">
                                            Tidak ada data
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredData.map((v, i) => (
                                        <TableRow key={v.id} className="hover:bg-indigo-50/40">
                                            <TableCell>
                                                {(page - 1) * LIMIT + i + 1}
                                            </TableCell>
                                            <TableCell className="font-medium">
                                                {v.title}
                                            </TableCell>
                                            <TableCell>{v.company?.name}</TableCell>
                                            <TableCell>{v.division?.name}</TableCell>
                                            <TableCell>
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                        v.is_open
                                                            ? "bg-green-100 text-green-700"
                                                            : "bg-red-100 text-red-700"
                                                    }`}
                                                >
                                                    {v.is_open ? "Aktif" : "Tutup"}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex justify-center gap-2">
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        onClick={() =>
                                                            navigate(`/recruitment/vacancies/${v.id}`)
                                                        }
                                                    >
                                                        <Edit2 className="w-4 h-4" />
                                                    </Button>

                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        className="text-red-600"
                                                        onClick={() => handleDelete(v.id)}
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {/* PAGINATION */}
                    <div className="flex justify-between items-center p-4 border-t bg-gray-50">
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={page === 1}
                            onClick={() => setPage(p => p - 1)}
                        >
                            <ChevronLeft className="w-4 h-4" />
                            Prev
                        </Button>

                        <span className="text-sm text-gray-600">
                            Page {page}
                        </span>

                        <Button
                            variant="outline"
                            size="sm"
                            disabled={vacancies.length < LIMIT}
                            onClick={() => setPage(p => p + 1)}
                        >
                            Next
                            <ChevronRight className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </HrLayout>
    )
}
