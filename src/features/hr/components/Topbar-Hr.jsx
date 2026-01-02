import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, LogOut, User } from "lucide-react";
import api from "@/lib/api";
import { logout } from "@/lib/auth";

const TopbarHR = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchMe = async () => {
            try {
                const res = await api.get("/auth/me");
                setUser(res.data);
            } catch (error) {
                // Token invalid / expired → handled by interceptor
                setUser(null);
            }
        };

        fetchMe();
    }, []);

    const handleLogout = () => {
        logout();
        navigate("/login", { replace: true });
    };

    return (
        <div className="w-full h-20 border-b bg-white flex items-center justify-between px-10">
            {/* LEFT */}
            <div className="font-medium text-lg"></div>

            {/* RIGHT */}
            <div className="flex items-center gap-4">
                {/* Notification */}
                <button className="relative">
                    <Bell className="w-6 h-6 text-gray-600" />
                    <span className="w-2 h-2 bg-red-500 rounded-full absolute top-0 right-0"></span>
                </button>

                {/* User */}
                {user && (
                    <DropdownMenu>
                        <DropdownMenuTrigger className="flex items-center gap-3 focus:outline-none">
                            <span className="text-sm font-medium text-gray-700 hidden sm:block">
                                {user.username}
                            </span>
                            <Avatar className="w-9 h-9">
                                <AvatarImage
                                    src={`https://ui-avatars.com/api/?name=${user.username}&background=2563eb&color=fff`}
                                />
                                <AvatarFallback>
                                    {user.username?.slice(0, 2).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                    </DropdownMenu>
                )}
            </div>
        </div>
    );
};

export default TopbarHR;
