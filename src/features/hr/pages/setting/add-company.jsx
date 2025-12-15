import {
    Button,
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogDescription,
    Input,
} from "@/components/ui"
import { Building2, MapPin } from "lucide-react"
import { useEffect, useState } from "react"

export default function CompanyDialog({
    trigger,
    mode = "add",          
    defaultData = null,    
    onSuccess,            
}) {
    const [open, setOpen] = useState(false)

    const [formData, setFormData] = useState({
        name: "",
        location: "",
    })

    // preload data (edit) / reset (add)
    useEffect(() => {
        if (mode === "edit" && defaultData) {
            setFormData({
                name: defaultData.name ?? "",
                location: defaultData.location ?? "",
            })
        } else {
            setFormData({
                name: "",
                location: "",
            })
        }
    }, [mode, defaultData, open])

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSave = async () => {
        // frontend validation
        if (!formData.name.trim() || !formData.location.trim()) {
            alert("Nama dan lokasi wajib diisi")
            return
        }

        try {
            const token = localStorage.getItem("access_token")
            if (!token) throw new Error("User not authenticated")

            const url =
                mode === "edit"
                    ? `http://localhost:8000/api/v1/company/${defaultData.id}`
                    : "http://localhost:8000/api/v1/company/"

            const response = await fetch(url, {
                method: mode === "edit" ? "PUT" : "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            })

            if (!response.ok) {
                const err = await response.json()
                throw new Error(err.detail || "Request failed")
            }

            console.log(
                mode === "edit" ? "Company updated" : "Company created"
            )

            // success actions
            setOpen(false)
            onSuccess?.()

        } catch (err) {
            console.error(err.message)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>

            <DialogContent className="sm:max-w-[480px]">
                <DialogHeader className="space-y-3">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                            <Building2 className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <DialogTitle className="text-xl">
                                {mode === "edit" ? "Edit Company" : "Tambah Company"}
                            </DialogTitle>
                            <DialogDescription className="text-sm">
                                Isi data company dengan benar sebelum menyimpan
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                            Nama Company
                        </label>
                        <div className="relative">
                            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <Input
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Masukkan nama company"
                                className="pl-10 h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                            Lokasi
                        </label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <Input
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="Masukkan lokasi company"
                                className="pl-10 h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                </div>

                <DialogFooter className="gap-2 sm:gap-0">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => setOpen(false)}
                        className="border-gray-300 hover:bg-gray-50"
                    >
                        Batal
                    </Button>
                    <Button
                        type="button"
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={handleSave}
                    >
                        {mode === "edit" ? "Update" : "Simpan"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}