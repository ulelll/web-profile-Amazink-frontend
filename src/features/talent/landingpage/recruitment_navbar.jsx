import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ChevronDown, User, LogOut } from "lucide-react";

import logoAmazinkBlue from "../../../assets/amazink_logo_blue.svg";

const API_BASE_URL = "http://localhost:8000";

const Button = ({
  variant = "default",
  size = "default",
  className = "",
  children,
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-lg text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

  const sizeClasses = {
    default: "h-10 px-5 py-2",
    sm: "h-9 rounded-md px-4",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10",
  };

  const variantClasses = {
    default:
      "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-lg",
    outline:
      "border-2 border-blue-600 bg-white text-blue-600 hover:bg-blue-50 hover:border-blue-700",
    ghost: "hover:bg-gray-100 text-gray-700",
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

const RecruitmentNavbar = () => {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const fetchUser = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setUser(null);
      return;
    }

    try {
      const res = await axios.get(`${API_BASE_URL}/api/v1/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
    } catch {
      localStorage.removeItem("access_token");
      localStorage.removeItem("role");
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUser();

    const handleStorage = () => fetchUser();
    window.addEventListener("storage", handleStorage);

    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 10) {
        // Always show navbar at the top
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down - hide navbar
        setIsVisible(false);
        setOpen(false); // Close dropdown when hiding
      } else {
        // Scrolling up - show navbar
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("role");
    setUser(null);
    navigate("/login");
  };

  return (
    <header
      className={`fixed top-0 z-50 w-full border-b border-gray-200 bg-white backdrop-blur-lg shadow-sm transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        {/* Logo */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center transition-transform hover:scale-105 active:scale-95"
          aria-label="Amazink People Group"
        >
          <img src={logoAmazinkBlue} alt="Logo" className="h-14 w-auto" />
        </button>
        
        {/* Right Side */}
        <div className="flex items-center gap-3 relative" ref={dropdownRef}>
          {!user ? (
            <>
              <Button variant="ghost" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button
                variant="default"
                onClick={() => navigate("/recruitment/register")}
              >
                Register
              </Button>
            </>
          ) : (
            <>
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-all duration-200 group"
              >
                <div className="relative">
                  <img
                    src={
                      user.avatar ||
                      `https://ui-avatars.com/api/?name=${user.username}&background=2563eb&color=fff`
                    }
                    className="h-9 w-9 rounded-full object-cover ring-2 ring-gray-200 group-hover:ring-blue-400 transition-all"
                    alt="Avatar"
                  />
                  <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <span className="text-sm font-medium text-gray-700 hidden sm:block">
                  {user.username}
                </span>
                <ChevronDown
                  className={`h-4 w-4 text-gray-500 transition-transform duration-200 hidden sm:block ${
                    open ? "rotate-180" : ""
                  }`}
                />
              </button>

              {open && (
                <div className="absolute right-0 top-14 w-56 bg-white border border-gray-200 rounded-xl shadow-xl py-1 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-900">
                      {user.username}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {user.email || "User Account"}
                    </p>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => {
                        navigate("/profile");
                        setOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                    >
                      <User className="h-4 w-4" />
                      <span>Profile</span>
                    </button>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default RecruitmentNavbar;
