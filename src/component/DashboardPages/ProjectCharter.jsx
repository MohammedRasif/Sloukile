import { useState } from "react";
import {
  FaTimesCircle,
  FaGlobe,
  FaEuroSign,
  FaSitemap,
  FaUserTie,
  FaBuilding,
  FaExclamationTriangle,
  FaUsers,
  FaDatabase,
  FaPhone,
} from "react-icons/fa";
import { MdGridView } from "react-icons/md";


// Data for rendering the circular chart
const charterSections = [
  { label: "Project Close", icon: <FaTimesCircle /> },
  // { label: "Vision", icon: <FaGlobe /> },
  { label: "Overview", icon: <MdGridView /> },
  { label: "Project Structure", icon: <FaSitemap /> },
  { label: "Project Manager", icon: <FaUserTie /> },
  { label: "Implementation", icon: <FaBuilding /> },
  { label: "Risks", icon: <FaExclamationTriangle /> },
  { label: "Issues", icon: <FaUsers /> },
  { label: "Budget", icon: <FaDatabase /> },
  { label: "Response", icon: <FaPhone /> },
];

export default function ProjectCharter() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedSectionLabel, setSelectedSectionLabel] = useState(null);
  const [selectedSectionIcon, setSelectedSectionIcon] = useState(null);

  const handleSectionClick = (section) => {
    setSelectedSectionLabel(section.label);
    setSelectedSectionIcon(section.icon);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedSectionLabel(null);
    setSelectedSectionIcon(null);
  };

  return (
    <div className="flex flex-col items-center justify-center dark:bg-gray-900 p-6">
      {/* Title and Description */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-[#00308F] mb-2">
          Project Charter Overview
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-md mb-4">
          Visualize the key components of the project charter for effective management.
        </p>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Click on each section to view detailed information about its role in the project.
        </p>
      </div>

      {/* Circular Chart */}
      <div className="relative w-[500px] h-[500px] flex items-center justify-center">
        {/* Central Title */}
        <div className="absolute text-center z-10">
          <h1 className="text-3xl font-bold text-[#00308F] mt-7">
            PROJECT CHARTER
          </h1>
        </div>

        {/* Circular Ring */}
        <div className="absolute w-[300px] h-[300px] border-8 border-[#00308F] rounded-full mt-7" />

        {/* Charter Sections */}
        {charterSections.map((section, index) => {
          const angle = (index / charterSections.length) * 360; // Calculate angle for each section
          const radians = (angle * Math.PI) / 180;
          const radius = 220; // Distance from center to place the sections

          // Calculate position for each section
          const x = radius * Math.cos(radians);
          const y = radius * Math.sin(radians);

          // Determine if the section is on the left side (for adjusting label position)
          const isLeftSide = angle > 90 && angle < 270;

          return (
            <div
              key={section.label}
              className="absolute flex flex-col items-center cursor-pointer hover:scale-110 transition-transform"
              style={{
                transform: `translate(${x}px, ${y}px)`,
                transformOrigin: "center",
              }}
              onClick={() => handleSectionClick(section)}
              role="button"
              aria-label={`View details for ${section.label}`}
            >
              {/* Icon */}
              <div className="text-3xl text-[#00308F] mb-2">
                {section.icon}
              </div>
              {/* Label */}
              <span
                className="text-sm font-extrabold text-[#00308F] text-center"
                style={{
                  transform: isLeftSide
                    ? `translateX(-50%) rotate(0deg)` // Keep text straight on left side
                    : `translateX(-50%) rotate(0deg)`, // Keep text straight on right side
                  width: "120px", // Increased width to prevent wrapping issues
                  position: "absolute",
                  left: "50%", // Center the text below the icon
                  top: "50px", // Position below the icon
                }}
              >
                {section.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Popup Modal */}
      {isPopupOpen && selectedSectionLabel && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={closePopup}
        >
          {selectedSectionLabel === "Project Close" && (
            <div
              className="bg-red-50 dark:bg-red-900 rounded-lg p-6 w-96 max-w-[90%] shadow-lg border-2 border-red-500"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-center mb-4">
                <div className="text-4xl text-[#00308F]">{selectedSectionIcon}</div>
              </div>
              <h2 className="text-xl font-bold text-[#00308F] mb-4 text-center">Project Close</h2>
              <div className="text-gray-600 dark:text-gray-300 mb-4">
                <p className="mb-2">This section finalizes all project activities.</p>
                <p className="mb-2">Ensure all deliverables are completed and documented.</p>
                <p className="mb-2">Status: Pending completion.</p>
              </div>
              <div className="flex justify-end">
                <button
                  className="px-4 py-2 bg-[#00308F] text-white rounded-md hover:bg-[#002080]"
                  onClick={closePopup}
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {selectedSectionLabel === "Vision" && (
            <div
              className="bg-blue-50 dark:bg-blue-900 rounded-lg p-6 w-96 max-w-[90%] shadow-lg border-2 border-blue-500"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-center mb-4">
                <div className="text-4xl text-[#00308F]">{selectedSectionIcon}</div>
              </div>
              <h2 className="text-xl font-bold text-[#00308F] mb-4 text-center">Vision</h2>
              <div className="text-gray-600 dark:text-gray-300 mb-4">
                <p className="mb-2">Set the long-term goals for the project.</p>
                <p className="mb-2">Involves stakeholders to align on objectives.</p>
                <p className="mb-2">Vision statement finalized in the initiation phase.</p>
              </div>
              <div className="flex justify-end">
                <button
                  className="px-4 py-2 bg-[#00308F] text-white rounded-md hover:bg-[#002080]"
                  onClick={closePopup}
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {selectedSectionLabel === "Finance" && (
            <div
              className="bg-green-50 dark:bg-green-900 rounded-lg p-6 w-96 max-w-[90%] shadow-lg border-2 border-green-500"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-center mb-4">
                <div className="text-4xl text-[#00308F]">{selectedSectionIcon}</div>
              </div>
              <h2 className="text-xl font-bold text-[#00308F] mb-4 text-center">Finance</h2>
              <div className="text-gray-600 dark:text-gray-300 mb-4">
                <p className="mb-2">Manages budget allocation and tracking.</p>
                <p className="mb-2">Ensures financial resources are used efficiently.</p>
                <p className="mb-2">Finance team oversees all expenditures.</p>
              </div>
              <div className="flex justify-end">
                <button
                  className="px-4 py-2 bg-[#00308F] text-white rounded-md hover:bg-[#002080]"
                  onClick={closePopup}
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {selectedSectionLabel === "Project Structure" && (
            <div
              className="bg-purple-50 dark:bg-purple-900 rounded-lg p-6 w-96 max-w-[90%] shadow-lg border-2 border-purple-500"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-center mb-4">
                <div className="text-4xl text-[#00308F]">{selectedSectionIcon}</div>
              </div>
              <h2 className="text-xl font-bold text-[#00308F] mb-4 text-center">Project Structure</h2>
              <div className="text-gray-600 dark:text-gray-300 mb-4">
                <p className="mb-2">Defines team roles and hierarchy.</p>
                <p className="mb-2">Ensures clear reporting lines and responsibilities.</p>
                <p className="mb-2">Org chart created during planning phase.</p>
              </div>
              <div className="flex justify-end">
                <button
                  className="px-4 py-2 bg-[#00308F] text-white rounded-md hover:bg-[#002080]"
                  onClick={closePopup}
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {selectedSectionLabel === "Project Manager" && (
            <div
              className="bg-yellow-50 dark:bg-yellow-900 rounded-lg p-6 w-96 max-w-[90%] shadow-lg border-2 border-yellow-500"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-center mb-4">
                <div className="text-4xl text-[#00308F]">{selectedSectionIcon}</div>
              </div>
              <h2 className="text-xl font-bold text-[#00308F] mb-4 text-center">Project Manager</h2>
              <div className="text-gray-600 dark:text-gray-300 mb-4">
                <p className="mb-2">Leads the project team to success.</p>
                <p className="mb-2">Coordinates all project activities and decisions.</p>
                <p className="mb-2">Assigned at the project start.</p>
              </div>
              <div className="flex justify-end">
                <button
                  className="px-4 py-2 bg-[#00308F] text-white rounded-md hover:bg-[#002080]"
                  onClick={closePopup}
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {selectedSectionLabel === "Implementation" && (
            <div
              className="bg-teal-50 dark:bg-teal-900 rounded-lg p-6 w-96 max-w-[90%] shadow-lg border-2 border-teal-500"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-center mb-4">
                <div className="text-4xl text-[#00308F]">{selectedSectionIcon}</div>
              </div>
              <h2 className="text-xl font-bold text-[#00308F] mb-4 text-center">Implementation</h2>
              <div className="text-gray-600 dark:text-gray-300 mb-4">
                <p className="mb-2">Executes the project plan.</p>
                <p className="mb-2">Delivers the final product through development and testing.</p>
                <p className="mb-2">Currently in progress.</p>
              </div>
              <div className="flex justify-end">
                <button
                  className="px-4 py-2 bg-[#00308F] text-white rounded-md hover:bg-[#002080]"
                  onClick={closePopup}
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {selectedSectionLabel === "Risks" && (
            <div
              className="bg-orange-50 dark:bg-orange-900 rounded-lg p-6 w-96 max-w-[90%] shadow-lg border-2 border-orange-500"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-center mb-4">
                <div className="text-4xl text-[#00308F]">{selectedSectionIcon}</div>
              </div>
              <h2 className="text-xl font-bold text-[#00308F] mb-4 text-center">Risks</h2>
              <div className="text-gray-600 dark:text-gray-300 mb-4">
                <p className="mb-2">Identifies potential risks to the project.</p>
                <p className="mb-2">Develops mitigation strategies to minimize impact.</p>
                <p className="mb-2">Ongoing monitoring in place.</p>
              </div>
              <div className="flex justify-end">
                <button
                  className="px-4 py-2 bg-[#00308F] text-white rounded-md hover:bg-[#002080]"
                  onClick={closePopup}
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {selectedSectionLabel === "Issues" && (
            <div
              className="bg-pink-50 dark:bg-pink-900 rounded-lg p-6 w-96 max-w-[90%] shadow-lg border-2 border-pink-500"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-center mb-4">
                <div className="text-4xl text-[#00308F]">{selectedSectionIcon}</div>
              </div>
              <h2 className="text-xl font-bold text-[#00308F] mb-4 text-center">Issues</h2>
              <div className="text-gray-600 dark:text-gray-300 mb-4">
                <p className="mb-2">Tracks and resolves project issues.</p>
                <p className="mb-2">Ensures timely resolution to avoid delays.</p>
                <p className="mb-2">Active issue management ongoing.</p>
              </div>
              <div className="flex justify-end">
                <button
                  className="px-4 py-2 bg-[#00308F] text-white rounded-md hover:bg-[#002080]"
                  onClick={closePopup}
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {selectedSectionLabel === "Budget" && (
            <div
              className="bg-indigo-50 dark:bg-indigo-900 rounded-lg p-6 w-96 max-w-[90%] shadow-lg border-2 border-indigo-500"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-center mb-4">
                <div className="text-4xl text-[#00308F]">{selectedSectionIcon}</div>
              </div>
              <h2 className="text-xl font-bold text-[#00308F] mb-4 text-center">Budget</h2>
              <div className="text-gray-600 dark:text-gray-300 mb-4">
                <p className="mb-2">Monitors project financials.</p>
                <p className="mb-2">Controls costs to stay within budget limits.</p>
                <p className="mb-2">Budget tracking on track.</p>
              </div>
              <div className="flex justify-end">
                <button
                  className="px-4 py-2 bg-[#00308F] text-white rounded-md hover:bg-[#002080]"
                  onClick={closePopup}
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {selectedSectionLabel === "Response" && (
            <div
              className="bg-cyan-50 dark:bg-cyan-900 rounded-lg p-6 w-96 max-w-[90%] shadow-lg border-2 border-cyan-500"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-center mb-4">
                <div className="text-4xl text-[#00308F]">{selectedSectionIcon}</div>
              </div>
              <h2 className="text-xl font-bold text-[#00308F] mb-4 text-center">Response</h2>
              <div className="text-gray-600 dark:text-gray-300 mb-4">
                <p className="mb-2">Manages stakeholder communication.</p>
                <p className="mb-2">Collects and addresses feedback effectively.</p>
                <p className="mb-2">Active throughout the project.</p>
              </div>
              <div className="flex justify-end">
                <button
                  className="px-4 py-2 bg-[#00308F] text-white rounded-md hover:bg-[#002080]"
                  onClick={closePopup}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
