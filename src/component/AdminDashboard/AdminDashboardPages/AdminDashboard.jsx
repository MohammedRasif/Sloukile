"use client"

import { BellIcon, ChevronDownIcon, TrashIcon, XIcon } from "lucide-react"
import { useState } from "react"
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const lineChartData = [
    { name: "Jan", value: 5000 },
    { name: "Feb", value: 8000 },
    { name: "Mar", value: 12000 },
    { name: "Apr", value: 30000 },
    { name: "May", value: 15000 },
    { name: "Jun", value: 10000 },
    { name: "Jul", value: 7000 },
    { name: "Aug", value: 18000 },
    { name: "Sep", value: 15000 },
    { name: "Oct", value: 12000 },
    { name: "Nov", value: 14000 },
    { name: "Dec", value: 13000 },
]

const barChartData = [
    { name: "Mon", value: 30 },
    { name: "Tue", value: 45 },
    { name: "Wed", value: 25 },
    { name: "Thu", value: 40 },
    { name: "Fri", value: 55 },
    { name: "Sat", value: 30 },
    { name: "Sun", value: 45 },
]

const usersData = [
    {
        id: 1,
        name: "pappu",
        role: "Admin",
        email: "pappuroy93@gmail.com",
        lastLogin: "4/24/2023 (12:25:43 Am)",
        status: "Active",
    },
    {
        id: 2,
        name: "pappu",
        role: "Admin",
        email: "pappuroy93@gmail.com",
        lastLogin: "4/24/2023 (12:25:43 Am)",
        status: "Active",
    },
    {
        id: 3,
        name: "pappu",
        role: "Admin",
        email: "pappuroy93@gmail.com",
        lastLogin: "4/24/2023 (12:25:43 Am)",
        status: "Active",
    },
    {
        id: 4,
        name: "pappu",
        role: "Admin",
        email: "pappuroy93@gmail.com",
        lastLogin: "4/24/2023 (12:25:43 Am)",
        status: "Inactive",
    },
    {
        id: 5,
        name: "pappu",
        role: "Admin",
        email: "pappuroy93@gmail.com",
        lastLogin: "4/24/2023 (12:25:43 Am)",
        status: "Active",
    },
    {
        id: 6,
        name: "pappu",
        role: "Admin",
        email: "pappuroy93@gmail.com",
        lastLogin: "4/24/2023 (12:25:43 Am)",
        status: "Active",
    },
    {
        id: 7,
        name: "pappu",
        role: "Admin",
        email: "pappuroy93@gmail.com",
        lastLogin: "4/24/2023 (12:25:43 Am)",
        status: "Active",
    },
    {
        id: 8,
        name: "pappu",
        role: "Admin",
        email: "pappuroy93@gmail.com",
        lastLogin: "4/24/2023 (12:25:43 Am)",
        status: "Active",
    },
]

const statCardsData = [
    {
        title: "Total Users",
        value: "12,000",
        change: "+12% From Last Month",
        bgColor: "bg-purple-50",
        textColor: "text-purple-600",
        icon: "👥",
    },
    {
        title: "Total Revenue",
        value: "$36,000",
        change: "+12% From Last Month",
        bgColor: "bg-green-50",
        textColor: "text-green-600",
        icon: "💰",
    },
    {
        title: "Active Subscriptions",
        value: "$36,000",
        change: "+12% From Last Month",
        bgColor: "bg-yellow-50",
        textColor: "text-yellow-600",
        icon: "🔄",
    },
    {
        title: "Projects Created",
        value: "2,345",
        change: "+12% From Last Month",
        bgColor: "bg-blue-50",
        textColor: "text-blue-600",
        icon: "📊",
    },
]

