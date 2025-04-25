// import { Search, Mail, Phone, Calendar, Plus } from "lucide-react";
// import { useState } from "react";
// import { FaRegEdit } from "react-icons/fa";
// import { RiDeleteBin6Line, RiAddCircleLine } from "react-icons/ri";
// import { NavLink } from "react-router-dom";
// import { useUserCreateTeamMutation, useUserTeamDeleteMutation, useUserEditTeamMutation, useUserTeamManagementQuery } from "../../Redux/feature/ApiSlice";

// const Team = () => {
//   const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
//   const [isFormPopupOpen, setIsFormPopupOpen] = useState(false);
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [editMemberId, setEditMemberId] = useState(null);
//   const [memberToDelete, setMemberToDelete] = useState(null);

//   const [formData, setFormData] = useState({
//     name: "",
//     skills: "",
//     joining_date: "",
//     email: "",
//     phone: "",
//   });

//   // Fetch team members using the query hook
//   const { data: teamMembers, isLoading, error } = useUserTeamManagementQuery();

//   // Create, delete, and edit mutations
//   const [createTeamMember, { isLoading: isCreating, error: createError }] = useUserCreateTeamMutation();
//   const [deleteTeamMember, { isLoading: isDeleting, error: deleteError }] = useUserTeamDeleteMutation();
//   const [editTeamMember, { isLoading: isEditing, error: editError }] = useUserEditTeamMutation();

//   const handleDeleteClick = (e, memberId) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setMemberToDelete(memberId);
//     setIsDeletePopupOpen(true);
//   };

//   const handleCloseDeletePopup = () => {
//     setIsDeletePopupOpen(false);
//     setMemberToDelete(null);
//   };

//   const handleConfirmDelete = async () => {
//     if (memberToDelete) {
//       try {
//         await deleteTeamMember(memberToDelete).unwrap();
//         console.log("Team member deleted!");
//       } catch (err) {
//         console.error("Failed to delete team member:", err);
//       }
//     }
//     setIsDeletePopupOpen(false);
//     setMemberToDelete(null);
//   };

//   const handleAddClick = () => {
//     setIsEditMode(false);
//     setEditMemberId(null);
//     setFormData({
//       name: "",
//       skills: "",
//       joining_date: "",
//       email: "",
//       phone: "",
//     });
//     setIsFormPopupOpen(true);
//   };

//   const handleEditClick = (e, member) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsEditMode(true);
//     setEditMemberId(member.id);
//     setFormData({
//       name: member.name || "",
//       skills: member.skills || "",
//       joining_date: member.joining_date || "",
//       email: member.email || "",
//       phone: member.phone || "",
//     });
//     setIsFormPopupOpen(true);
//   };

