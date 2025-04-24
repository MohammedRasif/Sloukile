import React from 'react';
import { AreaChart, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Area } from 'recharts';
import ConstructionWorkflow from './Workflow';

const Overview = () => {
  // Define project data
  const projectData = {
    name: 'AI-Powered Project Management Tool',
    description:
      'A comprehensive project management platform leveraging AI to streamline task management, budget tracking, and risk assessment for efficient project delivery.',
    projectManager: 'Siam',
    client: 'Tech Innovations Ltd.',
    priority: 'High',
    timeline: {
      startDate: '6/1/2025',
      endDate: '8/15/2025',
      duration: '2.5 months',
      status: 'In Progress',
    },
    recentActivities: [
      {
        user: 'Siam',
        action: 'updated the backend API documentation',
        time: '2 hours ago',
      },
      {
        user: 'Rasif',
        action: 'completed the frontend UI components',
        time: 'Yesterday',
      },
      {
        user: 'Sajib',
        action: 'finalized the UI/UX design',
        time: '2 days ago',
      },
    ],
    milestones: [
      {
        name: 'Backend API Completion',
        date: '7/15/2025',
      },
      {
        name: 'Frontend Integration',
        date: '7/20/2025',
      },
      {
        name: 'AI Feature Deployment',
        date: '8/1/2025',
      },
    ],
    chartData: [
      { name: 'jan 2025', value: 10000 },
      { name: 'fab 2025', value: 35000 },
      { name: 'mar 2025', value: 620000 },
      { name: 'apr 2025', value: 25000 },
      { name: 'may 2025', value: 415000 },
      { name: 'jun 2025', value: 615000 },
      { name: 'jul 2025', value: 40000 },
      { name: 'Aug 2025', value: 10000 },
      { name: 'sep 2025', value: 240000 },
      { name: 'oct 2025', value: 354000 },
      { name: 'nov 2025', value: 40000 },
      { name: 'dec 2025', value: 40000 },
    ],
  };

  // Detect dark mode (or assume false for simplicity; can use useEffect or context for dynamic detection)
  const isDarkMode = false; // Replace with dynamic detection if needed (e.g., document.documentElement.classList.contains('dark'))

  return (
    <div className='px-5'>
      <ConstructionWorkflow/>
      <div className="mb-8">
        <h2 className="text-[23px] font-bold text-gray-800 dark:text-gray-100 mb-1 ">Project Overview </h2>
        <p className="text-gray-500 dark:text-gray-400 text-[15px] mb-6">
          Key information about {projectData.name}
        </p>

        <h3 className="font-medium text-[18px] text-gray-700 dark:text-gray-300 mb-2">Description</h3>
        <p className="text-gray-700 dark:text-gray-200 text-[16px] mb-6">{projectData.description}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
          <div>
            <h3 className="font-medium text-[18px] text-gray-700 dark:text-gray-300 mb-4">Project Details</h3>
            <div className="space-y-3">
              <div className="grid grid-cols-2 text-[16px]">
                <span className="text-gray-500 dark:text-gray-400">Project Manager:</span>
                <span className="text-gray-800 dark:text-gray-200">{projectData.projectManager}</span>
              </div>
              <div className="grid grid-cols-2 text-[16px]">
                <span className="text-gray-500 dark:text-gray-400">Client:</span>
                <span className="text-gray-800 dark:text-gray-200">{projectData.client}</span>
              </div>
              <div className="grid grid-cols-2 text-[16px]">
                <span className="text-gray-500 dark:text-gray-400">Priority:</span>
                <span className="font-medium text-gray-800 dark:text-gray-100">{projectData.priority}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-[18px] text-gray-700 dark:text-gray-300 mb-4">Timeline</h3>
            <div className="space-y-3">
              <div className="grid grid-cols-2 text-[16px]">
                <span className="text-gray-500 dark:text-gray-400">Start Date:</span>
                <span className="text-gray-800 dark:text-gray-200">{projectData.timeline.startDate}</span>
              </div>
              <div className="grid grid-cols-2 text-[16px]">
                <span className="text-gray-500 dark:text-gray-400">End Date:</span>
                <span className="text-gray-800 dark:text-gray-200">{projectData.timeline.endDate}</span>
              </div>
              <div className="grid grid-cols-2 text-[16px]">
                <span className="text-gray-500 dark:text-gray-400">Duration:</span>
                <span className="text-gray-800 dark:text-gray-200">{projectData.timeline.duration}</span>
              </div>
              <div className="grid grid-cols-2 text-[16px]">
                <span className="text-gray-500 dark:text-gray-400">Status:</span>
                <span className="inline-flex w-31 items-center px-3 py-0.5 rounded-full text-[15px] font-medium bg-gray-800 dark:bg-[#4A6CF7] text-white">
                  {projectData.timeline.status}
                </span>
              </div>
            </div>
          </div>
        </div>

        <h3 className="font-medium text-[18px] text-gray-700 dark:text-gray-300 mb-4">Project Progress </h3>
        <div className="h-64 bg-blue-50 dark:bg-[#2A2F3B] rounded-lg mb-6 py-5">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={projectData.chartData}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid
                strokeDasharray="2 2"
                vertical={false}
                stroke={isDarkMode ? '#4B5563' : '#E5E7EB'}
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 15, fill: isDarkMode ? '#D1D5DB' : '#6B7280' }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 15, fill: isDarkMode ? '#D1D5DB' : '#6B7280' }}
                tickFormatter={(value) => `${value / 1000}k`}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div
                        className={`px-3 py-1 rounded shadow-md text-center ${
                          isDarkMode ? 'bg-gray-700 text-gray-100' : 'bg-blue-800 text-white'
                        }`}
                      >
                        <p className="text-[15px] font-medium">${payload[0].value.toLocaleString()}</p>
                      </div>
                    );
                  }
                  return null;
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
                dot={{ r: 4, fill: '#1e40af', strokeWidth: 0 }}
                activeDot={{ r: 6, fill: '#1e40af', stroke: '#fff', strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-medium text-[18px] text-gray-700 dark:text-gray-300 mb-4">Recent Activities 🕒</h3>
            <div className="space-y-4">
              {projectData.recentActivities.map((activity, index) => (
                <div key={index} className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-[15px] font-medium flex-shrink-0">
                    {activity.user.charAt(0)}
                  </div>
                  <div>
                    <p className="text-[15px] text-gray-800 dark:text-gray-200">
                      <span className="font-medium">{activity.user}</span> {activity.action}
                    </p>
                    <p className="text-[14px] text-gray-500 dark:text-gray-400">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium text-[18px] text-gray-700 dark:text-gray-300 mb-4">Upcoming Milestones 🎯</h3>
            <div className="space-y-4">
              {projectData.milestones.map((milestone, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-[16px] text-gray-800 dark:text-gray-200">{milestone.name}</p>
                    <p className="text-[15px] text-gray-500 dark:text-gray-400">{milestone.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;