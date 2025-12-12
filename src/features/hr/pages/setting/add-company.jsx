import { Button, Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, Input } from "@/components/ui"
import { useEffect, useState } from "react"

export default function CompanyDialog({ trigger, mode = "add", defaultData = null }) {
    const [formData, setFormData] = useState({
        name: "",
        contact: "",
        location: "",
        email: "",
        established: "",
    })

    // Preload data if edit mode
    useEffect(() => {
        if (mode === "edit" && defaultData) {
            setFormData({
                name: defaultData.name || "",
                contact: defaultData.contact || "",
                location: defaultData.location || "",
                email: defaultData.email || "",
                established: defaultData.established || "",
            })
        }

        if (mode === "add") {
            setFormData({
                name: "",
                contact: "",
                location: "",
                email: "",
                established: "",
            })
        }
    }, [mode, defaultData])

    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSave = () => {
        if (mode === "add") {
            console.log("Adding company:", formData)
        } else {
            console.log("Editing company:", formData)
        }
        // API or Firestore logic goes here
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{mode === "edit" ? "Edit Company" : "Tambah Company"}</DialogTitle>
                </DialogHeader>

                <div className="grid gap-4">
                    <div className="grid gap-1">
                        <label className="text-sm">Nama</label>
                        <Input name="name" value={formData.name} onChange={handleChange} placeholder="Aston" />
                    </div>

                    <div className="grid gap-1">
                        <label className="text-sm">Kontak</label>
                        <Input name="contact" value={formData.contact} onChange={handleChange} placeholder="021-333222" />
                    </div>

                    <div className="grid gap-1">
                        <label className="text-sm">Lokasi</label>
                        <Input name="location" value={formData.location} onChange={handleChange} placeholder="Semarang" />
                    </div>

                    <div className="grid gap-1">
                        <label className="text-sm">Email</label>
                        <Input name="email" value={formData.email} onChange={handleChange} placeholder="cs@sentosamandiri.com" />
                    </div>

                    <div className="grid gap-1">
                        <label className="text-sm">Tanggal Berdiri</label>
                        <Input type="date" name="established" value={formData.established} onChange={handleChange} />
                    </div>
                </div>

                <DialogFooter>
                    <Button 
                        className="bg-orange-600 hover:bg-orange-700 text-white" 
                        onClick={handleSave}
                    >
                        Simpan
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
