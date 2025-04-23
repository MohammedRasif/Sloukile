// import { Calendar, Users, FileText, Plus, Search, X } from "lucide-react";
// import { useState } from "react";
// import { RiDeleteBin6Line } from "react-icons/ri";
// import { NavLink } from "react-router-dom";
// import { useUserDeleteProjectMutation, useUserProjectQuery, useUserProjectCreateMutation, useUserEditProjectMutation } from "../../Redux/feature/ApiSlice";
// import { FaRegEdit } from "react-icons/fa";

// const Project = () => {
//   const [isPopupOpen, setIsPopupOpen] = useState(false);
//   const [projectToDelete, setProjectToDelete] = useState(null);
//   const [isFormPopupOpen, setIsFormPopupOpen] = useState(false);
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [editProjectId, setEditProjectId] = useState(null);

//   const [formData, setFormData] = useState({
//     name: "",
//     project_type: "",
//     methodology: "",
//     budget: "",
//     start_date: "",
//     end_date: "",
//     description: "",
//   });

//   const { data: projects, isLoading, error } = useUserProjectQuery();
//   const [deleteProject] = useUserDeleteProjectMutation();
//   const [createProject, { isLoading: isCreating, error: createError }] = useUserProjectCreateMutation();
//   const [editProject, { isLoading: isEditing, error: editError }] = useUserEditProjectMutation();

//   const handleDeleteClick = (e, projectId) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setProjectToDelete(projectId);
//     setIsPopupOpen(true);
//   };

//   const handleClosePopup = () => {
//     setIsPopupOpen(false);
//     setProjectToDelete(null);
//   };

//   const handleConfirmDelete = async () => {
//     if (projectToDelete) {
//       try {
//         await deleteProject(projectToDelete).unwrap();
//         console.log("Project deleted!");
//       } catch (err) {
//         console.error("Failed to delete project:", err);
//       }
//     }
//     setIsPopupOpen(false);
//     setProjectToDelete(null);
//   };

//   const handleOpenCreatePopup = () => {
//     setIsEditMode(false);
//     setEditProjectId(null);
//     setFormData({
//       name: "",
//       project_type: "",
//       methodology: "",
//       budget: "",
//       start_date: "",
//       end_date: "",
//       description: "",
//     });
//     setIsFormPopupOpen(true);
//   };

//   const handleOpenEditPopup = (e, project) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsEditMode(true);
//     setEditProjectId(project.id);
//     setFormData({
//       name: project.name || "",
//       project_type: project.project_type || "",
//       methodology: project.methodology || "",
//       budget: project.buget || "",
//       start_date: project.start_date || "",
//       end_date: project.end_date || "",
//       description: project.description || project.project_goal || "",
//     });
//     setIsFormPopupOpen(true);
//   };

//   const handleCloseFormPopup = () => {
//     setIsFormPopupOpen(false);
//     setIsEditMode(false);
//     setEditProjectId(null);
//     setFormData({
//       name: "",
//       project_type: "",
//       methodology: "",
//       budget: "",
//       start_date: "",
//       end_date: "",
//       description: "",
//     });
//   };

//   const handleFormChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (isEditMode) {
//         const updatedData = {
//           name: formData.name,
//           project_type: formData.project_type || null,
//           methodology: formData.methodology,
//           buget: formData.budget || "0.00",
//           end_date: formData.end_date || null,
//           description: formData.description,
//         };
//         await editProject({ id: editProjectId, data: updatedData }).unwrap();
//         console.log("Project updated successfully!");
//       } else {
//         const newProject = {
//           name: formData.name || "New Project",
//           project_type: formData.project_type || null,
//           methodology: formData.methodology,
//           buget: formData.budget || "0.00",
//           start_date: formData.start_date || null,
//           end_date: formData.end_date || null,
//           description: formData.description,
//           project_goal: formData.description,
//           total_days: 30,
//           total_months: 1,
//           status: "pending",
//           progress: 0,
//           labor_costs: [],
//         };
//         await createProject(newProject).unwrap();
//         console.log("Project created successfully!");
//       }
//       handleCloseFormPopup();
//     } catch (err) {
//       console.error(isEditMode ? "Failed to update project:" : "Failed to create project:", err);
//     }
//   };

//   if (isLoading) return <div>Loading projects...</div>;
//   if (error) return <div>Error loading projects: {error.message}</div>;

