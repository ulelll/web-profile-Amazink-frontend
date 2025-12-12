import ProfileImageUpload from "@/components/profile/profile-photo";
import { Button, Label } from "@/components/ui/index";
import { ArrowLeft, Briefcase, Calendar, Download, FileText, GraduationCap, Mail, Phone, User } from "lucide-react";
import { useState } from "react";

export default function ApplicantDetailPage() {
    // Hardcoded data - nanti akan diambil dari API
    const applicantData = {
        // Personal Info
        nik: "3374012345678901",
        name: "John Doe",
        religion: "Islam",
        address: "Jl. Pemuda No. 123, Semarang",
        phone: "08123456789",
        email: "john@example.com",
        experience: "2 years as Frontend Developer at PT Tech Indonesia",

        // Education
        school_name: "SMK Negeri 1 Semarang",
        school_address: "Jl. Dr. Cipto No. 121, Semarang",
        school_in: 2018,
        year_graduated: 2021,

        // Work Experience
        company_name: "PT Tech Indonesia",
        last_position: "Frontend Developer",
        last_salary: "Rp 5.000.000",
        year_in: 2021,
        year_out: 2023,

        // Applied Position
        division: "IT",
        vacancy: "Back-End",
        dateApplied: "2024-12-01",

        // Documents (nanti dari API)
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
        ktp: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&h=500&fit=crop",
        cv: "CV_John_Doe.pdf"
    };

    const [activeTab, setActiveTab] = useState("personal");

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            {/* Header */}
            <div className="mb-6">
                <Button variant="ghost" className="mb-4 -ml-2" onClick={() => window.history.back()}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Applicants
                </Button>
                <h1 className="text-3xl font-bold text-gray-800">Applicant Detail</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Profile Card */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-lg shadow p-6 sticky top-6">
                        {/* Photo 3x4 */}
                        <div className="flex justify-center mb-4">
                            <ProfileImageUpload disabled={true} imgUrl={applicantData.image} />
                        </div>

                        <h2 className="text-xl font-bold text-gray-900 text-center mb-2">
                            {applicantData.name}
                        </h2>
                        <p className="text-center text-gray-600 mb-4">{applicantData.division}</p>
                        <p className="text-center text-gray-600 mb-4">{applicantData.vacancy}</p>

                        <div className="space-y-3 text-sm">
                            <div className="flex items-center text-gray-700">
                                <Mail className="w-4 h-4 mr-2 text-gray-400" />
                                <span>{applicantData.email}</span>
                            </div>
                            <div className="flex items-center text-gray-700">
                                <Phone className="w-4 h-4 mr-2 text-gray-400" />
                                <span>{applicantData.phone}</span>
                            </div>
                            <div className="flex items-center text-gray-700">
                                <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                                <span>Applied: {new Date(applicantData.dateApplied).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}</span>
                            </div>
                        </div>

                        <div className="mt-6 pt-6 border-t border-gray-200">
                            <Button className="w-full bg-orange-600 hover:bg-orange-700">
                                <Download className="w-4 h-4 mr-2" />
                                Download CV
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Right Column - Details */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Tabs */}
                    <div className="bg-white rounded-lg shadow">
                        <div className="border-b border-gray-200">
                            <div className="flex">
                                <button
                                    onClick={() => setActiveTab("personal")}
                                    className={`px-6 py-4 font-medium text-sm ${activeTab === "personal"
                                        ? "border-b-2 border-orange-600 text-orange-600"
                                        : "text-gray-600 hover:text-gray-800"
                                        }`}
                                >
                                    <User className="w-4 h-4 inline mr-2" />
                                    Personal Info
                                </button>
                                <button
                                    onClick={() => setActiveTab("education")}
                                    className={`px-6 py-4 font-medium text-sm ${activeTab === "education"
                                        ? "border-b-2 border-orange-600 text-orange-600"
                                        : "text-gray-600 hover:text-gray-800"
                                        }`}
                                >
                                    <GraduationCap className="w-4 h-4 inline mr-2" />
                                    Education
                                </button>
                                <button
                                    onClick={() => setActiveTab("experience")}
                                    className={`px-6 py-4 font-medium text-sm ${activeTab === "experience"
                                        ? "border-b-2 border-orange-600 text-orange-600"
                                        : "text-gray-600 hover:text-gray-800"
                                        }`}
                                >
                                    <Briefcase className="w-4 h-4 inline mr-2" />
                                    Experience
                                </button>
                                <button
                                    onClick={() => setActiveTab("documents")}
                                    className={`px-6 py-4 font-medium text-sm ${activeTab === "documents"
                                        ? "border-b-2 border-orange-600 text-orange-600"
                                        : "text-gray-600 hover:text-gray-800"
                                        }`}
                                >
                                    <FileText className="w-4 h-4 inline mr-2" />
                                    Documents
                                </button>
                            </div>
                        </div>

                        <div className="p-6">
                            {/* Personal Info Tab */}
                            {activeTab === "personal" && (
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <Label className="text-gray-600 text-sm mb-1">NIK</Label>
                                            <p className="font-medium text-gray-900">{applicantData.nik}</p>
                                        </div>
                                        <div>
                                            <Label className="text-gray-600 text-sm mb-1">Religion</Label>
                                            <p className="font-medium text-gray-900">{applicantData.religion}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <Label className="text-gray-600 text-sm mb-1">Address</Label>
                                        <p className="font-medium text-gray-900">{applicantData.address}</p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <Label className="text-gray-600 text-sm mb-1">Phone Number</Label>
                                            <p className="font-medium text-gray-900">{applicantData.phone}</p>
                                        </div>
                                        <div>
                                            <Label className="text-gray-600 text-sm mb-1">Email</Label>
                                            <p className="font-medium text-gray-900">{applicantData.email}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <Label className="text-gray-600 text-sm mb-1">Experience Summary</Label>
                                        <p className="font-medium text-gray-900">{applicantData.experience}</p>
                                    </div>
                                </div>
                            )}

                            {/* Education Tab */}
                            {activeTab === "education" && (
                                <div className="space-y-4">
                                    <div>
                                        <Label className="text-gray-600 text-sm mb-1">School Name</Label>
                                        <p className="font-medium text-gray-900">{applicantData.school_name}</p>
                                    </div>

                                    <div>
                                        <Label className="text-gray-600 text-sm mb-1">School Address</Label>
                                        <p className="font-medium text-gray-900">{applicantData.school_address}</p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <Label className="text-gray-600 text-sm mb-1">Year In</Label>
                                            <p className="font-medium text-gray-900">{applicantData.school_in}</p>
                                        </div>
                                        <div>
                                            <Label className="text-gray-600 text-sm mb-1">Year Graduated</Label>
                                            <p className="font-medium text-gray-900">{applicantData.year_graduated}</p>
                                        </div>
                                    </div>

                                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                                        <p className="text-sm text-gray-600">
                                            Duration: <span className="font-medium text-gray-900">
                                                {applicantData.year_graduated - applicantData.school_in} years
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Experience Tab */}
                            {activeTab === "experience" && (
                                <div className="space-y-4">
                                    <div>
                                        <Label className="text-gray-600 text-sm mb-1">Company Name</Label>
                                        <p className="font-medium text-gray-900">{applicantData.company_name}</p>
                                    </div>

                                    <div>
                                        <Label className="text-gray-600 text-sm mb-1">Last Position</Label>
                                        <p className="font-medium text-gray-900">{applicantData.last_position}</p>
                                    </div>

                                    <div>
                                        <Label className="text-gray-600 text-sm mb-1">Last Salary</Label>
                                        <p className="font-medium text-gray-900">{applicantData.last_salary}</p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <Label className="text-gray-600 text-sm mb-1">Year In</Label>
                                            <p className="font-medium text-gray-900">{applicantData.year_in}</p>
                                        </div>
                                        <div>
                                            <Label className="text-gray-600 text-sm mb-1">Year Out</Label>
                                            <p className="font-medium text-gray-900">{applicantData.year_out}</p>
                                        </div>
                                    </div>

                                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                                        <p className="text-sm text-gray-600">
                                            Work Duration: <span className="font-medium text-gray-900">
                                                {applicantData.year_out - applicantData.year_in} years
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Documents Tab */}
                            {activeTab === "documents" && (
                                <div className="space-y-6">
                                    {/* KTP Preview */}
                                    <div>
                                        <Label className="text-gray-600 text-sm mb-2 block">KTP (ID Card)</Label>
                                        <div className="border-2 border-gray-200 rounded-lg overflow-hidden">
                                            <img
                                                src={applicantData.ktp}
                                                alt="KTP"
                                                className="w-full h-auto"
                                            />
                                        </div>
                                        <Button variant="outline" className="mt-2" size="sm">
                                            <Download className="w-4 h-4 mr-2" />
                                            Download KTP
                                        </Button>
                                    </div>

                                    {/* CV Preview */}
                                    <div>
                                        <Label className="text-gray-600 text-sm mb-2 block">Curriculum Vitae (CV)</Label>
                                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50">
                                            <FileText className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                                            <p className="font-medium text-gray-900 mb-1">{applicantData.cv}</p>
                                            <p className="text-sm text-gray-500 mb-4">PDF Document</p>
                                            <Button className="bg-orange-600 hover:bg-orange-700">
                                                <Download className="w-4 h-4 mr-2" />
                                                Download CV
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Photo 3x4 */}
                                    <div>
                                        <Label className="text-gray-600 text-sm mb-2 block">Photo 3x4</Label>
                                        <div className="flex justify-center">
                                            <div className="w-48 h-64 bg-gray-200 rounded-lg overflow-hidden border-2 border-gray-300">
                                                <img
                                                    src={applicantData.image}
                                                    alt="Photo 3x4"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        </div>
                                        <div className="text-center mt-2">
                                            <Button variant="outline" size="sm">
                                                <Download className="w-4 h-4 mr-2" />
                                                Download Photo
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="font-semibold text-gray-900 mb-4">Actions</h3>
                        <div className="flex flex-wrap gap-3">
                            <Button className="bg-green-600 hover:bg-green-700">
                                Accept Applicant
                            </Button>
                            <Button variant="destructive">
                                Reject Applicant
                            </Button>
                            <Button variant="outline">
                                Schedule Interview
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}