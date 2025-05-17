"use client"

import { useState } from "react"
import Overview from "./Overview.jsx"
import Teams from "./Teams.jsx"
import Budget from "./Bugget.jsx"
import ProjectCharter from "./ProjectCharter.jsx"
import Planning from "./Planning.jsx"
import ProjectRisks from "./ProjectRisks.jsx"
import Stakeholders from "./Stakeholders.jsx"
import Communication from "./Communication.jsx"
import GovernanceSetup from "./GovernanceSetup.jsx"
import Deployment from "./Deployment.jsx"
import DocumentLibrary from "./Document.jsx"
import LessonsLearnedPage from "./LessonLearn.jsx"
import Repoting from "./Repoting.jsx"
import WorkflowDiagram from "./WorkflowDiagram.jsx"

const AllHeaderTab = ({ projectData, darkMode }) => {
  const [activeGroup, setActiveGroup] = useState("Project Foundation")
  const [activeTab, setActiveTab] = useState("Overview")

  // Tab groupings based on the image
  const tabGroups = {
    "Project Foundation": [ "Overview", "Project Charter", "Team", "Budget"],
    "Planning & Design": ["Planning", "Workflow Diagram", "System Integration", "Risks"],
    "Execution & Governance": ["Stakeholders", "Communication", "Governance", "Deployment Strategy"],
    "Monitoring & Closure": ["Reporting", "Document Library", "Lessons Learned"],
  }

  // Placeholder for components that aren't provided
  const SystemIntegration = () => <div>System Integration Content</div>
  const Reporting = () => <div>Reporting Content</div>

  // Handle group click
  const handleGroupClick = (group) => {
    setActiveGroup(group)
    // Set the first tab of the group as active
    setActiveTab(tabGroups[group][0])
  }

  return (
    <div>
      {/* Main Tab Groups */}
      <div className="flex items-center space-x-5 mb-2 overflow-x-auto">
        {Object.keys(tabGroups).map((group) => (
          <button
            key={group}
            className={`px-4 py-1 text-[19px] font-semibold rounded-t-md cursor-pointer ml-6 ${
              activeGroup === group
                ? "bg-gray-700 text-white dark:bg-[#4A6CF7] dark:text-white"
                : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
            onClick={() => handleGroupClick(group)}
          >
            {group}
          </button>
        ))}
      </div>

      {/* Sub Tabs for Active Group */}
      <div className="border-b border-gray-200 dark:border-gray-700 mb-4 ml-6 ">
        <div className="flex space-x-4 overflow-x-auto pb-2">
          {tabGroups[activeGroup].map((tab) => (
            <button
              key={tab}
              className={`px-3 py-1 text-[16px] font-medium whitespace-nowrap cursor-pointer ${
                activeTab === tab
                  ? "border-b-2 border-gray-800 dark:border-[#4A6CF7] text-gray-800 dark:text-white"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="px-3">
        {activeTab === "Overview" && <Overview projectData={projectData} darkMode={darkMode} />}
        {activeTab === "Project Charter" && <Repoting projectData={projectData} />}
        {activeTab === "Team" && <Teams projectData={projectData} />}
        {activeTab === "Budget" && <Budget projectData={projectData} />}
        {activeTab === "Planning" && <Planning projectData={projectData} darkMode={darkMode} />}
        {activeTab === "Workflow Diagram" && <WorkflowDiagram />}
        {activeTab === "System Integration" && <SystemIntegration />}
        {activeTab === "Risks" && <ProjectRisks projectData={projectData} />}
        {activeTab === "Stakeholders" && <Stakeholders projectData={projectData} />}
        {activeTab === "Communication" && <Communication projectData={projectData} />}
        {activeTab === "Governance" && <GovernanceSetup projectData={projectData} />}
        {activeTab === "Deployment Strategy" && <Deployment projectData={projectData} />}
        {activeTab === "Reporting" && <ProjectCharter />}
        {activeTab === "Document Library" && <DocumentLibrary projectData={projectData} />}
        {activeTab === "Lessons Learned" && <LessonsLearnedPage projectData={projectData} />}
      </div>
    </div>
  )
}

export default AllHeaderTab
