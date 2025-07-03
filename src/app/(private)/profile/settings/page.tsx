'use client';
import React, { useEffect, useState } from 'react';
import {
  Mail,
  Bell,
  Activity,
  Shield,
  CreditCard,
  Building2,
  Truck,
  Settings,
  LogOut,
  Save,
  Eye,
  EyeOff,
  Users,
  Package,
  Newspaper
} from 'lucide-react';
import { NewsletterToggleSubscribe } from '@/components/General/Newsletters';
import { getUserSession } from '@/actions/user';

interface User {
  _id: string;
  name: string;
  // firstname?: string;
  // lastname?: string;
  email: string;
  image: string;
  role: string;
  // authProviderId: string;
  // isVerified: boolean;
  // isSubscribedToNewsletter: boolean;
  // createdAt: string;
  // bio?: string;
  // location?: string;
  // contact_no?: string;
}

interface EmailPreferences {
  weeklyReports: boolean;
  weatherAlerts: boolean;
  fertilizerTips: boolean;
  promotions: boolean;
  orderUpdates: boolean;
  b2bAlerts: boolean;
  priceChanges: boolean;
  inventoryAlerts: boolean;
}

interface NotificationSettings {
  orderUpdates: boolean;
  deliveryUpdates: boolean;
  b2bAlerts: boolean;
  systemMaintenance: boolean;
  securityAlerts: boolean;
}

