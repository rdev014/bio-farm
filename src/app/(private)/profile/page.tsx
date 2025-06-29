

import {
  MapPin,
  Calendar,
  Edit3,
  MoreVertical,
} from "lucide-react";
import Image from "next/image";
import ProfileDetails from "@/components/dashboard/profile/ProfileDetails";
import Link from "next/link";
import { getSession } from "@/lib/getSession";

export default async function ProfilePage() {
  const session = await getSession();
  const user = session?.user;

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
                    src={user?.image ? user.image : '/icons/profile.jpg'}
                    alt="Profile"
                    className="rounded-full object-cover border-4 border-white shadow-lg"
                    width={100}
                    height={100}
                  />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                </div>

                <div>
                  <h1 className="text-2xl font-semibold text-gray-900 mb-1">
                   {user?.name}
                  </h1>
                  <p className="text-gray-600 mb-2">Farm Owner & Manager</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                    {user?.email}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                    {user?.role}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Link href={'/dashboard/settings'} className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
                  <Edit3 className="w-4 h-4" />
                </Link>
                <button className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <ProfileDetails />
      </div>
    </div>
  );
}
