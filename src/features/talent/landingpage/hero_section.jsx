import React from "react";
import Levi from "../../../assets/levi.png";
import { useNavigate } from "react-router-dom";

// Reusable Button
const Button = ({
    variant = "default",
    size = "default",
    className = "",
    children,
    ...props
    }) => {
    const baseClasses =
        "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 shadow-sm";

    const sizeClasses = {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
    };

    const variantClasses = {
        default: "bg-blue-600 text-white hover:bg-blue-700",
        outline: "border border-blue-600 bg-white text-blue-600 hover:bg-blue-50",
        ghost: "hover:bg-gray-100",
    };

    return (
        <button
        className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
        {...props}
        >
        {children}
        </button>
    );
    };

    const HeroSection = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-white min-h-[calc(100vh-64px)] flex items-center pt-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
          {/* left section */}
                        <div className="py-12 lg:py-24 max-w-lg lg:max-w-none">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
                            Bergabung dengan{" "}
                            <span className="text-blue-600">Amazink People Group</span>
                        </h1>

                        <p className="mt-4 text-xl text-gray-600">
                            Langkah besar kamu selanjutnya dimulai di sini.
                        </p>

                        <div className="mt-8">
                            <Button
                            variant="default"
                            size="lg"
                            className="shadow-lg hover:shadow-xl transition-shadow"
                            onClick={() => navigate("/recruitment/vacancies")}
                            >
                            Cari Lowongan
                            </Button>
                        </div>
                        </div>

                        {/* Right Image */}
            <div className="hidden lg:flex justify-end items-end relative min-h-[500px]">
            <img
                src={Levi}
                alt="Recruitment Character"
                className="w-full max-w-xs xl:max-w-sm h-auto"
            />
            </div>
        </div>
        </div>
    );
};

export default HeroSection;
