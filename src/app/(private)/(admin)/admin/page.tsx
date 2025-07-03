'use client';
import React, { useState, useEffect } from 'react';
import { fetchAllUsers } from '@/actions/user';
import { getNotifications } from '@/actions/notification';
import { Users, Bell, Settings, AlertCircle, BarChart2 } from 'lucide-react';
import Link from 'next/link';
// import { Metadata } from 'next';

// export const metadata: Metadata = {
//   metadataBase: new URL(process.env.APP_URL || 'http://localhost:3000'),
//   title: 'Admin Dashboard | Arkin Organics',
//   description: 'Central hub for managing users, notifications, and settings for Arkin Organics.',
// };

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

interface Notification {
  _id: string;
  type: 'order' | 'stock' | 'delivery' | 'promotion' | 'customer' | 'analytics';
  title: string;
  message: string;
  priority: 'low' | 'medium' | 'high';
  actionRequired: boolean;
  read: boolean;
  time: string;
}

const AdminHome: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [userResult, notificationResult] = await Promise.all([
          fetchAllUsers(),
          getNotifications(),
        ]);

        if (userResult.success && userResult.data) {
          setUsers(userResult.data);
        } else {
          setError(userResult.error || 'Failed to load users');
        }

        if (notificationResult.success && notificationResult.data) {
          setNotifications(notificationResult.data);
        } else {
          setError((prev) => prev || notificationResult.error || 'Failed to load notifications');
        }
      } catch (err) {
          console.log(err);
        setError('An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const unreadNotifications = notifications.filter((n) => !n.read).length;
  const priorityNotifications = notifications.filter((n) => n.priority === 'high' || n.actionRequired).length;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900">Arkin Organics</h2>
          <p className="text-sm text-gray-500 mt-1">Admin Dashboard</p>
        </div>
        <nav className="mt-6">
          <Link
            href="/admin/users"
            className="flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors"
          >
            <Users size={20} />
            Users
          </Link>
          <Link
            href="/admin/notifications"
            className="flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors"
          >
            <Bell size={20} />
            Notifications
          </Link>
          <Link
            href="/admin/settings"
            className="flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors"
          >
            <Settings size={20} />
            Settings
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>

          {error && (
            <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg flex items-center">
              <AlertCircle className="mr-2" size={20} />
              {error}
            </div>
          )}

          {loading ? (
            <div className="text-center p-8 text-gray-500">Loading...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Users Card */}
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <Users className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Total Users</h3>
                    <p className="text-2xl font-bold text-gray-700">{users.length}</p>
                    <Link
                      href="/admin/users"
                      className="text-sm text-blue-600 hover:underline mt-2 block"
                    >
                      Manage Users
                    </Link>
                  </div>
                </div>
              </div>

              {/* Notifications Card */}
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-100 rounded-full">
                    <Bell className="text-green-600" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                    <p className="text-2xl font-bold text-gray-700">{notifications.length}</p>
                    <p className="text-sm text-gray-500">
                      {unreadNotifications} Unread, {priorityNotifications} Priority
                    </p>
                    <Link
                      href="/admin/notifications"
                      className="text-sm text-green-600 hover:underline mt-2 block"
                    >
                      View Notifications
                    </Link>
                  </div>
                </div>
              </div>

              {/* Placeholder for Additional Metrics */}
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-100 rounded-full">
                    <BarChart2 className="text-purple-600" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Analytics</h3>
                    <p className="text-sm text-gray-500">Coming soon...</p>
                    <Link
                      href="/admin/analytics"
                      className="text-sm text-purple-600 hover:underline mt-2 block"
                    >
                      View Analytics
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Recent Activity Section */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Notifications</h2>
            {notifications.length === 0 ? (
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 text-center text-gray-500">
                No recent notifications
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                <table className="w-full table-auto">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="p-4 text-left text-sm font-semibold text-gray-600">Type</th>
                      <th className="p-4 text-left text-sm font-semibold text-gray-600">Title</th>
                      <th className="p-4 text-left text-sm font-semibold text-gray-600">Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {notifications.slice(0, 5).map((notification) => (
                      <tr key={notification._id} className="hover:bg-gray-50">
                        <td className="p-4 text-sm text-gray-900">{notification.type}</td>
                        <td className="p-4 text-sm text-gray-900">{notification.title}</td>
                        <td className="p-4 text-sm text-gray-600">
                          {new Date(notification.time).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminHome;