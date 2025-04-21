import { useState, useEffect } from 'react';
import Tasks from './Tasks.jsx';
import Budget from './Bugget.jsx';
import ProjectRisks from './ProjectRisks.jsx';
import Teams from './Teams.jsx';
import Timeline from './Timeline.jsx';
import Overview from './Overview.jsx';
import Communication from './Communication.jsx';
import Reporting from './Reporting.jsx';

const ProjectDetails = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [darkMode, setDarkMode] = useState(false);

  // Complete project data
  const projectData = {
    name: 'Taskify',
    status: 'In Progress',
    progress: 70,
    budget: {
      total: 21000,
      spent: 18900,
      remaining: 2100,
      percentUsed: 90,
    },
    team: {
      count: 4,
      members: [
        { name: 'Siam', role: 'Backend Developer', availability: 100 },
        { name: 'Rasif', role: 'Frontend Developer', availability: 100 },
        { name: 'Sajib', role: 'UI/UX Designer', availability: 100 },
        { name: 'Ramisa', role: 'AI Developer', availability: 100 },
      ],
    },
    timeline: {
      days: 45,
      startDate: '6/1/2025',
      endDate: '8/30/2025',
      complete: 70,
      remaining: 30,
    },
    expenses: [
      { description: 'Backend Developer (Siam)', category: 'Labor', date: '6/15/2025', amount: 5000, status: 'Paid' },
      { description: 'Frontend Developer (Rasif)', category: 'Labor', date: '6/15/2025', amount: 4500, status: 'Paid' },
      { description: 'UI/UX Designer (Sajib)', category: 'Labor', date: '6/15/2025', amount: 4800, status: 'Paid' },
      { description: 'AI Developer (Ramisa)', category: 'Labor', date: '7/15/2025', amount: 3600, status: 'Approved' },
      { description: 'Development IDEs', category: 'Software', date: '6/5/2025', amount: 500, status: 'Paid' },
      { description: 'Design tools', category: 'Software', date: '6/5/2025', amount: 200, status: 'Paid' },
      { description: 'AI libraries', category: 'Software', date: '6/10/2025', amount: 300, status: 'Paid' },
    ],
    risks: [
      {
        name: 'Scope creep',
        description: 'Project scope expands beyond initial requirements',
        category: 'Project Management',
        impact: 'High',
        probability: 'Medium',
        level: 'Medium',
        status: 'Mitigated',
        owner: 'Project Manager',
      },
      {
        name: 'Technical challenges with AI integration',
        description: 'Integration of AI components may be more complex than anticipated',
        category: 'Technical',
        impact: 'Medium',
        probability: 'Medium',
        level: 'Medium',
        status: 'Identified',
        owner: 'Ramisa',
      },
      {
        name: 'Resource constraints',
        description: 'Key team members may be unavailable at critical times',
        category: 'Resource',
        impact: 'Medium',
        probability: 'Low',
        level: 'Low',
        status: 'Mitigated',
        owner: 'Project Manager',
      },
      {
        name: 'Third-party API reliability',
        description: 'External APIs may experience downtime or changes',
        category: 'Technical',
        impact: 'High',
        probability: 'Low',
        level: 'Low',
        status: 'Identified',
        owner: 'Siam',
      },
      {
        name: 'User adoption challenges',
        description: 'End users may resist adopting the new application',
        category: 'Business',
        impact: 'High',
        probability: 'Medium',
        level: 'Medium',
        status: 'Identified',
        owner: 'Project Manager',
      },
    ],
    tasks: [
      {
        name: 'Backend API Development',
        description: 'Develop and test backend APIs',
        dueDate: '7/15/2025',
        status: 'In Progress',
        priority: 'High',
        assignee: 'Siam',
      },
      {
        name: 'Frontend UI Implementation',
        description: 'Implement dashboard and task views',
        dueDate: '7/20/2025',
        status: 'In Progress',
        priority: 'High',
        assignee: 'Rasif',
      },
      {
        name: 'UI/UX Design Finalization',
        description: 'Finalize mobile and desktop designs',
        dueDate: '6/30/2025',
        status: 'Completed',
        priority: 'Medium',
        assignee: 'Sajib',
      },
      {
        name: 'AI Feature Integration',
        description: 'Integrate AI-powered task prioritization',
        dueDate: '8/1/2025',
        status: 'To Do',
        priority: 'High',
        assignee: 'Ramisa',
      },
    ],
    description:
      'A user-friendly and efficient task management application that enhances productivity and organization for users.',
    projectManager: 'Project Manager',
    client: 'Internal',
    priority: 'High',
    duration: '90 days',
    milestones: [
      { name: 'Development Phase', date: 'Aug 14, 2025', status: 'In Progress' },
      { name: 'Testing Phase', date: 'Aug 24, 2025', status: 'Upcoming' },
      { name: 'Deployment Phase', date: 'Aug 30, 2025', status: 'Upcoming' },
    ],
    recentActivities: [
      { user: 'Siam', action: 'completed backend API integration', time: '2 hours ago' },
      { user: 'Rasif', action: 'updated dashboard UI components', time: '5 hours ago' },
      { user: 'Sajib', action: 'finalized design for mobile views', time: 'Yesterday' },
    ],
    communications: [
      { sender: 'Siam', message: 'API integration completed', date: '4/20/2025', time: '10:00 AM' },
      { sender: 'Rasif', message: 'Need feedback on UI mockups', date: '4/19/2025', time: '3:00 PM' },
    ],
    reports: [
      { title: 'Weekly Progress Report', date: '4/18/2025', summary: '70% tasks completed' },
      { title: 'Budget Review', date: '4/15/2025', summary: '90% budget utilized' },
    ],
  };

  // Sync dark mode
  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true' || (!localStorage.getItem('darkMode') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode);
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <div className="bg-white dark:bg-[#1E232E] min-h-screen text-gray-800 dark:text-gray-200 roboto">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-700 p-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#353A47]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-[27px] font-bold">{projectData.name} 📋</h1>
          <span className="bg-gray-800 dark:bg-[#4A6CF7] text-white text-[15px] px-2 py-1 rounded-full">{projectData.status}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="flex items-center gap-1 bg-white dark:bg-[#2A2F3B] border border-gray-200 dark:border-gray-700 rounded-md px-3 py-1.5 text-[15px] hover:bg-gray-100 dark:hover:bg-[#353A47]"
            onClick={toggleDarkMode}
          >
            {darkMode ? (
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
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
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
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
          <button className="flex items-center gap-1 bg-white dark:bg-[#2A2F3B] border border-gray-200 dark:border-gray-700 rounded-md px-3 py-1.5 text-[15px] hover:bg-gray-100 dark:hover:bg-[#353A47]">
            Analyze with AI 🤖
          </button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-5">
        {/* Progress Card */}
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-gray-600 dark:text-gray-300 text-[18px]">Progress 📈</h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
          <h2 className="text-[33px] font-bold mb-2">{projectData.progress}%</h2>
          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5 mb-2">
            <div className="bg-gray-800 dark:bg-[#4A6CF7] h-2.5 rounded-full" style={{ width: `${projectData.progress}%` }}></div>
          </div>
          <p className="text-[15px] text-gray-500 dark:text-gray-400">
            {projectData.timeline.startDate} - {projectData.timeline.endDate}
          </p>
        </div>

        {/* Budget Card */}
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-gray-600 dark:text-gray-300 text-[18px]">Budget 💰</h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="5" width="20" height="14" rx="2" />
              <line x1="2" y1="10" x2="22" y2="10" />
            </svg>
          </div>
          <h2 className="text-[33px] font-bold mb-2">${projectData.budget.spent.toLocaleString()}</h2>
          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5 mb-2">
            <div
              className="bg-gray-800 dark:bg-[#4A6CF7] h-2.5 rounded-full"
              style={{ width: `${projectData.budget.percentUsed}%` }}
            ></div>
          </div>
          <p className="text-[15px] text-gray-500 dark:text-gray-400">
            {projectData.budget.percentUsed}% of ${projectData.budget.total.toLocaleString()}
          </p>
        </div>

        {/* Team Card */}
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-gray-600 dark:text-gray-300 text-[18px]">Team 👥</h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <h2 className="text-[33px] font-bold mb-2">{projectData.team.count}</h2>
          <div className="flex -space-x-2 mb-2">
            {projectData.team.members.map((member, index) => (
              <div
                key={index}
                className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 border-2 border-white dark:border-[#1E232E] flex items-center justify-center text-[15px] font-medium"
              >
                {member.name.charAt(0)}
              </div>
            ))}
          </div>
          <p className="text-[15px] text-gray-500 dark:text-gray-400">
            {projectData.team.members.map((m) => m.role).join(', ')}
          </p>
        </div>

        {/* Timeline Card */}
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-gray-600 dark:text-gray-300 text-[18px]">Timeline 📅</h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </div>
          <h2 className="text-[33px] font-bold mb-2">{projectData.timeline.days} days</h2>
          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5 mb-2">
            <div
              className="bg-gray-800 dark:bg-[#4A6CF7] h-2.5 rounded-full"
              style={{ width: `${projectData.timeline.complete}%` }}
            ></div>
          </div>
          <p className="text-[15px] text-gray-500 dark:text-gray-400">
            {projectData.timeline.complete}% complete, {projectData.timeline.remaining}% remaining
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700 px-4">
        <nav className="flex space-x-6">
          {['overview', 'tasks', 'team', 'timeline', 'budget', 'risks', 'communication', 'reporting'].map((tab) => (
            <button
              key={tab}
              className={`py-3 px-1 border-b-2 font-bold text-[17px] cursor-pointer ${
                activeTab === tab
                  ? 'border-gray-800 dark:border-[#4A6CF7] text-gray-800 dark:text-gray-100'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </div>

      {/* Content Area */}
      <div className="p-4">
        {activeTab === 'overview' && <Overview projectData={projectData} darkMode={darkMode} />}
        {activeTab === 'tasks' && <Tasks projectData={projectData} />}
        {activeTab === 'budget' && <Budget projectData={projectData} />}
        {activeTab === 'risks' && <ProjectRisks projectData={projectData} />}
        {activeTab === 'team' && <Teams projectData={projectData} />}
        {activeTab === 'timeline' && <Timeline projectData={projectData} />}
        {activeTab === 'communication' && <Communication projectData={projectData} />}
        {activeTab === 'reporting' && <Reporting projectData={projectData} />}
      </div>
    </div>
  );
};

export default ProjectDetails;