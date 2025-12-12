import { Button, Calendar, Input, Popover, PopoverContent, PopoverTrigger, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/index";
import HrLayout from '@/layouts/hr_layout';
import { format } from "date-fns";
import { Calendar as CalendarIcon, Filter } from "lucide-react";
import { useState } from "react";
import AddCompanyDialog from "./add-company";
const companies = [
    {
        id: 1,
        name: "AMAZINK",
        contact: "021-555333",
        location: "Salatiga",
        email: "info@sukamaju.com",
        established: "2020-05-12",
    },
    {
        id: 2,
        name: "Printex",
        location: "Kendal",
        contact: "021-888777",
        email: "office@jayaabadi.com",
        established: "2018-02-01",
    },
    {
        id: 3,
        name: "Aston",
        contact: "021-333222",
        location: "Semarang",
        email: "cs@sentosamandiri.com",
        established: "2019-12-20",
    },
];

export default function SettingsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedLocation, setSelectedLocation] = useState("all");
    const [dateRange, setDateRange] = useState({
        from: null,
        to: null,
    });

    const locations = ["all", ...new Set(companies.map(item => item.location))];
    const isDateEmpty = !dateRange.from || !dateRange.to;

    const filteredData = companies.filter(item => {
        const matchesSearch =
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.email.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesLocation =
            selectedLocation === "all" || item.location === selectedLocation;
        let matchesDate = true;
        if (!isDateEmpty) {
            if (dateRange.from && dateRange.to) {
                const est = new Date(item.established);
                const start = new Date(dateRange.from);
                const end = new Date(dateRange.to);
                matchesDate = est >= start && est <= end;
            }
        }

        return matchesSearch && matchesDate && matchesLocation;
    });

    return (
        <HrLayout>
            <div className="min-h-screen bg-gray-50 p-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Company Management</h1>

                    <AddCompanyDialog trigger={
                        <Button
                            size="lg"
                            className="bg-orange-600 hover:bg-orange-700 text-white"
                            onClick={() => console.log("Add Company")}
                        >
                            Add Company
                        </Button>}
                    />
                </div>

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
                                value={selectedLocation}
                                onChange={(e) => setSelectedLocation(e.target.value)}
                                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                            >
                                {locations.map(loc => (
                                    <option key={loc} value={loc}>
                                        {loc === "all" ? "All Locations" : loc}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="w-full justify-start h-12 border-2 border-gray-200 hover:border-orange-500 hover:bg-orange-50 rounded-xl text-base font-normal"
                                >
                                    <CalendarIcon className="h-5 w-5 mr-3 text-orange-500" />

                                    {dateRange.from && dateRange.to ? (
                                        <span className="text-gray-700">
                                            {format(dateRange.from, "LLL dd, y")} → {format(dateRange.to, "LLL dd, y")}
                                        </span>
                                    ) : (
                                        <span className="text-gray-400">Select date range</span>
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
                                />
                            </PopoverContent>
                        </Popover>

                        {(searchQuery || selectedLocation !== 'all' || dateRange.from || dateRange.to) && (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                    setSearchQuery("");
                                    setSelectedLocation("all");
                                    setDateRange({ from: null, to: null });
                                }}
                            >
                                Clear Filters
                            </Button>
                        )}
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-gray-50">
                                    <TableHead>No</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Contact</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Established</TableHead>
                                    <TableHead>Action</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {filteredData.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-center py-12">
                                            <p className="text-gray-500">No companies found</p>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredData.map((item, index) => (
                                        <TableRow key={item.id} className="hover:bg-gray-50">
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{item.name}</TableCell>
                                            <TableCell>{item.contact}</TableCell>
                                            <TableCell>{item.email}</TableCell>
                                            <TableCell>
                                                {new Date(item.established).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric'
                                                })}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex gap-2">
                                                    <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                                                        Edit
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
