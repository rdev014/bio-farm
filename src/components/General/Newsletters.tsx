import React from 'react'

export default function Newsletters() {
    return (
        <div>Newsletters</div>
    )
}
export function FooterNewsletter() {
    return (
        <div>
            <h4 className="text-lg font-semibold text-white mb-6">
                Newsletter
            </h4>
            <p className="text-gray-400 text-sm mb-4">
                Subscribe to get the latest news and offers.
            </p>
            <form className="space-y-3">
                <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 
                         text-gray-300 placeholder-gray-500 focus:outline-none 
                         focus:border-green-500 transition-colors"
                />
                <button
                    className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-green-600 
                               to-green-500 text-white font-medium hover:shadow-lg 
                               hover:shadow-green-500/25 transition-all duration-300"
                >
                    Subscribe
                </button>
            </form>
        </div>
    )
}
