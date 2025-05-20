
import { useState } from "react";

const Dependance = () => {
  // State for project dependencies
  const [projectDependencies, setProjectDependencies] = useState([
    {
      id: 1,
      name: "Foundation Work",
      type: "Task",
      description: "Completion of foundation laying is required before framing can begin.",
      status: "In Progress",
    },
    {
      id: 2,
      name: "Building Permit",
      type: "Approval",
      description: "Obtain building permit from local authorities before any construction starts.",
      status: "Approved",
    },
    {
      id: 3,
      name: "Concrete Delivery",
      type: "Resource",
      description: "Timely delivery of concrete is needed for foundation and slab work.",
      status: "Scheduled",
    },
    {
      id: 4,
      name: "Weather Conditions",
      type: "External",
      description: "Dry weather is required for outdoor tasks like roofing and exterior painting.",
      status: "Pending",
    },
    {
      id: 5,
      name: "Electrical Installation",
      type: "Task",
      description: "Framing must be completed before electrical wiring can be installed.",
      status: "Not Started",
    },
  ]);

  // State for modal visibility and form data
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    type: "",
    description: "",
    status: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  // State for delete confirmation popup
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [dependencyToDelete, setDependencyToDelete] = useState(null);

  // Open modal for adding a new dependency
  const openAddModal = () => {
    setFormData({ id: null, name: "", type: "", description: "", status: "" });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  // Open modal for editing an existing dependency
  const openEditModal = (dependency) => {
    setFormData(dependency);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission (add or edit)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      // Update existing dependency
      setProjectDependencies((prev) =>
        prev.map((dep) => (dep.id === formData.id ? formData : dep))
      );
    } else {
      // Add new dependency
      const newDependency = {
        ...formData,
        id: projectDependencies.length + 1, // Simple ID generation
      };
      setProjectDependencies((prev) => [...prev, newDependency]);
    }
    setIsModalOpen(false);
    setFormData({ id: null, name: "", type: "", description: "", status: "" });
  };

  // Open delete confirmation popup
  const openDeleteModal = (id) => {
    setDependencyToDelete(id);
    setIsDeleteModalOpen(true);
  };

  // Confirm deletion
  const confirmDelete = () => {
    setProjectDependencies((prev) => prev.filter((dep) => dep.id !== dependencyToDelete));
    setIsDeleteModalOpen(false);
    setDependencyToDelete(null);
  };

  // Cancel deletion
  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
    setDependencyToDelete(null);
  };

  return (
    <div className="space-y-6 ">
      <div className="bg-white dark:bg-[#1E232E] p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              Project Dependencies
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Key dependencies for the construction project, including tasks, resources, approvals, and external factors.
            </p>
          </div>
          <button
            onClick={openAddModal}
            className="bg-[#00308F] text-white px-4 py-2 rounded-md hover:bg-[#0f3a8f] transition-colors cursor-pointer"
          >
            Add Dependency
          </button>
        </div>

        {/* Dependencies List */}
        <div className="grid gap-4">
          {projectDependencies.map((dependency) => (
            <div
              key={dependency.id}
              className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-gray-800 dark:text-gray-200 font-semibold">
                  {dependency.name}
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => openEditModal(dependency)}
                    className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => openDeleteModal(dependency.id)}
                    className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                Type: {dependency.type}
              </p>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                {dependency.description}
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                Status: {dependency.status}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Add/Edit Dependency */}
      {isModalOpen && (
        <div className="fixed inset-0 backdrop-blur-[3px] flex items-center justify-center z-50">
          <div className="bg-white dark:bg-[#1E232E] p-6 border border-gray-300 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
              {isEditing ? "Edit Dependency" : "Add Dependency"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 dark:text-gray-300">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300">Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                  required
                >
                  <option value="">Select Type</option>
                  <option value="Task">Task</option>
                  <option value="Approval">Approval</option>
                  <option value="Resource">Resource</option>
                  <option value="External">External</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                  rows="4"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                  required
                >
                  <option value="">Select Status</option>
                  <option value="Not Started">Not Started</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Scheduled">Scheduled</option>
                  <option value="Approved">Approved</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#0D95DD] text-white rounded-md hover:bg-[#0daddd]"
                >
                  {isEditing ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 backdrop-blur-[3px] flex items-center justify-center z-50">
          <div className="bg-white dark:bg-[#1E232E] p-6 border border-gray-300 rounded-lg shadow-lg w-full max-w-sm">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
              Confirm Deletion
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Are you sure you want to delete this dependency? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dependance;
