"use client";
import React, {  useState } from "react";
import {
  MapPin,
  Calendar,
  Edit3,
  MoreVertical,
  TrendingUp,
  Users,
  Award,
  Settings,
  Bell,
  Shield,
  Activity,
} from "lucide-react";
import Image from "next/image";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="p-8">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <Image
                    src="/icons/profile.jpg"
                    alt="Profile"
                    className="rounded-full object-cover border-4 border-white shadow-lg"
                    width={100}
                    height={100}
                  />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                </div>

                <div>
                  <h1 className="text-2xl font-semibold text-gray-900 mb-1">
                    John Anderson
                  </h1>
                  <p className="text-gray-600 mb-2">Farm Owner & Manager</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      Fresno, California
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      Joined March 2018
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <button className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
                  <Edit3 className="w-4 h-4" />
                </button>
                <button className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

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
                    {
                      id: "settings",
                      label: "Account Settings",
                      icon: Settings,
                    },
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
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-medium text-gray-900">
                      Profile Information
                    </h2>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      Edit Profile
                    </button>
                  </div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name
                        </label>
                        <div className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">
                          John Anderson
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address
                        </label>
                        <div className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">
                          john.anderson@email.com
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <div className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">
                          +1 (555) 123-4567
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Location
                        </label>
                        <div className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">
                          Fresno County, California
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bio
                      </label>
                      <div className="text-sm text-gray-900 bg-gray-50 px-3 py-3 rounded-lg leading-relaxed">
                        Experienced organic farmer with over 12 years in
                        sustainable agriculture. Specializing in organic
                        vegetable production and implementing eco-friendly
                        farming practices across multiple farm locations in
                        California.
                      </div>
                    </div>
                  </div>
                </div>
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

              {/* Settings Tab */}
              {activeTab === "settings" && (
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-medium text-gray-900">
                      Account Settings
                    </h2>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 mb-3">
                        Email Preferences
                      </h3>
                      <div className="space-y-3">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            defaultChecked
                          />
                          <span className="ml-2 text-sm text-gray-700">
                            Weekly farm reports
                          </span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            defaultChecked
                          />
                          <span className="ml-2 text-sm text-gray-700">
                            Weather alerts
                          </span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">
                            Marketing updates
                          </span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-gray-900 mb-3">
                        Account Status
                      </h3>
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div className="flex items-center">
                          <Activity className="w-4 h-4 text-green-500 mr-2" />
                          <span className="text-sm font-medium text-green-900">
                            Active Premium Account
                          </span>
                        </div>
                        <button className="text-sm text-green-700 hover:text-green-800">
                          Manage Plan
                        </button>
                      </div>
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
      </div>
    </div>
  );
}
