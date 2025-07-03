// app/notifications/page.tsx
'use client';
import React, { useState, useEffect } from 'react';
import { Bell, Package, AlertTriangle, Truck, Tag, Users, TrendingUp, CheckCircle, X } from 'lucide-react';
import { getNotifications, toggleNotificationRead, dismissNotification, markAllAsRead, NotificationOutput } from '@/actions/notification';

interface Notification {
  id: string;
  type: 'order' | 'stock' | 'delivery' | 'promotion' | 'customer' | 'analytics';
  title: string;
  message: string;
  time: string;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
  actionRequired?: boolean;
}

const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState<'all' | 'unread' | 'priority'>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    setLoading(true);
    const result = await getNotifications();
    if (result.success) {
      setNotifications(
        (result.data ?? []).map((n: NotificationOutput) => ({
          id: n._id,
          type: n.type,
          title: n.title,
          message: n.message,
          time: n.time,
          read: n.read,
          priority: n.priority,
          actionRequired: n.actionRequired,
        }))
      );
    }
    setLoading(false);
  };

  const handleToggleRead = async (id: string) => {
    const result = await toggleNotificationRead(id);
    if (result.success) {
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n))
      );
    }
  };

  const handleMarkAllRead = async () => {
    const result = await markAllAsRead();
    if (result.success) {
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    }
  };

  const handleDismiss = async (id: string) => {
    const result = await dismissNotification(id);
    if (result.success) {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }
  };

  const getNotificationIcon = (type: Notification['type']) => {
    const iconProps = { size: 20, className: 'text-white' };
    switch (type) {
      case 'order': return <Package {...iconProps} />;
      case 'stock': return <AlertTriangle {...iconProps} />;
      case 'delivery': return <Truck {...iconProps} />;
      case 'promotion': return <Tag {...iconProps} />;
      case 'customer': return <Users {...iconProps} />;
      case 'analytics': return <TrendingUp {...iconProps} />;
      default: return <Bell {...iconProps} />;
    }
  };

  const getIconBackground = (type: Notification['type'], priority: Notification['priority']) => {
    if (priority === 'high') return 'bg-red-500';
    switch (type) {
      case 'order': return 'bg-blue-500';
      case 'stock': return 'bg-orange-500';
      case 'delivery': return 'bg-green-500';
      case 'promotion': return 'bg-purple-500';
      case 'customer': return 'bg-indigo-500';
      case 'analytics': return 'bg-emerald-500';
      default: return 'bg-gray-500';
    }
  };

  const filteredNotifications = notifications.filter((notification) => {
    switch (filter) {
      case 'unread': return !notification.read;
      case 'priority': return notification.priority === 'high' || notification.actionRequired;
      default: return true;
    }
  });

  const unreadCount = notifications.filter((n) => !n.read).length;
  const priorityCount = notifications.filter((n) => n.priority === 'high' || n.actionRequired).length;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-3 rounded-xl">
                <Bell className="text-green-600" size={24} />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Notifications</h1>
                <p className="text-gray-600 mt-1">Stay updated with your Arkin Organics business</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleMarkAllRead}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
              >
                <CheckCircle size={16} />
                Mark All Read
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Filters</h2>
              <div className="space-y-2">
                <button
                  onClick={() => setFilter('all')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${filter === 'all' ? 'bg-green-50 text-green-700 border border-green-200' : 'text-gray-600 hover:bg-gray-50'
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <span>All Notifications</span>
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                      {notifications.length}
                    </span>
                  </div>
                </button>
                <button
                  onClick={() => setFilter('unread')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${filter === 'unread' ? 'bg-green-50 text-green-700 border border-green-200' : 'text-gray-600 hover:bg-gray-50'
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <span>Unread</span>
                    {unreadCount > 0 && (
                      <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs">
                        {unreadCount}
                      </span>
                    )}
                  </div>
                </button>
                <button
                  onClick={() => setFilter('priority')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${filter === 'priority' ? 'bg-green-50 text-green-700 border border-green-200' : 'text-gray-600 hover:bg-gray-50'
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <span>Priority</span>
                    {priorityCount > 0 && (
                      <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded-full text-xs">
                        {priorityCount}
                      </span>
                    )}
                  </div>
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  {filter === 'all' && `All Notifications (${filteredNotifications.length})`}
                  {filter === 'unread' && `Unread Notifications (${filteredNotifications.length})`}
                  {filter === 'priority' && `Priority Notifications (${filteredNotifications.length})`}
                </h2>
              </div>
              <div className="divide-y divide-gray-100">
                {loading ? (
                  <div className="p-8 text-center">Loading...</div>
                ) : filteredNotifications.length === 0 ? (
                  <div className="p-8 text-center">
                    <Bell className="mx-auto text-gray-400 mb-4" size={48} />
                    <p className="text-gray-500 text-lg">No notifications found</p>
                    <p className="text-gray-400 text-sm mt-2">
                      {filter === 'unread' && 'All notifications have been read'}
                      {filter === 'priority' && 'No priority notifications at this time'}
                      {filter === 'all' && "You're all caught up!"}
                    </p>
                  </div>
                ) : (
                  filteredNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-6 hover:bg-gray-50 transition-colors ${!notification.read ? 'bg-blue-50/30' : ''
                        }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`p-2 rounded-lg ${getIconBackground(notification.type, notification.priority)}`}>
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3
                                  className={`text-sm font-semibold ${notification.read ? 'text-gray-600' : 'text-gray-900'
                                    }`}
                                >
                                  {notification.title}
                                </h3>
                                {notification.actionRequired && (
                                  <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-medium">
                                    Action Required
                                  </span>
                                )}
                                {notification.priority === 'high' && (
                                  <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded-full text-xs font-medium">
                                    High Priority
                                  </span>
                                )}
                                {!notification.read && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                              </div>
                              <p className={`text-sm ${notification.read ? 'text-gray-500' : 'text-gray-700'}`}>
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-400 mt-2">{notification.time}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleToggleRead(notification.id)}
                                className="text-xs text-blue-600 hover:text-blue-800 px-3 py-1 rounded-md hover:bg-blue-50 transition-colors"
                              >
                                {notification.read ? 'Mark Unread' : 'Mark Read'}
                              </button>
                              <button
                                onClick={() => handleDismiss(notification.id)}
                                className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-100 rounded-md transition-colors"
                              >
                                <X size={14} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;