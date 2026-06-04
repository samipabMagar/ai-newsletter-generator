"use client";

import {
  Pencil,
  Ban,
  CreditCard,
  Tags,
  Clock,
  Mail,
  Activity,
  Calendar,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import {useRouter} from "next/navigation"

const DashboardPage = () => {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <div className="min-h-screen bg-indigo-50/40 py-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Your Newsletter Dashboard
          </h1>
          <p className="text-gray-500 font-medium">
            Manage your personalized newsletter preferences
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Space (Preferences) - Spans 2 columns on large screens */}
          <div className="lg:col-span-2 space-y-8">
            {/* Current Preferences Card */}
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Current Preferences
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-6">
                {/* Categories */}
                <div className="sm:col-span-2">
                  <h3 className="flex items-center text-sm font-medium text-gray-500 mb-3">
                    <Tags className="w-4 h-4 mr-2" />
                    Categories
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-semibold">
                      technology
                    </span>
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-semibold">
                      sports
                    </span>
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-semibold">
                      politics
                    </span>
                  </div>
                </div>

                {/* Frequency */}
                <div>
                  <h3 className="flex items-center text-sm font-medium text-gray-500 mb-1">
                    <Clock className="w-4 h-4 mr-2" />
                    Frequency
                  </h3>
                  <p className="text-gray-900 text-base font-medium">Daily</p>
                </div>

                {/* Email */}
                <div>
                  <h3 className="flex items-center text-sm font-medium text-gray-500 mb-1">
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                  </h3>
                  <p className="text-gray-900 text-base font-medium">
                    {user?.email || "machadop1407@gmail.com"}
                  </p>
                </div>

                {/* Status */}
                <div>
                  <h3 className="flex items-center text-sm font-medium text-gray-500 mb-1">
                    <Activity className="w-4 h-4 mr-2" />
                    Status
                  </h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-gray-900 text-base font-medium">
                      Active
                    </span>
                  </div>
                </div>

                {/* Created */}
                <div>
                  <h3 className="flex items-center text-sm font-medium text-gray-500 mb-1">
                    <Calendar className="w-4 h-4 mr-2" />
                    Created
                  </h3>
                  <p className="text-gray-900 text-base font-medium">
                    7/17/2025
                  </p>
                </div>
              </div>
            </div>

            {/* How it works Section (Moved up here to flow better on wide screens) */}
            <div className="bg-indigo-50/50 rounded-xl p-8 border border-indigo-100/60 shadow-inner">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                How it works
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start text-gray-600 text-sm">
                  <span className="text-blue-600 font-bold mr-3 mt-0.5">•</span>
                  <span>
                    Your newsletter is automatically generated based on your
                    selected categories.
                  </span>
                </li>
                <li className="flex items-start text-gray-600 text-sm">
                  <span className="text-blue-600 font-bold mr-3 mt-0.5">•</span>
                  <span>
                    Newsletters are delivered to your email at 9 AM according to
                    your chosen frequency.
                  </span>
                </li>
                <li className="flex items-start text-gray-600 text-sm">
                  <span className="text-blue-600 font-bold mr-3 mt-0.5">•</span>
                  <span>
                    You can pause or resume your newsletter at any time.
                  </span>
                </li>
                <li className="flex items-start text-gray-600 text-sm">
                  <span className="text-blue-600 font-bold mr-3 mt-0.5">•</span>
                  <span>
                    Update your preferences anytime to change categories or
                    frequency.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Sidebar Area (Actions) - Spans 1 column */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 p-8 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Actions</h2>

              <div className="space-y-4">
                <button onClick={() => router.push("/select")} className="w-full cursor-pointer flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg text-sm font-medium transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  <Pencil className="w-4 h-4" />
                  <span>Update Preferences</span>
                </button>

                <button className="w-full cursor-pointer flex items-center justify-center space-x-2 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 py-3 px-4 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                  <Ban className="w-4 h-4" />
                  <span>Pause Newsletter</span>
                </button>

                <button className="w-full cursor-pointer flex items-center justify-center space-x-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 py-3 px-4 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2">
                  <CreditCard className="w-4 h-4" />
                  <span>Manage Subscription</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
