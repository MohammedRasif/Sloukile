import React, { useState } from 'react';
import { ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Bar, Legend, BarChart } from 'recharts';
import ConstructionWorkflow from './Workflow';
import Planning from './Planning';
import Tasks from './Tasks';
import ProjectRisks from './ProjectRisks';
import RACI from './RACI';
import Deployment from './Deployment';
import GovernmentSetup from './GovernanceSetup';
import Team from './Teams.jsx';
import Timeline from './Timeline.jsx';
import Budget from './Bugget.jsx';
import { FaClipboardList, FaCogs, FaTasks, FaUsers, FaDollarSign, FaExclamationTriangle, FaSitemap, FaRocket } from 'react-icons/fa';
import { MdAccountBalance } from 'react-icons/md';
import { IoIosTimer } from 'react-icons/io';

// Define charterSections with Overview included
const charterSections = [
  {
    label: 'Overview',
    icon: <FaClipboardList />,
    component: ({ projectData }) => (
      <div>
        {/* Placeholder for Overview content */}
      </div>
    ),
  },
  { label: 'Government Setup', icon: <MdAccountBalance />, component: GovernmentSetup },
  { label: 'Planning', icon: <FaCogs />, component: Planning },
  { label: 'Tasks', icon: <FaTasks />, component: Tasks },
  { label: 'Team', icon: <FaUsers />, component: Team },
  { label: 'Timeline', icon: <IoIosTimer />, component: Timeline },
  { label: 'Budget', icon: <FaDollarSign />, component: Budget },
  { label: 'Risks', icon: <FaExclamationTriangle />, component: ProjectRisks },
  { label: 'RACI', icon: <FaSitemap />, component: RACI },
  { label: 'Strategy', icon: <FaRocket />, component: Deployment },
];

