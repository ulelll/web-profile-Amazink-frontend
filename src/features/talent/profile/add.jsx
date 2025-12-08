import ProfileImageUpload from '@/components/profile/profile-photo';
import UploadFileComponent from '@/components/profile/upload-file';
import UploadImageComponent from '@/components/profile/upload-image';
import { Button, Card, CardContent, CardHeader, CardTitle, Input, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Textarea } from '@/components/ui';

import { Briefcase, GraduationCap, User } from 'lucide-react';
import { useState } from 'react';

export default function Profile() {
    const [isDisable, setDisable] = useState(true);

    // Personal Info
    const [nik, setNik] = useState('');
    const [name, setName] = useState('');
    const [religion, setReligion] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [experience, setExperience] = useState('');

    // Last Education
    const [schoolName, setSchoolName] = useState('');
    const [schoolAddress, setSchoolAddress] = useState('');
    const [yearIn, setYearIn] = useState('');
    const [yearGraduated, setYearGraduated] = useState('');

    // Work History
    const [companyName, setCompanyName] = useState('');
    const [lastPosition, setLastPosition] = useState('');
    const [lastSalary, setLastSalary] = useState('');
    const [workYearIn, setWorkYearIn] = useState('');
    const [workYearOut, setWorkYearOut] = useState('');

    const handleSave = () => {
        // Handle save logic here
        console.log('Saving profile...');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8 flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-gray-800">Profile Calon Karyawan</h1>

                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Personal Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="w-5 h-5" />
                                Data Pribadi
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-4 mb-4">
                                <ProfileImageUpload disabled={isDisable} />
                            </div>

                            <div>
                                <Label htmlFor="nik">NIK <span className="text-red-500">*</span></Label>
                                <Input
                                    id="nik"
                                    type="text"
                                    value={nik}
                                    onChange={(e) => setNik(e.target.value)}
                                    isDisable={isDisable}
                                    placeholder="Masukkan NIK"
                                />
                            </div>

                            <div>
                                <Label htmlFor="name">Nama Lengkap <span className="text-red-500">*</span></Label>
                                <Input
                                    id="name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    isDisable={isDisable}
                                    placeholder="Masukkan nama lengkap"
                                />
                            </div>

                            <div>
                                <Label htmlFor="religion">Agama <span className="text-red-500">*</span></Label>
                                <Select value={religion} onValueChange={setReligion} isDisable={isDisable}>
                                    <SelectTrigger id="religion" isDisable={isDisable} >
                                        <SelectValue placeholder="Pilih Agama" />
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
                                <Label htmlFor="address">Alamat <span className="text-red-500">*</span></Label>
                                <Textarea
                                    id="address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    isDisable={isDisable}
                                    placeholder="Masukkan alamat lengkap"
                                    rows={3}
                                />
                            </div>

                            <div>
                                <Label htmlFor="phone">No. Telepon <span className="text-red-500">*</span></Label>
                                <Input
                                    id="phone"
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    isDisable={isDisable}
                                    placeholder="08xxxxxxxxxx"
                                />
                            </div>

                            <div>
                                <Label htmlFor="experience">Pengalaman Kerja <span className="text-red-500">*</span></Label>
                                <Input
                                    id="experience"
                                    type="text"
                                    value={experience}
                                    onChange={(e) => setExperience(e.target.value)}
                                    isDisable={isDisable}
                                    placeholder="Contoh: 2 tahun di bidang IT"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Education & Work History */}
                    <div className="space-y-6">
                        {/* Last Education */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <GraduationCap className="w-5 h-5" />
                                    Pendidikan Terakhir
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label htmlFor="school-name">Nama Sekolah/Universitas <span className="text-red-500">*</span></Label>
                                    <Input
                                        id="school-name"
                                        type="text"
                                        value={schoolName}
                                        onChange={(e) => setSchoolName(e.target.value)}
                                        isDisable={isDisable}
                                        placeholder="Masukkan nama institusi"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="school-address">Alamat Sekolah/Universitas <span className="text-red-500">*</span></Label>
                                    <Input
                                        id="school-address"
                                        type="text"
                                        value={schoolAddress}
                                        onChange={(e) => setSchoolAddress(e.target.value)}
                                        isDisable={isDisable}
                                        placeholder="Masukkan alamat institusi"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="year-in">Tahun Masuk <span className="text-red-500">*</span></Label>
                                        <Input
                                            id="year-in"
                                            type="number"
                                            value={yearIn}
                                            onChange={(e) => setYearIn(e.target.value)}
                                            isDisable={isDisable}
                                            placeholder="2020"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="year-graduated">Tahun Lulus <span className="text-red-500">*</span></Label>
                                        <Input
                                            id="year-graduated"
                                            type="number"
                                            value={yearGraduated}
                                            onChange={(e) => setYearGraduated(e.target.value)}
                                            isDisable={isDisable}
                                            placeholder="2024"
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Work History */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Briefcase className="w-5 h-5" />
                                    Riwayat Pekerjaan Terakhir
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label htmlFor="company-name">Nama Perusahaan <span className="text-red-500">*</span></Label>
                                    <Input
                                        id="company-name"
                                        type="text"
                                        value={companyName}
                                        onChange={(e) => setCompanyName(e.target.value)}
                                        isDisable={isDisable}
                                        placeholder="Masukkan nama perusahaan"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="last-position">Posisi Terakhir <span className="text-red-500">*</span></Label>
                                    <Input
                                        id="last-position"
                                        type="text"
                                        value={lastPosition}
                                        onChange={(e) => setLastPosition(e.target.value)}
                                        isDisable={isDisable}
                                        placeholder="Masukkan posisi terakhir"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="last-salary">Gaji Terakhir <span className="text-red-500">*</span></Label>
                                    <Input
                                        id="last-salary"
                                        type="number"
                                        value={lastSalary}
                                        onChange={(e) => setLastSalary(e.target.value)}
                                        isDisable={isDisable}
                                        placeholder="5000000"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="work-year-in">Tahun Masuk <span className="text-red-500">*</span></Label>
                                        <Input
                                            id="work-year-in"
                                            type="number"
                                            value={workYearIn}
                                            onChange={(e) => setWorkYearIn(e.target.value)}
                                            isDisable={isDisable}
                                            placeholder="2020"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="work-year-out">Tahun Keluar <span className="text-red-500">*</span></Label>
                                        <Input
                                            id="work-year-out"
                                            type="number"
                                            value={workYearOut}
                                            onChange={(e) => setWorkYearOut(e.target.value)}
                                            isDisable={isDisable}
                                            placeholder="2024"
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Documents Upload Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                    {/* KTP Upload */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Upload KTP <span className="text-red-500">*</span></CardTitle>
                        </CardHeader>
                        <CardContent>
                            <UploadImageComponent disabled={isDisable} />
                        </CardContent>
                    </Card>

                    {/* CV Upload */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Upload CV (PDF) <span className="text-red-500">*</span></CardTitle>
                        </CardHeader>
                        <CardContent>
                            <UploadFileComponent disabled={isDisable} />
                        </CardContent>
                    </Card>
                </div>

                {/* Submit Button */}
                <div className="mt-8 flex justify-end">
                    <Button
                        size="lg"
                        disabled={isDisable}
                        onClick={handleSave}
                    >
                        Simpan Profile
                    </Button>
                </div>
            </div>
        </div>
    );
}