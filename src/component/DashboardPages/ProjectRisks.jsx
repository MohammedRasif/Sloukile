import React, { useState } from 'react';

const ProjectRisks = () => {
  const [risks, setRisks] = useState([
    {
      name: 'API Downtime',
      description: 'Potential downtime of backend APIs due to server issues',
      category: 'Technical',
      impact: 'High',
      probability: '30%',
      level: 'High',
      status: 'Open',
      owner: 'Siam',
    },
    {
      name: 'UI Design Delays',
      description: 'Delays in finalizing UI/UX designs',
      category: 'Schedule',
      impact: 'Medium',
      probability: '40%',
      level: 'Medium',
      status: 'Mitigated',
      owner: 'Sajib',
    },
    {
      name: 'AI Model Accuracy',
      description: 'Risk of AI model not meeting accuracy requirements',
      category: 'Technical',
      impact: 'High',
      probability: '20%',
      level: 'Medium',
      status: 'Open',
      owner: 'Ramisa',
    },
    {
      name: 'Budget Overrun',
      description: 'Potential to exceed allocated budget',
      category: 'Financial',
      impact: 'Medium',
      probability: '25%',
      level: 'Low',
      status: 'Open',
      owner: 'Rasif',
    },
  ]);

  const [showAddRiskModal, setShowAddRiskModal] = useState(false);
  const [newRisk, setNewRisk] = useState({
    name: '',
    description: '',
    category: 'Technical',
    impact: 'High',
    probability: '',
    level: 'High',
    status: 'Open',
    owner: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRisk((prev) => ({ ...prev, [name]: value }));
  };

  const addRisk = () => {
    if (
      newRisk.name.trim() &&
      newRisk.description.trim() &&
      newRisk.category &&
      newRisk.impact &&
      newRisk.probability.trim() &&
      newRisk.level &&
      newRisk.status &&
      newRisk.owner.trim()
    ) {
      setRisks((prev) => [
        ...prev,
        {
          ...newRisk,
          probability: newRisk.probability.endsWith('%') ? newRisk.probability : `${newRisk.probability}%`,
        },
      ]);
      setNewRisk({
        name: '',
        description: '',
        category: 'Technical',
        impact: 'High',
        probability: '',
        level: 'High',
        status: 'Open',
        owner: '',
      });
      setShowAddRiskModal(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-[23px] font-bold text-gray-800 dark:text-gray-100">Risk Register</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setShowAddRiskModal(true)}
            className="flex items-center gap-1 bg-gray-800 dark:bg-[#4A6CF7] text-white rounded-md px-3 py-1.5 text-[15px] hover:bg-gray-700 dark:hover:bg-[#3B5AEB]"
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
            Add Risk
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left text-[15px] font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Risk
              </th>
              <th className="px-4 py-3 text-left text-[15px] font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Category
              </th>
              <th className="px-4 py-3 text-left text-[15px] font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Impact
              </th>
              <th className="px-4 py-3 text-left text-[15px] font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Probability
              </th>
              <th className="px-4 py-3 text-left text-[15px] font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Risk Level
              </th>
              <th className="px-4 py-3 text-left text-[15px] font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-left text-[15px] font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Owner
              </th>
              <th className="px-4 py-3 text-left text-[15px] font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-[#1E232E] divide-y divide-gray-200 dark:divide-gray-700">
            {risks.map((risk, index) => (
              <tr key={index}>
                <td className="px-4 py-4">
                  <div>
                    <div className="font-medium text-gray-900 dark:text-gray-100 text-[16px]">{risk.name}</div>
                    <div className="text-[15px] text-gray-500 dark:text-gray-400">{risk.description}</div>
                  </div>
                </td>
                <td className="px-4 py-4 text-[15px]">{risk.category}</td>
                <td className="px-4 py-4">
                  <span
                    className={`px-2 py-1 text-[15px] rounded-full ${
                      risk.impact === 'High'
                        ? 'bg-gray-800 dark:bg-[#4A6CF7] text-white'
                        : 'bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-200'
                    }`}
                  >
                    {risk.impact}
                  </span>
                </td>
                <td className="px-4 py-4 text-[15px]">{risk.probability}</td>
                <td className="px-4 py-4">
                  <div className="flex items-center">
                    <span
                      className={`w-2 h-2 rounded-full mr-2 ${
                        risk.level === 'High'
                          ? 'bg-red-500'
                          : risk.level === 'Medium'
                          ? 'bg-yellow-500'
                          : 'bg-green-500'
                      }`}
                    ></span>
                    <span className="text-[15px]">{risk.level}</span>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center">
                    <span
                      className={`w-2 h-2 rounded-full mr-2 ${risk.status === 'Mitigated' ? 'bg-green-500' : 'bg-yellow-500'}`}
                    ></span>
                    <span className="text-[15px]">{risk.status}</span>
                  </div>
                </td>
                <td className="px-4 py-4 text-[15px]">{risk.owner}</td>
                <td className="px-4 py-4">
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Adding New Risk */}
      {showAddRiskModal && (
        <div className="fixed inset-0 backdrop-blur-[2px] flex items-center justify-center z-50">
          <div className="bg-white dark:bg-[#1E232E] rounded-lg p-6 w-full max-w-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">Add New Risk</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1">Risk Name</label>
                <input
                  type="text"
                  name="name"
                  value={newRisk.name}
                  onChange={handleInputChange}
                  placeholder="Enter risk name"
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-[#2A2F3B] text-gray-800 dark:text-gray-200"
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1">Description</label>
                <textarea
                  name="description"
                  value={newRisk.description}
                  onChange={handleInputChange}
                  placeholder="Enter risk description"
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-[#2A2F3B] text-gray-800 dark:text-gray-200"
                  rows="4"
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1">Category</label>
                <select
                  name="category"
                  value={newRisk.category}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-[#2A2F3B] text-gray-800 dark:text-gray-200"
                >
                  <option value="Technical">Technical</option>
                  <option value="Schedule">Schedule</option>
                  <option value="Financial">Financial</option>
                  <option value="Operational">Operational</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1">Impact</label>
                <select
                  name="impact"
                  value={newRisk.impact}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-[#2A2F3B] text-gray-800 dark:text-gray-200"
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1">Probability (%)</label>
                <input
                  type="text"
                  name="probability"
                  value={newRisk.probability}
                  onChange={handleInputChange}
                  placeholder="e.g., 30"
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-[#2A2F3B] text-gray-800 dark:text-gray-200"
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1">Risk Level</label>
                <select
                  name="level"
                  value={newRisk.level}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-[#2A2F3B] text-gray-800 dark:text-gray-200"
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1">Status</label>
                <select
                  name="status"
                  value={newRisk.status}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-[#2A2F3B] text-gray-800 dark:text-gray-200"
                >
                  <option value="Open">Open</option>
                  <option value="Mitigated">Mitigated</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1">Owner</label>
                <input
                  type="text"
                  name="owner"
                  value={newRisk.owner}
                  onChange={handleInputChange}
                  placeholder="Enter risk owner"
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-[#2A2F3B] text-gray-800 dark:text-gray-200"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-2">
              <button
                onClick={() => {
                  setNewRisk({
                    name: '',
                    description: '',
                    category: 'Technical',
                    impact: 'High',
                    probability: '',
                    level: 'High',
                    status: 'Open',
                    owner: '',
                  });
                  setShowAddRiskModal(false);
                }}
                className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={addRisk}
                className="bg-gray-800 dark:bg-[#4A6CF7] text-white px-4 py-2 rounded hover:bg-gray-700 dark:hover:bg-[#3B5AEB]"
              >
                Add Risk
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectRisks;