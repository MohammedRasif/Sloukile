import React from 'react';

const Teams = () => {
  // Define team members data
  const teamData = {
    members: [
      {
        name: 'Siam',
        role: 'Backend Developer',
        availability: 70,
      },
      {
        name: 'Rasif',
        role: 'Frontend Developer',
        availability: 60,
      },
      {
        name: 'Sajib',
        role: 'UI/UX Designer',
        availability: 90,
      },
      {
        name: 'Ramisa',
        role: 'AI Engineer',
        availability: 50,
      },
    ],
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-[23px] font-bold text-gray-800 dark:text-gray-100 mb-1">Team Members 👥</h2>
          <p className="text-gray-500 dark:text-gray-400 text-[15px]">Manage project team and roles</p>
        </div>
        <button className="flex items-center gap-1 bg-gray-800 dark:bg-[#4A6CF7] text-white px-4 py-2 rounded-md text-[15px] font-medium hover:bg-gray-700 dark:hover:bg-[#3B5AEB]">
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
          Add Member ➕
        </button>
      </div>

      <div className="mb-4">
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search team members... 🔍"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#2A2F3B] text-gray-800 dark:text-gray-200 text-[15px] focus:outline-none focus:ring-2 focus:ring-[#00308F] dark:focus:ring-[#4A6CF7]"
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
        {teamData.members.map((member, index) => (
          <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-[#1E232E]">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-lg font-medium mr-3 text-gray-800 dark:text-gray-200">
                  {member.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-gray-100 text-[16px]">{member,
                  member.name}</h3>
                  <p className="text-[15px] text-gray-500 dark:text-gray-400">{member.role}</p>
                </div>
              </div>
              <button className="text-gray-400 dark:text-gray-300 hover:text-gray-600 dark:hover:text-gray-100">
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
                  <circle cx="12" cy="12" r="1" />
                  <circle cx="12" cy="5" r="1" />
                  <circle cx="12" cy="19" r="1" />
                </svg>
              </button>
            </div>

            <div className="mb-4">
              <p className="text-[15px] text-gray-500 dark:text-gray-400 mb-1">Availability</p>
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-1.5 mb-1">
                <div
                  className="bg-gray-800 dark:bg-[#4A6CF7] h-1.5 rounded-full"
                  style={{ width: `${member.availability}%` }}
                ></div>
              </div>
              <p className="text-xs text-right text-gray-500 dark:text-gray-400">{member.availability}%</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Teams;