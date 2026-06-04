"use client";

import { useState } from "react";
import { Check, Sparkles } from "lucide-react";

const categories = [
  {
    id: "technology",
    name: "Technology",
    description: "Latest tech news and innovations",
  },
  {
    id: "business",
    name: "Business",
    description: "Business trends and market updates",
  },
  { id: "sports", name: "Sports", description: "Sports news and highlights" },
  {
    id: "entertainment",
    name: "Entertainment",
    description: "Movies, TV, and celebrity news",
  },
  {
    id: "science",
    name: "Science",
    description: "Scientific discoveries and research",
  },
  { id: "health", name: "Health", description: "Health and wellness updates" },
  {
    id: "politics",
    name: "Politics",
    description: "Political news and current events",
  },
  {
    id: "environment",
    name: "Environment",
    description: "Climate and environmental news",
  },
];

const frequencyOptions = [
  { id: "daily", name: "Daily", description: "Every day" },
  { id: "weekly", name: "Weekly", description: "Once a week" },
  { id: "biweekly", name: "Bi-weekly", description: "Twice a week" },
];

export default function SelectPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedFrequency, setSelectedFrequency] = useState<string>("weekly");

  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId],
    );
  };

  return (
    <div className="min-h-screen bg-indigo-50/40 py-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Customize Your Newsletter
          </h1>
          <p className="text-gray-500 font-medium">
            Select your interests and delivery frequency
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Configuration Area - Spans 2 columns */}
          <div className="lg:col-span-2 space-y-8">
            {/* Categories Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Choose Your Categories
              </h2>
              <p className="text-gray-500 text-sm mb-6">
                Select the topics you'd like to see in your personalized
                newsletter.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {categories.map((category) => (
                  <label
                    key={category.id}
                    className={`relative flex items-start p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      selectedCategories.includes(category.id)
                        ? "border-indigo-500 bg-indigo-50/50 shadow-sm"
                        : "border-gray-100 hover:border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={selectedCategories.includes(category.id)}
                      onChange={() => handleCategoryToggle(category.id)}
                    />
                    <div className="flex items-center h-5 mt-0.5">
                      <div
                        className={`w-5 h-5 border-2 rounded shrink-0 flex items-center justify-center transition-colors ${
                          selectedCategories.includes(category.id)
                            ? "border-indigo-500 bg-indigo-500"
                            : "border-gray-300"
                        }`}
                      >
                        {selectedCategories.includes(category.id) && (
                          <Check className="w-3.5 h-3.5 text-white" />
                        )}
                      </div>
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-semibold text-gray-900 leading-none mb-1.5">
                        {category.name}
                      </div>
                      <div className="text-xs text-gray-500 line-clamp-2">
                        {category.description}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Delivery Frequency Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Delivery Frequency
              </h2>
              <p className="text-gray-500 text-sm mb-6">
                How often would you like to receive your newsletter?
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {frequencyOptions.map((frequency) => (
                  <label
                    key={frequency.id}
                    className={`relative flex flex-col p-4 rounded-xl border-2 cursor-pointer transition-all text-center ${
                      selectedFrequency === frequency.id
                        ? "border-indigo-500 bg-indigo-50/50 shadow-sm"
                        : "border-gray-100 hover:border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="frequency"
                      className="sr-only"
                      checked={selectedFrequency === frequency.id}
                      onChange={() => setSelectedFrequency(frequency.id)}
                    />
                    <div className="text-sm font-semibold text-gray-900 mb-1">
                      {frequency.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {frequency.description}
                    </div>

                    {/* Visual Check Indicator */}
                    <div className="mt-3 flex justify-center">
                      <div
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          selectedFrequency === frequency.id
                            ? "border-indigo-500 bg-indigo-500"
                            : "border-gray-300"
                        }`}
                      >
                        {selectedFrequency === frequency.id && (
                          <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                        )}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Area - Spans 1 column */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Summary</h2>

              <div className="space-y-6">
                {/* Selected Categories List */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-500">
                      Categories
                    </span>
                    <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                      {selectedCategories.length} selected
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3 min-h-[32px]">
                    {selectedCategories.length > 0 ? (
                      selectedCategories.map((id) => {
                        const cat = categories.find((c) => c.id === id);
                        return (
                          <span
                            key={id}
                            className="text-xs font-medium px-2.5 py-1 bg-gray-50 text-gray-700 rounded-md border border-gray-200"
                          >
                            {cat?.name}
                          </span>
                        );
                      })
                    ) : (
                      <span className="text-sm text-gray-400 italic">
                        No categories selected
                      </span>
                    )}
                  </div>
                </div>

                <hr className="border-gray-100" />

                {/* Selected Frequency */}
                <div>
                  <span className="text-sm font-medium text-gray-500 block mb-2">
                    Frequency
                  </span>
                  <span className="text-sm font-semibold text-gray-800 capitalize">
                    {frequencyOptions.find((f) => f.id === selectedFrequency)
                      ?.name || "Weekly"}
                  </span>
                </div>

                <div className="pt-4">
                  <button
                    disabled={selectedCategories.length === 0}
                    className={`w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-lg text-sm font-medium transition-colors shadow-sm ${
                      selectedCategories.length === 0
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    }`}
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Save Preferences</span>
                  </button>
                  {selectedCategories.length === 0 && (
                    <p className="text-xs text-center text-red-500 mt-2 font-medium">
                      Please select at least one category
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
