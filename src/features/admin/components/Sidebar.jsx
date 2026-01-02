import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, FileText, Home, Settings, Users, Shield, Package, Clock, MapPin, Truck, LogOut } from "lucide-react";
import { useState } from "react";import { logout } from '../../../lib/auth';
import { useNavigate } from "react-router-dom";


export default function SidebarHR() {
    const [openMenus, setOpenMenus] = useState({});

    const toggleMenu = (label) => {
        setOpenMenus(prev => ({
            ...prev,
            [label]: !prev[label]
        }));
    };

    const navigate = useNavigate();
    const handleLogout = () => {
        logout();                 
        navigate("/login", {       
            replace: true
        });
    };

    const menu = [
        { label: "Dashboard", icon: <Home size={18} />, path: "/admin" },
        { label: "Users", icon: <Users size={18} />, path: "/admin/users" },
        {
            label: "CMS",
            icon: <FileText size={18} />,
            path: "/admin/cms",
            submenu: [
                { label: "Header Landing Page", path: "/admin/cms/header" },
                { label: "Visi- Misi", path: "/admin/cms/visi-misi" },
                { label: "News", path: "/admin/cms/news" },
            ]
        },
    ];

    return (
        <div className="fixed left-0 top-0 h-screen w-64 bg-white flex flex-col shadow-lg border-r border-gray-200">
            {/* Logo Section */}
            <div className="p-5 flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-md">
                    <img src="/amazink_logo_blue.svg" alt="Amazink" className="w-6 h-6" />
                </div>
                <span className="text-xl font-bold text-gray-800">Amazink Admin</span>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-2 overflow-y-auto">
                <div className="flex flex-col gap-0.5">
                    {menu.map((item, index) => (
                        <div key={item.path}>
                            {item.submenu ? (
                                <>
                                    <motion.button
                                        whileHover={{ x: 2 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => toggleMenu(item.label)}
                                        className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                                            openMenus[item.label]
                                                ? 'bg-blue-50 text-blue-600' 
                                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                        }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            {item.icon}
                                            <span className="text-sm font-medium">{item.label}</span>
                                        </div>
                                        <motion.div
                                            animate={{ rotate: openMenus[item.label] ? 180 : 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <ChevronDown size={16} />
                                        </motion.div>
                                    </motion.button>

                                    <AnimatePresence>
                                        {openMenus[item.label] && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.2 }}
                                                className="ml-2 mt-0.5 space-y-0.5 overflow-hidden"
                                            >
                                                {item.submenu.map((subItem) => (
                                                    <motion.a
                                                        key={subItem.path}
                                                        href={subItem.path}
                                                        whileHover={{ x: 2 }}
                                                        whileTap={{ scale: 0.98 }}
                                                        className="block pl-9 pr-3 py-2 rounded-lg text-gray-600 text-sm hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                                                    >
                                                        {subItem.label}
                                                    </motion.a>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </>
                            ) : (
                                <motion.a
                                    href={item.path}
                                    whileHover={{ x: 2 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                                >
                                    {item.icon}
                                    <span className="text-sm font-medium">{item.label}</span>
                                </motion.a>
                            )}
                        </div>
                    ))}
                </div>
            </nav>

            {/* Logout Button */}
            <div className="p-3 border-t border-gray-200">
                <motion.button
                    onClick={handleLogout}
                    whileHover={{ x: 2 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition-all duration-200"
                >
                    <LogOut size={18} />
                    <span className="text-sm font-medium">Logout</span>
                </motion.button>
            </div>
        </div>
    );
}