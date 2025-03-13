"use client"

import { useState, useEffect } from "react"
import { ChevronDown, ChevronUp, Check, Search } from "lucide-react"
import { FiSearch } from "react-icons/fi"
import { MdVerified } from "react-icons/md"

const TaskList = () => {
    // Define tasks array first so we can use it to initialize filteredTasks
    const tasks = [
        {
            id: "Foundation",
            title: "Foundation",
            deadline: "2.10.2025",
            description:
                "Establish Project Infrastructure. Design The Core Architecture, And Develop The Basic UI/UX Framework.",
        },
        {
            id: "UserRegistration",
            title: "User Registration And Login",
            deadline: "2.10.2025",
            description: "Implement user authentication system",
        },
        {
            id: "UserProfile",
            title: "User Profile Management",
            deadline: "2.10.2025",
            description: "Create user profile management system",
        },
        {
            id: "PaymentGateway",
            title: "Secure Payment Gateway Integration",
            deadline: "2.10.2025",
            description: "Integrate payment processing system",
        },
        {
            id: "ProductReviews",
            title: "Product Reviews And Ratings",
            deadline: "2.10.2025",
            description: "Implement product review system",
        },
        {
            id: "SearchFunc",
            title: "Search Functionality",
            deadline: "2.10.2025",
            description: "Develop search and filter system",
        },
    ]

    const [expandedTask, setExpandedTask] = useState("Foundation")
    const [showConfirmModal, setShowConfirmModal] = useState(false)
    const [selectedTask, setSelectedTask] = useState(null)
    const [searchTerm, setSearchTerm] = useState("")
    // Initialize filteredTasks with all tasks
    const [filteredTasks, setFilteredTasks] = useState(tasks)

    const [completedTasksList, setCompletedTasksList] = useState([
        "Search Functionality",
        "Secure Payment Gateway Integration",
        "Responsive Design For Various Devices",
        "Secure Payment Gateway Integration",
        "Secure Payment Gateway Integration",
        "Secure Payment Gateway Integration",
        "Secure Payment Gateway Integration",
    ])

    // Create a filtered version of completed tasks
    const [filteredCompletedTasks, setFilteredCompletedTasks] = useState(completedTasksList)

    // Filter tasks based on search term - only depends on searchTerm
    useEffect(() => {
        if (!searchTerm.trim()) {
            setFilteredTasks(tasks)
            setFilteredCompletedTasks(completedTasksList)
            return
        }

        const searchLower = searchTerm.toLowerCase()

        // Filter tasks
        const filtered = tasks.filter(
            (task) => task.title.toLowerCase().includes(searchLower) || task.description.toLowerCase().includes(searchLower),
        )
        setFilteredTasks(filtered)

        // Filter completed tasks
        const filteredCompleted = completedTasksList.filter((task) => task.toLowerCase().includes(searchLower))
        setFilteredCompletedTasks(filteredCompleted)

        // Auto-expand the first matching task if there's a search term
        if (filtered.length > 0 && searchTerm.trim()) {
            setExpandedTask(filtered[0].id)
        }
    }, [searchTerm, completedTasksList]) // Include completedTasksList in dependencies

    const handleTaskClick = (taskId) => {
        setSelectedTask(taskId)
        setShowConfirmModal(true)
    }

    const handleIconClick = (e, taskId) => {
        e.stopPropagation() // Prevent task click event
        setExpandedTask(expandedTask === taskId ? null : taskId)
    }

    const handleConfirm = () => {
        const task = tasks.find((t) => t.id === selectedTask)
        if (task && !completedTasksList.includes(task.title)) {
            const updatedCompletedTasks = [...completedTasksList, task.title]
            setCompletedTasksList(updatedCompletedTasks)

            // Update filtered completed tasks if there's a search term
            if (searchTerm.trim()) {
                const searchLower = searchTerm.toLowerCase()
                setFilteredCompletedTasks(updatedCompletedTasks.filter((task) => task.toLowerCase().includes(searchLower)))
            } else {
                setFilteredCompletedTasks(updatedCompletedTasks)
            }
        }
        setShowConfirmModal(false)
    }

    // Helper function to highlight search matches
    const highlightMatch = (text, term) => {
        if (!term || !text.toLowerCase().includes(term.toLowerCase())) {
            return text
        }

        const regex = new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi")
        const parts = text.split(regex)

        return parts.map((part, i) =>
            regex.test(part) ? (
                <span key={i} className="bg-yellow-200">
                    {part}
                </span>
            ) : (
                part
            ),
        )
    }

    return (
        <div className="border-t border-gray-300">
            <div className="container mx-auto p-4">
                {/* Search Field */}
                <div className="relative flex-1 max-w-md mb-5">
                    <input
                        type="text"
                        placeholder="Search your project name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-2 pl-10 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#CBB702]"
                    />
                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>

                <div className="flex gap-4">
                    {/* Tasks Column */}
                    <div className="w-1/2">
                        <div className="bg-yellow-500 p-3 font-semibold">Task</div>
                        <div className="border border-yellow-200">
                            {filteredTasks.length > 0 ? (
                                filteredTasks.map((task) => (
                                    <div key={task.id} className="border-b text-[18px] border-yellow-100 last:border-b-0">
                                        <div
                                            className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
                                            onClick={() => handleTaskClick(task.id)}
                                        >
                                            <div className="flex-1">
                                                <div className="font-medium">{highlightMatch(task.title, searchTerm)}</div>
                                                <div className="text-sm text-gray-600">Deadline: {task.deadline}</div>
                                                {expandedTask === task.id && (
                                                    <div className="mt-2 text-sm text-gray-600">Description: {task.description}</div>
                                                )}
                                            </div>
                                            <button onClick={(e) => handleIconClick(e, task.id)} className="p-1 hover:bg-gray-100 rounded">
                                                {expandedTask === task.id ? (
                                                    <ChevronUp className="h-5 w-5" />
                                                ) : (
                                                    <ChevronDown className="h-5 w-5" />
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="p-4 text-center text-gray-500">No tasks found matching "{searchTerm}"</div>
                            )}
                        </div>
                    </div>

                    {/* Completed Tasks Column */}
                    <div className="w-1/2">
                        <div className="bg-white border border-yellow-200 p-3 font-semibold">Completed Task</div>
                        <div className="border border-yellow-200">
                            {filteredCompletedTasks.length > 0 ? (
                                filteredCompletedTasks.map((task, index) => (
                                    <div key={index} className="text-[18px] font-[500] p-4 border-b border-yellow-300 last:border-b-0 bg-green-100">
                                        <div className="flex items-center gap-2">
                                            {/* <Check className="h-5 w-5 text-green-600" /> */}
                                            <span>{highlightMatch(task, searchTerm)}</span>
                                        </div>
                                        <div className=" flex items-center space-x-2">
                                        <MdVerified className="text-green-600" />

                                        <div className=" text-[14px] text-green-600">Complete</div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="p-4 text-center text-gray-500">No completed tasks found matching "{searchTerm}"</div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Confirmation Modal */}
                {showConfirmModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div className="fixed inset-0 backdrop-blur-sm" onClick={() => setShowConfirmModal(false)}></div>
                        <div className="relative z-10 bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
                            <h2 className="text-xl font-semibold mb-4">Confirm Task Completion</h2>
                            <p className="text-gray-600 mb-6">Are you sure you want to mark this task as complete?</p>
                            <div className="flex justify-end gap-2">
                                <button
                                    onClick={() => setShowConfirmModal(false)}
                                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button onClick={handleConfirm} className="bg-[#CBB702] text-white px-4 py-2 rounded-md hover:bg-amber-500">
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default TaskList

