'use client'
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface SignOutButtonProps {
  closeAllMenus?: () => void;
  handleSignOut: () => Promise<void>;
}

export function SignOutButton({ closeAllMenus, handleSignOut }: SignOutButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleClick = async () => {
    setIsLoading(true);
    try {
      if (closeAllMenus) {
        closeAllMenus();
      }
      await handleSignOut();
      router.push('/')
    } catch (error) {
      console.error("Sign out failed:", error);
    } finally {
      setIsLoading(false);

    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isLoading}
      className={`w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 rounded-md transition-all duration-200 ${isLoading
          ? "bg-slate-50 cursor-not-allowed opacity-60"
          : "hover:bg-green-50 hover:text-green-700 active:bg-green-100"
        }`}
      aria-label={isLoading ? "Signing out" : "Sign out"}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg
            className="animate-spin h-4 w-4 text-green-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8 8 8 0 01-8-8z"
            />
          </svg>
          Signing out...
        </span>
      ) : (
        <span className="flex items-center gap-2">
          <LogOut className="h-4 w-4 text-slate-500 group-hover:text-green-700" />
          Sign out
        </span>
      )}
    </button>
  );
}