import { Home, FileText, Users, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function SidebarHR() {
    const [vacancyOpen, setVacancyOpen] = useState(false);

    const menu = [
        { label: "Dashboard", icon: <Home size={20} />, path: "/hr" },
        { 
        label: "Vacancies", 
        icon: <FileText size={20} />, 
        path: "/admin/vacancies",
        submenu: [
            { label: "Buat Lowongan", path: "/hr/vacancies/create-vacancy" },
            { label: "Atur Lowongan", path: "/hr/vacancies/manage-vacancies" },
            { label: "Pelamar", path: "/hr/vacancies/applicants" },
        ]
        },
        { label: "Tambah Hr", icon: <Users size={20} />, path: "/hr/create-hr" },
    ];

    return (
        <div className="fixed left-0 top-0 h-screen w-64 bg-orange-400 flex flex-col overflow-hidden">
        {/* Logo Section */}
        <div className="p-6 flex items-center justify-center border-b border-orange-500">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
            <div className="flex flex-col items-center gap-0.5">
                <div className="flex gap-0.5">
                <div className="w-1 h-3 bg-blue-700 rounded-full"></div>
                <div className="w-1 h-4 bg-blue-700 rounded-full"></div>
                <div className="w-1 h-5 bg-blue-700 rounded-full"></div>
                <div className="w-1 h-4 bg-blue-700 rounded-full"></div> 
                <div className="w-1 h-3 bg-blue-700 rounded-full"></div>
                </div>
                <div className="w-10 h-1 bg-blue-700 rounded-full mt-1"></div>
            </div>
            </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
            <div className="flex flex-col gap-1">
            {menu.map((item) => (
                <div key={item.path}>
                {item.submenu ? (
                    <>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        onClick={() => setVacancyOpen(!vacancyOpen)}
                        className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg text-white hover:bg-orange-500 transition cursor-pointer"
                    >
                        <div className="flex items-center gap-3">
                        {item.icon}
                        <span className="text-base">{item.label}</span>
                        </div>
                        <ChevronDown 
                        size={16} 
                        className={`transform transition-transform ${vacancyOpen ? 'rotate-180' : ''}`}
                        />
                    </motion.button>
                    
                    {vacancyOpen && (
                        <div className="ml-4 mt-1 space-y-1">
                        {item.submenu.map((subItem) => (
                            <motion.a
                            key={subItem.path}
                            href={subItem.path}
                            whileHover={{ scale: 1.02 }}
                            className="block px-4 py-2 rounded-lg text-white text-sm hover:bg-orange-500 transition cursor-pointer"
                            >
                            {subItem.label}
                            </motion.a>
                        ))}
                        </div>
                    )}
                    </>
                ) : (
                    <motion.a
                    href={item.path}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-orange-500 transition cursor-pointer"
                    >
                    {item.icon}
                    <span className="text-base">{item.label}</span>
                    </motion.a>
                )}
                </div>
            ))}
            </div>
        </nav>
        </div>
    );
}