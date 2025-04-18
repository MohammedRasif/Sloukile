import React, { useState } from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import { RiDeleteBin6Line } from 'react-icons/ri';

const AdminUserManagement = () => {
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
        password: '', // Added password field
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
                lastLogin: new Date().toLocaleString() // Add current timestamp for lastLogin
            }
        ]);
        closeAddModal();
    };

    return (
        <div className="container mx-auto ">
            <div className='flex justify-between py-6'>
                <div className='relative'>
                    <input
                        type="text"
                        placeholder='Search users...'
                        className='py-2 pl-5 w-[400px] bg-white border border-gray-300 rounded-[10px]'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <IoSearchOutline className='text-[#989898] absolute bottom-4 right-3' />
                </div>
                <button
                    onClick={openAddModal}
                    className='bg-[#00308F] p-3 rounded-[10px] text-[#FFFFFF] cursor-pointer'
                >
                    Add New User +
                </button>
            </div>
            <div className="overflow-x-auto rounded-[6px]">
                <table className="min-w-full bg-white border border-[#DDDDDD]">
                    <thead>
                        <tr className="bg-[#00308F] text-[#FFFFFF]">
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
                            <tr key={index} className="border-b text-[#797979] border-gray-200">
                                <td className="py-3 px-4 text-sm text-gray-700 pl-12">{user.userName}</td>
                                <td className="py-3 px-4 text-sm text-gray-700">{user.role}</td>
                                <td className="py-3 px-4 text-sm text-gray-700">{user.email}</td>
                                <td className="py-3 px-4 text-sm text-gray-700">{user.lastLogin}</td>
                                <td className="py-3 px-4">
                                    <span
                                        className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${user.status === 'Active'
                                            ? 'text-[#3C3C3C] bg-[#7FEFB9]'
                                            : 'text-white bg-[#E88888]'
                                            }`}
                                    >
                                        {user.status}
                                    </span>
                                </td>
                                <td className="py-3 px-4 text-[#FF0000] cursor-pointer">
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
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">
                            Confirm Deletion
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Are you sure you want to delete the user "{userToDelete?.userName}"?
                        </p>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={closeDeleteModal}
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
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
                    <div className="bg-white p-10 rounded-lg shadow-lg max-w-md w-full">
                        <h2 className="text-[27px] font-semibold text-[#373737]">
                            Add New User
                        </h2>
                        <p className="text-[#373737] my-3">Create a new user account and assign roles.</p>
                        <form onSubmit={handleAddUser}>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    name="userName"
                                    value={newUser.userName}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded-lg"
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
                                    className="w-full p-2 border border-gray-300 rounded-lg"
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
                                    className="w-full p-2 border border-gray-300 rounded-lg"
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
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                    required
                                    placeholder="Role"
                                />
                            </div>
                            <div className="flex py-2 space-x-4">
                                <button
                                    type="button"
                                    onClick={closeAddModal}
                                    className="px-4 py-1 cursor-pointer text-[#00308F] border border-[#00308F] rounded-lg"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-1 cursor-pointer bg-[#00308F] text-white rounded-lg hover:bg-blue-800"
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