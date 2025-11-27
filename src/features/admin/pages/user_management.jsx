import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Trash2, Filter } from 'lucide-react';
import AdminLayout from '@/layouts/Admin_Layout';

export default function UserManagementPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterRole, setFilterRole] = useState('All');
    const [filterStatus, setFilterStatus] = useState('All');
    const [users, setUsers] = useState([
        { id: 1, name: 'Masayoshi Takanaka', role: 'Talent', status: 'Active' },
        { id: 2, name: 'John Doe', role: 'Admin', status: 'Active' },
        { id: 3, name: 'Jane Smith', role: 'Talent', status: 'Inactive' },
        { id: 4, name: 'Bob Wilson', role: 'Manager', status: 'Active' },
        { id: 5, name: 'Alice Brown', role: 'Talent', status: 'Active' },
        { id: 6, name: 'Charlie Davis', role: 'Admin', status: 'Inactive' },
    ]);

    const handleDelete = (id) => {
        setUsers(users.filter(user => user.id !== id));
    };

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            user.role.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRole = filterRole === 'All' || user.role === filterRole;
        const matchesStatus = filterStatus === 'All' || user.status === filterStatus;
        
        return matchesSearch && matchesRole && matchesStatus;
    });

    const roles = ['All', ...new Set(users.map(user => user.role))];
    const statuses = ['All', 'Active', 'Inactive'];

    return (
        <AdminLayout>
        <div className="min-h-screen bg-gray-50 p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">management users</h1>

            {/* Search Bar and Filters */}
            <div className="mb-6 flex flex-wrap gap-4 items-center">
            <Input
                type="text"
                placeholder="search user"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-md"
            />
            
            <div className="flex gap-4 items-center">
                <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-600" />
                <select
                    value={filterRole}
                    onChange={(e) => setFilterRole(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {roles.map(role => (
                    <option key={role} value={role}>{role}</option>
                    ))}
                </select>
                </div>

                <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                {statuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                ))}
                </select>

                {(filterRole !== 'All' || filterStatus !== 'All') && (
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                    setFilterRole('All');
                    setFilterStatus('All');
                    }}
                >
                    Clear Filters
                </Button>
                )}
            </div>
            </div>

            {/* Table */}
            <Card>
            <CardContent className="p-0">
                <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                    <tr className="border-b bg-gray-50">
                        <th className="text-left py-4 px-6 font-semibold text-gray-700">no</th>
                        <th className="text-left py-4 px-6 font-semibold text-gray-700">Name</th>
                        <th className="text-left py-4 px-6 font-semibold text-gray-700">Role</th>
                        <th className="text-left py-4 px-6 font-semibold text-gray-700">Status</th>
                        <th className="text-left py-4 px-6 font-semibold text-gray-700">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredUsers.map((user, index) => (
                        <tr key={user.id} className="border-b hover:bg-gray-50">
                        <td className="py-4 px-6 font-medium">{index + 1}</td>
                        <td className="py-4 px-6">{user.name}</td>
                        <td className="py-4 px-6">{user.role}</td>
                        <td className="py-4 px-6">{user.status}</td>
                        <td className="py-4 px-6">
                            <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(user.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                            <Trash2 className="w-4 h-4" />
                            </Button>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>
            </CardContent>
            </Card>
        </div>
        </AdminLayout>
    );
}