//   const handleCloseFormPopup = () => {
//     setIsFormPopupOpen(false);
//     setIsEditMode(false);
//     setEditMemberId(null);
//     setFormData({
//       name: "",
//       skills: "",
//       joining_date: "",
//       email: "",
//       phone: "",
//     });
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (isEditMode) {
//         const updatedData = {
//           name: formData.name,
//           skills: formData.skills,
//           joining_date: formData.joining_date || null,
//           email: formData.email,
//           phone: formData.phone,
//         };
//         await editTeamMember({ id: editMemberId, data: updatedData }).unwrap();
//         console.log("Team member updated successfully!");
//       } else {
//         const newMember = {
//           name: formData.name,
//           skills: formData.skills,
//           joining_date: formData.joining_date || null,
//           email: formData.email,
//           phone: formData.phone,
//         };
//         await createTeamMember(newMember).unwrap();
//         console.log("Team member added successfully!");
//       }
//       handleCloseFormPopup();
//     } catch (err) {
//       console.error(isEditMode ? "Failed to update team member:" : "Failed to add team member:", err);
//     }
//   };

//   if (isLoading) return <div>Loading team members...</div>;
//   if (error) {
//     console.error('Error details:', error);
//     return <div>Error loading team members: {error.message || 'Unknown error'}</div>;
//   }

//   return (
//     <div className="min-h-screen p-6 text-gray-800 dark:text-gray-200 roboto">
//       <div className="mx-auto">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
//             Team Management
//           </h1>
//         </div>

//         {/* Search and Add */}
//         <div className="flex justify-between items-center mb-6">
//           <div className="relative w-full max-w-md">
//             <input
//               type="text"
//               placeholder="Search Team Member..."
//               className="w-full pl-4 pr-10 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1E232E] text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00308F] dark:focus:ring-[#4A6CF7]"
//             />
//             <Search
//               className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
//               size={20}
//             />
//           </div>
//           <div></div>
//         </div>

//         {/* Team Members Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//           {teamMembers?.map((member) => (
//             <div
//               key={member.id}
//               className="bg-[#EDEDED] dark:bg-[#1E232E] p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 hover:bg-[#f5efe8af] dark:hover:bg-[#353A47]"
//             >
//               <div className="flex justify-between items-start mb-2">
//                 <div>
//                   <h3 className="text-[24px] font-bold text-gray-800 dark:text-gray-100">
//                     {member.name}
//                   </h3>
//                   <p className="text-gray-500 dark:text-gray-400">
//                     {member.skills}
//                   </p>
//                   <p className="text-[#00308F] text-[18px] dark:text-[#4A6CF7] font-medium mt-1">
//                     {member.projects || 0} Projects 📈
//                   </p>
//                 </div>
//                 <div className="space-x-1">
//                   <button
//                     onClick={(e) => handleEditClick(e, member)}
//                     className="dark:text-white hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer"
//                   >
//                     <FaRegEdit size={20} />
//                   </button>
//                   <button
//                     onClick={(e) => handleDeleteClick(e, member.id)}
//                     className="text-red-500 dark:text-red-500 hover:text-red-600 dark:hover:text-red-600 cursor-pointer"
//                   >
//                     <RiDeleteBin6Line size={20} />
//                   </button>
//                 </div>
//               </div>
//               <div className="mt-4 space-y-2">
//                 <div className="flex items-center text-gray-600 dark:text-gray-300">
//                   <Mail
//                     size={16}
//                     className="mr-2 text-gray-500 dark:text-gray-400"
//                   />
//                   <span>{member.email}</span>
//                 </div>
//                 <div className="flex items-center text-gray-600 dark:text-gray-300">
//                   <Phone
//                     size={16}
//                     className="mr-2 text-gray-500 dark:text-gray-400"
//                   />
//                   <span>{member.phone}</span>
//                 </div>
//                 <div className="flex items-center text-gray-600 dark:text-gray-300">
//                   <Calendar
//                     size={16}
//                     className="mr-2 text-gray-500 dark:text-gray-400"
//                   />
//                   <span>Joined: {member.joining_date || "N/A"}</span>
//                 </div>
//               </div>
//             </div>
//           ))}

//           {/* Add Team Management Card */}
//           <div className="bg-white dark:bg-[#2A2F3B] p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col items-center justify-center hover:bg-[#f5efe8af] dark:hover:bg-[#2A2F3B]/80">
//             <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-600 flex items-center justify-center mb-4">
//               <Plus className="h-6 w-6 text-gray-500 dark:text-gray-300" />
//             </div>
//             <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4 flex items-center space-x-2">
//               <RiAddCircleLine className="text-gray-500 dark:text-gray-300" size={24} />
//               <span>Create A New Member</span>
//             </h3>
//             <button
//               onClick={handleAddClick}
//               className="bg-[#00308F] dark:bg-[#4A6CF7] text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-[#00218f] dark:hover:bg-[#3B5AEB] cursor-pointer"
//             >
//               <Plus className="h-4 w-4" />
//               <span>Add New Member</span>
//             </button>
//           </div>
//         </div>

//         {/* Delete Confirmation Popup */}
//         {isDeletePopupOpen && (
//           <div className="fixed inset-0 flex items-center justify-center z-50">
//             <div className="absolute inset-0 backdrop-blur-[3px]"></div>
//             <div className="relative bg-white dark:bg-[#1E232E] rounded-xl shadow-sm p-8 w-[400px] max-w-[90vw] border border-gray-200 dark:border-gray-700">
//               <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4 text-center">
//                 Confirm Deletion 🗑️
//               </h3>
//               <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
//                 Are you sure you want to delete this member? This action cannot be undone.
//               </p>
//               <div className="flex justify-center gap-4">
//                 <button
//                   onClick={handleConfirmDelete}
//                   disabled={isDeleting}
//                   className="bg-red-500 dark:bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-600 dark:hover:bg-red-700 font-medium cursor-pointer disabled:opacity-50"
//                 >
//                   {isDeleting ? "Deleting..." : "Delete"}
//                 </button>
//                 <button
//                   onClick={handleCloseDeletePopup}
//                   className="bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 px-6 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 font-medium cursor-pointer"
//                 >
//                   Cancel
//                 </button>
//               </div>
//               {deleteError && (
//                 <p className="mt-4 text-red-600 dark:text-red-400 text-center">
//                   Failed to delete: {deleteError.message || "Unknown error"}
//                 </p>
//               )}
//             </div>
//           </div>
//         )}

//         {/* Add/Edit Team Member Popup */}
//         {isFormPopupOpen && (
//           <div className="fixed inset-0 flex items-center justify-center z-50">
//             <div className="absolute inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-[3px]"></div>
//             <div className="relative bg-white dark:bg-[#2A2F3B] rounded-xl shadow-lg p-8 w-[500px] max-w-[90vw] border border-gray-200 dark:border-gray-700">
//               <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6 text-center">
//                 {isEditMode ? "Edit Team Member" : "Add New Member"}
//               </h3>
//               <form onSubmit={handleFormSubmit} className="space-y-4">
//                 <div>
//                   <label className="block text-gray-700 dark:text-gray-300 mb-1">
//                     Name 👤
//                   </label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleInputChange}
//                     placeholder="Enter name"
//                     className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1E232E] text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00308F] dark:focus:ring-[#4A6CF7]"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-gray-700 dark:text-gray-300 mb-1">
//                     Skills / Designation 🛠️
//                   </label>
//                   <input
//                     type="text"
//                     name="skills"
//                     value={formData.skills}
//                     onChange={handleInputChange}
//                     placeholder="Enter skills or designation"
//                     className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1E232E] text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00308F] dark:focus:ring-[#4A6CF7]"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-gray-700 dark:text-gray-300 mb-1">
//                     Joining Date 📅
//                   </label>
//                   <input
//                     type="date"
//                     name="joining_date"
//                     value={formData.joining_date}
//                     onChange={handleInputChange}
//                     className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1E232E] text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00308F] dark:focus:ring-[#4A6CF7]"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-gray-700 dark:text-gray-300 mb-1">
//                     Email 📧
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     placeholder="Enter email"
//                     className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1E232E] text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00308F] dark:focus:ring-[#4A6CF7]"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-gray-700 dark:text-gray-300 mb-1">
//                     Phone 📱
//                   </label>
//                   <input
//                     type="tel"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleInputChange}
//                     placeholder="Enter phone number"
//                     className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1E232E] text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00308F] dark:focus:ring-[#4A6CF7]"
//                     required
//                   />
//                 </div>
//                 <div className="flex justify-center gap-4 mt-6">
//                   <button
//                     type="submit"
//                     disabled={isCreating || isEditing}
//                     className="bg-[#00308F] dark:bg-[#4A6CF7] text-white px-6 py-2 rounded-lg hover:bg-[#002266] dark:hover:bg-[#3B5AEB] font-medium cursor-pointer disabled:opacity-50"
//                   >
//                     {isEditMode ? (isEditing ? "Updating..." : "Update") : (isCreating ? "Adding..." : "Add Member")}
//                   </button>
//                   <button
//                     type="button"
//                     onClick={handleCloseFormPopup}
//                     className="bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 px-6 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 font-medium cursor-pointer"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//                 {(createError || editError) && (
//                   <p className="mt-4 text-red-600 dark:text-red-400 text-center">
//                     {isEditMode
//                       ? `Failed to update: ${editError?.message || "Unknown error"}`
//                       : `Failed to add: ${createError?.message || "Unknown error"}`}
//                   </p>
//                 )}
//               </form>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Team;


import { useState } from "react";
import { Search, Mail, Phone, Calendar, Plus, Pencil, Trash, X } from "lucide-react";
import { RiAddCircleLine } from "react-icons/ri";

// Static dummy data for team members
const dummyTeamMembers = [
  {
    id: 1,
    name: "John Doe",
    skills: "Frontend Developer",
    projects: 5,
    email: "john.doe@example.com",
    phone: "+1 234-567-8901",
    joining_date: "2024-01-15",
  },
  {
    id: 2,
    name: "Jane Smith",
    skills: "Backend Developer",
    projects: 3,
    email: "jane.smith@example.com",
    phone: "+1 345-678-9012",
    joining_date: "2024-03-22",
  },
  {
    id: 3,
    name: "Alice Johnson",
    skills: "UI/UX Designer",
    projects: 7,
    email: "alice.johnson@example.com",
    phone: "+1 456-789-0123",
    joining_date: "2024-06-10",
  },
];

const Team = () => {
  // State for team members (to allow adding/deleting members)
  const [teamMembers, setTeamMembers] = useState(dummyTeamMembers);
  // State for popup visibility
  const [showPopup, setShowPopup] = useState(false);
  // State for new team member form
  const [newMember, setNewMember] = useState({
    name: "",
    skills: "",
    projects: "",
    email: "",
    phone: "",
    joining_date: "",
  });

  // Handle input changes for new member form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMember((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission for new team member
  const handleAddMember = (e) => {
    e.preventDefault();
    if (
      newMember.name.trim() &&
      newMember.skills.trim() &&
      newMember.email.trim() &&
      newMember.phone.trim() &&
      newMember.joining_date.trim()
    ) {
      const nextId = teamMembers.length + 1;
      setTeamMembers((prev) => [
        ...prev,
        {
          id: nextId,
          name: newMember.name,
          skills: newMember.skills,
          projects: parseInt(newMember.projects) || 0,
          email: newMember.email,
          phone: newMember.phone,
          joining_date: newMember.joining_date,
        },
      ]);
      setNewMember({
        name: "",
        skills: "",
        projects: "",
        email: "",
        phone: "",
        joining_date: "",
      });
      setShowPopup(false);
    }
  };

  // Handle delete team member
  const handleDeleteMember = (id) => {
    setTeamMembers((prev) => prev.filter((member) => member.id !== id));
  };

  // Handle edit team member (placeholder for future functionality)
  const handleEditMember = (id) => {
    alert(`Edit team member with ID: ${id} (Functionality to be implemented)`);
    // Future implementation: Open a popup with pre-filled member details
  };

  return (
    <div className="min-h-screen p-6 text-gray-800 dark:text-gray-200 roboto">
      <div className="mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            Team Management
          </h1>
        </div>

        {/* Search */}
        <div className="flex justify-between items-center mb-6">
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
          <div></div>
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-[#EDEDED] dark:bg-[#1E232E] p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 relative"
            >
              {/* Edit and Delete Icons */}
              <div className="absolute top-0 right-0 flex space-x-2 p-2">
                <button
                  onClick={() => handleEditMember(member.id)}
                  className="text-gray-500 hover:text-[#00308F] dark:hover:text-[#4A6CF7] cursor-pointer"
                  title="Edit Member"
                >
                  <Pencil size={22} />
                </button>
                <button
                  onClick={() => handleDeleteMember(member.id)}
                  className="text-gray-500 hover:text-red-500 dark:hover:text-red-400 cursor-pointer"
                  title="Delete Member"
                >
                  <Trash size={22} />
                </button>
              </div>

              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-[24px] font-bold text-gray-800 dark:text-gray-100">
                    {member.name}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    {member.skills}
                  </p>
                  <p className="text-[#00308F] text-[18px] dark:text-[#4A6CF7] font-medium mt-1">
                    {member.projects} Projects 📈
                  </p>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <Mail
                    size={16}
                    className="mr-2 text-gray-500 dark:text-gray-400"
                  />
                  <span>{member.email}</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <Phone
                    size={16}
                    className="mr-2 text-gray-500 dark:text-gray-400"
                  />
                  <span>{member.phone}</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <Calendar
                    size={16}
                    className="mr-2 text-gray-500 dark:text-gray-400"
                  />
                  <span>Joined: {member.joining_date}</span>
                </div>
              </div>
            </div>
          ))}

          {/* Create A New Member Card */}
          <div className="bg-white dark:bg-[#2A2F3B] p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-600 flex items-center justify-center mb-4">
              <Plus className="h-6 w-6 text-gray-500 dark:text-gray-300" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4 flex items-center space-x-2">
              <RiAddCircleLine className="text-gray-500 dark:text-gray-300" size={24} />
              <span>Create A New Member</span>
            </h3>
            <button
              onClick={() => setShowPopup(true)}
              className="bg-[#00308F] dark:bg-[#4A6CF7] text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-[#00218f] dark:hover:bg-[#3B5AEB] cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              <span>Add New Member</span>
            </button>
          </div>
        </div>

        {/* Popup for Adding New Team Member */}
        {showPopup && (
          <div className="fixed inset-0 backdrop-blur-[3px] flex items-center justify-center z-50">
            <div className="bg-white dark:bg-[#1E232E] p-6 rounded-lg shadow-lg w-full max-w-md relative">
              <button
                onClick={() => setShowPopup(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <X size={20} />
              </button>

              <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                Add New Team Member
              </h3>

              <form onSubmit={handleAddMember} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={newMember.name}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#1E232E] text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00308F] dark:focus:ring-[#4A6CF7]"
                    placeholder="Enter name"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="skills"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Skills
                  </label>
                  <input
                    type="text"
                    id="skills"
                    name="skills"
                    value={newMember.skills}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#1E232E] text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00308F] dark:focus:ring-[#4A6CF7]"
                    placeholder="Enter skills (e.g., Frontend Developer)"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="projects"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Number of Projects
                  </label>
                  <input
                    type="number"
                    id="projects"
                    name="projects"
                    value={newMember.projects}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#1E232E] text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00308F] dark:focus:ring-[#4A6CF7]"
                    placeholder="Enter number of projects"
                    min="0"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-3
                    00 mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={newMember.email}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#1E232E] text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00308F] dark:focus:ring-[#4A6CF7]"
                    placeholder="Enter email"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={newMember.phone}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#1E232E] text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00308F] dark:focus:ring-[#4A6CF7]"
                    placeholder="Enter phone number"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="joining_date"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Joining Date
                  </label>
                  <input
                    type="date"
                    id="joining_date"
                    name="joining_date"
                    value={newMember.joining_date}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#1E232E] text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00308F] dark:focus:ring-[#4A6CF7]"
                    required
                  />
                </div>

                <div className="flex justify-end gap-2 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowPopup(false)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#00308F] dark:bg-[#4A6CF7] text-white rounded-md hover:bg-[#00218f] dark:hover:bg-[#3B5AEB]"
                  >
                    Add Member
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Team;