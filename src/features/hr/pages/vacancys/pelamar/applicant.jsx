import {
  Button,
  Input,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Calendar,
} from "@/components/ui";
import HrLayout from "@/layouts/hr_layout";
import { format } from "date-fns";
import {
  Filter,
  Search,
  User,
  Users,
  Calendar as CalendarIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/lib/api";

export default function ApplicantPage() {
  const navigate = useNavigate();

  const [applicants, setApplicants] = useState([]);
  const [vacancies, setVacancies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVacancy, setSelectedVacancy] = useState("all");
  const [dateRange, setDateRange] = useState({ from: null, to: null });
  const [loading, setLoading] = useState(false);

  /* ================= FETCH VACANCIES ================= */
  useEffect(() => {
    api.get("/vacancies").then((res) => setVacancies(res.data));
  }, []);

  /* ================= FETCH APPLICANTS ================= */
  useEffect(() => {
    fetchApplicants();
  }, [selectedVacancy, dateRange]);

  const fetchApplicants = async () => {
    setLoading(true);
    try {
      let url = "/application/applications";
      const params = [];

      if (selectedVacancy !== "all") {
        params.push(`vacancy_id=${selectedVacancy}`);
      }

      if (dateRange.from && dateRange.to) {
        params.push(
          `created_from=${format(dateRange.from, "yyyy-MM-dd")}`,
          `created_to=${format(dateRange.to, "yyyy-MM-dd")}`
        );
      }

      if (params.length) {
        url += `?${params.join("&")}`;
      }

      const res = await api.get(url);
      setApplicants(res.data);
    } finally {
      setLoading(false);
    }
  };

  /* ================= SEARCH (FRONTEND) ================= */
  const filteredApplicants = applicants.filter((item) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.user?.full_name?.toLowerCase().includes(q) ||
      item.vacancy?.title?.toLowerCase().includes(q)
    );
  });

  return (
    <HrLayout>
      <div className="min-h-screen bg-gray-50 p-8">

        {/* PAGE HEADER */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-1">
            Applicant Management
          </h1>
          <p className="text-sm text-gray-500">
            Kelola pelamar berdasarkan lowongan & tanggal
          </p>
        </div>

        {/* CARD */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">

          {/* CARD HEADER */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-700 px-6 py-4">
            <div className="flex flex-wrap gap-4 justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold text-white">
                  Daftar Pelamar
                </h2>
                <p className="text-sm text-blue-100">
                  Semua application yang masuk
                </p>
              </div>

              <div className="flex items-center gap-2">
                {/* Vacancy Filter */}
                <Filter className="w-4 h-4 text-white/80" />
                <select
                  value={selectedVacancy}
                  onChange={(e) => setSelectedVacancy(e.target.value)}
                  className="rounded-md px-3 py-2 text-sm bg-white text-gray-700"
                >
                  <option value="all">Semua Vacancy</option>
                  {vacancies.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.title}
                    </option>
                  ))}
                </select>

                {/* Date Filter */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="bg-white text-gray-700 gap-2"
                    >
                      <CalendarIcon className="w-4 h-4" />
                      {dateRange.from && dateRange.to
                        ? `${format(dateRange.from, "dd MMM")} – ${format(
                            dateRange.to,
                            "dd MMM"
                          )}`
                        : "Tanggal"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0 w-auto">
                    <Calendar
                      mode="range"
                      selected={dateRange}
                      onSelect={(v) => v && setDateRange(v)}
                      numberOfMonths={2}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          {/* SEARCH BAR */}
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Cari nama pelamar atau vacancy..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white border-gray-300"
              />
            </div>
          </div>

          {/* TABLE */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="w-16">No</TableHead>
                  <TableHead>Nama</TableHead>
                  <TableHead>Vacancy</TableHead>
                  <TableHead>Tanggal</TableHead>
                  <TableHead className="text-center">Aksi</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-12">
                      Memuat data...
                    </TableCell>
                  </TableRow>
                ) : filteredApplicants.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-12">
                      <div className="flex flex-col items-center gap-2">
                        <Users className="w-12 h-12 text-gray-300" />
                        <p className="text-gray-500 font-medium">
                          Tidak ada pelamar ditemukan
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredApplicants.map((item, index) => (
                    <TableRow
                      key={item.id}
                      className="hover:bg-blue-50/50 transition"
                    >
                      <TableCell>{index + 1}</TableCell>

                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                            <User className="w-4 h-4 text-blue-600" />
                          </div>
                          <span className="font-medium">
                            {item.user?.full_name}
                          </span>
                        </div>
                      </TableCell>

                      <TableCell>{item.vacancy?.title}</TableCell>

                      <TableCell>
                        {format(new Date(item.created_at), "dd MMM yyyy")}
                      </TableCell>

                      <TableCell>
                        <div className="flex justify-center gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-blue-600 hover:bg-blue-100"
                            onClick={() =>
                              navigate(`/hr/applications/${item.id}`)
                            }
                          >
                            Detail
                          </Button>

                          <Button
                            size="sm"
                            variant="ghost"
                            className="hover:bg-gray-100 h-8 w-8 p-0"
                            onClick={() =>
                              navigate(`/hr/talent/${item.user.id}`)
                            }
                          >
                            <User className="w-4 h-4" />
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
  );
}
