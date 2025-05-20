import { useState } from "react";
import { Plus, X } from "lucide-react";

export default function ReportingAnalysis() {
  // State for reports
  const [reports, setReports] = useState([
    {
      name: "Steering Committee Update",
      frequency: "Monthly",
      type: "Steering",
      startDate: "Apr 15, 2024",
      view: true,
      document: null,
    },
    {
      name: "Project Stage Review: Design",
      frequency: "One-time",
      type: "Stage",
      startDate: "Apr 22, 2024",
      view: true,
      document: null,
    },
    {
      name: "Program Board Report",
      frequency: "Monthly",
      type: "Program Board",
      startDate: "Apr 30, 2024",
      view: true,
      document: null,
    },
    {
      name: "Weekly Team Update",
      frequency: "Weekly",
      type: "Team",
      startDate: "Apr 15, 2024",
      view: true,
      document: null,
    },
    {
      name: "Milestone Summary Phase 1",
      frequency: "One-time",
      type: "Milestone",
      startDate: "Apr 15, 2024",
      view: true,
      document: null,
    },
  ]);

  // State for versioned reports (unchanged)
  const versionedReports = [
    {
      name: "Monthly Report",
      stage: "Development",
      date: "Jan 15, 2024",
    },
    {
      name: "Monthly Report",
      stage: "Development",
      date: "Feb 20, 2024",
    },
    {
      name: "Monthly Report",
      stage: "Development",
      date: "Mar 15, 2024",
    },
  ];

  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // "add" or "edit"
  const [currentReport, setCurrentReport] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    frequency: "Weekly",
    type: "Steering",
    startDate: "",
    document: null,
  });
  const [formError, setFormError] = useState("");

  // Open modal for adding new report
  const openAddModal = () => {
    setModalMode("add");
    setFormData({
      name: "",
      frequency: "Weekly",
      type: "Steering",
      startDate: "",
      document: null,
    });
    setFormError("");
    setIsModalOpen(true);
  };

  // Open modal for editing report
  const openEditModal = (report, index) => {
    setModalMode("edit");
    setCurrentReport({ ...report, index });
    setFormData({
      name: report.name,
      frequency: report.frequency,
      type: report.type,
      startDate: report.startDate,
      document: report.document,
    });
    setFormError("");
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentReport(null);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (e.g., max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setFormError("File size exceeds 5MB limit.");
        return;
      }
      setFormData((prev) => ({ ...prev, document: file }));
      setFormError("");
    }
  };

  // Validate and submit form
  const handleSubmit = () => {
    if (!formData.name || !formData.startDate) {
      setFormError("Name and Start Date are required.");
      return;
    }

    const newReport = {
      ...formData,
      view: true,
    };

    if (modalMode === "add") {
      setReports([...reports, newReport]);
    } else if (modalMode === "edit" && currentReport) {
      const updatedReports = [...reports];
      updatedReports[currentReport.index] = newReport;
      setReports(updatedReports);
    }

    // Simulate backend submission (replace with actual API call)
    if (formData.document) {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("frequency", formData.frequency);
      data.append("type", formData.type);
      data.append("startDate", formData.startDate);
      data.append("document", formData.document);
    }

    closeModal();
  };

  // Delete report
  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this report?")) {
      setReports(reports.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="p-5 container bg-white dark:bg-[#1E232E]">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-200">Reporting</h1>
      </div>

      {/* Reporting Frequency Setup Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-200 mb-4">Reporting Frequency Setup</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Frequency Select */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Frequency</label>
            <div className="relative">
              <select
                defaultValue="monthly"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4A6CF7] focus:border-[#4A6CF7] bg-white dark:bg-[#1E232E] text-gray-700 dark:text-gray-200"
              >
                <option value="weekly">Weekly</option>
                <option value="biweekly">Bi-weekly</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
              </select>
            </div>
          </div>
          {/* Submit Report By Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Submit report by</label>
            <input
              type="text"
              defaultValue="Mar 31"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4A6CF7] focus:border-[#4A6CF7] bg-white dark:bg-[#1E232E] text-gray-700 dark:text-gray-200"
            />
          </div>
        </div>

        {/* Linkage to Governance */}
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-200 mb-2">Linkage to Governance</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Stage Select */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Stage</label>
              <div className="relative">
                <select
                  defaultValue="design"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4A6CF7] focus:border-[#4A6CF7] bg-white dark:bg-[#1E232E] text-gray-700 dark:text-gray-200"
                >
                  <option value="planning">Planning</option>
                  <option value="design">Design</option>
                  <option value="development">Development</option>
                  <option value="testing">Testing</option>
                  <option value="deployment">Deployment</option>
                </select>
              </div>
            </div>
            {/* Committee Select */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Committee</label>
              <div className="relative">
                <select
                  defaultValue="steering"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4A6CF7] focus:border-[#4A6CF7] bg-white dark:bg-[#1E232E] text-gray-700 dark:text-gray-200"
                >
                  <option value="steering">Steering</option>
                  <option value="program">Program Board</option>
                  <option value="executive">Executive</option>
                  <option value="technical">Technical</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Versioned Reports Table */}
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-200 mb-2">Versioned Reports</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Stage
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-[#1E232E] divide-y divide-gray-200 dark:divide-gray-700">
                {versionedReports.map((report, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-200">
                      {report.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{report.stage}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{report.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Reports Section */}
      <div className="bg-white dark:bg-[#1E232E] shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-200">Reports</h2>
          <button
            onClick={openAddModal}
            className="flex items-center px-4 py-2 bg-[#00308F] dark:bg-[#4A6CF7] text-white rounded-md hover:bg-[#00218f] dark:hover:bg-[#3B5AEB] focus:outline-none focus:ring-2 focus:ring-[#4A6CF7] cursor-pointer"
          >
            <Plus className="h-4 w-4 mr-2" /> New Report
          </button>
        </div>

        {/* Filters */}
        <div className="flex space-x-4 mb-4">
          {/* Frequency Filter */}
          <div className="relative">
            <select
              defaultValue="all"
              className="w-44 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4A6CF7] focus:border-[#4A6CF7] bg-white dark:bg-[#1E232E] text-gray-700 dark:text-gray-200"
            >
              <option value="all">All Frequencies</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="one-time">One-time</option>
            </select>
          </div>
          {/* Type Filter */}
          <div className="relative">
            <select
              defaultValue="all"
              className="w-44 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4A6CF7] focus:border-[#4A6CF7] bg-white dark:bg-[#1E232E] text-gray-700 dark:text-gray-200"
            >
              <option value="all">All Types</option>
              <option value="steering">Steering</option>
              <option value="program">Program Board</option>
              <option value="team">Team</option>
              <option value="milestone">Milestone</option>
            </select>
          </div>
          {/* Start Date Filter */}
          <div className="relative">
            <select
              defaultValue="all"
              className="w-44 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4A6CF7] focus:border-[#4A6CF7] bg-white dark:bg-[#1E232E] text-gray-700 dark:text-gray-200"
            >
              <option value="all">All Dates</option>
              <option value="this-month">This Month</option>
              <option value="last-month">Last Month</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>
        </div>

        {/* Reports Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Frequency
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Start Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Document
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-[#1E232E] divide-y divide-gray-200 dark:divide-gray-700">
              {reports.map((report, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-200">
                    {report.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{report.frequency}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{report.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{report.startDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {report.document ? (
                      <a
                        href={URL.createObjectURL(report.document)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-[#4A6CF7] hover:underline"
                      >
                        {report.document.name}
                      </a>
                    ) : (
                      "No document"
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 flex space-x-2">
                    <button
                      onClick={() => openEditModal(report, index)}
                      className="text-sm bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-sm cursor-pointer text-gray-700 dark:text-gray-300"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="text-red-600 dark:text-red-500 hover:text-red-800 dark:hover:text-red-400 text-sm bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-sm cursor-pointer"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            </table>
        </div>
      </div>

      {/* Modal for Add/Edit Report */}
      {isModalOpen && (
        <div className="fixed inset-0 backdrop-blur-[3px] flex items-center justify-center z-50">
          <div className="bg-white dark:bg-[#1E232E] rounded-lg border border-gray-300 dark:border-gray-700 p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-200">
                {modalMode === "add" ? "Add New Report" : "Edit Report"}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {formError && (
              <p className="text-red-500 text-sm mb-4">{formError}</p>
            )}
            <div className="space-y-4">
              {/* Name Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4A6CF7] focus:border-[#4A6CF7] bg-white dark:bg-[#1E232E] text-gray-700 dark:text-gray-200"
                />
              </div>
              {/* Frequency Select */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Frequency</label>
                <select
                  name="frequency"
                  value={formData.frequency}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4A6CF7] focus:border-[#4A6CF7] bg-white dark:bg-[#1E232E] text-gray-700 dark:text-gray-200"
                >
                  <option value="Weekly">Weekly</option>
                  <option value="Bi-weekly">Bi-weekly</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Quarterly">Quarterly</option>
                  <option value="One-time">One-time</option>
                </select>
              </div>
              {/* Type Select */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4A6CF7] focus:border-[#4A6CF7] bg-white dark:bg-[#1E232E] text-gray-700 dark:text-gray-200"
                >
                  <option value="Steering">Steering</option>
                  <option value="Program Board">Program Board</option>
                  <option value="Team">Team</option>
                  <option value="Milestone">Milestone</option>
                  <option value="Stage">Stage</option>
                </select>
              </div>
              {/* Start Date Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Start Date</label>
                <input
                  type="text"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  placeholder="e.g., Apr 15, 2024"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4A6CF7] focus:border-[#4A6CF7] bg-white dark:bg-[#1E232E] text-gray-700 dark:text-gray-200"
                />
              </div>
              {/* Document Upload Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Upload Document</label>
                <input
                  type="file"
                  name="document"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.txt"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4A6CF7] focus:border-[#4A6CF7] bg-white dark:bg-[#1E232E] text-gray-700 dark:text-gray-200"
                />
                {formData.document && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Selected: {formData.document.name}</p>
                )}
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-6">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-[#00308F] dark:bg-[#4A6CF7] text-white rounded-md hover:bg-[#00218f] dark:hover:bg-[#3B5AEB] focus:outline-none focus:ring-2 focus:ring-[#4A6CF7]"
              >
                {modalMode === "add" ? "Add Report" : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}