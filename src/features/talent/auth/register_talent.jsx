import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import poce from "@/assets/poce.jpg";
import Logo from "@/assets/amazink_logo_white.svg";
import LogoBiru from "@/assets/amazink_logo_blue.svg";
import axios from "axios";

const API_BASE_URL = "http://localhost:8000";

export default function TalentRegisterPage() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [full_name, setFullname] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const data = {
            username,
            password,
            full_name,
            role: "talent",
        };

        try {
            const res = await axios.post(
                `${API_BASE_URL}/api/v1/auth/register/talent`,
                data,
                { headers: { "Content-Type": "application/json" } }
            );

                console.log(res.data);
                setMessage("Registrasi berhasil. Silakan login.");
                setMessageType("success");
                setIsLoading(false);
                setTimeout(() => navigate("/recruitment/login"), 800);

        } catch (err) {
            console.error("Registrasi Gagal:", err.response?.data || err.message);
            const status = err.response?.status;
            let errMsg = "Registrasi gagal. Coba lagi ya!";
            if (status === 409) {
                errMsg = "Username sudah terdaftar";
            } else if (err.response?.data?.detail) {
                errMsg = err.response.data.detail;
            }
            setMessage(errMsg);
            setMessageType("error");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex relative overflow-hidden">
            {/* LEFT SIDE */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-500 items-center justify-center p-12">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-40"
                    style={{
                        backgroundImage: `url(${poce})`,
                        mixBlendMode: "overlay",
                    }}
                />
                <div className="absolute top-8 left-8 z-10">
                    <img src={Logo} alt="Logo" />
                </div>
                <div className="absolute bottom-8 left-8 z-10">
                    <h2 className="text-white text-3xl font-bold mb-2">Selamat Datang</h2>
                    <p className="text-white/90 text-sm">Daftar jika belum memiliki akun</p>
                </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-6 relative">

                {/* MOBILE LOGO */}
                <div className="lg:hidden absolute top-8 left-8 z-10">
                    <img src={LogoBiru} alt="LogoBiru" className="w-14" />
                </div>

                {/* DESKTOP FORM */}
                <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                    <Card className="w-96 shadow-2xl border-0">
                        <CardContent className="p-8">
                            <h1 className="text-3xl font-bold text-yellow-500 text-center mb-8">
                                Register
                            </h1>

                            {message && (
                                <div className={`mb-4 border px-4 py-2 rounded ${messageType === "success" ? "bg-green-100 border-green-400 text-green-700" : "bg-red-100 border-red-400 text-red-700"}`}>
                                    <div className="flex justify-between items-center">
                                        <div className="text-sm">{message}</div>
                                        <button onClick={() => { setMessage(""); setMessageType(""); }} className="ml-4 text-sm font-semibold">×</button>
                                    </div>
                                </div>
                            )}
                            <form onSubmit={handleRegister} className="space-y-6">

                                <div className="space-y-2">
                                    <Label className="text-sm text-gray-600">Username</Label>
                                    <Input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        placeholder="Buat username kamu"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-sm text-gray-600">Password</Label>
                                    <Input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Password kuat yaa"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-sm text-gray-600">Nama Lengkap</Label>
                                    <Input
                                        type="text"
                                        value={full_name}
                                        onChange={(e) => setFullname(e.target.value)}
                                        placeholder="Masukkan nama lengkap"
                                        required
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full h-12 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold text-base rounded-md shadow-md"
                                >
                                    {isLoading ? "Sedang Mendaftar..." : "Sign Up!"}
                                </Button>

                                <p className="text-center text-sm text-gray-600">
                                    Sudah punya akun?{" "}
                                    <button
                                        type="button"
                                        onClick={() => navigate("/recruitment/login")}
                                        className="text-yellow-500 font-semibold hover:text-yellow-600"
                                    >
                                        Klik disini
                                    </button>
                                </p>
                            </form>
                        </CardContent>
                    </Card>
                </div>

                {/* MOBILE FORM */}
                <div className="lg:hidden absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-6">
                    <Card className="w-full max-w-md mx-auto shadow-2xl border-0">
                        <CardContent className="p-8">
                            <h1 className="text-3xl font-bold text-yellow-500 text-center mb-8">
                                Sign Up
                            </h1>

                            {message && (
                                <div className={`mb-4 border px-4 py-2 rounded ${messageType === "success" ? "bg-green-100 border-green-400 text-green-700" : "bg-red-100 border-red-400 text-red-700"}`}>
                                    <div className="flex justify-between items-center">
                                        <div className="text-sm">{message}</div>
                                        <button onClick={() => { setMessage(""); setMessageType(""); }} className="ml-4 text-sm font-semibold">×</button>
                                    </div>
                                </div>
                            )}
                            <form onSubmit={handleRegister} className="space-y-6">

                                <div className="space-y-2">
                                    <Label className="text-sm text-gray-600">Username</Label>
                                    <Input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-sm text-gray-600">Password</Label>
                                    <Input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-sm text-gray-600">Nama Lengkap</Label>
                                    <Input
                                        type="text"
                                        value={full_name}
                                        onChange={(e) => setFullname(e.target.value)}
                                        required
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full h-12 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold text-base rounded-md shadow-md"
                                >
                                    {isLoading ? "Sedang Mendaftar..." : "Sign Up!"}
                                </Button>

                                <p className="text-center text-sm text-gray-600">
                                    Sudah punya akun?{" "}
                                    <button
                                        type="button"
                                        onClick={() => navigate("/recruitment/login")}
                                        className="text-yellow-400 font-semibold hover:text-yellow-600"
                                    >
                                        Klik disini
                                    </button>
                                </p>

                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
