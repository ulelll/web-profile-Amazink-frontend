import React from "react";
import Sidebar from "../features/admin/components/Sidebar";
import Topbar from "../features/admin/components/Topbar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar (fixed) */}
      <Sidebar />

      {/* Main content (shifted by sidebar width) */}
      <div className="flex-1 flex flex-col pl-64">
        <Topbar />
        <main className="">{children}</main>
      </div>
    </div>
  );
}

