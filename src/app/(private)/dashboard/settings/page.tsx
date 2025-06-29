import { handleSignOut } from '@/actions/user'
import { SignOutButton } from '@/components/General/Header/SignOutButton'
import { FooterUnsubscribe } from '@/components/General/Newsletters'
import { Activity } from 'lucide-react'
import React from 'react'

export default function page() {
  return (
    <div>Setting page
      <FooterUnsubscribe />
      <div>
        <SignOutButton handleSignOut={handleSignOut} />
      </div>
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
    </div>
  )
}