interface Tab {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface TabButtonProps {
  tab: Tab;
  isActive: boolean;
  onClick: (id: string) => void;
}

const SettingsPage: React.FC = () => {
  const [user, setUser] = useState<User>()
  const [activeTab, setActiveTab] = useState<string>('email');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [emailPreferences, setEmailPreferences] = useState<EmailPreferences>({
    weeklyReports: true,
    weatherAlerts: true,
    fertilizerTips: false,
    promotions: false,
    orderUpdates: true,
    b2bAlerts: false,
    priceChanges: true,
    inventoryAlerts: false,
  });
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    orderUpdates: true,
    deliveryUpdates: true,
    b2bAlerts: false,
    systemMaintenance: true,
    securityAlerts: true,
  });

  useEffect(() => {
    const loadUser = async () => {

      const sessionUser = await getUserSession();
      if (sessionUser) {
        // Map or cast sessionUser to match the User interface
        setUser({
          _id: sessionUser.id ?? '',
          name: sessionUser.name ?? '',
          // firstname: sessionUser.firstname,
          // lastname: sessionUser.lastname,
          email: sessionUser.email ?? '',
          image: sessionUser.image ?? '',
          role: sessionUser.role ?? '',
          // authProviderId: sessionUser.authProviderId ?? '',
          // isVerified: sessionUser.isVerified ?? false,
          // isSubscribedToNewsletter: sessionUser.isSubscribedToNewsletter ?? false,
          // createdAt: sessionUser.createdAt ?? '',
          // bio: sessionUser.bio,
          // location: sessionUser.location,
          // contact_no: sessionUser.contact_no,
        });
      } else {
        setUser(undefined);
      }
    };
    loadUser();
  }, []);

  const handleEmailPreferenceChange = (key: keyof EmailPreferences): void => {
    setEmailPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleNotificationChange = (key: keyof NotificationSettings): void => {
    setNotificationSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const tabs: Tab[] = [
    { id: 'email', label: 'Email Preferences', icon: Mail },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'subscription', label: 'Subscription', icon: Activity },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'news', label: 'News', icon: Newspaper },
  ];

  const TabButton: React.FC<TabButtonProps> = ({ tab, isActive, onClick }) => {
    const Icon = tab.icon;
    return (
      <button
        onClick={() => onClick(tab.id)}
        className={`flex items-center w-full px-4 py-3 text-left rounded-lg transition-colors ${isActive
          ? 'bg-green-50 text-green-700 border-l-4 border-green-600'
          : 'text-gray-600 hover:bg-gray-50'
          }`}
      >
        <Icon className="w-5 h-5 mr-3" />
        <span className="font-medium">{tab.label}</span>
      </button>
    );
  };

  const renderEmailTab = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Email Preferences</h2>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Package className="w-5 h-5 mr-2" />
            Product & Farm Updates
          </h3>
          <div className="space-y-3">
            {[
              { key: 'weeklyReports', label: 'Weekly farm reports & product updates' },
              { key: 'weatherAlerts', label: 'Weather alerts & seasonal recommendations' },
              { key: 'fertilizerTips', label: 'Organic fertilizer tips & best practices' },
              { key: 'inventoryAlerts', label: 'New product arrivals & inventory updates' },
            ].map((item) => (
              <label key={item.key} className="flex items-center">
                <input
                  type="checkbox"
                  checked={emailPreferences[item.key as keyof EmailPreferences]}
                  onChange={() => handleEmailPreferenceChange(item.key as keyof EmailPreferences)}
                  className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
                <span className="ml-3 text-sm text-gray-700">{item.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Building2 className="w-5 h-5 mr-2" />
            B2B & Commercial
          </h3>
          <div className="space-y-3">
            {[
              { key: 'b2bAlerts', label: 'Bulk order opportunities & wholesale pricing' },
              { key: 'priceChanges', label: 'Price changes & volume discounts' },
              { key: 'promotions', label: 'Special promotions & seasonal offers' },
            ].map((item) => (
              <label key={item.key} className="flex items-center">
                <input
                  type="checkbox"
                  checked={emailPreferences[item.key as keyof EmailPreferences]}
                  onChange={() => handleEmailPreferenceChange(item.key as keyof EmailPreferences)}
                  className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
                <span className="ml-3 text-sm text-gray-700">{item.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="flex items-center px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
          <Save className="w-4 h-4 mr-2" />
          Save Preferences
        </button>
      </div>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Notification Settings</h2>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Truck className="w-5 h-5 mr-2" />
            Order & Delivery
          </h3>
          <div className="space-y-3">
            {[
              { key: 'orderUpdates', label: 'Order confirmations & status updates' },
              { key: 'deliveryUpdates', label: 'Delivery notifications & tracking' },
            ].map((item) => (
              <label key={item.key} className="flex items-center">
                <input
                  type="checkbox"
                  checked={notificationSettings[item.key as keyof NotificationSettings]}
                  onChange={() => handleNotificationChange(item.key as keyof NotificationSettings)}
                  className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
                <span className="ml-3 text-sm text-gray-700">{item.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Shield className="w-5 h-5 mr-2" />
            System & Security
          </h3>
          <div className="space-y-3">
            {[
              { key: 'securityAlerts', label: 'Security alerts & account notifications' },
              { key: 'systemMaintenance', label: 'System maintenance & updates' },
              { key: 'b2bAlerts', label: 'B2B account alerts & credit notifications' },
            ].map((item) => (
              <label key={item.key} className="flex items-center">
                <input
                  type="checkbox"
                  checked={notificationSettings[item.key as keyof NotificationSettings]}
                  onChange={() => handleNotificationChange(item.key as keyof NotificationSettings)}
                  className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
                <span className="ml-3 text-sm text-gray-700">{item.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="flex items-center px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
          <Save className="w-4 h-4 mr-2" />
          Save Settings
        </button>
      </div>
    </div>
  );

  const renderSubscriptionTab = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Subscription & Account</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Activity className="w-8 h-8 text-green-600 mr-3" />
              <div>
                <h3 className="text-lg font-semibold text-green-900">B2B Premium Account</h3>
                {/* <p className="text-sm text-green-700">Active since {user.createdAt}</p> */}
              </div>
            </div>
            <span className="px-3 py-1 bg-green-600 text-white rounded-full text-sm font-medium">
              Active
            </span>
          </div>
          <div className="space-y-2 text-sm text-green-800">
            <p>• Wholesale pricing & bulk discounts</p>
            <p>• Priority customer support</p>
            <p>• Custom delivery scheduling</p>
            <p>• Volume-based pricing tiers</p>
          </div>
          <button className="w-full mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            Manage Subscription
          </button>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Users className="w-5 h-5 mr-2" />
            Account Statistics
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Total Orders</span>
              <span className="text-sm font-medium text-gray-900">247</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Total Spent</span>
              <span className="text-sm font-medium text-gray-900">$45,892</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Loyalty Points</span>
              <span className="text-sm font-medium text-gray-900">12,458</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Next Delivery</span>
              <span className="text-sm font-medium text-gray-900">July 15, 2025</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecurityTab = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Security Settings</h2>

      <div className="space-y-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Change Password</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="w-full pr-10 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? <EyeOff className="w-4 h-4 text-gray-400" /> : <Eye className="w-4 h-4 text-gray-400" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>

          <button className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            Update Password
          </button>
        </div>
      </div>
    </div>
  );

  const renderBillingTab = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Billing & Payment</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Methods</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <CreditCard className="w-5 h-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900">•••• •••• •••• 4242</p>
                  <p className="text-xs text-gray-500">Expires 12/26</p>
                </div>
              </div>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">Primary</span>
            </div>
            <button className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Add Payment Method
            </button>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Billing Address</h3>
          <div className="text-sm text-gray-600">
            {/* <p>{user.name}</p>
            <p>{user.location}</p> */}
          </div>
          <button className="mt-4 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            Update Address
          </button>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Invoices</h3>
        <div className="space-y-3">
          {[
            { date: '2025-06-15', amount: '$2,845.00', status: 'Paid' },
            { date: '2025-05-15', amount: '$3,120.00', status: 'Paid' },
            { date: '2025-04-15', amount: '$2,967.00', status: 'Paid' },
          ].map((invoice, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-900">Invoice #{2025000 + index}</p>
                <p className="text-xs text-gray-500">{invoice.date}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{invoice.amount}</p>
                <span className="text-xs text-green-600">{invoice.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  const renderNewsTab = ({ email }: { email?: string }) => (
    <NewsletterToggleSubscribe useremail={email ?? undefined} />
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'email':
        return renderEmailTab();
      case 'notifications':
        return renderNotificationsTab();
      case 'subscription':
        return renderSubscriptionTab();
      case 'security':
        return renderSecurityTab();
      case 'billing':
        return renderBillingTab();
      case 'news':
        return renderNewsTab({ email: user?.email });
      default:
        return renderEmailTab();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Settings className="w-8 h-8 text-green-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
            </div>
            <button className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <TabButton
                    key={tab.id}
                    tab={tab}
                    isActive={activeTab === tab.id}
                    onClick={setActiveTab}
                  />
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;