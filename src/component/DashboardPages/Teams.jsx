
import React, { useState } from 'react';
import { CiExport } from "react-icons/ci";


const Teams = () => {
  const [members, setMembers] = useState([
    {
      name: 'Siam',
      role: 'Backend Developer',
      availability: 70,
      governanceType: 'Team Member', // Added default governance type
    },
    {
      name: 'Rasif',
      role: 'Frontend Developer',
      availability: 60,
      governanceType: 'Team Member',
    },
    {
      name: 'Sajib',
      role: 'UI/UX Designer',
      availability: 90,
      governanceType: 'Team Member',
    },
    {
      name: 'Ramisa',
      role: 'AI Engineer',
      availability: 50,
      governanceType: 'Team Member',
    },
  ]);

  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [showEditMemberModal, setShowEditMemberModal] = useState(false);
  const [newMember, setNewMember] = useState({ name: '', role: '', availability: '', governanceType: 'Team Member' });
  const [editMember, setEditMember] = useState({ index: null, name: '', role: '', availability: '', governanceType: 'Team Member' });

  const handleInputChange = (e, setState) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const addMember = () => {
    if (
      newMember.name.trim() &&
      newMember.role.trim() &&
      newMember.availability &&
      Number(newMember.availability) >= 0 &&
      Number(newMember.availability) <= 100 &&
      newMember.governanceType
    ) {
      setMembers((prev) => [
        ...prev,
        {
          name: newMember.name,
          role: newMember.role,
          availability: Number(newMember.availability),
          governanceType: newMember.governanceType,
        },
      ]);
      setNewMember({ name: '', role: '', availability: '', governanceType: 'Team Member' });
      setShowAddMemberModal(false);
    }
  };

  const editMemberData = () => {
    if (
      editMember.name.trim() &&
      editMember.role.trim() &&
      editMember.availability &&
      Number(editMember.availability) >= 0 &&
      Number(editMember.availability) <= 100 &&
      editMember.governanceType
    ) {
      setMembers((prev) =>
        prev.map((member, i) =>
          i === editMember.index
            ? {
              name: editMember.name,
              role: editMember.role,
              availability: Number(editMember.availability),
              governanceType: editMember.governanceType,
            }
            : member
        )
      );
      setEditMember({ index: null, name: '', role: '', availability: '', governanceType: 'Team Member' });
      setShowEditMemberModal(false);
    }
  };

  const deleteMember = (index) => {
    setMembers((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-[23px] font-bold text-gray-800 dark:text-gray-100 mb-1">Team Members</h2>
          <p className="text-gray-500 dark:text-gray-400 text-[15px]">Manage project team and roles</p>
        </div>
        <div className='flex items-center space-x-2'>
          <button
            onClick={() => setShowAddMemberModal(true)}
            className="flex items-center gap-1 bg-gray-800 dark:bg-[#4A6CF7] text-white px-4 py-2 rounded-md text-[15px] font-medium hover:bg-gray-700 dark:hover:bg-[#3B5AEB]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add Member
          </button>
          
        </div>
      </div>

      <div className="mb-4">
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search team members... 🔍"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#2A2F3B] text-gray-800 dark:text-gray-200 text-[15px] focus:outline-none focus:ring-2 focus:ring-[#00308F] dark:focus:ring-[#4A6CF7]"
            disabled
          />
          <div className="absolute left-3 top-2.5 text-gray-400 dark:text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {members.map((member, index) => (
          <div
            key={index}
            className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-[#1E232E]"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-lg font-medium mr-3 text-gray-800 dark:text-gray-200">
                  {member.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-gray-100 text-[16px]">{member.name}</h3>
                  <p className="text-[15px] text-gray-500 dark:text-gray-400">{member.role}</p>
                  <p className="text-[15px] text-gray-500 dark:text-gray-400">Governance Type: {member.governanceType}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    setEditMember({
                      index,
                      name: member.name,
                      role: member.role,
                      availability: member.availability.toString(),
                      governanceType: member.governanceType,
                    }) && setShowEditMemberModal(true)
                  }
                  className="text-gray-400 dark:text-gray-300 hover:text-gray-600 dark:hover:text-gray-100"
                  title="Edit Member"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </button>
                <button
                  onClick={() => deleteMember(index)}
                  className="text-gray-400 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400"
                  title="Delete Member"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 6h18" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-[15px] text-gray-500 dark:text-gray-400 mb-1">Processing</p>
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3 mb-1">
                <div
                  className="bg-gray-800 dark:bg-[#4A6CF7] h-3 rounded-full"
                  style={{ width: `${member.availability}%` }}
                ></div>
              </div>
              <p className="text-xs text-right text-gray-500 dark:text-gray-400">{member.availability}%</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Adding New Member */}
      {showAddMemberModal && (
        <div className="fixed inset-0 backdrop-blur-[2px] flex items-center justify-center z-50">
          <div className="bg-white dark:bg-[#1E232E] rounded-lg p-6 w-full max-w-md border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">Add New Member</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={newMember.name}
                  onChange={(e) => handleInputChange(e, setNewMember)}
                  placeholder="Enter member name"
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-[#2A2F3B] text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00308F] dark:focus:ring-[#4A6CF7]"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1">Role</label>
                <input
                  type="text"
                  name="role"
                  value={newMember.role}
                  onChange={(e) => handleInputChange(e, setNewMember)}
                  placeholder="Enter member role"
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-[#2A2F3B] text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00308F] dark:focus:ring-[#4A6CF7]"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1">Availability (%)</label>
                <input
                  type="number"
                  name="availability"
                  value={newMember.availability}
                  onChange={(e) => handleInputChange(e, setNewMember)}
                  placeholder="Enter availability (0-100)"
                  min="0"
                  max="100"
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-[#2A2F3B] text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00308F] dark:focus:ring-[#4A6CF7]"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1">Governance Type</label>
                <select
                  name="governanceType"
                  value={newMember.governanceType}
                  onChange={(e) => handleInputChange(e, setNewMember)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-[#2A2F3B] text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00308F] dark:focus:ring-[#4A6CF7]"
                  required
                >
                  <option value="Sponsor">Sponsor</option>
                  <option value="Advisor">Advisor</option>
                  <option value="Team Member">Team Member</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-2">
              <button
                onClick={() => {
                  setNewMember({ name: '', role: '', availability: '', governanceType: 'Team Member' });
                  setShowAddMemberModal(false);
                }}
                className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={addMember}
                className="bg-gray-800 dark:bg-[#4A6CF7] text-white px-4 py-2 rounded hover:bg-gray-700 dark:hover:bg-[#3B5AEB]"
              >
                Add Member
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Editing Member */}
      {showEditMemberModal && (
        <div className="fixed inset-0 backdrop-blur-[2px] flex items-center justify-center z-50">
          <div className="bg-white dark:bg-[#1E232E] rounded-lg p-6 w-full max-w-md border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">Edit Member</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={editMember.name}
                  onChange={(e) => handleInputChange(e, setEditMember)}
                  placeholder="Enter member name"
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-[#2A2F3B] text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00308F] dark:focus:ring-[#4A6CF7]"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1">Role</label>
                <input
                  type="text"
                  name="role"
                  value={editMember.role}
                  onChange={(e) => handleInputChange(e, setEditMember)}
                  placeholder="Enter member role"
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-[#2A2F3B] text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00308F] dark:focus:ring-[#4A6CF7]"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1">Availability (%)</label>
                <input
                  type="number"
                  name="availability"
                  value={editMember.availability}
                  onChange={(e) => handleInputChange(e, setEditMember)}
                  placeholder="Enter availability (0-100)"
                  min="0"
                  max="100"
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-[#2A2F3B] text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00308F] dark:focus:ring-[#4A6CF7]"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1">Governance Type</label>
                <select
                  name="governanceType"
                  value={editMember.governanceType}
                  onChange={(e) => handleInputChange(e, setEditMember)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-[#2A2F3B] text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00308F] dark:focus:ring-[#4A6CF7]"
                  required
                >
                  <option value="Sponsor">Sponsor</option>
                  <option value="Advisor">Advisor</option>
                  <option value="Team Member">Team Member</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-2">
              <button
                onClick={() => {
                  setEditMember({ index: null, name: '', role: '', availability: '', governanceType: 'Team Member' });
                  setShowEditMemberModal(false);
                }}
                className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={editMemberData}
                className="bg-gray-800 dark:bg-[#4A6CF7] text-white px-4 py-2 rounded hover:bg-gray-700 dark:hover:bg-[#3B5AEB]"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Teams;
