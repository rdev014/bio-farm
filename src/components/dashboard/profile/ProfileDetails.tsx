'use client'
import React, { useState, useEffect } from 'react'
import {
  TrendingUp, Users, Award, Save,
  MapPin, Phone,
  ShieldUser,

} from "lucide-react";
import { getUserDetails, editProfile, } from '@/actions/user';
import { toast } from 'sonner';
interface Achievement {
  title: string;
  description?: string;
  year?: number;
  iconColor?: string;
}

interface Farm {
  name: string;
  size?: string;
  location?: string;
  established?: number;
  crops?: string;
  status?: 'Active' | 'Planning' | 'Inactive';
}
export default function ProfileDetails({ userId }: { userId?: string }) {
  const [activeTab, setActiveTab] = useState("profile");
  type UserData = {
    name: string;
    firstname: string;
    lastname: string;
    email: string;
    contact_no: string;
    alternate_contact_no: string;
    location: string;
    bio: string;
    farms: Farm[];
    achievements: Achievement[];
    role: string;
  };

  const [userData, setUserData] = useState<UserData>({
    name: '',
    firstname: '',
    lastname: '',
    email: '',
    contact_no: '',
    alternate_contact_no: '',
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
      formData.append('name', userData.name);
      formData.append('firstname', userData.firstname);
      formData.append('lastname', userData.lastname);
      formData.append('email', userData.email);
      formData.append('bio', userData.bio);
      formData.append('location', userData.location);
      formData.append('contact_no', userData.contact_no);
      formData.append('alternate_contact_no', userData.alternate_contact_no);

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
            <h3 className="text-sm font-medium text-gray-900">Quick Statistics</h3>
          </div>
          <div className="p-4 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Farms</span>
              <span className="text-sm font-medium text-gray-900">{userData.farms.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Area</span>
              <span className="text-sm font-medium text-gray-900">
                {userData.farms.reduce((total, farm) => total + (parseFloat(farm.size || '0') || 0), 0)} acres
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Active Crops</span>
              <span className="text-sm font-medium text-gray-900">
                {userData.farms.reduce((total, farm) => total + (farm.crops?.split(',').length || 0), 0)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Certifications</span>
              <span className="text-sm font-medium text-gray-900">{userData.achievements.length}</span>
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
                  <label className="block text-sm font-medium text-gray-900 mb-2">Alternate Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      name="alternate_contact_no"
                      value={userData.alternate_contact_no || ''}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                </div>

                <div >
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                  <div className="relative">
                    <ShieldUser className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                    <textarea
                      name="bio"
                      rows={3}
                      value={userData.bio || ''}
                      onChange={handleInputChange} maxLength={500}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                </div>
                <div >
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
          {activeTab === 'farm' && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-medium text-gray-900">Farm Details</h2>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Manage Farms
                </button>
              </div>
              <div className="space-y-6">
                {userData.farms.length > 0 ? (
                  userData.farms.map((farm, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-medium text-gray-900">{farm.name}</h3>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${farm.status === 'Active'
                            ? 'bg-green-100 text-green-800'
                            : farm.status === 'Planning'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-gray-100 text-gray-800'
                            }`}
                        >
                          {farm.status || 'Active'}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Size</span>
                          <p className="font-medium text-gray-900">{farm.size || 'N/A'}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Location</span>
                          <p className="font-medium text-gray-900">{farm.location || 'N/A'}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Established</span>
                          <p className="font-medium text-gray-900">{farm.established || 'N/A'}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Crops</span>
                          <p className="font-medium text-gray-900">{farm.crops || 'N/A'}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No farms available.</p>
                )}
              </div>
            </div>
          )}
          {activeTab === 'achievements' && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-medium text-gray-900">Achievements & Certifications</h2>
              </div>
              <div className="space-y-4">
                {userData.achievements.length > 0 ? (
                  userData.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg">
                      <div
                        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${achievement.iconColor ? `bg-${achievement.iconColor}-100` : 'bg-gray-100'
                          }`}
                      >
                        <Award
                          className={`w-4 h-4 ${achievement.iconColor ? `text-${achievement.iconColor}-600` : 'text-gray-600'
                            }`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{achievement.title}</p>
                        <p className="text-sm text-gray-500">{achievement.description || 'No description'}</p>
                      </div>
                      <span className="text-xs text-gray-400">{achievement.year || 'N/A'}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No achievements available.</p>
                )}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