//   return (
//     <div className="p-6 min-h-screen text-gray-800 dark:text-gray-200 roboto">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
//           Project
//         </h1>
//       </div>
//       <div className="flex items-center justify-between mb-6">
//         <div className="relative w-full max-w-md">
//           <input
//             type="text"
//             placeholder="Search Team Member..."
//             className="w-full pl-4 pr-10 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1E232E] text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00308F] dark:focus:ring-[#4A6CF7]"
//           />
//           <Search
//             className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
//             size={20}
//           />
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
//         {projects?.map((project) => (
//           <NavLink
//             key={project.id}
//             to={`/dashboard/ProjectDetails/${project.id}`}
//             className="bg-[#EDEDED] dark:bg-[#1E232E] rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-5 block hover:bg-[#f5efe8af] dark:hover:bg-[#353A47] transition-colors"
//           >
//             <div className="flex justify-between items-start mb-1">
//               <h3 className="text-[22px] font-bold text-gray-800 dark:text-gray-100">
//                 {project.name}
//               </h3>
//               <div className="flex items-center space-x-1">
//                 <button
//                   className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
//                   onClick={(e) => handleOpenEditPopup(e, project)}
//                 >
//                   <FaRegEdit
//                     size={22}
//                     className="dark:text-white cursor-pointer"
//                   />
//                 </button>
//                 <button
//                   className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
//                   onClick={(e) => handleDeleteClick(e, project.id)}
//                 >
//                   <RiDeleteBin6Line
//                     size={22}
//                     className="text-red-500 dark:text-red-400 cursor-pointer"
//                   />
//                 </button>
//               </div>
//             </div>

//             <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
//               {project.project_goal}
//             </p>

//             <div className="mb-3">
//               <p className="text-md font-medium text-[#00308F] dark:text-[#4A6CF7] mb-1">
//                 Budget: ${parseFloat(project.buget).toLocaleString()}
//               </p>
//             </div>

//             <div className="mb-4">
//               <div className="flex justify-between items-center mb-1">
//                 <p className="text-sm text-gray-500 dark:text-gray-400">Progress</p>
//                 <p className="text-sm text-[#00308F] dark:text-[#4A6CF7] font-medium">
//                   {project.progress || 0}%
//                 </p>
//               </div>
//               <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3">
//                 <div
//                   className="bg-[#00308F] dark:bg-[#4A6CF7] h-3 rounded-full"
//                   style={{ width: `${project.progress || 0}%` }}
//                 ></div>
//               </div>
//             </div>

//             <div className="flex justify-between items-center mb-4">
//               <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 text-xs px-2.5 py-1 rounded-full">
//                 {project.status}
//               </span>
//               <div className="flex items-center text-xs text-[#00308F] dark:text-[#4A6CF7]">
//                 <Calendar className="h-3.5 w-3.5 mr-1" />
//                 <span>Due: {project.due_date || "N/A"}</span>
//               </div>
//             </div>

//             <div className="flex justify-between items-center pt-2 border-t border-gray-200 dark:border-gray-700">
//               <div className="flex items-center text-xs text-[#00308F] dark:text-[#4A6CF7]">
//                 <Users className="h-3.5 w-3.5 mr-1" />
//                 <span>{project.labor_costs.length} members</span>
//               </div>
//               <div className="flex items-center text-xs text-[#00308F] dark:text-[#4A6CF7]">
//                 <FileText className="h-3.5 w-3.5 mr-1" />
//                 <span>Created: {new Date(project.created_at).toLocaleDateString()}</span>
//               </div>
//             </div>
//           </NavLink>
//         ))}

//         <div className="bg-white dark:bg-[#1E232E] rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 flex flex-col items-center justify-center h-[265px] cursor-pointer">
//           <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-600 flex items-center justify-center mb-4">
//             <Plus className="h-6 w-6 text-gray-500 dark:text-gray-300" />
//           </div>
//           <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">
//             Create A New Project
//           </h3>
//           <button
//             onClick={handleOpenCreatePopup}
//             className="bg-[#00308F] dark:bg-[#4A6CF7] text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-[#00218f] dark:hover:bg-[#3B5AEB] transition-colors cursor-pointer"
//           >
//             <Plus className="h-4 w-4" />
//             <span>Add New Project</span>
//           </button>
//         </div>
//       </div>

