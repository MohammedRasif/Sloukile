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
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="p-5">
          <h1 className="text-3xl font-bold text-gray-900">Manage Subscription</h1>
        </div>

        {/* Status Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                <CreditCard className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Active Subscription</h2>
                <p className="text-sm text-gray-500">Your subscription is currently active</p>
              </div>
            </div>
            <span className="px-3 py-1 text-sm font-medium text-green-700 bg-green-100 rounded-full">Active</span>
          </div>
        </div>

        {/* Subscription Details */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Pack Name Section */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
              <Package className="h-5 w-5 text-gray-400" />
              <h3 className="text-lg font-medium text-gray-900">Subscription Pack</h3>
            </div>
            <input
              type="text"
              value={subscriptionData.packName}
              readOnly
              className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
            />
          </div>

          {/* Bill Info Section */}
          <div className="p-6">
            <div className="flex items-center space-x-3 mb-6">
              <AlertCircle className="h-5 w-5 text-gray-400" />
              <h3 className="text-lg font-medium text-gray-900">Billing Information</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Field */}
              <div>
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                  <User className="h-4 w-4 text-gray-400" />
                  <span>Name</span>
                </label>
                <input
                  type="text"
                  value={subscriptionData.name}
                  readOnly
                  className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                />
              </div>

              {/* Email Field */}
              <div>
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span>Email</span>
                </label>
                <input
                  type="email"
                  value={subscriptionData.email}
                  readOnly
                  className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                />
              </div>

              {/* Purchase Date */}
              <div>
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span>Purchase Date</span>
                </label>
                <input
                  type="text"
                  value={subscriptionData.purchase}
                  readOnly
                  className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                />
              </div>

              {/* Expiry Date */}
              <div>
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span>Expiry Date</span>
                </label>
                <input
                  type="text"
                  value={subscriptionData.expiry}
                  readOnly
                  className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="">
              <button
                onClick={handleCancel}
                className="px-4 py-2 border border-red-500 hover:bg-red-50 rounded-md transition-colors duration-200"
              >
                Cancel Subscription
              </button>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center text-sm text-gray-500">
          Need help? Contact our support team at support@example.com
        </div>
      </div>
    </div>
  )
}

export default ManageSubscription
