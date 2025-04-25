
const Dependance = () => {
    // Sample construction project dependencies data
    const projectDependencies = [
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
    ];
  
    return (
      <div className="space-y-6 p-6">
        <div className="bg-white dark:bg-[#1E232E] p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            Project Dependencies
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Key dependencies for the construction project, including tasks, resources, approvals, and external factors.
          </p>
  
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
                  
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                  Type: {dependency.type}
                </p>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  {dependency.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default Dependance;





