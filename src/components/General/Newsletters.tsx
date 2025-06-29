'use client';

import { subscribeToNewsletter, unsubscribeNewsletter } from "@/actions/newsletter";
import { useState } from "react";

export default function Newsletters() {
    return (
        <div>Newsletters</div>
    )
}
export function FooterNewsletter() {
    const [message, setMessage] = useState<string | null>(null);
    const [status, setStatus] = useState<'idle' | 'submitting'>('idle');

    async function handleSubmit(formData: FormData) {
        setStatus('submitting');
        const res = await subscribeToNewsletter(formData);
        setStatus('idle');
        if (res?.message) setMessage(res.message);
    }
    return (
        <div>
            <h4 className="text-lg font-semibold text-white mb-6">
                Newsletter
            </h4>
            <p className="text-gray-400 text-sm mb-4">
                Subscribe to get the latest news and offers.
            </p>
            <form action={handleSubmit} className="space-y-3">
                <input
                    type="email" name="email" required
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 
                         text-gray-300 placeholder-gray-500 focus:outline-none 
                         focus:border-green-500 transition-colors"
                />
                <button disabled={status === 'submitting'} type="submit"
                    className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-green-600 
                               to-green-500 text-white font-medium hover:shadow-lg 
                               hover:shadow-green-500/25 transition-all duration-300"
                >
                    {status === 'submitting' ? 'Subscribing...' : 'Subscribe'}
                </button>
                {message && (
                    <p className="text-sm text-center text-green-400">{message}</p>
                )}
            </form>
        </div>
    )
}
export function FooterUnsubscribe() {
  const [message, setMessage] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'submitting'>('idle');

  async function handleUnsubscribe(formData: FormData) {
    setStatus('submitting');
    const res = await unsubscribeNewsletter(formData);
    setStatus('idle');
    if (res?.message) setMessage(res.message);
  }

  return (
    <div>
      <h4 className="text-lg font-semibold text-white mb-6">Unsubscribe</h4>
      <p className="text-gray-400 text-sm mb-4">Enter your email to unsubscribe.</p>
      <form action={handleUnsubscribe} className="space-y-3">
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          required
          className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 
                     text-gray-300 placeholder-gray-500 focus:outline-none 
                     focus:border-red-500 transition-colors"
        />
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-red-600 
                     to-red-500 text-white font-medium hover:shadow-lg 
                     hover:shadow-red-500/25 transition-all duration-300"
        >
          {status === 'submitting' ? 'Unsubscribing...' : 'Unsubscribe'}
        </button>
        {message && (
          <p className="text-sm text-center text-red-400">{message}</p>
        )}
      </form>
    </div>
  );
}