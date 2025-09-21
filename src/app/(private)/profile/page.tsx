

import {
  MapPin,
  Calendar,
  Settings,
} from "lucide-react";
import Image from "next/image";
import ProfileDetails from "@/components/dashboard/profile/ProfileDetails";
import Link from "next/link";
import { getSession } from "@/lib/getSession";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.APP_URL!),
  title: "My Profile | Arkin Organics",
  description: "View and manage your account details, order history, and preferences on your Arkin Organics profile page. Keep your information up to date for a seamless experience.",
};

export default async function ProfilePage() {
  const session = await getSession();
  const user = session?.user;



  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-4">
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
                <Link href={'/profile/settings'} className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
                  <Settings className="w-4 h-4" />
                </Link>
            
              </div>
            </div>
          </div>
        </div>

        <ProfileDetails userId={user?.id} />
      </div>
    </div>
  );
}
