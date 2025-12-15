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
import { Trash2, Building2, Plus, Search, Edit2} from "lucide-react"
import { useEffect, useState } from "react"
import CompanyDialog from "./add-company"

export default function SettingsPage() {
    const [companies, setCompanies] = useState([])
    const [searchQuery, setSearchQuery] = useState("")
    const [loading, setLoading] = useState(false)


    const fetchCompanies = async () => {
        try {
            setLoading(true)
            const token = localStorage.getItem("access_token")

            const res = await fetch(
                "http://localhost:8000/api/v1/company/",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            if (!res.ok) throw new Error("Failed to fetch companies")

            setCompanies(await res.json())
        } catch (err) {
            console.error(err.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCompanies()
    }, [])


    const handleDelete = async (id) => {
        if (!confirm("Hapus company ini?")) return

        try {
            const token = localStorage.getItem("access_token")

            const res = await fetch(
                `http://localhost:8000/api/v1/company/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            if (!res.ok) throw new Error("Delete failed")

            fetchCompanies()
        } catch (err) {
            console.error(err.message)
        }
    }

    const filteredData = companies.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <HrLayout>
            <div className="min-h-screen bg-gray-50 p-8">

                {/* HEADER */}
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800 mb-1">
                            Company Management
                        </h1>
                        <p className="text-sm text-gray-500">
                            Manage registered companies
                        </p>
                    </div>

                </div>

                {/* CONTENT CARD */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    {/* Card Header */}
                    <div className="bg-gradient-to-r from-blue-500 to-purple-700 px-6 py-4">
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="text-lg font-semibold text-white">Daftar Company</h2>
                                <p className="text-sm text-blue-100">Kelola data company Anda</p>
                            </div>
                            <CompanyDialog
                                onSuccess={fetchCompanies}
                                trigger={
                                    <Button className="bg-white text-blue-600 hover:bg-blue-50 gap-2 shadow-md">
                                        <Plus className="w-4 h-4" />
                                        Tambah Company
                                    </Button>
                                }
                            />
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                        <div className="relative max-w-md">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <Input
                                placeholder="Cari company..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 bg-white border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>

                    {/* TABLE */}
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-gray-50 hover:bg-gray-50">
                                    <TableHead className="font-semibold text-gray-700 w-20">No</TableHead>
                                    <TableHead className="font-semibold text-gray-700">Nama Company</TableHead>
                                    <TableHead className="font-semibold text-gray-700">Lokasi</TableHead>
                                    <TableHead className="font-semibold text-gray-700 text-center">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center py-12 text-gray-500">
                                            Memuat data...
                                        </TableCell>
                                    </TableRow>
                                ) : filteredData.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center py-12">
                                            <div className="flex flex-col items-center gap-2">
                                                <Building2 className="w-12 h-12 text-gray-300" />
                                                <p className="text-gray-500 font-medium">
                                                    Tidak ada company ditemukan
                                                </p>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredData.map((item, index) => (
                                        <TableRow
                                            key={item.id}
                                            className="hover:bg-blue-50/50 transition-colors border-b border-gray-100"
                                        >
                                            <TableCell className="text-gray-600 font-medium">
                                                {index + 1}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                                                        <Building2 className="w-4 h-4 text-blue-600" />
                                                    </div>
                                                    <span className="font-medium text-gray-800">
                                                        {item.name}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-gray-600">
                                                {item.location}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex justify-center gap-2">
                                                    <CompanyDialog
                                                        mode="edit"
                                                        defaultData={item}
                                                        onSuccess={fetchCompanies}
                                                        trigger={
                                                            <Button
                                                                size="sm"
                                                                variant="ghost"
                                                                className="text-blue-600 hover:bg-blue-100 hover:text-blue-700 h-8 w-8 p-0"
                                                            >
                                                                <Edit2 className="w-4 h-4" />
                                                            </Button>
                                                        }
                                                    />

                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        className="text-red-600 hover:bg-red-100 hover:text-red-700 h-8 w-8 p-0"
                                                        onClick={() =>
                                                            handleDelete(item.id)
                                                        }
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
                </div>
            </div>
        </HrLayout>
    )
}