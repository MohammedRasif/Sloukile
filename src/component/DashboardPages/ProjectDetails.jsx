import React, { useState } from "react";
import { Plus, MoreHorizontal } from "lucide-react";
import { data, NavLink, useParams } from "react-router-dom";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useDarkMode } from "../../context/ThemeContext";
import { useUserProjectDetailsQuery } from "../../Redux/feature/ApiSlice";

const ProjectDetails = () => {
  const { darkMode } = useDarkMode();
  const [activeTab, setActiveTab] = useState("Tasks");
  const { id } = useParams(); // Get project ID from URL

  // Fetch project details using the query hook
  const { data: project, isLoading, error } = useUserProjectDetailsQuery(id);
  console.log(data);

  const tabs = ["Tasks", "Team", "Risks", "Budget", "AI Insights"];

  if (isLoading) return <div>Loading project details...</div>;
  if (error) return <div>Error loading project: {error.message}</div>;
  if (!project) return <div>No project data found.</div>;

  // Flatten tasks from all stages
  const tasks = project.stages.flatMap((stage) =>
    stage.tasks.map((task) => ({
      id: task.id,
      name: task.description,
      assignee: stage.assignment_set.find((assignment) => assignment.stage === stage.id)?.team_member.name || "Unassigned",
      phase: stage.name,
      dueDate: stage.end_date || "N/A",
      status: task.complete ? "Completed" : "In Progress",
    }))
  );

  // Team members from assignment_set in the first stage
  const team = project.stages[0].assignment_set.map((assignment) => ({
    id: assignment.team_member.id,
    name: assignment.team_member.name,
    role: assignment.roles[0],
    email: assignment.team_member.email,
  }));

  // Risks
  const risks = project.risks.map((risk) => ({
    id: risk.id,
    description: risk.description,
  }));

  // Budget calculations
  const laborCostTotal = project.labor_costs.reduce((sum, labor) => sum + labor.cost, 0);
  const toolsCostTotal = project.stages.flatMap((stage) => stage.tools).reduce((sum, tool) => sum + tool.cost, 0);
  const totalBudget = parseFloat(project.buget);
  // Assume spent is 0 since no data is provided for spent amounts
  const budget = {
    total: totalBudget,
    spent: 0,
    remaining: totalBudget,
    laborCategories: project.labor_costs.map((labor) => ({
      name: labor.name,
      allocated: labor.cost,
      spent: 0,
      remaining: labor.cost,
    })),
    toolCategories: project.stages
      .flatMap((stage) => stage.tools)
      .map((tool) => ({
        name: tool.name,
        allocated: tool.cost,
        spent: 0,
        remaining: tool.cost,
      })),
  };

  // AI Insights
  const aiInsights = project.insights.map((insight) => ({
    title: insight.type,
    description: insight.description,
  }));

  return (
    <div className={`min-h-screen roboto ${darkMode ? "dark bg-gray-800" : "bg-white"}`}>
      <div className="container mx-auto">
        {/* Project Header */}
        <div className="flex items-center space-x-2 py-5">
          <NavLink to="/dashboard/Project">
            <MdOutlineKeyboardBackspace className="text-4xl mt-1 cursor-pointer text-gray-800 dark:text-gray-200 hover:text-[#00308F] dark:hover:text-[#4A6CF7] transition-colors" />
          </NavLink>
          <h1 className="text-3xl font-[500] text-gray-800 dark:text-gray-100">{project.name}</h1>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`cursor-pointer px-6 py-4 text-md font-semibold whitespace-nowrap ${
                  activeTab === tab
                    ? "border-b-2 border-black dark:border-gray-100 text-black dark:text-gray-100"
                    : "text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white dark:bg-[#1E232E]">
          {activeTab === "Tasks" && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Tasks</h2>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">All tasks for this project</p>
                </div>
              
              </div>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300">Task Name</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300">Assignee</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300">Phase</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300">Due Date</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tasks.map((task) => (
                      <tr key={task.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="py-4 px-4 text-gray-800 dark:text-gray-100">{task.name}</td>
                        <td className="py-4 px-4 text-gray-800 dark:text-gray-100">{task.assignee}</td>
                        <td className="py-4 px-4 text-gray-800 dark:text-gray-100">{task.phase}</td>
                        <td className="py-4 px-4 text-gray-800 dark:text-gray-100">{task.dueDate}</td>
                        <td className="py-4 px-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              task.status === "Completed"
                                ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400"
                                : "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400"
                            }`}
                          >
                            {task.status}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <button className="text-gray-500 dark:text-gray-300">
                            <MoreHorizontal size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "Team" && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Team Members</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                This is the team section. It shows all team members assigned to this project.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {team.map((member) => (
                  <div
                    key={member.id}
                    className="border rounded-lg p-4 bg-white dark:bg-[#1E232E] shadow-sm border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-center mb-2">
                      <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-300 font-semibold">
                        {member.name.charAt(0)}
                      </div>
                      <div className="ml-3">
                        <h3 className="font-medium text-gray-800 dark:text-gray-100">{member.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-300">{member.role}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{member.email}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "Risks" && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Project Risks</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                This is the risks section. It identifies potential risks and mitigation strategies.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-3 px-4 font-bold text-gray-600 dark:text-gray-300">Risk Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {risks.map((risk) => (
                      <tr
                        key={risk.id}
                        className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        <td className="py-4 px-4 text-gray-800 dark:text-gray-100">{risk.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "Budget" && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Total Cost</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                This is the budget section. It shows budget allocation and spending.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white dark:bg-[#1E232E] p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-500 dark:text-gray-300">Total Budget</p>
                  <p className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                    ${budget.total.toLocaleString()}
                  </p>
                </div>
                <div className="bg-white dark:bg-[#1E232E] p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-500 dark:text-gray-300">Spent</p>
                  <p className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                    ${budget.spent.toLocaleString()}
                  </p>
                </div>
                <div className="bg-white dark:bg-[#1E232E] p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-500 dark:text-gray-300">Remaining</p>
                  <p className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                    ${budget.remaining.toLocaleString()}
                  </p>
                </div>
              </div>
              <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-3 text-2xl">Labor Cost</h3>
              <div className="overflow-x-auto mb-6">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300">Name</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300">Allocated</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300">Spent</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300">Remaining</th>
                    </tr>
                  </thead>
                  <tbody>
                    {budget.laborCategories.map((category, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        <td className="py-4 px-4 text-gray-800 dark:text-gray-100">{category.name}</td>
                        <td className="py-4 px-4 text-gray-800 dark:text-gray-100">
                          ${category.allocated.toLocaleString()}
                        </td>
                        <td className="py-4 px-4 text-gray-800 dark:text-gray-100">
                          ${category.spent.toLocaleString()}
                        </td>
                        <td className="py-4 px-4 text-gray-800 dark:text-gray-100">
                          ${category.remaining.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <h3 className="font-bold text-gray-800 dark:text-gray-100 text-2xl mb-3">Tools Cost</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300">Tool Name</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300">Allocated</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300">Spent</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300">Remaining</th>
                    </tr>
                  </thead>
                  <tbody>
                    {budget.toolCategories.map((category, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        <td className="py-4 px-4 text-gray-800 dark:text-gray-100">{category.name}</td>
                        <td className="py-4 px-4 text-gray-800 dark:text-gray-100">
                          ${category.allocated.toLocaleString()}
                        </td>
                        <td className="py-4 px-4 text-gray-800 dark:text-gray-100">
                          ${category.spent.toLocaleString()}
                        </td>
                        <td className="py-4 px-4 text-gray-800 dark:text-gray-100">
                          ${category.remaining.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "AI Insights" && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">AI Insights</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                This is the AI insights section. It provides AI-generated recommendations and analysis for your project.
              </p>
              <div className="space-y-4">
                {aiInsights.map((insight, index) => (
                  <div
                    key={index}
                    className={`border rounded-lg p-4 ${
                      index % 3 === 0
                        ? "bg-blue-50 border-blue-200 dark:bg-blue-900 dark:border-blue-700"
                        : index % 3 === 1
                        ? "bg-green-50 border-green-200 dark:bg-green-900 dark:border-green-700"
                        : "bg-yellow-50 border-yellow-200 dark:bg-yellow-900 dark:border-yellow-700"
                    }`}
                  >
                    <h3
                      className={`font-medium mb-2 ${
                        index % 3 === 0
                          ? "text-blue-800 dark:text-blue-400"
                          : index % 3 === 1
                          ? "text-green-800 dark:text-green-400"
                          : "text-yellow-800 dark:text-yellow-400"
                      }`}
                    >
                      {insight.title}
                    </h3>
                    <p
                      className={`text-sm ${
                        index % 3 === 0
                          ? "text-blue-700 dark:text-blue-400"
                          : index % 3 === 1
                          ? "text-green-700 dark:text-green-400"
                          : "text-yellow-700 dark:text-yellow-400"
                      }`}
                    >
                      {insight.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;