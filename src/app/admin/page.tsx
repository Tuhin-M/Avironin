"use client";

import AdminLayout from '@/components/admin/AdminLayout';
import Link from 'next/link';
import { FileText, PenSquare, Users, BarChart3, TrendingUp, Eye } from 'lucide-react';

const stats = [
  { label: 'Total Essays', value: '12', icon: FileText, color: 'bg-azure' },
  { label: 'Published', value: '8', icon: Eye, color: 'bg-green-500' },
  { label: 'Drafts', value: '4', icon: PenSquare, color: 'bg-yellow-500' },
  { label: 'Total Views', value: '2.4K', icon: TrendingUp, color: 'bg-purple-500' },
];

const quickActions = [
  { label: 'New Essay', href: '/admin/essays/new', icon: PenSquare, description: 'Create a new intelligence essay' },
  { label: 'Manage Essays', href: '/admin/essays', icon: FileText, description: 'View and edit all essays' },
  { label: 'Authors', href: '/admin/authors', icon: Users, description: 'Manage author profiles' },
  { label: 'Analytics', href: '/admin/analytics', icon: BarChart3, description: 'View site analytics' },
];

export default function AdminDashboard() {
  return (
    <AdminLayout title="Dashboard" subtitle="Welcome back! Here's an overview of your content.">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                  <p className="text-3xl font-bold text-charcoal mt-1">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="text-white" size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-charcoal mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.href}
                href={action.href}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:border-azure hover:shadow-md transition-all group"
              >
                <div className="w-10 h-10 bg-azure/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-azure/20 transition-colors">
                  <Icon className="text-azure" size={20} />
                </div>
                <h3 className="font-bold text-charcoal group-hover:text-azure transition-colors">{action.label}</h3>
                <p className="text-sm text-gray-500 mt-1">{action.description}</p>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-bold text-charcoal mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-4 py-3 border-b border-gray-100">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <Eye className="text-green-600" size={18} />
            </div>
            <div className="flex-1">
              <p className="font-medium text-charcoal">Essay Published</p>
              <p className="text-sm text-gray-500">"AI Agents and the Future of SaaS" was published</p>
            </div>
            <span className="text-xs text-gray-400">2 hours ago</span>
          </div>
          <div className="flex items-center space-x-4 py-3 border-b border-gray-100">
            <div className="w-10 h-10 bg-azure/10 rounded-full flex items-center justify-center">
              <PenSquare className="text-azure" size={18} />
            </div>
            <div className="flex-1">
              <p className="font-medium text-charcoal">Draft Created</p>
              <p className="text-sm text-gray-500">New draft "Modular Architecture Patterns" created</p>
            </div>
            <span className="text-xs text-gray-400">5 hours ago</span>
          </div>
          <div className="flex items-center space-x-4 py-3">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <Users className="text-purple-600" size={18} />
            </div>
            <div className="flex-1">
              <p className="font-medium text-charcoal">New Subscriber</p>
              <p className="text-sm text-gray-500">john@example.com subscribed to the newsletter</p>
            </div>
            <span className="text-xs text-gray-400">1 day ago</span>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
