
import { useState } from "react";

const Stakeholders = () => {
  const [stakeholders, setStakeholders] = useState([
    {
      id: 1,
      name: "John Doe",
      role: "Project Manager",
      contact: "john.doe@example.com",
      influence: "High",
      governanceType: "Sponsor", // Added default governance type
    },
    {
      id: 2,
      name: "Sarah Smith",
      role: "Lead Developer",
      contact: "sarah.smith@example.com",
      influence: "Medium",
      governanceType: "Team Member",
    },
    {
      id: 3,
      name: "Emily Johnson",
      role: "QA Engineer",
      contact: "emily.johnson@example.com",
      influence: "Low",
      governanceType: "Team Member",
    },
    {
      id: 4,
      name: "Michael Brown",
      role: "Product Owner",
      contact: "michael.brown@example.com",
      influence: "High",
      governanceType: "Advisor",
    },
    {
      id: 5,
      name: "Lisa Davis",
      role: "End User Representative",
      contact: "lisa.davis@example.com",
      influence: "Medium",
      governanceType: "Other",
    },
  ]);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    contact: "",
    influence: "Low",
    governanceType: "Sponsor", // Default value for governance type
  });

  const handleAddClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setFormData({
      name: "",
      role: "",
      contact: "",
      influence: "Low",
      governanceType: "Sponsor",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newStakeholder = {
      id: stakeholders.length + 1, // Simple ID generation
      name: formData.name,
      role: formData.role,
      contact: formData.contact,
      influence: formData.influence,
      governanceType: formData.governanceType, // Include governance type
    };
    setStakeholders((prev) => [...prev, newStakeholder]);
    handleClosePopup();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-1">
            Stakeholder Management
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Identify and manage project stakeholders
          </p>
        </div>
        <button
          onClick={handleAddClick}
          className="bg-gray-800 dark:bg-[#4A6CF7] text-white px-4 py-2 rounded-md text-[15px] font-medium hover:bg-gray-700 dark:hover:bg-[#3B5AEB] flex items-center gap-1 cursor-pointer"
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
          Add Stakeholder
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stakeholders.map((stakeholder) => (
          <div
            key={stakeholder.id}
            className="bg-white dark:bg-[#1E232E] rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-5  transition-colors"
          >
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
              {stakeholder.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
              Role: {stakeholder.role}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
              Contact: {stakeholder.contact}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
              Influence: {stakeholder.influence}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Governance Type: {stakeholder.governanceType}
            </p>
          </div>
        ))}
      </div>

      {/* Add Stakeholder Popup */}
      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-[3px]"></div>
          <div className="relative bg-white dark:bg-[#2A2F3B] rounded-xl shadow-lg p-8 w-[500px] max-w-[90vw] border border-gray-200 dark:border-gray-700">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6 text-center">
              Add New Stakeholder
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter name"
                  className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1E232E] text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00308F] dark:focus:ring-[#4A6CF7]"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1">
                  Role
                </label>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  placeholder="Enter role"
                  className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1E232E] text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00308F] dark:focus:ring-[#4A6CF7]"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1">
                  Contact
                </label>
                <input
                  type="email"
                  name="contact"
                  value={formData.contact}
                  onChange={handleInputChange}
                  placeholder="Enter contact email"
                  className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1E232E] text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00308F] dark:focus:ring-[#4A6CF7]"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1">
                  Influence
                </label>
                <select
                  name="influence"
                  value={formData.influence}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1E232E] text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00308F] dark:focus:ring-[#4A6CF7]"
                  required
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1">
                  Governance Type
                </label>
                <select
                  name="governanceType"
                  value={formData.governanceType}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1E232E] text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00308F] dark:focus:ring-[#4A6CF7]"
                  required
                >
                  <option value="Sponsor">Sponsor</option>
                  <option value="Advisor">Advisor</option>
                  <option value="Team Member">Team Member</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="flex justify-center gap-4 mt-6">
                <button
                  type="submit"
                  className="bg-[#00308F] dark:bg-[#4A6CF7] text-white px-6 py-2 rounded-lg hover:bg-[#002266] dark:hover:bg-[#3B5AEB] font-medium cursor-pointer"
                >
                  Add Stakeholder
                </button>
                <button
                  type="button"
                  onClick={handleClosePopup}
                  className="bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 px-6 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 font-medium cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Stakeholders;
