import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const TimeLine = () => {
  // Define timeline data
  const timelineData = {
    milestones: [
      {
        name: 'Project Kickoff',
        date: '6/1/2025',
        description: 'Initiate project planning and team onboarding',
        owner: 'Siam',
        status: 'Completed',
        startDate: '6/1/2025',
        endDate: '6/5/2025',
      },
      {
        name: 'Backend API Completion',
        date: '7/15/2025',
        description: 'Complete backend API development and testing',
        owner: 'Siam',
        status: 'In Progress',
        startDate: '6/15/2025',
        endDate: '7/15/2025',
      },
      {
        name: 'Frontend Integration',
        date: '7/20/2025',
        description: 'Integrate frontend UI with backend APIs',
        owner: 'Rasif',
        status: 'Pending',
        startDate: '7/10/2025',
        endDate: '7/20/2025',
      },
      {
        name: 'AI Feature Deployment',
        date: '8/1/2025',
        description: 'Deploy AI-powered features to production',
        owner: 'Ramisa',
        status: 'Pending',
        startDate: '7/20/2025',
        endDate: '8/1/2025',
      },
      {
        name: 'Project Closure',
        date: '8/15/2025',
        description: 'Finalize deliverables and project documentation',
        owner: 'Siam',
        status: 'Pending',
        startDate: '8/10/2025',
        endDate: '8/15/2025',
      },
    ],
  };

  // Data for Recharts BarChart (Gantt-like timeline)
  const chartData = timelineData.milestones.map((milestone) => ({
    name: milestone.name,
    duration: Math.ceil(
      (new Date(milestone.endDate) - new Date(milestone.startDate)) / (1000 * 60 * 60 * 24)
    ), // Duration in days
  }));

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-[23px] font-bold text-gray-800 dark:text-gray-100 mb-1">Project Timeline </h2>
          <p className="text-gray-500 dark:text-gray-400 text-[15px]">
            Track key milestones and project progress
          </p>
        </div>
        <button className="flex items-center gap-1 bg-gray-800 dark:bg-[#4A6CF7] text-white rounded-md px-3 py-1.5 text-[15px] hover:bg-gray-700 dark:hover:bg-[#3B5AEB]">
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
          Add Milestone 
        </button>
      </div>

      {/* Timeline Chart */}
      <div className="mb-6">
        <h3 className="font-medium text-[18px] text-gray-700 dark:text-gray-300 mb-4">Timeline Overview 📊</h3>
        <div className="h-[40vh] bg-blue-50 dark:bg-[#2A2F3B] rounded-lg py-5">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 10, right: 30, left: 150, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
              <XAxis
                type="number"
                tick={{ fontSize: 14, fill: '#6B7280' }}
                tickFormatter={(value) => `${value} days`}
              />
              <YAxis
                type="category"
                dataKey="name"
                tick={{ fontSize: 15, fill: '#6B7280' }}
                width={140}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1E232E',
                  border: 'none',
                  color: '#D1D5DB',
                  borderRadius: '4px',
                }}
                formatter={(value) => `${value} days`}
              />
              <Bar dataKey="duration" fill="#4A6CF7" radius={[4, 4, 4, 4]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Timeline Events */}
      <div className="mb-6">
        <h3 className="font-medium text-[18px] text-gray-700 dark:text-gray-300 mb-4">Milestone Details 🗓️</h3>
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-300 dark:bg-gray-600"></div>
          {timelineData.milestones.map((milestone, index) => (
            <div key={index} className="flex mb-6">
              {/* Dot and Date */}
              <div className="flex-shrink-0 w-8 flex flex-col items-center">
                <div
                  className={`w-3 h-3 rounded-full ${
                    milestone.status === 'Completed'
                      ? 'bg-green-500'
                      : milestone.status === 'In Progress'
                      ? 'bg-yellow-500'
                      : 'bg-gray-400'
                  }`}
                ></div>
                <p className="text-[14px] text-gray-500 dark:text-gray-400 mt-2">{milestone.date}</p>
              </div>
              {/* Milestone Card */}
              <div className="ml-6 flex-1 border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-[#1E232E]">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-[16px] text-gray-800 dark:text-gray-100">{milestone.name}</h4>
                    <p className="text-[15px] text-gray-500 dark:text-gray-400">{milestone.description}</p>
                    <div className="mt-2 flex items-center gap-4">
                      <p className="text-[15px] text-gray-500 dark:text-gray-400">
                        <span className="font-medium">Owner:</span> {milestone.owner}
                      </p>
                      <span
                        className={`px-2 py-1 text-[15px] rounded-full ${
                          milestone.status === 'Completed'
                            ? 'bg-green-100 dark:bg-green-500/20 text-green-800 dark:text-green-300'
                            : milestone.status === 'In Progress'
                            ? 'bg-yellow-100 dark:bg-yellow-500/20 text-yellow-800 dark:text-yellow-300'
                            : 'bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-200'
                        }`}
                      >
                        {milestone.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
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
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                    </button>
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
                        <path d="M3 6h18" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimeLine;