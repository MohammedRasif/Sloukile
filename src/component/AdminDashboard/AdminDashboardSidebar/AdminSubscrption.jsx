import React, { useState } from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import { useDarkMode } from '../../../context/ThemeContext';

const AdminSubscription = () => {
    const { darkMode } = useDarkMode();
    const [users, setUsers] = useState([
        {
            userName: "pappu",
            subscriptionId: "SUB-001",
            plan: "Enterprise",
            amount: "$599.00",
            status: "Active",
            nextBilling: "2023-07-01"
        },
        {
            userName: "pappu",
            subscriptionId: "SUB-001",
            plan: "Professional",
            amount: "$1000.00",
            status: "Active",
            nextBilling: "2023-07-01"
        },
        {
            userName: "pappu",
            subscriptionId: "SUB-001",
            plan: "Enterprise",
            amount: "$599.00",
            status: "Active",
            nextBilling: "2023-07-01"
        },
        {
            userName: "pappu",
            subscriptionId: "SUB-001",
            plan: "Enterprise",
            amount: "$599.00",
            status: "Active",
            nextBilling: "2023-07-01"
        },
        {
            userName: "pappu",
            subscriptionId: "SUB-001",
            plan: "Starter",
            amount: "$599.00",
            status: "Past Due",
            nextBilling: "2023-07-01"
        }
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newUser, setNewUser] = useState({
        userName: '',
        subscriptionId: '',
        plan: '',
        amount: '',
        status: 'Active',
        nextBilling: ''
    });

    // Filter users based on the search term
    const filteredUsers = users.filter(user =>
        user.userName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Open add user modal
    const openAddModal = () => {
        setIsAddModalOpen(true);
    };

    // Close add user modal
    const closeAddModal = () => {
        setIsAddModalOpen(false);
        setNewUser({ userName: '', subscriptionId: '', plan: '', amount: '', status: 'Active', nextBilling: '' });
    };

    // Handle input change for new user form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser({ ...newUser, [name]: value });
    };

    // Add new user
    const handleAddUser = (e) => {
        e.preventDefault();
        setUsers([...users, newUser]);
        closeAddModal();
    };

    return (
        <div className={`container mx-auto ${darkMode ? '' : ''}`}>
            <div className="flex justify-between py-6">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search users..."
                        className="py-2 pl-5 pr-10 w-[400px] bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-100"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <IoSearchOutline className="text-gray-500 dark:text-gray-300 absolute bottom-3 right-3" />
                </div>
                <div>
                    <button
                        onClick={openAddModal}
                        className="bg-[#00308F] dark:bg-blue-900 text-white dark:text-gray-100 px-4 py-2 rounded-md hover:bg-blue-800 dark:hover:bg-blue-800"
                    >
                        Add Subscription
                    </button>
                </div>
            </div>
            <div className="overflow-x-auto rounded-[6px]">
                <table className="min-w-full bg-white dark:bg-[#1E232E] border border-gray-300 dark:border-gray-700">
                    <thead>
                        <tr className="bg-[#00308F] dark:bg-blue-950 text-white dark:text-gray-100">
                            <th className="py-3 px-6 text-left text-sm font-semibold">User Name</th>
                            <th className="py-3 px-6 text-left text-sm font-semibold">Subscription ID</th>
                            <th className="py-3 px-6 text-left text-sm font-semibold">Plan</th>
                            <th className="py-3 px-6 text-left text-sm font-semibold">Amount</th>
                            <th className="py-3 px-6 text-left text-sm font-semibold">Status</th>
                            <th className="py-3 px-6 text-left text-sm font-semibold">Next Billing</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user, index) => (
                            <tr key={index} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                                <td className="py-3 px-6 text-sm text-gray-700 dark:text-gray-100">{user.userName}</td>
                                <td className="py-3 px-6 text-sm text-gray-700 dark:text-gray-100">{user.subscriptionId}</td>
                                <td className="py-3 px-6 text-sm text-gray-700 dark:text-gray-100">{user.plan}</td>
                                <td className="py-3 px-6 text-sm text-gray-700 dark:text-gray-100">{user.amount}</td>
                                <td className="py-3 px-6">
                                    <span
                                        className={`inline-block px-4 py-1 text-sm font-medium rounded-full ${
                                            user.status === 'Active'
                                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-400'
                                                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-400'
                                        }`}
                                    >
                                        {user.status}
                                    </span>
                                </td>
                                <td className="py-3 px-6 text-sm text-gray-700 dark:text-gray-100">{user.nextBilling}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add New Subscription Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-[#1E232E] p-10 rounded-lg shadow-lg max-w-md w-full border border-gray-200 dark:border-gray-700">
                        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Add New Subscription</h2>
                        <p className="text-gray-600 dark:text-gray-300 my-3">Create a new subscription entry.</p>
                        <form onSubmit={handleAddUser}>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    name="userName"
                                    value={newUser.userName}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                                    required
                                    placeholder="User Name"
                                />
                            </div>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    name="subscriptionId"
                                    value={newUser.subscriptionId}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                                    required
                                    placeholder="Subscription ID"
                                />
                            </div>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    name="plan"
                                    value={newUser.plan}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                                    required
                                    placeholder="Plan (e.g., Starter, Professional)"
                                />
                            </div>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    name="amount"
                                    value={newUser.amount}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                                    required
                                    placeholder="Amount (e.g., $599.00)"
                                />
                            </div>
                            <div className="mb-4">
                                <select
                                    name="status"
                                    value={newUser.status}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                                    required
                                >
                                    <option value="Active">Active</option>
                                    <option value="Past Due">Past Due</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    name="nextBilling"
                                    value={newUser.nextBilling}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                                    required
                                    placeholder="Next Billing (e.g., 2023-07-01)"
                                />
                            </div>
                            <div className="flex py-2 space-x-4">
                                <button
                                    type="button"
                                    onClick={closeAddModal}
                                    className="px-4 py-1 text-[#00308F] dark:text-blue-400 border border-[#00308F] dark:border-blue-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-1 bg-[#00308F] dark:bg-blue-900 text-white dark:text-gray-100 rounded-lg hover:bg-blue-800 dark:hover:bg-blue-800"
                                >
                                    Create +
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminSubscription;