import React from 'react';
import { useNavigate } from 'react-router-dom';

// --- Assets ---
import logoAmazinkBlue from "../../../assets/amazink_logo_blue.svg";

// --- Button Component ---
const Button = ({ variant = 'default', size = 'default', className = '', children, ...props }) => {
    const baseClasses =
        'inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 shadow-sm';

    const sizeClasses = {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
    };

    const variantClasses = {
        default: 'bg-blue-600 text-white hover:bg-blue-700',
        outline: 'border border-blue-600 bg-white text-blue-600 hover:bg-blue-50',
        ghost: 'hover:bg-gray-100',
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
    const companyName = "Amazink People Group";

    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
                
                <a href="#" className="flex items-center space-x-2" aria-label={companyName}>
                    <img
                        src={logoAmazinkBlue}
                        alt="Amazink People Group Logo"
                        className="h-14 w-auto"
                    />
                </a>

                <div className="flex items-center space-x-3">
                    <Button
                        variant="outline"
                        onClick={() => navigate("/recruitment/login")}
                    >
                        Login
                    </Button>

                    <Button
                        variant="default"
                        onClick={() => navigate("/recruitment/register")}
                    >
                        Register
                    </Button>
                </div>
            </div>
        </header>
    );
};

export default RecruitmentNavbar;
