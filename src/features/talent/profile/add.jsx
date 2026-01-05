import ProfileImageUpload from "@/components/profile/profile-photo";
import UploadFileComponent from "@/components/profile/upload-file";
import UploadImageComponent from "@/components/profile/upload-image";
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
import { useNavigate } from "react-router-dom";

import {
  Briefcase,
  GraduationCap,
  User,
  FileText,
  CreditCard,
  Plus,
  X,
  Upload,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function Profile() {
  const [isDisable, setDisable] = useState(true);

  // Personal Info
  const [nik, setNik] = useState("");
  const [name, setName] = useState("");
  const [religion, setReligion] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [experience, setExperience] = useState("");

  // Last Education
  const [schoolName, setSchoolName] = useState("");
  const [schoolAddress, setSchoolAddress] = useState("");
  const [yearIn, setYearIn] = useState("");
  const [yearGraduated, setYearGraduated] = useState("");

  // Work History
  const [companyName, setCompanyName] = useState("");
  const [lastPosition, setLastPosition] = useState("");
  const [lastSalary, setLastSalary] = useState("");
  const [workYearIn, setWorkYearIn] = useState("");
  const [workYearOut, setWorkYearOut] = useState("");

  // Documents
  const [profileImage, setProfileImage] = useState(null);
  const [ktpFile, setKtpFile] = useState(null);
  const [cvFile, setCvFile] = useState(null);
  const [additionalDocs, setAdditionalDocs] = useState([]);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await api.get("/auth/me");
        setUser(res.data);
        setName(res.data.fullname);
        setDisable(false);
      } catch (err) {
        console.error("Fetch me failed:", err);
        alert("Gagal mengambil data user. Silakan login kembali.");
      }
    };
    fetchMe();
  }, []);

  const handleSave = async () => {
    if (!nik || !religion || !phone) {
      alert("Field NIK, Agama, dan No. Telepon wajib diisi");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("nik", nik || "");
      formData.append("religion", religion || "");
      formData.append("phone", phone || "");
      formData.append("address", address || "");
      formData.append("experience", experience || "");

      if (profileImage) {
        formData.append("photo_profile", profileImage);
      }

      formData.append("last_school_name", schoolName || "");
      formData.append("last_school_address", schoolAddress || "");
      formData.append("year_enrolled", String(yearIn || ""));
      formData.append("year_graduated", String(yearGraduated || ""));
      formData.append("last_company_name", companyName || "");
      formData.append("last_company_salary", String(Number(lastSalary || 0)));
      formData.append("last_position", lastPosition || "");
      formData.append("year_worked", String(workYearIn || ""));
      formData.append("year_out", String(workYearOut || ""));

      console.log("Sending talent data via FormData");
      const res = await api.post("/talent_data/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Save talent data success:", res.data);

      const uploadPromises = [];

      if (ktpFile) {
        const ktpFormData = new FormData();
        ktpFormData.append("file", ktpFile);
        ktpFormData.append("title", "ktp");
        uploadPromises.push(
          api.post(
            `/talent_documents/talents/${user.id}/documents/`,
            ktpFormData
          )
        );
      }

      if (cvFile) {
        const cvFormData = new FormData();
        cvFormData.append("file", cvFile);
        cvFormData.append("title", "cv");
        uploadPromises.push(
          api.post(
            `/talent_documents/talents/${user.id}/documents/`,
            cvFormData
          )
        );
      }

      additionalDocs.forEach((doc) => {
        if (doc.file && doc.name) {
          const docFormData = new FormData();
          docFormData.append("file", doc.file);
          docFormData.append("title", doc.name);
          uploadPromises.push(
            api.post(
              `/talent_documents/talents/${user.id}/documents/`,
              docFormData
            )
          );
        }
      });

      await Promise.all(uploadPromises);

      alert("Profil berhasil disimpan!");
      navigate("/recruitment/profile/view");
    } catch (err) {
      console.error("Save profile error full response:", err.response);
      console.error("Save profile error data:", err.response?.data);
      const detail = err.response?.data?.detail;
      const errorMessage = Array.isArray(detail)
        ? detail.map((d) => `${d.loc.join(".")}: ${d.msg}`).join("\n")
        : err.response?.data?.message || "Gagal menyimpan profil";

      alert(`Error detail: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const addNewDocument = () => {
    setAdditionalDocs([
      ...additionalDocs,
      { id: Date.now(), name: "", file: null },
    ]);
  };

  const removeDocument = (id) => {
    setAdditionalDocs(additionalDocs.filter((doc) => doc.id !== id));
  };

  const updateDocumentName = (id, name) => {
    setAdditionalDocs(
      additionalDocs.map((doc) => (doc.id === id ? { ...doc, name } : doc))
    );
  };

  const updateDocumentFile = (id, file) => {
    setAdditionalDocs(
      additionalDocs.map((doc) => (doc.id === id ? { ...doc, file } : doc))
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {/* Header */}
        <div className="mb-8 sm:mb-10 lg:mb-12">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-lg">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
              Profile Calon Karyawan
            </h1>
            <p className="text-blue-100 text-sm sm:text-base">
              Lengkapi informasi profil Anda dengan detail yang akurat
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {/* Personal Information */}
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white pb-6">
              <CardTitle className="flex items-center gap-3 text-lg sm:text-xl">
                <div className="p-2 bg-white/20 rounded-lg">
                  <User className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                Data Pribadi
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5 pt-6 pb-6">
              <div className="flex justify-center mb-6">
                <ProfileImageUpload
                  disabled={isDisable}
                  onChange={(file) => setProfileImage(file)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="nik" className="text-gray-700 font-medium">
                  NIK <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="nik"
                  type="text"
                  value={nik}
                  onChange={(e) => setNik(e.target.value)}
                  disabled={isDisable}
                  placeholder="Masukkan NIK"
                  className="rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-700 font-medium">
                  Nama Lengkap <span className="text-red-500">*</span>
                </Label>
                {/* get the username from /api/v1/auth/me */}
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled
                  placeholder="Masukkan nama lengkap"
                  className="rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500 bg-gray-50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="religion" className="text-gray-700 font-medium">
                  Agama <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={religion}
                  onValueChange={setReligion}
                  disabled={isDisable}
                >
                  <SelectTrigger
                    id="religion"
                    disabled={isDisable}
                    className="rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  >
                    <SelectValue placeholder="Pilih Agama" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="Islam">Islam</SelectItem>
                    <SelectItem value="Kristen">Kristen</SelectItem>
                    <SelectItem value="Katolik">Katolik</SelectItem>
                    <SelectItem value="Hindu">Hindu</SelectItem>
                    <SelectItem value="Buddha">Buddha</SelectItem>
                    <SelectItem value="Konghucu">Konghucu</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address" className="text-gray-700 font-medium">
                  Alamat <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  disabled={isDisable}
                  placeholder="Masukkan alamat lengkap"
                  rows={3}
                  className="rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-gray-700 font-medium">
                  No. Telepon <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled={isDisable}
                  placeholder="08xxxxxxxxxx"
                  className="rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="experience"
                  className="text-gray-700 font-medium"
                >
                  Pengalaman Kerja <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="experience"
                  type="text"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  disabled={isDisable}
                  placeholder="Contoh: 2 tahun di bidang IT"
                  className="rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </CardContent>
          </Card>

          {/* Education & Work History */}
          <div className="space-y-4 sm:space-y-6 lg:space-y-8">
            {/* Last Education */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white pb-6">
                <CardTitle className="flex items-center gap-3 text-lg sm:text-xl">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  Pendidikan Terakhir
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5 pt-6 pb-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="school-name"
                    className="text-gray-700 font-medium"
                  >
                    Nama Sekolah/Universitas{" "}
                    <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="school-name"
                    type="text"
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                    disabled={isDisable}
                    placeholder="Masukkan nama institusi"
                    className="rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="school-address"
                    className="text-gray-700 font-medium"
                  >
                    Alamat Sekolah/Universitas{" "}
                    <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="school-address"
                    type="text"
                    value={schoolAddress}
                    onChange={(e) => setSchoolAddress(e.target.value)}
                    disabled={isDisable}
                    placeholder="Masukkan alamat institusi"
                    className="rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="year-in"
                      className="text-gray-700 font-medium"
                    >
                      Tahun Masuk <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="year-in"
                      type="number"
                      value={yearIn}
                      onChange={(e) => setYearIn(e.target.value)}
                      disabled={isDisable}
                      placeholder="2020"
                      className="rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="year-graduated"
                      className="text-gray-700 font-medium"
                    >
                      Tahun Lulus <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="year-graduated"
                      type="number"
                      value={yearGraduated}
                      onChange={(e) => setYearGraduated(e.target.value)}
                      disabled={isDisable}
                      placeholder="2024"
                      className="rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Work History */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white pb-6">
                <CardTitle className="flex items-center gap-3 text-lg sm:text-xl">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <Briefcase className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  Riwayat Pekerjaan Terakhir
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5 pt-6 pb-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="company-name"
                    className="text-gray-700 font-medium"
                  >
                    Nama Perusahaan <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="company-name"
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    disabled={isDisable}
                    placeholder="Masukkan nama perusahaan"
                    className="rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="last-position"
                    className="text-gray-700 font-medium"
                  >
                    Posisi Terakhir <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="last-position"
                    type="text"
                    value={lastPosition}
                    onChange={(e) => setLastPosition(e.target.value)}
                    disabled={isDisable}
                    placeholder="Masukkan posisi terakhir"
                    className="rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="last-salary"
                    className="text-gray-700 font-medium"
                  >
                    Gaji Terakhir <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="last-salary"
                    type="number"
                    value={lastSalary}
                    onChange={(e) => setLastSalary(e.target.value)}
                    disabled={isDisable}
                    placeholder="5000000"
                    className="rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="work-year-in"
                      className="text-gray-700 font-medium"
                    >
                      Tahun Masuk <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="work-year-in"
                      type="number"
                      value={workYearIn}
                      onChange={(e) => setWorkYearIn(e.target.value)}
                      disabled={isDisable}
                      placeholder="2020"
                      className="rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="work-year-out"
                      className="text-gray-700 font-medium"
                    >
                      Tahun Keluar <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="work-year-out"
                      type="number"
                      value={workYearOut}
                      onChange={(e) => setWorkYearOut(e.target.value)}
                      disabled={isDisable}
                      placeholder="2024"
                      className="rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Documents Upload Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mt-4 sm:mt-6 lg:mt-8">
          {/* KTP Upload */}
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white pb-6">
              <CardTitle className="flex items-center gap-3 text-lg sm:text-xl">
                <div className="p-2 bg-white/20 rounded-lg">
                  <CreditCard className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                Upload KTP <span className="text-red-200">*</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 pb-6">
              <UploadImageComponent
                disabled={isDisable}
                onChange={(file) => setKtpFile(file)}
              />
            </CardContent>
          </Card>

          {/* CV Upload */}
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white pb-6">
              <CardTitle className="flex items-center gap-3 text-lg sm:text-xl">
                <div className="p-2 bg-white/20 rounded-lg">
                  <FileText className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                Upload CV (PDF) <span className="text-red-200">*</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 pb-6">
              <UploadFileComponent
                disabled={isDisable}
                onChange={(file) => setCvFile(file)}
              />
            </CardContent>
          </Card>
        </div>

        {/* Additional Documents Section */}
        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl overflow-hidden mt-4 sm:mt-6 lg:mt-8">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white pb-6">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-3 text-lg sm:text-xl">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Upload className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                Dokumen Tambahan
              </CardTitle>
              <Button
                onClick={addNewDocument}
                disabled={isDisable}
                size="sm"
                className="bg-white/20 hover:bg-white/30 text-white border-0 rounded-xl transition-colors duration-200"
              >
                <Plus className="w-4 h-4 mr-2" />
                Tambah Dokumen
              </Button>
            </div>
            <p className="text-blue-100 text-sm mt-2">
              Upload dokumen pendukung lainnya (Sertifikat, Ijazah, Portfolio,
              dll)
            </p>
          </CardHeader>
          <CardContent className="pt-6 pb-6">
            {additionalDocs.length === 0 ? (
              <div className="text-center py-12 px-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 mb-4">
                  <Upload className="w-8 h-8 text-blue-500" />
                </div>
                <p className="text-gray-500 mb-2">Belum ada dokumen tambahan</p>
                <p className="text-sm text-gray-400">
                  Klik tombol "Tambah Dokumen" untuk menambahkan dokumen
                  pendukung
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {additionalDocs.map((doc) => (
                  <div
                    key={doc.id}
                    className="border border-gray-200 rounded-xl p-4 bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                  >
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-1 space-y-3">
                        <div className="space-y-2">
                          <Label
                            htmlFor={`doc-name-${doc.id}`}
                            className="text-gray-700 font-medium text-sm"
                          >
                            Nama Dokumen
                          </Label>
                          <Input
                            id={`doc-name-${doc.id}`}
                            type="text"
                            value={doc.name}
                            onChange={(e) =>
                              updateDocumentName(doc.id, e.target.value)
                            }
                            disabled={isDisable}
                            placeholder="Contoh: Sertifikat Bahasa Inggris"
                            className="rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label
                            htmlFor={`doc-file-${doc.id}`}
                            className="text-gray-700 font-medium text-sm"
                          >
                            File
                          </Label>
                          <UploadFileComponent
                            disabled={isDisable}
                            onChange={(file) =>
                              updateDocumentFile(doc.id, file)
                            }
                          />
                        </div>
                      </div>
                      <div className="flex sm:flex-col justify-end sm:justify-start">
                        <Button
                          onClick={() => removeDocument(doc.id)}
                          disabled={isDisable}
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg"
                        >
                          <X className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="mt-8 sm:mt-10 flex justify-center sm:justify-end">
          <Button
            size="lg"
            disabled={isDisable || loading}
            onClick={handleSave}
            className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-base sm:text-lg"
          >
            {loading ? "Menyimpan..." : "Simpan Profile"}
          </Button>
        </div>
      </div>
    </div>
  );
}
