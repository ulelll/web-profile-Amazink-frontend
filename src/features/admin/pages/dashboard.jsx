import React from "react";
import AdminLayout from "../../../layouts/Admin_Layout";

export default function Dashboard() {
    return (
        <AdminLayout>
        <h1 className="text-3xl font-bold mb-4">Welcome, Admin 👋</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-white shadow rounded-xl">Users: 120</div>
            <div className="p-6 bg-white shadow rounded-xl">Vacancies: 12</div>
            <div className="p-6 bg-white shadow rounded-xl">Applicants: 85</div>
        </div>
        </AdminLayout>
    );
}
