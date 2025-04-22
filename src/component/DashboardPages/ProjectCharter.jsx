
const ProjectCharter = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-1">
        Project Charter
      </h2>
      <p className="text-gray-500 dark:text-gray-400 mb-6">
        Define project objectives, stakeholders, and governance model
      </p>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Project Name
          </label>
          <div className="w-full p-2  rounded-md bg-gray-100 dark:bg-[#2A2F3B] text-gray-800 dark:text-gray-200">
            Taskify
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Project Type
          </label>
          <div className="w-full p-2  rounded-md bg-gray-100 dark:bg-[#2A2F3B] text-gray-800 dark:text-gray-200">
            Task Management Application
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Start Date
          </label>
          <div className="w-full p-2  rounded-md bg-gray-100 dark:bg-[#2A2F3B] text-gray-800 dark:text-gray-200">
            June 1st, 2025
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            End Date
          </label>
          <div className="w-full p-2  rounded-md bg-gray-100 dark:bg-[#2A2F3B] text-gray-800 dark:text-gray-200">
            August 30th, 2025
          </div>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Objectives and Goals
        </label>
        <p className="w-full p-2  rounded-md bg-gray-100 dark:bg-[#2A2F3B] text-gray-800 dark:text-gray-200 leading-relaxed">
          To create a user-friendly and efficient task management application that enhances productivity and organization for users.
        </p>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Key Stakeholders
        </label>
        <p className="w-full p-2  rounded-md bg-gray-100 dark:bg-[#2A2F3B] text-gray-800 dark:text-gray-200 leading-relaxed">
          Project Manager, Development Team, Quality Assurance Team, End Users
        </p>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Governance Model
        </label>
        <p className="w-full p-2  rounded-md bg-gray-100 dark:bg-[#2A2F3B] text-gray-800 dark:text-gray-200 leading-relaxed">
          Decision-making will be made collectively by the project manager and team members in regular sprint planning and review meetings. SteerCo setup will involve bi-weekly progress review meetings with key stakeholders.
        </p>
      </div>

      <div className="flex justify-end gap-4">
        <button className="px-4 py-2  rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-[#2A2F3B] hover:bg-gray-100 dark:hover:bg-[#353A47]">
          Reset 🔄
        </button>
        <button className="px-4 py-2 bg-gray-800 dark:bg-[#4A6CF7] text-white rounded-md hover:bg-gray-700 dark:hover:bg-[#3B5AEB]">
          Save Project Charter
        </button>
      </div>
    </div>
  );
};

export default ProjectCharter;
