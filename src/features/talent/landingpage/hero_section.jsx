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

  const images = [Levi, Levi, Levi, Levi, Levi];

  return (
    <div className="bg-gradient-to-br from-blue-900 via-blue-600 to-indigo-300 min-h-screen flex items-center relative overflow-hidden pt-20 pb-20">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-blue-500 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-1/4 -left-1/4 w-96 h-96 bg-indigo-500 rounded-full opacity-20 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Center content */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-4 sm:mb-6">
            Bergabung dengan{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">
              Amazink People Group
            </span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-blue-100 mb-8 sm:mb-10">
            Langkah besar kamu selanjutnya dimulai di sini.
          </p>

          <button
            onClick={() => navigate("/recruitment/vacancies")}
            className="group relative px-8 py-4 text-base sm:text-lg font-semibold text-blue-900 bg-white rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl active:scale-95"
          >
            {/* Glow effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl bg-white"></div>

            {/* Button content */}
            <span className="relative flex items-center justify-center gap-2">
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              Cari Lowongan
              <svg
                className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </span>
          </button>
        </div>

        {/* Stacked Images - Horizontal Layout */}
        <div className="relative flex justify-center items-end h-64 sm:h-80 md:h-96 lg:h-[450px] max-w-6xl mx-auto gap-2 sm:gap-3 md:gap-4 ">
          {images.map((image, index) => {
            const totalImages = images.length;
            const middleIndex = Math.floor(totalImages / 2);
            const offset = index - middleIndex;

            return (
              <div
                key={index}
                className="transition-all duration-500 hover:scale-105 hover:-translate-y-4 hover:z-50 cursor-pointer group"
                style={{
                  transform: `
                    rotate(${offset * 3}deg) 
                    translateY(${Math.abs(offset) * 8}px)
                  `,
                  zIndex: totalImages - Math.abs(offset),
                }}
              >
                <div className="relative rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden w-32 sm:w-40 md:w-48 lg:w-56 border-4 border-gray-800/80 bg-gray-800/80">
                  {/* Image container */}
                  <div className="relative w-full aspect-[3/4] overflow-hidden">
                    <img
                      src={image}
                      alt={`Team member ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
