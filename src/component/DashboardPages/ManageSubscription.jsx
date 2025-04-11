"use client"

import { useState } from "react"
import { CreditCard, Calendar, Mail, User, Package, AlertCircle } from "lucide-react"

const ManageSubscription = () => {
  const [subscriptionData] = useState({
    packName: "Premium Plan",
    name: "John Doe",
    email: "john.doe@example.com",
    purchase: "Oct 15, 2023",
    expiry: "Oct 15, 2024",
  })

  const handleCancel = () => {
    // Handle subscription cancellation
    console.log("Cancelling subscription...")
  }

  return (
    <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8 text-gray-800 dark:text-gray-200">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="p-5">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Manage Subscription</h1>
        </div>

        {/* Status Card */}
        <div className="bg-white dark:bg-[#1E232E] rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <CreditCard className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Active Subscription</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Your subscription is currently active</p>
              </div>
            </div>
            <span className="px-3 py-1 text-sm font-medium text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-900/30 rounded-full">
              Active
            </span>
          </div>
        </div>

        {/* Subscription Details */}
        <div className="bg-white dark:bg-[#1E232E] rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Pack Name Section */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3 mb-4">
              <Package className="h-5 w-5 text-gray-400 dark:text-gray-500" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Subscription Pack</h3>
            </div>
            <input
              type="text"
              value={subscriptionData.packName}
              readOnly
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-[#2A2F3B] text-gray-800 dark:text-gray-200"
            />
          </div>

          {/* Bill Info Section */}
          <div className="p-6">
            <div className="flex items-center space-x-3 mb-6">
              <AlertCircle className="h-5 w-5 text-gray-400 dark:text-gray-500" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Billing Information</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Field */}
              <div>
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <User className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                  <span>Name</span>
                </label>
                <input
                  type="text"
                  value={subscriptionData.name}
                  readOnly
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-[#2A2F3B] text-gray-800 dark:text-gray-200"
                />
              </div>

              {/* Email Field */}
              <div>
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Mail className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                  <span>Email</span>
                </label>
                <input
                  type="email"
                  value={subscriptionData.email}
                  readOnly
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-[#1E232E] text-gray-800 dark:text-gray-200"
                />
              </div>

              {/* Purchase Date */}
              <div>
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Calendar className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                  <span>Purchase Date</span>
                </label>
                <input
                  type="text"
                  value={subscriptionData.purchase}
                  readOnly
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-[#2A2F3B] text-gray-800 dark:text-gray-200"
                />
              </div>

              {/* Expiry Date */}
              <div>
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Calendar className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                  <span>Expiry Date</span>
                </label>
                <input
                  type="text"
                  value={subscriptionData.expiry}
                  readOnly
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-[#1E232E] text-gray-800 dark:text-gray-200"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="px-6 py-4 bg-gray-50 dark:bg-[#1E232E] border-t border-gray-200 dark:border-gray-700">
            <div>
              <button
                onClick={handleCancel}
                className="px-4 py-2 border border-[#E7E7E7] dark:border-gray-600 text-gray-700 dark:bg-[#2A2F3B] dark:text-gray-200 hover:bg-red-50 dark:hover:bg-[#232833] rounded-md  duration-200 cursor-pointer"
              >
                Cancel Subscription
              </button>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          Need help? Contact our support team at support@example.com
        </div>
      </div>
    </div>
  )
}

export default ManageSubscription