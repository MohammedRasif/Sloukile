import { useState } from "react";
import { Search, Plus, X, Trash2 } from "lucide-react";
import Meeting from "./Meeting";

export default function Communication() {
  const [activeTab, setActiveTab] = useState("newsletters");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // "add" or "edit"
  const [currentReport, setCurrentReport] =  useState(null);
  const [formError, setFormError] = useState("");
  const [communications, setCommunications] = useState([
    {
      title: "Project Kickoff Newsletter",
      type: "Newsletter",
      audience: "All Stakeholders",
      status: "Published",
      lastModified: "03-May-2023",
    },
    {
      title: "SteerCo Monthly Report",
      type: "Status Report",
      audience: "Steering Committee",
      status: "Draft",
      lastModified: "01-May-2023",
    },
    {
      title: "Workshop Agenda: Risk Planning",
      type: "Agenda",
      audience: "Working Group",
      status: "Scheduled",
      lastModified: "30-Apr-2023",
    },
    {
      title: "New Member Training Pack",
      type: "Training Material",
      audience: "Project Team",
      status: "Published",
      lastModified: "25-Apr-2023",
    },
  ]);

  const [formData, setFormData] = useState({
    title: "",
    audience: "",
    status: "Draft",
    lastModified: new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
  });

  // Modal handlers
  const openAddModal = () => {
    setModalMode("add");
    setFormData({
      title: "",
      audience: "",
      status: "Draft",
      lastModified: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    });
    setFormError("");
    setIsModalOpen(true);
  };

  const openEditModal = (report) => {
    setModalMode("edit");
    setCurrentReport(report);
    setFormData({
      title: report.title,
      audience: report.audience,
      status: report.status,
      lastModified: report.lastModified,
    });
    setFormError("");
    setIsModalOpen(true);
  };

  const openDeleteModal = (report) => {
    setCurrentReport(report);
    setIsDeleteModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentReport(null);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setCurrentReport(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.audience) {
      setFormError("Title and Audience are required.");
      return;
    }

    const newReport = {
      title: formData.title,
      type: "Newsletter",
      audience: formData.audience,
      status: formData.status,
      lastModified: formData.lastModified,
    };

    if (modalMode === "add") {
      setCommunications([...communications, newReport]);
    } else if (modalMode === "edit" && currentReport) {
      setCommunications(
        communications.map((c) =>
          c.title === currentReport.title && c.type === "Newsletter" ? newReport : c
        )
      );
    }

    closeModal();
  };

  const handleDelete = () => {
    setCommunications(
      communications.filter((c) => !(c.title === currentReport.title && c.type === "Newsletter"))
    );
    closeDeleteModal();
  };

  const tabs = [
    { id: "newsletters", label: "Newsletters" },
    { id: "meeting-minutes", label: "Meeting Minutes" },
  ];

  return (
    <div className="container mx-auto ">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Communication</h1>
        <div className="flex gap-2">
          <button
            onClick={openAddModal}
            className="flex items-center px-4 py-2 bg-[#00308F] text-white rounded-md hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-900"
          >
            <Plus className="h-4 w-4 mr-2" /> Create New Communication
          </button>
        </div>
      </div>

      <div className="w-full">
        <div className="mb-4 flex border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === tab.id
                  ? "text-gray-900 border-b-2 border-blue-500"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          <div className="flex justify-between mb-4">
            
          </div>

          {activeTab === "newsletters" && (
            <div className="bg-white rounded-md shadow">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Audience
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Modified
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {communications
                    .filter((comm) => comm.type === "Newsletter")
                    .map((comm) => (
                      <tr key={comm.title}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {comm.title}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{comm.type}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{comm.audience}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              comm.status === "Published"
                                ? "bg-green-100 text-green-800"
                                : comm.status === "Draft"
                                ? "bg-gray-100 text-gray-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {comm.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {comm.lastModified}
                        </td>
                        <td className="px-6 py-4  whitespace-nowrap text-sm text-gray-500 flex gap-2">
                          <button
                            onClick={() => openEditModal(comm)}
                            className="text-blue-600 hover:text-blue-800 bg-gray-200 py-1 px-2 rounded-sm cursor-pointer"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => openDeleteModal(comm)}
                            className="text-red-600 hover:text-red-800 bg-gray-200 py-1 px-2 rounded-sm cursor-pointer"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "meeting-minutes" && <Meeting />}
        </div>
      </div>

      {/* Modal for Add/Edit Newsletter */}
      {isModalOpen && (
        <div className="fixed inset-0 backdrop-blur-[3px] flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md border border-gray-300">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                {modalMode === "add" ? "Add New Newsletter" : "Edit Newsletter"}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {formError && <p className="text-red-500 text-sm mb-4">{formError}</p>}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Audience</label>
                <input
                  type="text"
                  name="audience"
                  value={formData.audience}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                >
                  <option value="Draft">Draft</option>
                  <option value="Published">Published</option>
                  <option value="Scheduled">Scheduled</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Modified</label>
                <input
                  type="text"
                  name="lastModified"
                  value={formData.lastModified}
                  onChange={handleInputChange}
                  placeholder="e.g., 01-May-2023"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-6">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {modalMode === "add" ? "Add Newsletter" : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 backdrop-blur-[3px] flex items-center justify-center z-50">
          <div className="bg-white rounded-lg border border-gray-300 p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Confirm Delete</h2>
              <button
                onClick={closeDeleteModal}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="text-gray-600 mb-4">
              Are you sure you want to delete "{currentReport?.title}"?
            </p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={closeDeleteModal}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}