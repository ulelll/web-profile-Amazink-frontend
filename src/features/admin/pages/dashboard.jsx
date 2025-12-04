import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Briefcase, UserCheck, TrendingUp, Activity, Clock } from 'lucide-react';
import AdminLayout from '@/layouts/Admin_Layout';

export default function Dashboard() {
  const stats = [
    {
      title: 'Total Users',
      value: '120',
      change: '+12%',
      trend: 'up',
      icon: Users,
      color: 'blue',
      bgColor: 'bg-blue-500',
      lightBg: 'bg-blue-50',
      description: 'Active users'
    },
    {
      title: 'Active Vacancies',
      value: '12',
      change: '+3',
      trend: 'up',
      icon: Briefcase,
      color: 'green',
      bgColor: 'bg-green-500',
      lightBg: 'bg-green-50',
      description: 'Open positions'
    },
    {
      title: 'Total Applicants',
      value: '85',
      change: '+8%',
      trend: 'up',
      icon: UserCheck,
      color: 'purple',
      bgColor: 'bg-purple-500',
      lightBg: 'bg-purple-50',
      description: 'This month'
    }
  ];

  const recentActivity = [
    { action: 'New application received', time: '5 minutes ago', type: 'applicant' },
    { action: 'New vacancy posted', time: '2 hours ago', type: 'vacancy' },
    { action: 'User registered', time: '3 hours ago', type: 'user' },
    { action: 'Application approved', time: '5 hours ago', type: 'applicant' }
  ];

  const quickStats = [
    { label: 'Pending Reviews', value: '23', color: 'text-orange-600' },
    { label: 'Interviews Scheduled', value: '8', color: 'text-blue-600' },
    { label: 'New Messages', value: '15', color: 'text-green-600' }
  ];

  return (
    <AdminLayout>
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome, Admin 👋
          </h1>
          <p className="text-gray-600 text-lg">
            Here's what's happening with your platform today
          </p>
        </div>

        {/* Main Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card 
                key={index} 
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                <CardContent className="p-0">
                  <div className={`h-2 ${stat.bgColor}`}></div>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 ${stat.lightBg} rounded-xl`}>
                        <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                      </div>
                      <span className={`text-sm font-semibold px-2 py-1 rounded-full ${stat.lightBg} text-${stat.color}-700`}>
                        {stat.change}
                      </span>
                    </div>
                    
                    <h3 className="text-gray-600 text-sm font-medium mb-1">
                      {stat.title}
                    </h3>
                    <div className="flex items-end justify-between">
                      <p className="text-3xl font-bold text-gray-900">
                        {stat.value}
                      </p>
                      <p className="text-xs text-gray-500">
                        {stat.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Secondary Stats and Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Quick Stats */}
          <Card className="border-0 shadow-lg lg:col-span-1">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Activity className="w-5 h-5 text-gray-700" />
                <h3 className="text-lg font-semibold text-gray-900">Quick Stats</h3>
              </div>
              <div className="space-y-4">
                {quickStats.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">{item.label}</span>
                    <span className={`text-xl font-bold ${item.color}`}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="border-0 shadow-lg lg:col-span-2">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-gray-700" />
                <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
              </div>
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div 
                    key={index} 
                    className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-lg border border-gray-100 hover:border-gray-200 transition-colors"
                  >
                    <div className={`w-2 h-2 rounded-full ${
                      activity.type === 'applicant' ? 'bg-purple-500' :
                      activity.type === 'vacancy' ? 'bg-green-500' : 'bg-blue-500'
                    }`}></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.action}
                      </p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Chart Placeholder */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-gray-700" />
                <h3 className="text-lg font-semibold text-gray-900">Overview</h3>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Week
                </button>
                <button className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
                  Month
                </button>
                <button className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
                  Year
                </button>
              </div>
            </div>
            
            {/* Placeholder for chart */}
            <div className="h-64 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
              <div className="text-center">
                <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500 font-medium">Chart visualization area</p>
                <p className="text-gray-400 text-sm">Analytics data will be displayed here</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    </AdminLayout>
  );
}