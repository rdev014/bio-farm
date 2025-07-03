"use client";

import {
  subscribeToNewsletter,
  unsubscribeNewsletter,
  checkSubscriptionStatus,
} from "@/actions/newsletter";
import { useState, useEffect } from "react";

export default function Newsletters() {
  return <div>Newsletters</div>;
}
export function FooterNewsletter() {
  const [message, setMessage] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "submitting">("idle");

  async function handleSubmit(formData: FormData) {
    setStatus("submitting");
    const res = await subscribeToNewsletter(formData);
    setStatus("idle");
    if (res?.message) setMessage(res.message);
  }
  return (
    <div>
      <h4 className="text-lg font-semibold text-white mb-6">Newsletter</h4>
      <p className="text-gray-400 text-sm mb-4">
        Subscribe to get the latest news and offers.
      </p>
      <form action={handleSubmit} className="space-y-3">
        <input
          type="email"
          name="email"
          required
          placeholder="Enter your email"
          className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 
                         text-gray-300 placeholder-gray-500 focus:outline-none 
                         focus:border-green-500 transition-colors"
        />
        <button
          disabled={status === "submitting"}
          type="submit"
          className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-green-600 
                               to-green-500 text-white font-medium hover:shadow-lg 
                               hover:shadow-green-500/25 transition-all duration-300"
        >
          {status === "submitting" ? "Subscribing..." : "Subscribe"}
        </button>
        {message && (
          <p className="text-sm text-center text-green-400">{message}</p>
        )}
      </form>
    </div>
  );
}

export function NewsletterToggleSubscribe({ useremail }: { useremail?: string }) {
  const [email, setEmail] = useState(useremail);
  const [message, setMessage] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "checking">("idle");
  const [subscribed, setSubscribed] = useState<boolean | null>(null);
  const [isValidEmail, setIsValidEmail] = useState(false);

  // Email validation
  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailRegex.test(email ?? ""));

    // Clear message when email changes
    if (message) {
      setMessage(null);
    }
  }, [email]);

  // Check subscription status when email is valid
  useEffect(() => {
    const checkStatus = async () => {
      if (isValidEmail && email) {
        setStatus("checking");
        try {
          const result = await checkSubscriptionStatus(email);
          setSubscribed(
            typeof result.subscribed === "boolean" ? result.subscribed : null
          );
        } catch (error) {
          console.error("Error checking subscription status:", error);
          setSubscribed(null);
        } finally {
          setStatus("idle");
        }
      } else {
        setSubscribed(null);
      }
    };

    const debounceTimer = setTimeout(checkStatus, 500);
    return () => clearTimeout(debounceTimer);
  }, [email, isValidEmail]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!isValidEmail || status === "submitting") return;

    setStatus("submitting");
    setMessage(null);

    const formData = new FormData();
    formData.append("email", email ?? "");

    try {
      const res = subscribed
        ? await unsubscribeNewsletter(formData)
        : await subscribeToNewsletter(formData);

      setMessage(res?.message || null);

      if (res?.success) {
        setSubscribed(!subscribed);
      }
    } catch (error) {
      console.error("Newsletter action error:", error);
      setMessage("An error occurred. Please try again.");
    } finally {
      setStatus("idle");
    }
  }

  const getButtonText = () => {
    if (status === "checking") return "Checking...";
    if (status === "submitting") {
      return subscribed ? "Unsubscribing..." : "Subscribing...";
    }
    return subscribed ? "Unsubscribe" : "Subscribe";
  };

  const getButtonColor = () => {
    if (subscribed) {
      return "bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 hover:shadow-lg hover:shadow-red-500/25";
    }
    return "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 hover:shadow-lg hover:shadow-blue-500/25";
  };

  const getMessageColor = () => {
    if (!message) return "";

    // Success messages (subscribed or unsubscribed successfully)
    if (message.includes("successfully") || message.includes("Subscribed") || message.includes("unsubscribed")) {
      return "text-green-400";
    }

    // Info messages (already subscribed/unsubscribed)
    if (message.includes("already") || message.includes("Already")) {
      return "text-yellow-400";
    }

    // Error messages
    return "text-red-400";
  };

  return (
    <div className="max-w-md w-full mx-auto px-6 py-8 bg-gray-900 rounded-lg shadow-lg border border-gray-700">
      <div className="text-center mb-6">
        <h4 className="text-xl font-bold text-white mb-2">Newsletter</h4>
        <p className="text-gray-400 text-sm">
          {subscribed === null
            ? "Enter your email to manage your subscription"
            : `Enter your email to ${subscribed ? "unsubscribe from" : "subscribe to"} our newsletter`
          }
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
            disabled={status === "submitting"}
            className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700
                     text-gray-300 placeholder-gray-500 focus:outline-none
                     focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50
                     transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          />

          {/* Subscription status indicator */}
          {email && isValidEmail && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              {status === "checking" ? (
                <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              ) : subscribed !== null ? (
                <div className={`w-2 h-2 rounded-full ${subscribed ? 'bg-green-400' : 'bg-gray-500'}`}></div>
              ) : null}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={!isValidEmail || status === "submitting" || status === "checking"}
          className={`w-full px-4 py-3 rounded-lg text-white font-medium 
                     transition-all duration-300 transform hover:scale-[1.02]
                     disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                     ${getButtonColor()}`}
        >
          {getButtonText()}
        </button>

        {message && (
          <div className={`p-3 rounded-lg bg-gray-800/50 border ${message.includes("successfully") ? "border-green-500/30" : "border-red-500/30"
            }`}>
            <p className={`text-sm text-center font-medium ${getMessageColor()}`}>
              {message}
            </p>
          </div>
        )}

        {/* Additional info */}
        {subscribed !== null && (
          <div className="text-center">
            <p className="text-xs text-gray-500">
              Status: {subscribed ? "✓ Subscribed" : "○ Not subscribed"}
            </p>
          </div>
        )}
      </form>
    </div>
  );
}