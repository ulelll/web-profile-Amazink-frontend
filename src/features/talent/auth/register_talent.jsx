import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import poce from "@/assets/poce.jpg";
import Logo from "@/assets/amazink_logo_white.svg";
import LogoBiru from "@/assets/amazink_logo_blue.svg";

export default function TalentRegisterPage() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [nik, setNik] = useState("");

    const handleRegister = (e) => {
        e.preventDefault();
        console.log({ username, password, nik });
        alert("register submitted!");
    };

    return (
        <div className="min-h-screen flex relative overflow-hidden">
            {/* Left Side - Gradient with Background Image */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-500 items-center justify-center p-12">
                <div
                className="absolute inset-0 bg-cover bg-center opacity-40"
                style={{
                    backgroundImage: `url(${poce})`,
                    mixBlendMode: "overlay",
                }}
                />

                {/* Logo Top Left */}
                <div className="absolute top-8 left-8 z-10">
                <img src={Logo} alt="Logo" />
                </div>

                {/* Bottom Left Text */}
                <div className="absolute bottom-8 left-8 z-10">
                <h2 className="text-white text-3xl font-bold mb-2">
                    Selamat Datang 
                </h2>
                <p className="text-white/90 text-sm">Daftar jika belum memiliki akun </p>
                </div>
            </div>

            {/* Right Side - White with Decorative Pattern */}
            <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-6 relative">
                {/* Decorative Pattern */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Top Left */}
                {/* <div className="absolute top-10 left-10 w-16 h-16 bg-orange-100 rounded-full opacity-40" />
                <div className="absolute top-32 left-40 w-8 h-8 bg-purple-200 rounded-full opacity-50" /> */}

                {/* Top Right */}
                <div className="absolute top-10 right-20 w-16 h-16 bg-yellow-100 rounded-full opacity-40" />
                <div className="absolute top-32 right-40 w-8 h-8 bg-purple-200 rounded-full opacity-50" />
                <div className="absolute top-1/4 right-12 w-12 h-12 border-2 border-yellow-200 rotate-45" />

                {/* Bottom Left */}
                <div className="absolute bottom-20 left-32 w-20 h-20 bg-gradient-to-br from-yellow-100 to-purple-100 rounded-full opacity-30" />
                <div className="absolute bottom-40 left-16 w-10 h-10 border-2 border-purple-300 rounded-full opacity-40" />

                {/* Bottom Right */}
                <div className="absolute bottom-20 right-32 w-20 h-20 bg-gradient-to-br from-yellow-100 to-purple-100 rounded-full opacity-30" />
                <div className="absolute bottom-40 right-16 w-10 h-10 border-2 border-purple-300 rounded-full opacity-40" />

                {/* Center */}
                <div className="absolute top-1/2 right-8 w-6 h-6 bg-yellow-300 rotate-45 opacity-40" />
                <div className="absolute top-1/2 left-8 w-6 h-6 bg-purple-300 rotate-45 opacity-40" />
                <div
                    className="absolute top-1/3 right-60 w-14 h-14 bg-purple-100 opacity-30"
                    style={{ borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%" }}
                />
                <div
                    className="absolute top-2/3 left-60 w-14 h-14 bg-yellow-100 opacity-30"
                    style={{ borderRadius: "70% 30% 30% 70% / 70% 70% 30% 30%" }}
                />

                {/* Dots pattern - spread across */}
                {/* <div className="absolute top-20 left-20 w-2 h-2 bg-orange-400 rounded-full" />
                <div className="absolute top-24 left-32 w-2 h-2 bg-purple-500 rounded-full" />
                <div className="absolute top-28 left-44 w-2 h-2 bg-orange-300 rounded-full" /> */}

                <div className="absolute top-20 right-20 w-2 h-2 bg-purple-400 rounded-full" />
                <div className="absolute top-24 right-32 w-2 h-2 bg-yellow-400 rounded-full" />

                {/* <div className="absolute bottom-32 left-52 w-3 h-3 bg-purple-400 rounded-full" />
                <div className="absolute bottom-28 left-48 w-2 h-2 bg-orange-400 rounded-full" /> */}
                <div className="absolute bottom-32 right-52 w-3 h-3 bg-yellow-400 rounded-full" />
                <div className="absolute bottom-28 right-48 w-2 h-2 bg-purple-400 rounded-full" />
                </div>

                {/* Mobile Logo */}
                <div className="lg:hidden absolute top-8 left-8 z-10">
                    <img src={LogoBiru} alt="LogoBiru" className="w-14 h-auto" />
                </div>
                <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                <Card className="w-96 shadow-2xl border-0">
                <CardContent className="p-8">
                    <div className="mb-8">
                    <h1 className="text-3xl font-bold text-yellow-500 text-center mb-2">
                        Register
                    </h1>
                    </div>

                    <div className="space-y-6">
                    {/* Username */}
                    <div className="space-y-2">
                        <Label htmlFor="username" className="text-sm text-gray-600">
                        Username
                        </Label>
                        <Input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="h-11 border-gray-300 focus:border-yellow-500 focus:ring-yellow-500"
                        placeholder=""
                        />
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-sm text-gray-600">
                        Password
                        </Label>
                        <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="h-11 border-gray-300 focus:border-yellow-500 focus:ring-yellow-500"
                        placeholder=""
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="username" className="text-sm text-gray-600">
                        NIK
                        </Label>
                        <Input
                        id="nik"
                        type="text"
                        value={nik}
                        onChange={(e) => setNik(e.target.value)}
                        className="h-11 border-gray-300 focus:border-yellow-500 focus:ring-yellow-500"
                        placeholder=""
                        />
                    </div>

                    {/* Login Button */}
                    <Button
                        onClick={handleRegister}
                        className="w-full h-12 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold text-base rounded-md shadow-md transition-all duration-300"
                    >
                        Sign up!
                    </Button>
                    <div className="text-center mt-4">
                        <p className="text-sm text-gray-600">
                            Sudah punya akun?{" "}
                            <button
                                onClick={() => navigate("/recruitment/login")}
                                className="text-yellow-500 font-semibold hover:text-yellow-600 transition"
                            >
                                Klik disini
                            </button>
                        </p>
                    </div>
                    </div>
                </CardContent>
                </Card>
            </div>

            {/* Mobile Login Card */}
            <div className="lg:hidden absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-6">
                <Card className="w-full max-w-md mx-auto shadow-2xl border-0">
                <CardContent className="p-8">
                    <div className="mb-8">
                    <h1 className="text-3xl font-bold text-yellow-500 text-center mb-2">
                        Sign up
                    </h1>
                    </div>

                    <div className="space-y-6">
                    {/* Username */}
                    <div className="space-y-2">
                        <Label
                        htmlFor="username-mobile"
                        className="text-sm text-gray-600"
                        >
                        Username
                        </Label>
                        <Input
                        id="username-mobile"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="h-11 border-gray-300 focus:border-yellow-500 focus:ring-yellow-500"
                        placeholder=""
                        />
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                        <Label
                        htmlFor="password-mobile"
                        className="text-sm text-gray-600"
                        >
                        Password
                        </Label>
                        <Input
                        id="password-mobile"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="h-11 border-gray-300 focus:border-yellow-500 focus:ring-yellow-500"
                        placeholder=""
                        />
                    </div>

                    <div className="space-y-2">
                        <Label
                        htmlFor="nik-mobile"
                        className="text-sm text-gray-600"
                        >
                        NIK
                        </Label>
                        <Input
                        id="nik-mobile"
                        type="text"
                        value={nik}
                        onChange={(e) => setNik(e.target.value)}
                        className="h-11 border-gray-300 focus:border-yellow-500 focus:ring-yellow-500"
                        placeholder=""
                        />
                    </div>

                    {/* Login Button */}
                    <Button
                        onClick={handleRegister}
                        className="w-full h-12 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold text-base rounded-md shadow-md transition-all duration-300"
                    >
                        Sign Up!
                    </Button>
                    <div className="text-center mt-4">
                        <p className="text-sm text-gray-600">
                            Sudah punya akun?{" "}
                            <button
                                onClick={() => navigate("/talent")}
                                className="text-yellow-400 font-semibold hover:text-yellow-600 transition"
                            >
                                Klik disini
                            </button>
                        </p>
                    </div>
                    </div>
                </CardContent>
                </Card>
            </div>
            </div>
        </div>
    );
}
