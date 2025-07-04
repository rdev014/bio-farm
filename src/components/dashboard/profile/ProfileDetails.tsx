'use client'
import React, { useState, useEffect } from 'react'
import {
  TrendingUp, Users, Award, Settings, Bell, Shield, Save,
  MapPin, Phone,
} from "lucide-react";
import { getUserDetails, editProfile } from '@/actions/user';
import { toast } from 'sonner';

export default function ProfileDetails({ userId }: { userId?: string }) {
  const [activeTab, setActiveTab] = useState("profile");
  const [userData, setUserData] = useState({
    name: '',
    firstname: '',
    lastname: '',
    email: '',
    contact_no: '',
    location: '',
    bio: '',
    farms: [],
    achievements: [],
    role: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      if (userId) {
        const response = await getUserDetails(userId);
        if (response.success && response.user) {
          setUserData({
            ...userData,
            ...response.user,
            firstname: response.user.firstname || '',
            lastname: response.user.lastname || '',
            name: response.user.name || '',
            role: response.user.role || '',
          });
        }
      }
    };
    fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!userId) throw new Error('User not authenticated');

      const formData = new FormData();
      formData.append('name', userData.firstname + ' ' + userData.lastname);
      formData.append('firstname', userData.firstname);
      formData.append('lastname', userData.lastname);
      formData.append('email', userData.email);
      formData.append('bio', userData.bio);
      formData.append('location', userData.location);
      formData.append('contact_no', userData.contact_no);

      const response = await editProfile(userId, formData);
      if (response.success) {
        toast.success('Profile updated successfully');
      } else {
        throw new Error(response.error || 'Failed to update profile');
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Sidebar */}
      <div className="lg:col-span-1">
        {/* Navigation */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="p-4">
            <nav className="space-y-1">
              {[
                {
                  id: "profile",
                  label: "Profile Information",
                  icon: Users,
                },
                { id: "farm", label: "Farm Details", icon: TrendingUp },
                { id: "achievements", label: "Achievements", icon: Award },
                { id: "notifications", label: "Notifications", icon: Bell },
                {
                  id: "security",
                  label: "Privacy & Security",
                  icon: Shield,
                },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${activeTab === item.id
                    ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                    : "text-gray-700 hover:bg-gray-50"
                    }`}
                >
                  <item.icon className="w-4 h-4 mr-3" />
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-sm font-medium text-gray-900">
              Quick Statistics
            </h3>
          </div>
          <div className="p-4 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Farms</span>
              <span className="text-sm font-medium text-gray-900">3</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Area</span>
              <span className="text-sm font-medium text-gray-900">
                450 acres
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Active Crops</span>
              <span className="text-sm font-medium text-gray-900">12</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Certifications</span>
              <span className="text-sm font-medium text-gray-900">4</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:col-span-2">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Profile Information Tab */}
          {activeTab === "profile" && (
            <form onSubmit={handleSubmit} className="space-y-6 p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-gray-900">Profile Information</h2>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  {userData.role || 'User'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={userData.name || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    disabled
                    value={userData.email || ''}
                    className="w-full px-4 py-2 cursor-not-allowed select-none border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      name="contact_no"
                      value={userData.contact_no || ''}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                  <input
                    type="text"
                    name="bio"
                    value={userData.bio || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                    <textarea
                      name="location"
                      rows={3}
                      value={userData.location || ''}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          )}

          {/* Farm Details Tab */}
          {activeTab === "farm" && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-medium text-gray-900">
                  Farm Details
                </h2>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Manage Farms
                </button>
              </div>

              <div className="space-y-6">
                {/* Farm 1 */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-gray-900">
                      Green Valley Organic Farm
                    </h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Active
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Size</span>
                      <p className="font-medium text-gray-900">150 acres</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Location</span>
                      <p className="font-medium text-gray-900">
                        Fresno, CA
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-500">Established</span>
                      <p className="font-medium text-gray-900">2018</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Crops</span>
                      <p className="font-medium text-gray-900">
                        5 varieties
                      </p>
                    </div>
                  </div>
                </div>

                {/* Farm 2 */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-gray-900">
                      Sunshine Acres
                    </h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Active
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Size</span>
                      <p className="font-medium text-gray-900">200 acres</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Location</span>
                      <p className="font-medium text-gray-900">
                        Bakersfield, CA
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-500">Established</span>
                      <p className="font-medium text-gray-900">2020</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Crops</span>
                      <p className="font-medium text-gray-900">
                        4 varieties
                      </p>
                    </div>
                  </div>
                </div>

                {/* Farm 3 */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-gray-900">
                      Heritage Fields
                    </h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Planning
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Size</span>
                      <p className="font-medium text-gray-900">100 acres</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Location</span>
                      <p className="font-medium text-gray-900">
                        Modesto, CA
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-500">Established</span>
                      <p className="font-medium text-gray-900">2024</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Crops</span>
                      <p className="font-medium text-gray-900">
                        3 varieties
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Achievements Tab */}
          {activeTab === "achievements" && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-medium text-gray-900">
                  Achievements & Certifications
                </h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg">
                  <div className="flex-shrink-0 w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Award className="w-4 h-4 text-yellow-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      USDA Organic Certification
                    </p>
                    <p className="text-sm text-gray-500">
                      Certified organic farming practices • Valid until 2025
                    </p>
                  </div>
                  <span className="text-xs text-gray-400">2023</span>
                </div>

                <div className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Award className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      Sustainable Agriculture Award
                    </p>
                    <p className="text-sm text-gray-500">
                      Recognized for environmental stewardship and
                      innovation
                    </p>
                  </div>
                  <span className="text-xs text-gray-400">2024</span>
                </div>

                <div className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Award className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      Water Conservation Leader
                    </p>
                    <p className="text-sm text-gray-500">
                      Achieved 35% water reduction through efficient
                      irrigation
                    </p>
                  </div>
                  <span className="text-xs text-gray-400">2023</span>
                </div>

                <div className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg">
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <Award className="w-4 h-4 text-purple-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      Community Impact Recognition
                    </p>
                    <p className="text-sm text-gray-500">
                      Outstanding contribution to local food security
                    </p>
                  </div>
                  <span className="text-xs text-gray-400">2022</span>
                </div>
              </div>
            </div>
          )}



          {/* Other tabs can be added similarly */}
          {(activeTab === "notifications" || activeTab === "security") && (
            <div className="p-6">
              <div className="text-center py-12">
                <div className="text-gray-400 mb-2">
                  <Settings className="w-12 h-12 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">
                  {activeTab === "notifications"
                    ? "Notifications"
                    : "Privacy & Security"}
                </h3>
                <p className="text-gray-500">
                  This section is coming soon.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
