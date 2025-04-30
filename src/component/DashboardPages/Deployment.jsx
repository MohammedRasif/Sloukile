
import { useState } from "react"
import { Cloud, Cpu, Rocket, CheckCircle, Clock, Edit } from "lucide-react"

const Deployment = () => {
  // State for Deployment Strategy items
  const [strategyItems, setStrategyItems] = useState([
    { title: "Cloud Infrastructure", desc: "AWS with ECS Fargate, SageMaker, and RDS for scalability and AI model hosting.", icon: <Cloud className="h-5 w-5 text-[#00308F] dark:text-blue-300" /> },
    { title: "AI Model Deployment", desc: "Host task prioritization and NLP models on SageMaker endpoints with continuous training.", icon: <Cpu className="h-5 w-5 text-[#00308F] dark:text-blue-300" /> },
    { title: "Blue-Green Deployment", desc: "Use blue-green deployments to ensure zero downtime during updates.", icon: <Rocket className="h-5 w-5 text-[#00308F] dark:text-blue-300" /> },
    { title: "Monitoring", desc: "Implement Prometheus and Grafana for real-time AI and application metrics.", icon: <CheckCircle className="h-5 w-5 text-[#00308F] dark:text-blue-300" /> },
  ])

  // State for Roll-Out Plan phases
  const [rolloutPhases, setRolloutPhases] = useState([
    {
      phase: "Preparation (Weeks 1-2)",
      tasks: [
        "Finalize AI models and application code.",
        "Set up AWS infrastructure (ECS, SageMaker, RDS).",
        "Configure CI/CD pipeline with GitHub Actions.",
      ],
    },
    {
      phase: "Alpha Release (Weeks 3-4)",
      tasks: [
        "Deploy to staging for internal testing.",
        "Validate AI features (e.g., NLP, prioritization).",
        "Fix bugs based on feedback.",
      ],
    },
    {
      phase: "Beta Release (Weeks 5-6)",
      tasks: [
        "Canary release to 5-10% of users.",
        "Run A/B tests for AI algorithms.",
        "Scale infrastructure as needed.",
      ],
    },
    {
      phase: "Full Roll-Out (Weeks 7-8)",
      tasks: [
        "Gradual roll-out (25%, 50%, 100%).",
        "Execute blue-green deployment.",
        "Document deployment process.",
      ],
    },
    {
      phase: "Post-Deployment (Week 9+)",
      tasks: [
        "Monitor AI model drift and application uptime.",
        "Retrain models with live data.",
        "Plan feature enhancements.",
      ],
    },
  ])

  // State for modals
  const [showStrategyAddModal, setShowStrategyAddModal] = useState(false)
  const [showStrategyEditModal, setShowStrategyEditModal] = useState({ show: false, index: null, data: { title: "", desc: "" } })
  const [showPhaseAddModal, setShowPhaseAddModal] = useState(false)
  const [showPhaseEditModal, setShowPhaseEditModal] = useState({ show: false, index: null, data: { phase: "", tasks: [] } })
  const [showTaskAddModal, setShowTaskAddModal] = useState({ show: false, phaseIndex: null })
  const [showTaskEditModal, setShowTaskEditModal] = useState({ show: false, phaseIndex: null, taskIndex: null, data: "" })
  const [showAIModal, setShowAIModal] = useState(false) // New state for AI modal
  const [selectedAction, setSelectedAction] = useState("") // Track selected action

  // State for form inputs
  const [newStrategyInput, setNewStrategyInput] = useState({ title: "", desc: "" })
  const [newPhaseInput, setNewPhaseInput] = useState({ phase: "", tasks: [] })
  const [newTaskInput, setNewTaskInput] = useState("")

  // Handlers for adding items
  const addStrategyItem = () => {
    if (newStrategyInput.title.trim() && newStrategyInput.desc.trim()) {
      setStrategyItems((prev) => [
        ...prev,
        { ...newStrategyInput, icon: <CheckCircle className="h-5 w-5 text-[#00308F] dark:text-blue-300" /> },
      ])
      setNewStrategyInput({ title: "", desc: "" })
      setShowStrategyAddModal(false)
    }
  }

  const addPhase = () => {
    if (newPhaseInput.phase.trim() && newPhaseInput.tasks.length > 0) {
      setRolloutPhases((prev) => [...prev, newPhaseInput])
      setNewPhaseInput({ phase: "", tasks: [] })
      setShowPhaseAddModal(false)
    }
  }

  const addTaskToPhase = () => {
    if (newTaskInput.trim() && showTaskAddModal.phaseIndex !== null) {
      setRolloutPhases((prev) => {
        const newPhases = [...prev]
        newPhases[showTaskAddModal.phaseIndex].tasks.push(newTaskInput)
        return newPhases
      })
      setNewTaskInput("")
      setShowTaskAddModal({ show: false, phaseIndex: null })
    }
  }

  // Handlers for editing items
  const editStrategyItem = () => {
    if (showStrategyEditModal.data.title.trim() && showStrategyEditModal.data.desc.trim()) {
      setStrategyItems((prev) => {
        const newItems = [...prev]
        newItems[showStrategyEditModal.index] = {
          ...showStrategyEditModal.data,
          icon: <CheckCircle className="h-5 w-5 text-[#00308F] dark:text-blue-300" />,
        }
        return newItems
      })
      setShowStrategyEditModal({ show: false, index: null, data: { title: "", desc: "" } })
    }
  }

  const editPhase = () => {
    if (showPhaseEditModal.data.phase.trim() && showPhaseEditModal.data.tasks.length > 0) {
      setRolloutPhases((prev) => {
        const newPhases = [...prev]
        newPhases[showPhaseEditModal.index] = showPhaseEditModal.data
        return newPhases
      })
      setShowPhaseEditModal({ show: false, index: null, data: { phase: "", tasks: [] } })
    }
  }

  const editTask = () => {
    if (showTaskEditModal.data.trim() && showTaskEditModal.phaseIndex !== null && showTaskEditModal.taskIndex !== null) {
      setRolloutPhases((prev) => {
        const newPhases = [...prev]
        newPhases[showTaskEditModal.phaseIndex].tasks[showTaskEditModal.taskIndex] = showTaskEditModal.data
        return newPhases
      })
      setShowTaskEditModal({ show: false, phaseIndex: null, taskIndex: null, data: "" })
    }
  }

  // Handler for AI modal actions
  const handleAIAction = () => {
    if (selectedAction) {
      console.log(`Selected AI Action: ${selectedAction}`)
      setShowAIModal(false)
      setSelectedAction("")
    }
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 tracking-tight sm:text-4xl">
            Deployment Strategy: Task Management Application
          </h1>
          <p className="mt-3 max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-400">
            A comprehensive plan for deploying an AI-powered task management application, ensuring scalability, reliability, and seamless AI integration.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <button
              className="bg-[#00308F] text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => setShowAIModal(true)}
            >
              Review Sent For
            </button>
            
          </div>
        </div>

        {/* Strategy Overview */}
        <div className="bg-white dark:bg-[#1E232E] rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-3">
            <Cloud className="h-6 w-6 text-[#00308F] dark:text-blue-300" />
            Deployment Strategy
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            The deployment strategy leverages modern cloud infrastructure and CI/CD practices to deliver a robust task management application with AI-driven features like task prioritization and NLP.
          </p>
          <ul className="space-y-3">
            {strategyItems.map((item, index) => (
              <li key={index} className="flex items-start gap-3 justify-between">
                <div className="flex items-start gap-3">
                  <div className="mt-1">{item.icon}</div>
                  <div>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">{item.title}:</span>
                    <span className="text-gray-600 dark:text-gray-400"> {item.desc}</span>
                  </div>
                </div>
                <button
                  onClick={() => setShowStrategyEditModal({ show: true, index, data: { title: item.title, desc: item.desc } })}
                  className="text-[#00308F] hover:text-blue-600"
                >
                  <Edit className="h-4 w-4" />
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => setShowStrategyAddModal(true)}
                className="mt-4 bg-[#00308F] cursor-pointer text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Add Strategy Item
              </button>
            </li>
          </ul>
        </div>

        {/* Roll-Out Plan */}
        <div className="bg-white dark:bg-[#1E232E] rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-3">
            <Clock className="h-6 w-6 text-[#00308F] dark:text-blue-300" />
            Roll-Out Plan
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            The roll-out plan is structured in five phases to ensure a smooth deployment of the task management application, with a focus on AI feature validation and user feedback.
          </p>
          <div className="space-y-6">
            {rolloutPhases.map((phase, index) => (
              <div key={index} className="border-l-4 border-blue-500 dark:border-[#4A6CF7] pl-4 relative">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">{phase.phase}</h3>
                  <button
                    onClick={() => setShowPhaseEditModal({ show: true, index, data: phase })}
                    className="text-[#00308F] hover:text-blue-600"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                </div>
                <ul className="mt-2 space-y-2">
                  {phase.tasks.map((task, idx) => (
                    <li key={idx} className="flex items-center gap-2 justify-between text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-[#00308F] dark:text-blue-300" />
                        {task}
                      </div>
                    </li>
                  ))}
                  <li>
                    <button
                      onClick={() => setShowTaskAddModal({ show: true, phaseIndex: index })}
                      className="text-[#00308F] hover:text-blue-600 text-sm mt-2"
                    >
                      + Add Task
                    </button>
                  </li>
                </ul>
              </div>
            ))}
            <button
              onClick={() => setShowPhaseAddModal(true)}
              className="mt-6 bg-[#00308F] cursor-pointer text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add Phase
            </button>
          </div>
        </div>
      </div>

      {/* Modal for Adding Strategy Item */}
      {showStrategyAddModal && (
        <div className="fixed inset-0 backdrop-blur-[2px] flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md border border-gray-300 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">Add Strategy Item</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1">Title</label>
                <input
                  type="text"
                  placeholder="Enter strategy title"
                  value={newStrategyInput.title}
                  onChange={(e) => setNewStrategyInput((prev) => ({ ...prev, title: e.target.value }))}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-[#2A2F3B] text-gray-800 dark:text-gray-200"
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1">Description</label>
                <input
                  type="text"
                  placeholder="Enter strategy description"
                  value={newStrategyInput.desc}
                  onChange={(e) => setNewStrategyInput((prev) => ({ ...prev, desc: e.target.value }))}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-[#2A2F3B] text-gray-800 dark:text-gray-200"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-2">
              <button
                onClick={() => setShowStrategyAddModal(false)}
                className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={addStrategyItem}
                className="bg-[#00308F] cursor-pointer text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Editing Strategy Item */}
      {showStrategyEditModal.show && (
        <div className="fixed inset-0 backdrop-blur-[2px] flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md border border-gray-300 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">Edit Strategy Item</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1">Title</label>
                <input
                  type="text"
                  value={showStrategyEditModal.data.title}
                  onChange={(e) => setShowStrategyEditModal((prev) => ({ ...prev, data: { ...prev.data, title: e.target.value } }))}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-[#2A2F3B] text-gray-800 dark:text-gray-200"
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1">Description</label>
                <input
                  type="text"
                  value={showStrategyEditModal.data.desc}
                  onChange={(e) => setShowStrategyEditModal((prev) => ({ ...prev, data: { ...prev.data, desc: e.target.value } }))}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-[#2A2F3B] text-gray-800 dark:text-gray-200"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-2">
              <button
                onClick={() => setShowStrategyEditModal({ show: false, index: null, data: { title: "", desc: "" } })}
                className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={editStrategyItem}
                className="bg-[#00308F] cursor-pointer text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Adding Phase */}
      {showPhaseAddModal && (
        <div className="fixed inset-0 backdrop-blur-[2px] flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md border border-gray-300 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">Add Phase</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1">Phase Name</label>
                <input
                  type="text"
                  placeholder="Enter phase name"
                  value={newPhaseInput.phase}
                  onChange={(e) => setNewPhaseInput((prev) => ({ ...prev, phase: e.target.value }))}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-[#2A2F3B] text-gray-800 dark:text-gray-200"
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1">Tasks (one per line)</label>
                <textarea
                  placeholder="Enter tasks, one per line"
                  value={newPhaseInput.tasks.join("\n")}
                  onChange={(e) => setNewPhaseInput((prev) => ({ ...prev, tasks: e.target.value.split("\n").filter(task => task.trim()) }))}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-[#2A2F3B] text-gray-800 dark:text-gray-200 h-32"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-2">
              <button
                onClick={() => setShowPhaseAddModal(false)}
                className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={addPhase}
                className="bg-[#00308F] cursor-pointer text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Editing Phase */}
      {showPhaseEditModal.show && (
        <div className="fixed inset-0 backdrop-blur-[2px] flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md border border-gray-300 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">Edit Phase</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1">Phase Name</label>
                <input
                  type="text"
                  value={showPhaseEditModal.data.phase}
                  onChange={(e) => setShowPhaseEditModal((prev) => ({ ...prev, data: { ...prev.data, phase: e.target.value } }))}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-[#2A2F3B] text-gray-800 dark:text-gray-200"
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1">Tasks (one per line)</label>
                <textarea
                  value={showPhaseEditModal.data.tasks.join("\n")}
                  onChange={(e) => setShowPhaseEditModal((prev) => ({ ...prev, data: { ...prev.data, tasks: e.target.value.split("\n").filter(task => task.trim()) } }))}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-[#2A2F3B] text-gray-800 dark:text-gray-200 h-32"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-2">
              <button
                onClick={() => setShowPhaseEditModal({ show: false, index: null, data: { phase: "", tasks: [] } })}
                className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={editPhase}
                className="bg-[#00308F] cursor-pointer text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Adding Task */}
      {showTaskAddModal.show && (
        <div className="fixed inset-0 backdrop-blur-[2px] flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md border border-gray-300 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">Add Task</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1">Task</label>
                <input
                  type="text"
                  placeholder="Enter task"
                  value={newTaskInput}
                  onChange={(e) => setNewTaskInput(e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-[#2A2F3B] text-gray-800 dark:text-gray-200"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-2">
              <button
                onClick={() => setShowTaskAddModal({ show: false, phaseIndex: null })}
                className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={addTaskToPhase}
                className="bg-[#00308F] cursor-pointer text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Editing Task */}
      {showTaskEditModal.show && (
        <div className="fixed inset-0 backdrop-blur-[2px] flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md border border-gray-300 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">Edit Task</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1">Task</label>
                <input
                  type="text"
                  value={showTaskEditModal.data}
                  onChange={(e) => setShowTaskEditModal((prev) => ({ ...prev, data: e.target.value }))}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-[#2A2F3B] text-gray-800 dark:text-gray-200"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-2">
              <button
                onClick={() => setShowTaskEditModal({ show: false, phaseIndex: null, taskIndex: null, data: "" })}
                className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={editTask}
                className="bg-[#00308F] cursor-pointer text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for AI Actions */}
      {showAIModal && (
        <div className="fixed inset-0 backdrop-blur-[2px] flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md border border-gray-300 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">Select AI Action</h2>
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => setSelectedAction("Review")}
                  className={`w-full p-2 rounded text-left ${
                    selectedAction === "Review"
                      ? "bg-[#00308F] text-white"
                      : "bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-500"
                  }`}
                >
                  Review
                </button>
                <button
                  onClick={() => setSelectedAction("Approve")}
                  className={`w-full p-2 rounded text-left ${
                    selectedAction === "Approve"
                      ? "bg-[#00308F] text-white"
                      : "bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-500"
                  }`}
                >
                  Approve
                </button>
                <button
                  onClick={() => setSelectedAction("Sign Off")}
                  className={`w-full p-2 rounded text-left ${
                    selectedAction === "Sign Off"
                      ? "bg-[#00308F] text-white"
                      : "bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-500"
                  }`}
                >
                  Sign Off
                </button>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-2">
              <button
                onClick={() => {
                  setShowAIModal(false)
                  setSelectedAction("")
                }}
                className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleAIAction}
                className="bg-[#00308F] text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
                disabled={!selectedAction}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Deployment