const Overview = () => {
  const [selectedSection, setSelectedSection] = useState('Overview'); // Default to Overview

  const handleSectionClick = (section) => {
    setSelectedSection(section.label);
  };

  // Define project data with corrected chartData
  const projectData = {
    name: 'Project Management Tool',
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
      { user: 'Siam', action: 'updated the backend API documentation', time: '2 hours ago' },
      { user: 'Rasif', action: 'completed the frontend UI components', time: 'Yesterday' },
      { user: 'Sajib', action: 'finalized the UI/UX design', time: '2 days ago' },
    ],
    milestones: [
      { name: 'Backend API Completion', date: '7/15/2025' },
      { name: 'Frontend Integration', date: '7/20/2025' },
      { name: 'AI Feature Deployment', date: '8/1/2025' },
    ],
    chartData: [
      { name: 'Jan 2025', status: 10000, progress: 8000 },
      { name: 'Feb 2025', status: 35000, progress: 30000 },
      { name: 'Mar 2025', status: 620000, progress: 500000 },
      { name: 'Apr 2025', status: 25000, progress: 20000 },
      { name: 'May 2025', status: 415000, progress: 350000 },
      { name: 'Jun 2025', status: 615000, progress: 550000 },
      { name: 'Jul 2025', status: 40000, progress: 35000 },
      { name: 'Aug 2025', status: 10000, progress: 9000 },
      { name: 'Sep 2025', status: 240000, progress: 200000 },
      { name: 'Oct 2025', status: 354000, progress: 300000 },
      { name: 'Nov 2025', status: 40000, progress: 35000 },
      { name: 'Dec 2025', status: 40000, progress: 38000 },
    ],
  };

  // Detect dark mode (or assume false for simplicity)
  const isDarkMode = false;

  return (
    <div className="px-4">
      {/* Section Content Display */}
      <div className="p-4 sm:p-6 w-full mb-12">
        <div className="w-full">
          {(() => {
            const section = charterSections.find((section) => section.label === selectedSection);
            const Component = section?.component;
            return Component ? (
              <Component projectData={projectData} />
            ) : (
              <div className="text-gray-500 dark:text-gray-400 text-center">
                Select a section to view details
              </div>
            );
          })()}
        </div>
      </div>

      {/* Project Overview Section - Only shown when Overview is selected */}
      {selectedSection === 'Overview' && (
        <div className="mb-8 -mt-16">
          <h2 className="text-[23px] font-bold text-gray-800 dark:text-gray-100 mb-1">Project Overview</h2>
          <p className="text-gray-500 dark:text-gray-400 text-[15px] mb-6">
            Key information about {projectData.name}
          </p>

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

          <h3 className="font-medium text-[18px] text-gray-700 dark:text-gray-300 mb-4">Project Progress</h3>
          <div className="h-80 bg-blue-50 dark:bg-[#2A2F3B] rounded-lg mb-6 py-5">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
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
                          className={`px-3 py-2 rounded shadow-md text-center ${
                            isDarkMode ? 'bg-gray-700 text-gray-100' : 'bg-blue-800 text-white'
                          }`}
                        >
                          <p className="text-[15px] font-medium">
                            Status: ${payload[0].value.toLocaleString()}
                          </p>
                          <p className="text-[15px] font-medium">
                            Progress: ${payload[1].value.toLocaleString()}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar
                  dataKey="status"
                  name="Status"
                  fill="#00308F"
                  radius={[4, 4, 0, 0]}
                  barSize={40}
                  animationDuration={1000}
                  animationEasing="ease-in-out"
                />
                <Bar
                  dataKey="progress"
                  name="Progress"
                  fill="#10B981"
                  radius={[4, 4, 0, 0]}
                  barSize={40}
                  animationDuration={1000}
                  animationEasing="ease-in-out"
                />
                <Legend verticalAlign="top" height={36} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Circular Chart */}
      <div className="mt-12 mb-8 flex items-center justify-center">
        <div className="relative w-[500px] h-[500px] flex items-center justify-center">
          <div className="absolute text-center z-10">
            <h1 className="text-[26px] font-bold text-[#00308F] dark:text-[#4A6CF7] mt-14">
              PROJECT CHARTER
            </h1>
          </div>
          <div className="absolute w-[300px] h-[300px] border-8 border-[#00308F] dark:border-[#4A6CF7] rounded-full mt-14" />

          {charterSections.map((section, index) => {
            const angle = (index / charterSections.length) * 360;
            const radians = (angle * Math.PI) / 180;
            const radius = 220;
            const x = radius * Math.cos(radians);
            const y = radius * Math.sin(radians);
            const isLeftSide = angle > 90 && angle < 270;

            return (
              <div
                key={section.label}
                className={`absolute flex flex-col items-center cursor-pointer hover:scale-110 transition-transform ${
                  selectedSection === section.label ? 'scale-110' : ''
                }`}
                style={{
                  transform: `translate(${x}px, ${y}px)`,
                  transformOrigin: 'center',
                }}
                onClick={() => handleSectionClick(section)}
                role="button"
                aria-label={`View details for ${section.label}`}
              >
                <div
                  className={`text-3xl pb-2 cursor-pointer ${
                    selectedSection === section.label
                      ? 'text-blue-700 dark:text-blue-300'
                      : 'text-[#00308F] dark:text-[#4A6CF7]'
                  }`}
                  style={{ fontSize: '35px' }}
                >
                  {section.icon}
                </div>
                <span
                  className={`text-xl font-extrabold text-center cursor-pointer ${
                    selectedSection === section.label
                      ? 'text-blue-700 dark:text-blue-300'
                      : 'text-[#00308F] dark:text-[#4A6CF7]'
                  }`}
                  style={{
                    transform: isLeftSide ? `translateX(-50%) rotate(0deg)` : `translateX(-50%) rotate(0deg)`,
                    width: '120px',
                    position: 'absolute',
                    left: '50%',
                    top: '50px',
                  }}
                >
                  {section.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <ConstructionWorkflow />
    </div>
  );
};

export default Overview;