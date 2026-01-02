import * as React from "react";
import { useEffect, useState } from "react";
import HrLayout from "@/layouts/hr_layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "@/hooks/use-toast";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

import { UploadCloud, Image as ImageIcon } from "lucide-react";





const API_BASE_URL = "http://localhost:8000";

const getAuthHeader = () => {
    const token = localStorage.getItem("access_token");
    return token
    ? { Authorization: `Bearer ${token}` }
    : {};
};


export default function CreateVacancy() {
    const [divisions, setDivisions] = useState([]);
    const [companies, setCompanies] = useState([]);

const [form, setForm] = useState({
        title: "",
        description: "",
        penempatan: "",
        status_pekerjaan: "",
        requirements: "",
        image: null,
        start_date: undefined,
        end_date: undefined,
        division_id: "",
        company_id: "",
    });

useEffect(() => {
    const fetchData = async () => {
        try {
        const headers = getAuthHeader();

        const [divRes, compRes] = await Promise.all([
            fetch(`${API_BASE_URL}/api/v1/division/`, { headers }),
            fetch(`${API_BASE_URL}/api/v1/company/`, { headers }),
        ]);

        if (!divRes.ok || !compRes.ok) {
            throw new Error("Unauthorized or failed fetch");
        }

        setDivisions(await divRes.json());
        setCompanies(await compRes.json());
        } catch (err) {
        console.error("Failed fetch division/company:", err);
        }
    };

    fetchData();
}, []);



const handleChange = (key, value) => {
        setForm((prev) => ({ ...prev, [key]: value }));
};

const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("penempatan", form.penempatan);
    formData.append("status_pekerjaan", form.status_pekerjaan);
    formData.append("requirements", form.requirements);
    formData.append("division_id", form.division_id);
    formData.append("company_id", form.company_id);
    formData.append("is_open", true);

    if (form.start_date) {
        formData.append("start_date", format(form.start_date, "yyyy-MM-dd"));
    }

    if (form.end_date) {
        formData.append("end_date", format(form.end_date, "yyyy-MM-dd"));
    }

    if (form.image) {
        formData.append("image", form.image);
    }

    try {
        const res = await fetch(
            `${API_BASE_URL}/api/v1/vacancies/`,
            {
                method: "POST",
                headers: {
                ...getAuthHeader(), 
                },
                body: formData,
            }
);


        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.detail || "Failed create vacancy");
        }

        await res.json();

        toast({
            title: "Lowongan berhasil dibuat 🎉",
            description: "Vacancy langsung aktif & siap dilamar",
        });

    } catch (err) {
        toast({
            variant: "destructive",
            title: "Gagal buat lowongan",
            description: err.message,
        });
    }
};



    return (
        <HrLayout>
        <div className="max-w-4xl mx-auto p-6">
            <Card className="border-blue-200">
            <CardHeader className="bg-blue-50 rounded-t-xl">
                <CardTitle className="text-blue-700">Create Vacancy</CardTitle>
            </CardHeader>
            <CardContent className="mt-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <Label>Judul Lowongan</Label>
                    <Input
                    value={form.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                    placeholder="Contoh: Frontend Developer"
                    />
                </div>

                <div className="space-y-2">
                    <Label>Deskripsi</Label>
                    <Textarea
                    value={form.description}
                    onChange={(e) => handleChange("description", e.target.value)}
                    placeholder="Deskripsi Pekerjaan"
                    />
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                    <Label>Penempatan</Label>
                    <Select onValueChange={(v) => handleChange("penempatan", v)}>
                        <SelectTrigger>
                        <SelectValue placeholder="Pilih penempatan" />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectItem value="Onsite">Onsite</SelectItem>
                        <SelectItem value="Remote">Remote</SelectItem>
                        <SelectItem value="Hybrid">Hybrid</SelectItem>
                        </SelectContent>
                    </Select>
                    </div>

                    <div className="space-y-2">
                    <Label>Status Pekerjaan</Label>
                    <Select onValueChange={(v) => handleChange("status_pekerjaan", v)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Pilih status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Fulltime">Fulltime</SelectItem>
                            <SelectItem value="Internship">Internship</SelectItem>
                            <SelectItem value="Parttime">Parttime</SelectItem>
                        </SelectContent>
                    </Select>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label>Persyaratan</Label>
                    <Textarea
                    value={form.requirements}
                    onChange={(e) => handleChange("requirements", e.target.value)}
                    placeholder="Persyaratan pekerjaan"
                    />
                </div>


            <div className="space-y-2">
                <Label>Gambar</Label>

                <div
                    onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                            e.preventDefault();
                            const file = e.dataTransfer.files?.[0];
                            if (file && file.type.startsWith("image/")) {
                                handleChange("image", file);
                            }
                        }}
                        onPaste={(e) => {
                            const item = e.clipboardData.items[0];
                            if (item?.type.startsWith("image/")) {
                                const file = item.getAsFile();
                                handleChange("image", file);
                        }
                    }}
                    className="relative flex flex-col items-center justify-center gap-2 border-2 border-dashed border-blue-300 rounded-xl p-6 cursor-pointer hover:bg-blue-50 transition"
                >
                    <input
                        type="file"
                        accept="image/*"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleChange("image", file);
                        }}
                    />

                    <UploadCloud className="h-8 w-8 text-blue-600" />
                        <p className="text-sm text-blue-700 font-medium">
                            Drag & drop, paste, or click to upload image
                        </p>
                        <p className="text-xs text-muted-foreground">
                            PNG, JPG, JPEG
                        </p>
                </div>

                {form.image && (
                    <div className="mt-3">
                    <img
                        src={URL.createObjectURL(form.image)}
                        alt="Preview"
                        className="max-h-48 rounded-lg border"
                    />
                    </div>
                )}
            </div>


                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                    <Label>Tanggal Mulai</Label>
                    <Popover>
                        <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            className={cn(
                            "w-full justify-start text-left font-normal",
                            !form.start_date && "text-muted-foreground"
                            )}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {form.start_date ? format(form.start_date, "PPP") : "Pilih Tanggal"}
                        </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={form.start_date}
                            onSelect={(d) => handleChange("start_date", d)}
                            initialFocus
                        />
                        </PopoverContent>
                    </Popover>
                    </div>

                    <div className="space-y-2">
                    <Label>Tanggal berakhir</Label>
                    <Popover>
                        <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            className={cn(
                            "w-full justify-start text-left font-normal",
                            !form.end_date && "text-muted-foreground"
                            )}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {form.end_date ? format(form.end_date, "PPP") : "Pilih Tanggal"}
                        </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={form.end_date}
                            onSelect={(d) => handleChange("end_date", d)}
                            initialFocus
                        />
                        </PopoverContent>
                    </Popover>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                    <Label>Divisi</Label>
                    <Select onValueChange={(v) => handleChange("division_id", v)}>
                        <SelectTrigger>
                        <SelectValue placeholder="Select division" />
                        </SelectTrigger>
                        <SelectContent>
                        {divisions.map((d) => (
                            <SelectItem key={d.id} value={String(d.id)}>
                            {d.name}
                            </SelectItem>
                        ))}
                        </SelectContent>
                    </Select>
                    </div>

                    <div className="space-y-2">
                    <Label>Nama Perusahaan</Label>
                    <Select onValueChange={(v) => handleChange("company_id", v)}>
                        <SelectTrigger>
                        <SelectValue placeholder="Select company" />
                        </SelectTrigger>
                        <SelectContent>
                        {companies.map((c) => (
                            <SelectItem key={c.id} value={String(c.id)}>
                            {c.name}
                            </SelectItem>
                        ))}
                        </SelectContent>
                    </Select>
                    </div>
                </div>

                <div className="flex justify-end">
                    <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                    Buat Lowongan!
                    </Button>
                </div>
                </form>
            </CardContent>
            </Card>
        </div>
        </HrLayout>
    );
}
