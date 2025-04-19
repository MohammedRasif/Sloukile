"use client"

import { Trash2 } from "lucide-react"

const AdminNotification = () => {
    // Sample notification data organized by day
    const notificationData = {
        today: [
            {
                id: 1,
                title: "New Project Created: AI Business Expansion",
                time: "5 min ago",
                description:
                    "A new project titled 'AI Business Expansion' has been successfully created. Review project details and assign team members.",
            },
            {
                id: 2,
                title: "Project Milestone Reached: Phase 1 Completed",
                time: "5 min ago",
                description:
                    "Phase 1 of 'Marketing Automation System' is completed. Review the progress and prepare for the next steps.",
            },
            {
                id: 3,
                title: "Project Deadline Approaching",
                time: "5 min ago",
                description:
                    "The deadline for 'Product Launch Strategy' is in 3 days. Ensure all deliverables are completed on time.",
            },
        ],
        yesterday: [
            {
                id: 4,
                title: "Potential Budget Overrun Detected",
                time: "5 min ago",
                description:
                    "The estimated project budget has exceeded 85% of the allocated funds. Consider adjusting resources.",
            },
            {
                id: 5,
                title: "Project Deadline Approaching",
                time: "5 min ago",
                description:
                    "The deadline for 'Product Launch Strategy' is in 3 days. Ensure all deliverables are completed on time.",
            },
            {
                id: 6,
                title: "Project Deadline Approaching",
                time: "5 min ago",
                description:
                    "The deadline for 'Product Launch Strategy' is in 3 days. Ensure all deliverables are completed on time.",
            },
        ],
    }

    return (
        <div className="container mx-auto p-4 space-y-6">

            <h1 className="text-4xl font-bold">Notification</h1>
            {/* Today's notifications */}
            <div>
                <div className="flex items-center mb-2">
                    <h2 className="text-lg font-medium text-gray-600">Today</h2>
                    <div className="ml-2 bg-blue-600 text-white text-sm rounded-full w-5 h-5 flex items-center justify-center">
                        {notificationData.today.length}
                    </div>
                </div>

                <div className="space-y-3">
                    {notificationData.today.map((notification) => (
                        <div key={notification.id} className="bg-white border border-gray-200 rounded-md p-4">
                            <div className="flex justify-between ">
                                <div>
                                    <div className=" flex items-center space-x-6 mb-1">
                                        <h3 className="text-base font-semibold">{notification.title}</h3>
                                        <span className="text-sm text-gray-500">{notification.time}</span>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-3">{notification.description}</p>
                                </div>

                                <div className=" space-x-2 items-center">
                                    <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 h-7 rounded-md">
                                        View
                                    </button>
                                    <button className="border-none text-red-500 hover:bg-red-50 p-1 h-7 cursor-pointer">
                                        <Trash2 size={18} className="mt-1" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Yesterday's notifications */}
            <div>
                <div className="flex items-center mb-2">
                    <h2 className="text-lg font-medium text-gray-600">Yesterday</h2>
                    <div className="ml-2 bg-blue-600 text-white text-sm rounded-full w-5 h-5 flex items-center justify-center cursor-pointer">
                        {notificationData.yesterday.length}
                    </div>
                </div>

                <div className="space-y-3">
                    {notificationData.yesterday.map((notification) => (
                        <div key={notification.id} className="bg-white border border-gray-200 rounded-md p-4">
                            <div className="flex justify-between ">
                                <div>
                                    <div className=" flex items-center space-x-6 mb-1">
                                        <h3 className="text-base font-semibold">{notification.title}</h3>
                                        <span className="text-sm text-gray-500">{notification.time}</span>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-3">{notification.description}</p>
                                </div>

                                <div className=" space-x-2 items-center">
                                    <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 h-7 rounded-md cursor-pointer">
                                        View
                                    </button>
                                    <button className="border-none text-red-500 hover:bg-red-50 p-1 h-7 cursor-pointer">
                                        <Trash2 size={18} className="mt-1" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AdminNotification