const AdminDashboard = () => {
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [userToDelete, setUserToDelete] = useState(null)

    const handleDeleteClick = (userId) => {
        setUserToDelete(userId)
        setShowDeleteModal(true)
    }

    const handleConfirmDelete = () => {
        console.log(`Deleting user with ID: ${userToDelete}`)
        setShowDeleteModal(false)
        setUserToDelete(null)
    }

    const handleCancelDelete = () => {
        setShowDeleteModal(false)
        setUserToDelete(null)
    }

    return (
        <div className="min-h-screen bg-gray-50 roboto">
            <div>
                <div className="mx-auto px-4 py-4 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Good morning</h1>
                        <p className="text-sm text-gray-500 pl-1">Overview of your system performance and activities.</p>
                    </div>
                </div>
            </div>

            <div className="mx-auto px-4 py-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {statCardsData.map((card, index) => (
                        <StatCard
                            key={index}
                            title={card.title}
                            value={card.value}
                            change={card.change}
                            bgColor={card.bgColor}
                            textColor={card.textColor}
                            icon={card.icon}
                        />
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white p-4 rounded-lg shadow">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-md font-medium">Total Revenue</h2>
                            <div className="flex items-center gap-2">
                                <span className="text-md text-gray-500">Yearly</span>
                                <ChevronDownIcon className="h-4 w-4 text-gray-500" />
                            </div>
                        </div>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart
                                    data={lineChartData}
                                    margin={{
                                        top: 10,
                                        right: 30,
                                        left: 0,
                                        bottom: 0,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6B7280" }} />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fontSize: 12, fill: "#6B7280" }}
                                        tickFormatter={(value) => `${value / 1000}k`}
                                    />
                                    <Tooltip
                                        content={({ active, payload }) => {
                                            if (active && payload && payload.length) {
                                                return (
                                                    <div className="bg-blue-800 text-white px-3 py-1 rounded shadow-md text-center">
                                                        <p className="text-sm font-medium">${payload[0].value.toLocaleString()}</p>
                                                    </div>
                                                )
                                            }
                                            return null
                                        }}
                                    />
                                    <defs>
                                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#1e40af" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#1e40af" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <Area
                                        type="monotone"
                                        dataKey="value"
                                        stroke="#1e40af"
                                        strokeWidth={2}
                                        fill="url(#colorValue)"
                                        dot={{ r: 4, fill: "#1e40af", strokeWidth: 0 }}
                                        activeDot={{ r: 6, fill: "#1e40af", stroke: "#fff", strokeWidth: 2 }}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-md font-medium">Total project created</h2>
                            <div className="flex items-center gap-2">
                                <span className="text-md text-gray-500">Weekly</span>
                                <ChevronDownIcon className="h-4 w-4 text-gray-500" />
                            </div>
                        </div>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={barChartData}>
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                    <Tooltip />
                                    <Bar dataKey="value" fill="#1e40af" radius={[4, 4, 0, 0]} barSize={30} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="p-4">
                        <div className="relative mb-4">
                            <input
                                type="text"
                                placeholder="Search Users..."
                                className="w-96 pl-5 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-blue-900 text-white">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">User Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Role</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Email</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Last Login</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {usersData.map((user) => (
                                        <tr key={user.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.role}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.lastLogin}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span
                                                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                                                >
                                                    {user.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <button className="text-red-500 hover:text-red-700" onClick={() => handleDeleteClick(user.id)}>
                                                    <TrashIcon className="h-5 w-5" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {showDeleteModal && (
                <div className="fixed inset-0 backdrop-blur-[3px] flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 shadow-xl max-w-md w-full">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-medium">Confirm Delete</h3>
                            <button onClick={handleCancelDelete} className="text-gray-500 hover:text-gray-700">
                                <XIcon className="h-5 w-5" />
                            </button>
                        </div>
                        <div className="mb-6">
                            <p className="text-gray-600">Are you sure you want to delete this user? This action cannot be undone.</p>
                        </div>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={handleCancelDelete}
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmDelete}
                                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

const StatCard = ({ title, value, change, bgColor, textColor, icon }) => {
    return (
        <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start">
                <div className="text-content">
                    <p className="text-xl text-gray-500">{title}</p>
                    <h3 className="text-2xl font-bold mt-1">{value}</h3>
                    <p className={`text-xs ${textColor} mt-1`}>{change}</p>
                </div>
                <div className={`${bgColor} p-3 rounded-full`}>
                    <span className="text-xl">{icon}</span>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard