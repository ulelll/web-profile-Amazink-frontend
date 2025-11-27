import React, { useState } from "react";
import HrLayout from "@/layouts/hr_layout.jsx";
import { Calendar as CalendarIcon, Upload, Briefcase, FileText, Clock, Users, Building } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from "@/components/ui/select";
import { format } from "date-fns";

export default function OpeningJob() {
    const [jobTitle, setJobTitle] = useState("");
    const [description, setDescription] = useState("");
    const [lastFill, setLastFill] = useState("");
    const [lastTurn, setLastTurn] = useState("");
    const [lastDivision, setLastDivision] = useState("");
    const [status, setStatus] = useState("");

    const [dateRange, setDateRange] = useState({
        from: new Date(),
        to: new Date(),
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log({
        jobTitle,
        description,
        startDate: dateRange.from,
        endDate: dateRange.to,
        lastFill,
        lastTurn,
        lastDivision,
        status,
        });

        alert("Form submitted! (check console)");
    };

    return (
        <HrLayout>
        <div className="min-h-screen bg-whitep-4 md:p-8 lg:p-12">

                <div className="bg-white rounded-2xl shadow-2xl border border-orange-100 overflow-hidden">
                    <div className="h-2 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500"></div>
                    
                    <div className="p-8 lg:p-10 space-y-8">
                    
                    <div className="space-y-3">
                        <Label htmlFor="title" className="text-base font-semibold text-gray-700 flex items-center gap-2">
                            <Briefcase className="w-4 h-4 text-orange-500" />
                            Judul Lowongan
                        </Label>
                        <Input
                            id="title"
                            placeholder="Masukkan judul lowongan pekerjaan"
                            value={jobTitle}
                            onChange={(e) => setJobTitle(e.target.value)}
                            className="h-12 border-2 border-gray-200 focus:border-orange-500 focus:ring-orange-500 rounded-xl text-base"
                        />
                    </div>

                    <div className="space-y-3">
                        <Label htmlFor="description" className="text-base font-semibold text-gray-700 flex items-center gap-2">
                            <FileText className="w-4 h-4 text-orange-500" />
                            Deskripsi
                        </Label>
                        <textarea
                            id="description"
                            className="w-full border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 rounded-xl p-4 h-36 text-base resize-none transition-all"
                            placeholder="Masukkan deskripsi pekerjaan, tanggung jawab, dan persyaratan..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-700 flex items-center gap-2">
                            <CalendarIcon className="w-4 h-4 text-orange-500" />
                            Rentang Tanggal
                        </Label>

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
                    </div>

                    <div className="bg-purple-50 p-6 lg:p-8 rounded-xl border-2 border-purple-100">
                        <h3 className="text-lg font-semibold text-gray-800 mb-5 flex items-center gap-2">
                            <Users className="w-5 h-5 text-purple-500" />
                            Detail Tambahan
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                    <Building className="w-4 h-4 text-purple-500" />
                                    Divisi
                                </Label>
                                <Select onValueChange={setLastDivision}>
                                    <SelectTrigger className="h-11 border-2 border-gray-200 focus:border-purple-500 rounded-lg bg-white">
                                        <SelectValue placeholder="Pilih divisi" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="IT">IT Department</SelectItem>
                                        <SelectItem value="HR">HR Department</SelectItem>
                                        <SelectItem value="Finance">Finance</SelectItem>
                                        <SelectItem value="Marketing">Marketing</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <Label className="text-base font-semibold text-gray-700">Status Lowongan</Label>
                        <Select onValueChange={setStatus}>
                            <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-orange-500 rounded-xl text-base">
                                <SelectValue placeholder="Pilih status lowongan" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="active">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                        Aktif
                                    </div>
                                </SelectItem>
                                <SelectItem value="inactive">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                                        Nonaktif
                                    </div>
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="pt-6">
                        <Button 
                            onClick={handleSubmit}
                            type="button"
                            className="w-full h-14 bg-orange-400 hover:bg-orange-500 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                        >
                            <Briefcase className="w-5 h-5 mr-2" />
                            Publikasikan Lowongan
                        </Button>
                    </div>
                    </div>
                </div>

                <div className="mt-6 text-center text-sm text-gray-500">
                    <p>Semua field wajib diisi untuk mempublikasikan lowongan pekerjaan</p>
                </div>
            </div>
        </HrLayout>
    );
}