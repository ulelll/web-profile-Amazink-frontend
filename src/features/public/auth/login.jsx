import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import poce from "@/assets/poce.jpg";
import Logo from "@/assets/amazink_logo_white.svg";
import LogoBiru from "@/assets/amazink_logo_blue.svg";

const API_BASE_URL = "http://localhost:8000";

const decodeJWT = (token) => {
    try {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        return JSON.parse(atob(base64));
    } catch {
        return null;
    }
};


export default function TalentLoginPage() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState(""); 
    const params = new URLSearchParams(window.location.search);
    const next = params.get("next");

const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    setMessageType("");

    try {
        const body = new URLSearchParams();
        body.append("username", username);
        body.append("password", password);

        const res = await axios.post(
        `${API_BASE_URL}/api/v1/auth/login`,
        body,
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        );

        const token = res.data?.access_token;
        if (!token) throw new Error("NO_TOKEN");

        const payload = decodeJWT(token);
        if (!payload?.role) throw new Error("NO_ROLE");

        localStorage.setItem("access_token", token);
        localStorage.setItem("role", payload.role);

        setMessage("Login berhasil");
        setMessageType("success");

        const next = new URLSearchParams(window.location.search).get("next");

        setTimeout(() => {
        if (next) return navigate(next);

        if (payload.role === "talent") navigate("/recruitment/vacancies");
        else if (payload.role === "admin") navigate("/admin");
        else if (payload.role === "hr") navigate("/hr");
        else navigate("/login");
        }, 600);

    } catch (err) {
        console.error("LOGIN ERROR:", err);

        let msg = "Terjadi kesalahan. Coba lagi.";
        if (err.response?.status === 400 || err.response?.status === 401) {
        msg = "Username atau password salah";
        }

        setMessage(msg);
        setMessageType("error");

        localStorage.removeItem("access_token");
        localStorage.removeItem("role");

    } finally {
        setIsLoading(false);
    }
};




    return (
        <div className="min-h-screen flex relative overflow-hidden">
            {/* Left Side */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-blue-300 via-blue-400 to-blue-500 items-center justify-center p-12">
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
                    <h2 className="text-white text-3xl font-bold mb-2">
                        Selamat Datang Kembali
                    </h2>
                    <p className="text-white/90 text-sm">Login untuk akses akun</p>
                </div>
            </div>

            {/* Right Side */}
            <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-6 relative">

                {/* Mobile Logo */}
                <div className="lg:hidden absolute top-8 left-8 z-10">
                    <img src={LogoBiru} alt="LogoBiru" className="w-14 h-auto" />
                </div>

                {/* Desktop Card */}
                <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                    <Card className="w-96 shadow-2xl border-0">
                        <CardContent className="p-8">
                            <h1 className="text-3xl font-bold text-blue-600 text-center mb-8">
                                Login
                            </h1>

                            {message && (
                                <div className={`mb-4 border px-4 py-2 rounded ${messageType === "success" ? "bg-green-100 border-green-400 text-green-700" : "bg-red-100 border-red-400 text-red-700"}`}>
                                    <div className="flex justify-between items-center">
                                        <div className="text-sm">{message}</div>
                                        <button onClick={() => { setMessage(""); setMessageType(""); }} className="ml-4 text-sm font-semibold">×</button>
                                    </div>
                                </div>
                            )}
                            <form onSubmit={handleLogin} className="space-y-6">
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
                                        required
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
                                        required
                                    />
                                </div>

                                {/* Login Button */}
                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base rounded-md shadow-md transition-all duration-300"
                                >
                                    {isLoading ? "Logging in..." : "Log in!"}
                                </Button>

                                <p className="text-center text-sm text-gray-600">
                                    Belum punya akun?{" "}
                                    <button
                                        type="button"
                                        onClick={() => navigate("/recruitment/register")}
                                        className="text-blue-600 font-semibold hover:text-blue-700"
                                    >
                                        Klik disini
                                    </button>
                                </p>
                            </form>
                        </CardContent>
                    </Card>
                </div>

                {/* Mobile Card */}
                <div className="lg:hidden absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-6">
                    <Card className="w-full max-w-md mx-auto shadow-2xl border-0">
                        <CardContent className="p-8">
                            <h1 className="text-3xl font-bold text-blue-600 text-center mb-8">
                                Login
                            </h1>

                            {message && (
                                <div className={`mb-4 border px-4 py-2 rounded ${messageType === "success" ? "bg-green-100 border-green-400 text-green-700" : "bg-red-100 border-red-400 text-red-700"}`}>
                                    <div className="flex justify-between items-center">
                                        <div className="text-sm">{message}</div>
                                        <button onClick={() => { setMessage(""); setMessageType(""); }} className="ml-4 text-sm font-semibold">×</button>
                                    </div>
                                </div>
                            )}
                            <form onSubmit={handleLogin} className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="username-mobile" className="text-sm text-gray-600">
                                        Username
                                    </Label>
                                    <Input
                                        id="username-mobile"
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password-mobile" className="text-sm text-gray-600">
                                        Password
                                    </Label>
                                    <Input
                                        id="password-mobile"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base rounded-md shadow-md transition-all duration-300"
                                >
                                    {isLoading ? "Logging in..." : "Log in!"}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
