import { Search, Mail, Phone, Calendar, MoreVertical, Plus } from "lucide-react";
import { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { NavLink } from "react-router-dom";

const Team = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleDeleteClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };

    const handleConfirmDelete = () => {
        console.log("Item deleted!");
        setIsPopupOpen(false);
    };
    // Sample team member data
    const teamMembers = [
        {
            id: 1,
            name: "Sarah Johnson",
            position: "Senior Developer",
            projects: 4,
            email: "Sarah.J@Example.Com",
            phone: "(555) 123-4567",
            joinDate: "Jan 2025",
        },
        {
            id: 2,
            name: "Sarah Johnson",
            position: "Senior Developer",
            projects: 4,
            email: "Sarah.J@Example.Com",
            phone: "(555) 123-4567",
            joinDate: "Jan 2025",
        },
        {
            id: 3,
            name: "Sarah Johnson",
            position: "Senior Developer",
            projects: 4,
            email: "Sarah.J@Example.Com",
            phone: "(555) 123-4567",
            joinDate: "Jan 2025",
        },
        {
            id: 4,
            name: "Sarah Johnson",
            position: "Senior Developer",
            projects: 4,
            email: "Sarah.J@Example.Com",
            phone: "(555) 123-4567",
            joinDate: "Jan 2025",
        },
        {
            id: 5,
            name: "Sarah Johnson",
            position: "Senior Developer",
            projects: 4,
            email: "Sarah.J@Example.Com",
            phone: "(555) 123-4567",
            joinDate: "Jan 2025",
        },
        {
            id: 6,
            name: "Sarah Johnson",
            position: "Senior Developer",
            projects: 4,
            email: "Sarah.J@Example.Com",
            phone: "(555) 123-4567",
            joinDate: "Jan 2025",
        },
        {
            id: 7,
            name: "Sarah Johnson",
            position: "Senior Developer",
            projects: 4,
            email: "Sarah.J@Example.Com",
            phone: "(555) 123-4567",
            joinDate: "Jan 2025",
        },
    ];

    return (
        <div className="bg-gray-50 dark:bg-[#1E232E] min-h-screen p-6 text-gray-800 dark:text-gray-200 roboto">
            <div className="mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                        Team Management
                    </h1>
                </div>

                {/* Search and Add */}
                <div className="flex justify-between items-center mb-6">
                    <div className="relative w-full max-w-md">
                        <input
                            type="text"
                            placeholder="Search Team Member..."
                            className="w-full pl-4 pr-10 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#2A2F3B] text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00308F] dark:focus:ring-[#4A6CF7]"
                        />
                        <Search
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
                            size={20}
                        />
                    </div>
                    <button className="bg-[#00308F] dark:bg-[#4A6CF7] text-white px-4 py-2 rounded-md flex items-center hover:bg-[#002266] dark:hover:bg-[#3B5AEB] transition-colors cursor-pointer">
                        <Plus size={16} className="mr-1" />
                        Add New Member
                    </button>
                </div>

                {/* Team Members Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {teamMembers.map((member) => (
                        <div
                            key={member.id}
                            className="bg-white dark:bg-[#2A2F3B] p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 hover:bg-[#f5efe8af]"
                        >
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h3 className="text-[24px] font-bold text-gray-800 dark:text-gray-100">
                                        {member.name}
                                    </h3>
                                    <p className="text-gray-500 dark:text-gray-400">
                                        {member.position}
                                    </p>
                                    <p className="text-[#00308F] text-[18px] dark:text-[#4A6CF7] font-medium mt-1">
                                        {member.projects} Projects
                                    </p>
                                </div>
                                <button
                                    onClick={handleDeleteClick}
                                    className="text-red-500 dark:text-red-500 hover:text-red-600 dark:hover:text-red-600 cursor-pointer">
                                    <RiDeleteBin6Line size={20} />
                                </button>
                            </div>
                            <div className="mt-4 space-y-2">
                                <div className="flex items-center text-gray-600 dark:text-gray-300">
                                    <Mail
                                        size={16}
                                        className="mr-2 text-gray-500 dark:text-gray-400"
                                    />
                                    <span>{member.email}</span>
                                </div>
                                <div className="flex items-center text-gray-600 dark:text-gray-300">
                                    <Phone
                                        size={16}
                                        className="mr-2 text-gray-500 dark:text-gray-400"
                                    />
                                    <span>{member.phone}</span>
                                </div>
                                <div className="flex items-center text-gray-600 dark:text-gray-300">
                                    <Calendar
                                        size={16}
                                        className="mr-2 text-gray-500 dark:text-gray-400"
                                    />
                                    <span>Joined: {member.joinDate}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                    {/* Add Team Management Card */}
                    <div className="bg-white dark:bg-[#2A2F3B] p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-600 flex items-center justify-center mb-4">
                            <Plus className="h-6 w-6 text-gray-500 dark:text-gray-300" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">
                            Create A New Project
                        </h3>
                        <NavLink to="/dashboard/chat">
                            <button className="bg-[#00308F] dark:bg-[#4A6CF7] text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-[#00218f] dark:hover:bg-[#3B5AEB] transition-colors">
                                <Plus className="h-4 w-4" />
                                <span>Add New Member</span>
                            </button>
                        </NavLink>
                    </div>
                    {isPopupOpen && (
                        <div className="fixed inset-0 flex items-center justify-center z-50">
                            <div className="absolute inset-0 backdrop-blur-[3px] shadow-md"></div>
                            <div className="relative bg-white dark:bg-[#1E232E] rounded-xl shadow-sm p-8 w-[400px] max-w-[90vw] border border-gray-200 dark:border-gray-700">
                                <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4 text-center">
                                    Confirm Deletion
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
                                    Are you sure you want to delete this item? This action cannot be undone.
                                </p>
                                <div className="flex justify-center gap-4">
                                    <button
                                        onClick={handleConfirmDelete}
                                        className="bg-red-500 dark:bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-600 dark:hover:bg-red-700 transition-colors font-medium cursor-pointer"
                                    >
                                        Delete
                                    </button>
                                    <button
                                        onClick={handleClosePopup}
                                        className="bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 px-6 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors font-medium cursor-pointer"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Team;