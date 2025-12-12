import { Button, Calendar, Input, Popover, PopoverContent, PopoverTrigger, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/index";
import HrLayout from "@/layouts/hr_layout";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Filter, Search } from "lucide-react";
import { useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useNavigate } from "react-router-dom";


export default function ApplicantPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("all");
  const [selectedVacancy, setSelectedVacancy] = useState("all");
  const [dateRange, setDateRange] = useState({
    from: null,
    to: null,
  });

  const [applicants, setApplicants] = useState([
    {
      id: 1,
      name: "John Doe",
      division: "IT",
      vacancy: "Back-End",
      contact: "08123456789",
      email: "john@example.com",
      dateApplied: "2024-11-15",
    },
    {
      id: 2,
      name: "Maria Widya",
      division: "Marketing",
      vacancy: "Sales",
      contact: "08561234567",
      email: "maria@example.com",
      dateApplied: "2024-11-20",
    },
    {
      id: 3,
      name: "Ahmad Rizki",
      division: "Administrasi",
      vacancy: "Admin",
      contact: "08567891234",
      email: "ahmad@example.com",
      dateApplied: "2024-12-01",
    },
    {
      id: 4,
      name: "Siti Nurhaliza",
      division: "Digital Marketing",
      vacancy: "Video Editor",
      contact: "08123459876",
      email: "siti@example.com",
      dateApplied: "2024-12-05",
    },
  ]);


  const divisions = ["all", ...new Set(applicants.map(item => item.division))];
  const vacancys = ["all", ...new Set(applicants.map(item => item.vacancy))];
  const isDateEmpty = !dateRange.from || !dateRange.to;

  const filteredData = applicants.filter(item => {



    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDivision =
      selectedDivision === "all" || item.division === selectedDivision;

    const matchesVacancy =
      selectedVacancy === "all" || item.vacancy === selectedVacancy;

    let matchesDate = true;

    if (!isDateEmpty) {
      if (dateRange.from && dateRange.to) {
        const applied = new Date(item.dateApplied);
        const start = new Date(dateRange.from);
        const end = new Date(dateRange.to);

        matchesDate = applied >= start && applied <= end;
      }
    }


    return matchesSearch && matchesDivision && matchesDate && matchesVacancy;
  });


  return (
    <HrLayout>
      <div className="min-h-screen bg-gray-50 p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Applicant Management</h1>

        {/* Search Bar and Filters */}
        <div className="mb-6 flex flex-wrap gap-4 items-center">
          <Input
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md"
          />

          <div className="flex gap-4 items-center">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-600" />
              <select
                value={selectedDivision}
                onChange={(e) => setSelectedDivision(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                {divisions.map(division => (
                  <option key={division} value={division}>
                    {division === "all" ? "All Divisions" : division}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={selectedDivision}
                onChange={(e) => setSelectedVacancy(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                {vacancys.map(vacancy => (
                  <option key={vacancy} value={vacancy}>
                    {vacancy === "all" ? "All Vacancys" : vacancy}
                  </option>
                ))}
              </select>
            </div>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start h-12 border-2 border-gray-200 hover:border-orange-500 hover:bg-orange-50 rounded-xl text-base font-normal transition-all"
                >
                  <CalendarIcon className="h-5 w-5 mr-3 text-orange-500" />

                  {dateRange.from && dateRange.to ? (
                    <span className="text-gray-700">
                      {format(dateRange.from, "LLL dd, y")} → {format(dateRange.to, "LLL dd, y")}
                    </span>
                  ) : (
                    <span className="text-gray-400">Pilih rentang tanggal</span>
                  )}
                </Button>
              </PopoverTrigger>

              <PopoverContent className="p-0 w-auto">
                <Calendar
                  mode="range"
                  numberOfMonths={2}
                  selected={dateRange}
                  onSelect={(v) => v && setDateRange(v)}
                  initialFocus
                  className="rounded-xl border-2 border-orange-100"
                />
              </PopoverContent>
            </Popover>

            {(searchQuery || selectedDivision !== "all" || dateRange.from !== null || dateRange.to !== null) && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedDivision("all");
                  setDateRange('')
                }}
              >
                Clear Filters
              </Button>
            )}
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 hover:bg-gray-50">
                  <TableHead className="font-semibold text-gray-700">No</TableHead>
                  <TableHead className="font-semibold text-gray-700">Name</TableHead>
                  <TableHead className="font-semibold text-gray-700">Vacancy</TableHead>
                  <TableHead className="font-semibold text-gray-700">Contact</TableHead>
                  <TableHead className="font-semibold text-gray-700">Email</TableHead>
                  <TableHead className="font-semibold text-gray-700">Date Applied</TableHead>
                  <TableHead className="font-semibold text-gray-700">Action</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-12">
                      <div className="flex flex-col items-center justify-center text-gray-500">
                        <Search className="w-12 h-12 mb-3 text-gray-300" />
                        <p className="text-lg font-medium">No applicants found</p>
                        <p className="text-sm mt-1">Try adjusting your filters</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredData.map((item, index) => (
                    <TableRow key={item.id} className="border-b hover:bg-gray-50">
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell className="font-medium text-gray-900">{item.name}</TableCell>
                      <TableCell>{item.vacancy}</TableCell>
                      <TableCell className="text-gray-700">{item.contact}</TableCell>
                      <TableCell className="text-gray-700">{item.email}</TableCell>
                      <TableCell className="text-gray-700">
                        {new Date(item.dateApplied).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            className="bg-orange-600 hover:bg-orange-700"
                            onClick={() => navigate(`/hr/vacancies/applicants/${item.id}`)}
                          >
                            Detail
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
    </HrLayout >
  );
}