//       {/* Delete Confirmation Popup */}
//       {isPopupOpen && (
//         <div className="fixed inset-0 flex items-center justify-center z-50">
//           <div className="absolute inset-0 backdrop-blur-[3px] shadow-md"></div>
//           <div className="relative bg-white dark:bg-[#1E232E] rounded-xl shadow-sm p-8 w-[400px] max-w-[90vw] border border-gray-200 dark:border-gray-700">
//             <button
//               onClick={handleClosePopup}
//               className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
//             >
//               <X size={20} />
//             </button>
//             <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4 text-center">
//               Confirm Deletion
//             </h3>
//             <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
//               Are you sure you want to delete this project? This action cannot be undone.
//             </p>
//             <div className="flex justify-center gap-4">
//               <button
//                 onClick={handleConfirmDelete}
//                 className="bg-red-500 dark:bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-600 dark:hover:bg-red-700 transition-colors font-medium cursor-pointer"
//               >
//                 Delete
//               </button>
//               <button
//                 onClick={handleClosePopup}
//                 className="bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 px-6 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors font-medium cursor-pointer"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Create/Edit Project Popup */}
//       {isFormPopupOpen && (
//         <div className="fixed inset-0 flex items-center justify-center z-50">
//           <div className="absolute inset-0 backdrop-blur-[3px] shadow-md"></div>
//           <div className="relative bg-white dark:bg-[#1E232E] rounded-xl shadow-sm p-6 w-[500px] max-w-[90vw] border border-gray-200 dark:border-gray-700">
//             <button
//               onClick={handleCloseFormPopup}
//               className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
//             >
//               <X size={20} />
//             </button>
//             <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
//               {isEditMode ? "Edit Project" : "Create New Project"}
//             </h3>
//             <form onSubmit={handleFormSubmit}>
//               <div className="flex items-center space-x-5">
//                 <div className="mb-4 flex-1">
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                     Project Name
//                   </label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleFormChange}
//                     placeholder="e.g. Taskify"
//                     className="w-full px-3 py-[5px] rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1E232E] text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00308F] dark:focus:ring-[#4A6CF7]"
//                     required
//                   />
//                 </div>

//                 <div className="mb-4 flex-1">
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                     Project Type
//                   </label>
//                   <select
//                     name="project_type"
//                     value={formData.project_type}
//                     onChange={handleFormChange}
//                     className="w-full px-1 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1E232E] text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00308F] dark:focus:ring-[#4A6CF7]"
//                   >
//                     <option value="">Select project type</option>
//                     <option value="software">Software Development</option>
//                     <option value="design">Design</option>
//                     <option value="research">Research</option>
//                     <option value="other">Other</option>
//                   </select>
//                 </div>
//               </div>

//               <div className="flex items-center space-x-5">
//                 <div className="mb-4 flex-1">
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                     Methodology
//                   </label>
//                   <select
//                     name="methodology"
//                     value={formData.methodology}
//                     onChange={handleFormChange}
//                     className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1E232E] text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00308F] dark:focus:ring-[#4A6CF7]"
//                     required
//                   >
//                     <option value="">Select methodology</option>
//                     <option value="Scrum">Scrum</option>
//                     <option value="Agile">Agile</option>
//                     <option value="Waterfall">Waterfall</option>
//                     <option value="Kanban">Kanban</option>
//                   </select>
//                 </div>

//                 <div className="mb-4 flex-1">
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                     Budget ($)
//                   </label>
//                   <input
//                     type="number"
//                     name="budget"
//                     value={formData.budget}
//                     onChange={handleFormChange}
//                     placeholder="e.g. 21000"
//                     className="w-full px-3 py-[5px] rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1E232E] text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00308F] dark:focus:ring-[#4A6CF7]"
//                     required
//                   />
//                 </div>
//               </div>

//               <div className="flex items-center space-x-5">
//                 <div className="mb-4 flex-1">
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                     Start Date
//                   </label>
//                   <div className="relative">
//                     <input
//                       type="date"
//                       name="start_date"
//                       value={formData.start_date}
//                       onChange={handleFormChange}
//                       className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1E232E] text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00308F] dark:focus:ring-[#4A6CF7]"
//                       disabled={isEditMode}
//                       required={!isEditMode}
//                     />
//                     <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
//                   </div>
//                 </div>

//                 <div className="mb-4 flex-1">
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                     End Date
//                   </label>
//                   <div className="relative">
//                     <input
//                       type="date"
//                       name="end_date"
//                       value={formData.end_date}
//                       onChange={handleFormChange}
//                       className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1E232E] text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00308F] dark:focus:ring-[#4A6CF7]"
//                     />
//                     <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
//                   </div>
//                 </div>
//               </div>

//               <div className="mb-6">
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                   Project Description
//                 </label>
//                 <textarea
//                   name="description"
//                   value={formData.description}
//                   onChange={handleFormChange}
//                   placeholder="Describe your project"
//                   className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1E232E] text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00308F] dark:focus:ring-[#4A6CF7]"
//                   rows={3}
//                   required
//                 />
//               </div>

//               <div className="flex justify-end">
//                 <button
//                   type="submit"
//                   disabled={isCreating || isEditing}
//                   className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors font-medium cursor-pointer disabled:opacity-50"
//                 >
//                   Next
//                 </button>
//               </div>
//               {(createError || editError) && (
//                 <p className="mt-4 text-red-600 dark:text-red-400 text-center">
//                   {isEditMode
//                     ? `Failed to update project: ${editError?.message || "Unknown error"}`
//                     : `Failed to create project: ${createError?.message || "Unknown error"}`}
//                 </p>
//               )}
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Project;


