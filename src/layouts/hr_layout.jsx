import React from "react";
import SidebarHR from "../features/hr/components/Sidebar-Hr";
import TopbarHR from "../features/hr/components/Topbar-Hr";

export default function HrLayout({ children }) {
    return (
        <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar (fixed) */}
        <SidebarHR />

        {/* Main content (shifted by sidebar width) */}
        <div className="flex-1 flex flex-col pl-64">
            <TopbarHR />
            <main className="">{children}</main>
        </div>
        </div>
    );
}

