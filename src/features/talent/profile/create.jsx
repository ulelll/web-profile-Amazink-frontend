import ProfileImageUpload from "@/components/profile/profile-photo";
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    Input,
    Label,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    Textarea,
    } from "@/components/ui";
    import api from "@/lib/api";

    import { User } from "lucide-react";
    import { useEffect, useState } from "react";

    export default function Profile() {
    // CREATE MODE
    const isDisable = false;

    // Form state
    const [nik, setNik] = useState("");
    const [religion, setReligion] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [experience, setExperience] = useState("");
    const [profileImage, setProfileImage] = useState(null);

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    // GET ME
    useEffect(() => {
        const fetchMe = async () => {
        try {
            const res = await api.get("/auth/me");
            setUser(res.data);
        } catch (err) {
            console.error("Fetch me failed:", err);
        }
        };
        fetchMe();
    }, []);

    // CREATE PROFILE
    const handleSave = async () => {
        if (!profileImage) {
        alert("Foto profile wajib diupload");
        return;
        }

        if (!nik || !religion || !address || !phone || !experience) {
        alert("Semua field wajib diisi");
        return;
        }

        try {
        setLoading(true);

        const formData = new FormData();
        formData.append("nik", nik);
        formData.append("religion", religion);
        formData.append("address", address);
        formData.append("phone", phone);
        formData.append("experience", experience);
        formData.append("image", profileImage); // REAL FILE

        const res = await api.post(
            "/talent/talent_profile",
            formData,
            {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            }
        );

        console.log("Profile created:", res.data);
        alert("Profile berhasil dibuat 🎉");
        } catch (err) {
        console.error("Create profile error:", err?.response?.data || err);
        alert("Gagal membuat profile 😭");
        } finally {
        setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
                Profile Calon Karyawan
            </h1>
            </div>

            <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Data Pribadi
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
                {/* FOTO PROFILE */}
                <ProfileImageUpload
                disabled={isDisable}
                onChange={(file) => setProfileImage(file)}
                />

                <div>
                <Label>NIK *</Label>
                <Input
                    value={nik}
                    onChange={(e) => setNik(e.target.value)}
                    placeholder="Masukkan NIK"
                    disabled={isDisable}
                />
                </div>

                <div>
                <Label>Nama Akun</Label>
                <Input
                    value={user?.name || user?.username || ""}
                    disabled
                />
                </div>

                <div>
                <Label>Agama *</Label>
                <Select
                    value={religion}
                    onValueChange={setReligion}
                    disabled={isDisable}
                >
                    <SelectTrigger>
                    <SelectValue placeholder="Pilih agama" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="Islam">Islam</SelectItem>
                    <SelectItem value="Kristen">Kristen</SelectItem>
                    <SelectItem value="Katolik">Katolik</SelectItem>
                    <SelectItem value="Hindu">Hindu</SelectItem>
                    <SelectItem value="Buddha">Buddha</SelectItem>
                    <SelectItem value="Konghucu">Konghucu</SelectItem>
                    </SelectContent>
                </Select>
                </div>

                <div>
                <Label>Alamat *</Label>
                <Textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    rows={3}
                    disabled={isDisable}
                />
                </div>

                <div>
                <Label>No. Telepon *</Label>
                <Input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="08xxxxxxxxxx"
                    disabled={isDisable}
                />
                </div>

                <div>
                <Label>Pengalaman Kerja *</Label>
                <Input
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    placeholder="Contoh: 2 tahun di bidang IT"
                    disabled={isDisable}
                />
                </div>

                <div className="flex justify-end pt-4">
                <Button size="lg" onClick={handleSave} disabled={loading}>
                    {loading ? "Menyimpan..." : "Simpan Profile"}
                </Button>
                </div>
            </CardContent>
            </Card>
        </div>
        </div>
    );
}
