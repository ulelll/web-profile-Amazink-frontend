import { Button, Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, Input } from "@/components/ui"
import { useState } from "react"


export default function AddCompanyDialog({ trigger }) {
    const [formData, setFormData] = useState({
        name: "",
        contact: "",
        location: "",
        email: "",
        established: "",
    })

    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSave = () => {
        console.log("Saved:", formData)
        // do your Firestore/API save here
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Tambah Company</DialogTitle>
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
                    <Button className="bg-orange-600 hover:bg-orange-700 text-white" onClick={handleSave}>Simpan</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
