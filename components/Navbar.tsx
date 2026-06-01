"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.push("/signin");
  };

  if(!user) {
    return null; // Don't render the navbar if the user is not authenticated
  }

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-xl font-semibold text-gray-900">
              Roka<span className="text-indigo-600">AI</span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
            <Link
              href="/"
              className="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
            >
              Home
            </Link>
            <Link
              href="/generate"
              className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
            >
              Generate
            </Link>
            <Link
              href="/pricing"
              className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
            >
              Pricing
            </Link>
          </div>

          {/* User Actions */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-700">
                  Welcome,{" "}
                  <span className="font-semibold text-indigo-600">
                    {user.email}
                  </span>
                </span>
                <form action={handleLogout}>
                  <button
                    type="submit"
                    className="text-gray-800 hover:text-gray-900 bg-red-500 cursor-pointer px-3 py-2 rounded-md text-sm font-medium transition-colors border border-gray-200 hover:border-gray-300"
                  >
                    Logout
                  </button>
                </form>
              </div>
            ) : (
              <>
                <Link
                  href="/signin"
                  className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Log in
                </Link>
                <Link
                  href="/signin"
                  className="bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
