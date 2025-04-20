import React, { useState } from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useDarkMode } from '../../../context/ThemeContext';

const AdminUserManagement = () => {
    const { darkMode } = useDarkMode();
    const [users, setUsers] = useState([
        {
            userName: "pappu",
            role: "UI/Ux",
            email: "pappyroy693@gmail.com",
            lastLogin: "4/24/2023 12:25:43 Am",
            status: "Active"
        },
        {
            userName: "john",
            role: "Frontend",
            email: "john@example.com",
            lastLogin: "4/24/2023 12:25:43 Am",
            status: "Active"
        },
        {
            userName: "alice",
            role: "Backend",
            email: "alice@example.com",
            lastLogin: "4/24/2023 12:25:43 Am",
            status: "In Active"
        },
        {
            userName: "pappu",
            role: "UI/Ux",
            email: "pappyroy693@gmail.com",
            lastLogin: "4/24/2023 12:25:43 Am",
            status: "Active"
        },
        {
            userName: "bob",
            role: "Frontend",
            email: "bob@example.com",
            lastLogin: "4/24/2023 12:25:43 Am",
            status: "Active"
        }
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [newUser, setNewUser] = useState({
        userName: '',
        role: '',
        email: '',
        password: '',
        status: 'Active'
    });

    // Filter users based on the search term
    const filteredUsers = users.filter(user =>
        user.userName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Open delete modal and set user to delete
    const openDeleteModal = (user) => {
        setUserToDelete(user);
        setIsDeleteModalOpen(true);
    };

    // Close delete modal
    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setUserToDelete(null);
    };

    // Delete user
    const handleDelete = () => {
        setUsers(users.filter(user => user.email !== userToDelete.email));
        closeDeleteModal();
    };

    // Open add user modal
    const openAddModal = () => {
        setIsAddModalOpen(true);
    };

    // Close add user modal
    const closeAddModal = () => {
        setIsAddModalOpen(false);
        setNewUser({ userName: '', role: '', email: '', password: '', status: 'Active' });
    };

    // Handle input change for new user form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser({ ...newUser, [name]: value });
    };

    // Add new user
    const handleAddUser = (e) => {
        e.preventDefault();
        setUsers([
            ...users,
            {
                ...newUser,
                lastLogin: new Date().toLocaleString()
            }
        ]);
        closeAddModal();
    };

    return (
        <div className={`container mx-auto ${darkMode ? 'dark bg-gray-800' : 'bg-white'}`}>
            <div className='flex justify-between py-6'>
                <div className='relative'>
                    <input
                        type="text"
                        placeholder='Search users...'
                        className='py-2 pl-5 w-[400px] bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-[10px] text-gray-800 dark:text-gray-100'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <IoSearchOutline className='text-[#989898] dark:text-gray-300 absolute bottom-4 right-3' />
                </div>
                <button
                    onClick={openAddModal}
                    className='bg-[#00308F] dark:bg-blue-900 p-3 rounded-[10px] text-[#FFFFFF] dark:text-gray-100 hover:bg-blue-800 dark:hover:bg-blue-800 cursor-pointer'
                >
                    Add New User +
                </button>
            </div>
            <div className="overflow-x-auto rounded-[6px]">
                <table className="min-w-full bg-white dark:bg-[#1E232E] border border-[#DDDDDD] dark:border-gray-700">
                    <thead>
                        <tr className="bg-[#00308F] dark:bg-blue-950 text-[#FFFFFF] dark:text-gray-100">
                            <th className="py-3 px-4 text-left text-sm font-semibold pl-10">User Name</th>
                            <th className="py-3 px-4 text-left text-sm font-semibold">Role</th>
                            <th className="py-3 px-4 text-left text-sm font-semibold">Email</th>
                            <th className="py-3 px-4 text-left text-sm font-semibold">Last Login</th>
                            <th className="py-3 px-4 text-left text-sm font-semibold">Status</th>
                            <th className="py-3 px-4 text-left text-sm font-semibold">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user, index) => (
                            <tr key={index} className="border-b text-[#797979] dark:text-gray-100 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                                <td className="py-3 px-4 text-sm text-gray-700 dark:text-gray-100 pl-12">{user.userName}</td>
                                <td className="py-3 px-4 text-sm text-gray-700 dark:text-gray-100">{user.role}</td>
                                <td className="py-3 px-4 text-sm text-gray-700 dark:text-gray-100">{user.email}</td>
                                <td className="py-3 px-4 text-sm text-gray-700 dark:text-gray-100">{user.lastLogin}</td>
                                <td className="py-3 px-4">
                                    <span
                                        className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${
                                            user.status === 'Active'
                                                ? 'text-[#3C3C3C] bg-[#7FEFB9] dark:bg-green-900 dark:text-green-400'
                                                : 'text-white bg-[#E88888] dark:bg-red-900 dark:text-red-400'
                                        }`}
                                    >
                                        {user.status}
                                    </span>
                                </td>
                                <td className="py-3 px-4 text-[#FF0000] dark:text-red-400 cursor-pointer">
                                    <RiDeleteBin6Line onClick={() => openDeleteModal(user)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Delete Confirmation Modal */}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 backdrop-blur-[3px] flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-[#1E232E] p-6 rounded-lg shadow-lg max-w-sm w-full border border-gray-200 dark:border-gray-700">
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
                            Confirm Deletion
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                            Are you sure you want to delete the user "{userToDelete?.userName}"?
                        </p>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={closeDeleteModal}
                                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 bg-red-600 dark:bg-red-700 text-white dark:text-gray-100 rounded-lg hover:bg-red-700 dark:hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Add New User Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 backdrop-blur-[3px] flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-[#1E232E] p-10 rounded-lg shadow-lg max-w-md w-full border border-gray-200 dark:border-gray-700">
                        <h2 className="text-[27px] font-semibold text-[#373737] dark:text-gray-100">
                            Add New User
                        </h2>
                        <p className="text-[#373737] dark:text-gray-300 my-3">Create a new user account and assign roles.</p>
                        <form onSubmit={handleAddUser}>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    name="userName"
                                    value={newUser.userName}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                                    required
                                    placeholder="Full Name"
                                />
                            </div>
                            <div className="mb-4">
                                <input
                                    type="email"
                                    name="email"
                                    value={newUser.email}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                                    required
                                    placeholder="Email"
                                />
                            </div>
                            <div className="mb-4">
                                <input
                                    type="password"
                                    name="password"
                                    value={newUser.password}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                                    required
                                    placeholder="Password"
                                />
                            </div>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    name="role"
                                    value={newUser.role}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                                    required
                                    placeholder="Role"
                                />
                            </div>
                            <div className="flex py-2 space-x-4">
                                <button
                                    type="button"
                                    onClick={closeAddModal}
                                    className="px-4 py-1 cursor-pointer text-[#00308F] dark:text-blue-400 border border-[#00308F] dark:border-blue-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-1 cursor-pointer bg-[#00308F] dark:bg-blue-900 text-white dark:text-gray-100 rounded-lg hover:bg-blue-800 dark:hover:bg-blue-800"
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

export default AdminUserManagement;