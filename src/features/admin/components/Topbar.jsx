import React from "react"
import { Bell, Search } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const Topbar = () => {
    return (
        <div className="w-full h-20 border-b bg-white flex items-center justify-between px-6">

        {/* LEFT: Breadcrumb */}
        <div className="font-medium text-lg">
           
        </div>

        {/* RIGHT: Search + Notification + User */}
        <div className="flex items-center gap-4">

            {/* Search */}
            <div className="relative">
            <Search className="absolute left-2 top-2.5 w-4 h-4 text-gray-400" />
            <input
                type="text"
                placeholder="Search..."
                className="border rounded-lg pl-8 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-300"
            />
            </div>

            {/* Notification */}
            <button className="relative">
            <Bell className="w-6 h-6 text-gray-600" />
            <span className="w-2 h-2 bg-red-500 rounded-full absolute top-0 right-0"></span>
            </button>

            {/* User Dropdown */}
            <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar className="w-9 h-9 cursor-pointer">
                <AvatarImage src="https://ui-avatars.com/api/?name=Admin" />
                <AvatarFallback>AD</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem className="text-red-500">Logout</DropdownMenuItem>
            </DropdownMenuContent>
            </DropdownMenu>

        </div>
        </div>
    )
}

export default Topbar