import { Calendar, Users, FileText, Search, Plus } from "lucide-react";
import { NavLink } from "react-router-dom";

// Static dummy data for projects
const dummyProjects = [
  {
    id: 1,
    name: "Website Redesign",
    project_goal: "Revamp the company website  experience.",
    buget: "15000.00",
    progress: 75,
    status: "In Progress",
    due_date: "2025-06-30",
    created_at: "2025-01-15",
    labor_costs: ["Alice", "Bob", "Charlie"],
  },
  {
    id: 2,
    name: "Mobile App Development",
    project_goal: "Develop a mobile app for e-commerce platform.",
    buget: "25000.00",
    progress: 40,
    status: "In Progress",
    due_date: "2025-08-15",
    created_at: "2025-02-10",
    labor_costs: ["David", "Eve"],
  },
  {
    id: 3,
    name: "Marketing Campaign",
    project_goal: "Launch a new marketing campaign for product X.",
    buget: "10000.00",
    progress: 100,
    status: "Completed",
    due_date: "2025-03-01",
    created_at: "2024-12-20",
    labor_costs: ["Frank", "Grace", "Henry"],
  },
];

const Project = () => {
  // Static RACI chart grid (4 rows x 5 columns) based on the image
  const raciGrid = [
    ["A", "R", "C", "I", "A"],
    ["A", "R", "C", "R", "A"],
    ["C", "R", "C", "A", "A"],
    ["A", "A", "I", "I", "C"],
  ];

  // Function to get color based on RACI role
  const getRaciColor = (role) => {
    switch (role) {
      case "A":
      case "R":
        return "bg-blue-500"; // In Progress
      case "C":
        return "bg-orange-500"; // Not Started
      case "I":
        return "bg-pink-500"; // Completed
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="p-6 min-h-screen text-gray-800 dark:text-gray-200 roboto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
          Project
        </h1>
      </div>
      <div className="flex items-center justify-between mb-6">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search Team Member..."
            className="w-full pl-4 pr-10 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1E232E] text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00308F] dark:focus:ring-[#4A6CF7]"
            disabled
          />
          <Search
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
            size={20}
          />
        </div>
      </div>

      {/* Static Project Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {dummyProjects.map((project) => (
          <NavLink key={project.id} to="/dashboard/ProjectDetails">
            <div
            key={project.id}
            className="bg-[#EDEDED] dark:bg-[#1E232E] rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-5 block"
          >
            <div className="flex justify-between items-start mb-1">
              <h3 className="text-[22px] font-bold text-gray-800 dark:text-gray-100">
                {project.name}
              </h3>
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
              {project.project_goal}
            </p>

            <div className="mb-3">
              <p className="text-md font-medium text-[#00308F] dark:text-[#4A6CF7] mb-1">
                Budget: ${parseFloat(project.buget).toLocaleString()}
              </p>
            </div>

            <div className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <p className="text-sm text-gray-500 dark:text-gray-400">Progress</p>
                <p className="text-sm text-[#00308F] dark:text-[#4A6CF7] font-medium">
                  {project.progress}%
                </p>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3">
                <div
                  className="bg-[#00308F] dark:bg-[#4A6CF7] h-3 rounded-full"
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
            </div>

            <div className="flex justify-between items-center mb-4">
              <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 text-xs px-2.5 py-1 rounded-full">
                {project.status}
              </span>
              <div className="flex items-center text-xs text-[#00308F] dark:text-[#4A6CF7]">
                <Calendar className="h-3.5 w-3.5 mr-1" />
                <span>Due: {project.due_date}</span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center text-xs text-[#00308F] dark:text-[#4A6CF7]">
                <Users className="h-3.5 w-3.5 mr-1" />
                <span>{project.labor_costs.length} members</span>
              </div>
              <div className="flex items-center text-xs text-[#00308F] dark:text-[#4A6CF7]">
                <FileText className="h-3.5 w-3.5 mr-1" />
                <span>Created: {new Date(project.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
          </NavLink>
        ))}

        {/* New Project AI Card */}
        <div className="bg-white dark:bg-[#1E232E] rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 flex flex-col items-center justify-center h-[265px]">
          <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-600 flex items-center justify-center mb-4">
            <Plus className="h-6 w-6 text-gray-500 dark:text-gray-300" />
          </div>
          <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">
            New Project AI
          </h3>
          <button
            className="bg-[#00308F] dark:bg-[#4A6CF7] text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-[#00218f] dark:hover:bg-[#3B5AEB] transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Add New Project AI</span>
          </button>
        </div>
      </div>

      {/* Static RACI Chart */}
      
    </div>
  );
};

export default Project;