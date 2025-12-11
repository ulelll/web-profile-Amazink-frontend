import { Button } from "@/components/ui/index";
import HrLayout from "@/layouts/hr_layout";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function VacancyDetailPage() {
    const { id } = useParams();
    const [vacancy, setVacancy] = useState(null);

    useEffect(() => {
        const dummyVacancies = [
            {
                id: 1,
                judul_lowongan: "Senior Frontend Developer",
                gambar: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop",
                start_periode: "2025-01-01",
                end_periode: "2025-02-28",
                divisions: "IT",
                lokasi: "Jakarta Selatan",
                tipe_kerja: "Full-time",
                gaji: "15.000.000 - 25.000.000",
                deskripsi: "Mencari frontend developer berpengalaman untuk membangun UI modern dan scalable.",
                kualifikasi: [
                    "Minimal 3 tahun pengalaman sebagai Frontend Developer",
                    "Menguasai React.js dan Tailwind",
                    "Terbiasa dengan Git dan CI/CD",
                    "Memahami REST API"
                ],
                tanggung_jawab: [
                    "Membangun tampilan web yang responsif",
                    "Bekerja sama dengan tim backend",
                    "Melakukan code review",
                    "Mengoptimalkan performa aplikasi"
                ],
                benefit: [
                    "BPJS Kesehatan & Ketenagakerjaan",
                    "Kerja hybrid",
                    "Tunjangan makan & transport",
                    "Budget Learning"
                ],
                golongan_peserta: [
                    "Sarjana Informatika / Sistem Informasi",
                    "Pengalaman minimal 3 tahun"
                ],
                kontak_hrd: "hrd@company.com",
                posted_at: "2024-12-01",
                active: 1
            },

            {
                id: 2,
                judul_lowongan: "Backend Engineer - Node.js",
                gambar: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=300&fit=crop",
                start_periode: "2025-01-15",
                end_periode: "2025-03-15",
                divisions: "IT",
                lokasi: "Bandung",
                tipe_kerja: "Full-time",
                gaji: "13.000.000 - 22.000.000",
                deskripsi: "Membangun API yang kuat, aman, dan scalable.",
                kualifikasi: [
                    "Menguasai Node.js & Express",
                    "Memahami database SQL dan NoSQL",
                    "Mengerti prinsip clean architecture",
                    "Terbiasa menggunakan Docker"
                ],
                tanggung_jawab: [
                    "Membangun dan memelihara API",
                    "Integrasi layanan internal",
                    "Optimasi performa backend",
                    "Setup pipeline CI/CD"
                ],
                benefit: [
                    "Asuransi kesehatan swasta",
                    "Work From Home 2x per minggu",
                    "Tunjangan internet",
                    "Training dan sertifikasi"
                ],
                golongan_peserta: [
                    "Fresh Graduate dipersilakan melamar",
                    "Sarjana Informatika / Teknik Komputer"
                ],
                kontak_hrd: "backend.hiring@company.com",
                posted_at: "2024-12-05",
                active: 1
            },

            {
                id: 3,
                judul_lowongan: "UI/UX Designer",
                gambar: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop",
                start_periode: "2025-02-01",
                end_periode: "2025-03-30",
                divisions: "Desain grafis",
                lokasi: "Yogyakarta",
                tipe_kerja: "Internship",
                gaji: "3.000.000 - 5.000.000",
                deskripsi: "Merancang pengalaman pengguna yang modern dan mudah digunakan.",
                kualifikasi: [
                    "Menguasai Figma",
                    "Paham design system",
                    "Memiliki portofolio yang relevan",
                    "Komunikatif dan detail-oriented"
                ],
                tanggung_jawab: [
                    "Membuat wireframe, user flow, dan mockup",
                    "Berkoordinasi dengan Frontend Developer",
                    "Mengujicoba desain pada pengguna"
                ],
                benefit: [
                    "Mentoring dengan senior designer",
                    "Ruang kerja nyaman",
                    "Snack dan kopi gratis"
                ],
                golongan_peserta: [
                    "Mahasiswa aktif atau Fresh Graduate",
                    "Bidang Desain/Multimedia"
                ],
                kontak_hrd: "uiux@company.com",
                posted_at: "2024-12-10",
                active: 1
            },

            {
                id: 4,
                judul_lowongan: "Data Scientist",
                gambar: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
                start_periode: "2025-01-20",
                end_periode: "2025-03-20",
                divisions: "IT",
                lokasi: "Jakarta Pusat",
                tipe_kerja: "Full-time",
                gaji: "18.000.000 - 30.000.000",
                deskripsi: "Analisis data untuk pengambilan keputusan berbasis machine learning.",
                kualifikasi: [
                    "Menguasai Python (Pandas, NumPy, Scikit-Learn)",
                    "Paham SQL",
                    "Punya pengalaman membangun model ML"
                ],
                tanggung_jawab: [
                    "Membangun model prediksi",
                    "Membersihkan dan mengolah data",
                    "Membuat visualisasi data"
                ],
                benefit: [
                    "Asuransi lengkap",
                    "Laptop Macbook",
                    "Bonus tahunan"
                ],
                golongan_peserta: [
                    "Sarjana Statistik/Matematika/TI",
                    "Pengalaman minimal 1 tahun"
                ],
                kontak_hrd: "datascience@company.com",
                posted_at: "2024-12-12",
                active: 1
            },

            {
                id: 5,
                judul_lowongan: "DevOps Engineer",
                gambar: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=400&h=300&fit=crop",
                divisions: "IT",
                start_periode: "2025-02-10",
                end_periode: "2025-04-10",
                lokasi: "Surabaya",
                tipe_kerja: "Full-time",
                gaji: "16.000.000 - 28.000.000",
                deskripsi: "Mengelola infrastruktur dan pipeline CI/CD.",
                kualifikasi: [
                    "Pengalaman CI/CD tools",
                    "Menguasai Docker & Kubernetes",
                    "Paham cloud (AWS/GC)"
                ],
                tanggung_jawab: [
                    "Monitoring sistem",
                    "Meningkatkan reliability",
                    "Automasi proses deployment"
                ],
                benefit: [
                    "Asuransi kesehatan",
                    "WFH fleksibel",
                    "Bonus kinerja"
                ],
                golongan_peserta: [
                    "Sarjana Informatika",
                    "Pengalaman minimal 2 tahun"
                ],
                kontak_hrd: "devops@company.com",
                posted_at: "2024-12-15",
                active: 1
            },

            {
                id: 6,
                judul_lowongan: "Mobile App Developer",
                gambar: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop",
                divisions: "IT",
                start_periode: "2025-01-25",
                end_periode: "2025-03-25",
                lokasi: "Remote",
                tipe_kerja: "Contract",
                gaji: "10.000.000 - 18.000.000",
                deskripsi: "Pengembangan aplikasi Android & iOS.",
                kualifikasi: [
                    "Menguasai Flutter atau React Native",
                    "Paham integrasi API",
                    "Punya pengalaman publikasi app"
                ],
                tanggung_jawab: [
                    "Mengembangkan fitur baru",
                    "Fix bugs",
                    "Optimasi performa"
                ],
                benefit: [
                    "Remote full",
                    "Jam kerja fleksibel"
                ],
                golongan_peserta: [
                    "Fresh Graduate welcome",
                    "Pengalaman lebih disukai"
                ],
                kontak_hrd: "mobile@company.com",
                posted_at: "2024-12-18",
                active: 0
            }
        ];

        const found = dummyVacancies.find(v => v.id === Number(id));
        setVacancy(found);

    }, [id]);

    const toggleActive = () => {
        setVacancy(prev => ({
            ...prev,
            active: prev.active ? 0 : 1
        }));
    };


    if (!vacancy) {
        return (
            <HrLayout>
                <div className="p-8 text-center text-gray-500">Lowongan tidak ditemukan</div>
            </HrLayout>
        );
    }

    return (
        <HrLayout>
            <div className="max-w-5xl mx-auto p-6">
                <img
                    src={vacancy.gambar}
                    className="w-full h-72 rounded-xl object-cover mb-6"
                />

                <h1 className="text-3xl font-bold mb-2">{vacancy.judul_lowongan}</h1>
                <p className="text-gray-500 mb-4">
                    {vacancy.divisions} • {vacancy.lokasi} • {vacancy.tipe_kerja}
                </p>

                <div className="space-y-6">

                    <section>
                        <h2 className="font-semibold text-xl mb-2">Deskripsi Pekerjaan</h2>
                        <p className="text-gray-700 leading-relaxed">
                            {vacancy.deskripsi}
                        </p>
                    </section>

                    <section>
                        <h2 className="font-semibold text-xl mb-2">Kualifikasi</h2>
                        <ul className="list-disc pl-6 text-gray-700 space-y-1">
                            {vacancy.kualifikasi.map((item, idx) => (
                                <li key={idx}>{item}</li>
                            ))}
                        </ul>
                    </section>

                    <section>
                        <h2 className="font-semibold text-xl mb-2">Tanggung Jawab</h2>
                        <ul className="list-disc pl-6 text-gray-700 space-y-1">
                            {vacancy.tanggung_jawab.map((item, idx) => (
                                <li key={idx}>{item}</li>
                            ))}
                        </ul>
                    </section>

                    <section>
                        <h2 className="font-semibold text-xl mb-2">Benefit</h2>
                        <ul className="list-disc pl-6 text-gray-700 space-y-1">
                            {vacancy.benefit.map((item, idx) => (
                                <li key={idx}>{item}</li>
                            ))}
                        </ul>
                    </section>

                    <section>
                        <h2 className="font-semibold text-xl mb-2">Golongan Peserta</h2>
                        <ul className="list-disc pl-6 text-gray-700 space-y-1">
                            {vacancy.golongan_peserta.map((item, idx) => (
                                <li key={idx}>{item}</li>
                            ))}
                        </ul>
                    </section>

                    <section>
                        <h2 className="font-semibold text-xl mb-2">Kontak HRD</h2>
                        <p className="text-gray-700">{vacancy.kontak_hrd}</p>
                    </section>
                    <div className="flex justify-end mb-6">
                        {vacancy.active ? (
                            <Button
                                variant="destructive"
                                onClick={toggleActive}
                            >
                                Set Not Active
                            </Button>
                        ) : (
                            <Button
                                variant="default"
                                className="bg-green-600 hover:bg-green-700"
                                onClick={toggleActive}
                            >
                                Set Active
                            </Button>
                        )}
                    </div>

                </div>
            </div>
        </HrLayout>
    );
}
