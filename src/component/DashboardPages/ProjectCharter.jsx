

import { useState } from "react"
import {
  FaCogs,
  FaTasks,
  FaUsers,
  FaDollarSign,
  FaExclamationTriangle,
  FaSitemap,
  FaShareAlt,
  FaRocket,
  FaClipboardList,
  FaChevronDown,
  FaChevronRight,
  FaRegFilePdf,
  FaPrint,
  FaDownload,
} from "react-icons/fa"
import { IoIosTimer } from "react-icons/io"
import { MdAccountBalance } from "react-icons/md"
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  EmailIcon,
} from "react-share"
import Overview from "./Overview"
import Planning from "./Planning"
import Tasks from "./Tasks"
import ProjectRisks from "./ProjectRisks"
import RACI from "./RACI"
import Deployment from "./Deployment"
import GovernmentSetup from "./GovernanceSetup"
import Team from "./Team.jsx"
import Timeline from "./Timeline.jsx"
import Bugget from "./Bugget.jsx"


const charterSections = [
  { label: "Overview", icon: <FaClipboardList />, component: <Overview /> },
  { label: "Government Setup", icon: <MdAccountBalance />, component: <GovernmentSetup /> },
  { label: "Planning", icon: <FaCogs />, component: <Planning /> },
  { label: "Tasks", icon: <FaTasks />, component: <Tasks /> },
  { label: "Team", icon: <FaUsers />, component: <Team /> },
  { label: "Timeline", icon: <IoIosTimer />, component: <Timeline /> },
  { label: "Budget", icon: <FaDollarSign />, component: <Bugget /> },
  { label: "Risks", icon: <FaExclamationTriangle />, component: <ProjectRisks /> },
  { label: "RACI", icon: <FaSitemap />, component: <RACI /> },
  { label: "Strategy", icon: <FaRocket />, component: <Deployment /> },
]

// Updated projectData with construction-specific deliverables
const projectData = {
  title: "Downtown Commercial Tower Construction",
  orchestrator: "Emily Thompson",
  manager: "Rahul Patel",
  objective:
    "The Downtown Commercial Tower Construction project aims to build a state-of-the-art, sustainable commercial building in the city center, optimizing resource use, ensuring timely completion, and delivering a high-quality, eco-friendly structure that enhances urban development and tenant satisfaction.",

  scopeItems: [
    {
      capability: "Site Preparation and Foundation",
      description:
        "Clearing and grading the site, followed by laying a reinforced concrete foundation to support the multi-story commercial structure.",
      endGame:
        "Expected outcomes:\n• Completion of site clearing within 4 weeks\n• Foundation ready for structural work: 95% quality compliance\n• Cost savings: $500K through optimized excavation\n• Zero safety incidents\n• 100% adherence to local regulations\n• Reduced environmental impact via sustainable practices",
    },
    {
      capability: "Structural Framework",
      description:
        "Erecting the steel and concrete framework for the building, including columns, beams, and floors, to ensure structural integrity.",
      endGame: "",
    },
    {
      capability: "Building Envelope and Facade",
      description:
        "Installing exterior walls, windows, and cladding to create a weather-tight and energy-efficient building envelope with a modern aesthetic.",
      endGame: "",
    },
    {
      capability: "Interior Fit-Out and Systems",
      description:
        "Completing interior construction, including electrical, plumbing, HVAC, and tenant-specific fit-outs to meet commercial leasing requirements.",
      endGame: "",
    },
  ],

  interdependencies: [
    {
      item: "Availability of Skilled Labor",
      description:
        "The project relies on the availability of qualified construction workers, including masons, electricians, and HVAC technicians, to meet tight deadlines.",
    },
    {
      item: "Timely Material Supply",
      description:
        "Delays in the delivery of critical materials like steel, concrete, and glass could impact the construction schedule and increase costs.",
    },
  ],

  keyRisks: [
    {
      risk: "Weather-Related Delays",
      description:
        "Adverse weather conditions, such as heavy rain or extreme heat, could halt outdoor construction activities and delay the project timeline.",
    },
    {
      risk: "Regulatory Compliance Issues",
      description:
        "Failure to meet building codes or obtain necessary permits on time could result in fines or construction halts.",
    },
    {
      risk: "Labor Shortages",
      description:
        "A lack of skilled workers due to market demand or labor disputes could slow progress and increase labor costs.",
    },
    {
      risk: "Material Cost Volatility",
      description:
        "Fluctuations in the prices of key materials like steel or cement could exceed the allocated budget, impacting financial planning.",
    },
  ],

  deliverables: [
    { name: "Site Preparation Plan", date: "02/25" },
    { name: "Foundation Design Approval", date: "03/25" },
    { name: "Structural Framework Completion", date: "06/25" },
    { name: "Facade Installation Milestone", date: "09/25" },
    { name: "Interior Fit-Out Completion", date: "12/25" },
    { name: "Building Handover", date: "TBD" },
  ],

  resources: [
    { role: "Project Manager", required: "Yes", name: "Rahul Patel", fte: "0.2" },
  ],
}

export default function ProjectCharter() {
  const [selectedSection, setSelectedSection] = useState("Overview") // Default to Overview
  const [isShareDropdownOpen, setIsShareDropdownOpen] = useState(false)
  const [expandedSections, setExpandedSections] = useState({
    scope: true,
    interdependencies: true,
    risks: true,
    deliverables: true,
    resources: true,
  })

  const handleSectionClick = (section) => {
    setSelectedSection(section.label)
    setIsShareDropdownOpen(false)
  }

  const toggleShareDropdown = () => {
    setIsShareDropdownOpen((prev) => !prev)
  }

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const shareUrl = typeof window !== "undefined" ? window.location.href : ""
  const shareTitle = `Project Charter: ${selectedSection || "Overview"}`

  return (
    <div className="flex flex-col items-center justify-center p-6 w-full  dark:bg-[#1E232E]">
      <div className="w-full  bg-white dark:bg-[#1E232E] shadow-lg rounded-lg overflow-hidden">
        {/* Header with actions */}
        <div className="flex justify-between items-center p-4 bg-[#00308F] dark:bg-[#4A6CF7] text-white">
          <h1 className="text-2xl font-bold">Program Charter: {projectData.title}</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <FaShareAlt
                className="text-xl cursor-pointer hover:text-gray-300"
                onClick={toggleShareDropdown}
              />
              {isShareDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 bg-white dark:bg-[#2A2F3B] rounded-lg shadow-lg p-4 flex flex-wrap gap-2 z-50">
                  <FacebookShareButton url={shareUrl} quote={shareTitle}>
                    <FacebookIcon size={32} round />
                  </FacebookShareButton>
                  <TwitterShareButton url={shareUrl} title={shareTitle}>
                    <TwitterIcon size={32} round />
                  </TwitterShareButton>
                  <LinkedinShareButton url={shareUrl} title={shareTitle}>
                    <LinkedinIcon size={32} round />
                  </LinkedinShareButton>
                  <EmailShareButton url={shareUrl} subject={shareTitle}>
                    <EmailIcon size={32} round />
                  </EmailShareButton>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Project info */}
        <div className="p-4 border-b dark:border-gray-600">
          <div className="flex justify-between mb-4">
            <div>
              <span className="text-gray-600 dark:text-gray-400 font-medium">
                Project Orchestrator:
              </span>{" "}
              {projectData.orchestrator}
            </div>
            <div>
              <span className="text-gray-600 dark:text-gray-400 font-medium">
                Project Manager:
              </span>{" "}
              {projectData.manager}
            </div>
          </div>

          <div className="mb-4">
            <h2 className="text-gray-700 dark:text-gray-200 font-bold mb-2">
              Program Goal/Objective:
            </h2>
            <p className="text-gray-600 dark:text-gray-400">{projectData.objective}</p>
          </div>
        </div>

        {/* Main content */}
        <div className="p-4">
          {/* Scope/Capabilities Section */}
          <div className="mb-6 border dark:border-gray-600 rounded-lg overflow-hidden">
            <div
              className="flex justify-between items-center p-3 bg-[#00308F] dark:bg-[#4A6CF7] text-white cursor-pointer"
              onClick={() => toggleSection("scope")}
            >
              <h2 className="font-bold">Scope/Capabilities to deliver</h2>
              {expandedSections.scope ? <FaChevronDown /> : <FaChevronRight />}
            </div>

            {expandedSections.scope && (
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-100 dark:bg-[#353A47]">
                      <th className="p-3 text-left font-semibold text-gray-700 dark:text-gray-200 border dark:border-gray-600">
                        Scope/Capabilities to deliver
                      </th>
                      <th className="p-3 text-left font-semibold text-gray-700 dark:text-gray-200 border dark:border-gray-600">
                        Short description
                      </th>
                      <th className="p-3 text-left font-semibold text-gray-700 dark:text-gray-200 border dark:border-gray-600">
                        End-game
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {projectData.scopeItems.map((item, index) => (
                      <tr
                        key={index}
                        className={
                          index % 2 === 0
                            ? "bg-white dark:bg-[#1E232E]"
                            : "bg-gray-50 dark:bg-[#2A2F3B]"
                        }
                      >
                        <td className="p-3 border dark:border-gray-600 text-gray-700 dark:text-gray-300">
                          {item.capability}
                        </td>
                        <td className="p-3 border dark:border-gray-600 text-gray-700 dark:text-gray-300">
                          {item.description}
                        </td>
                        <td className="p-3 border dark:border-gray-600 text-gray-700 dark:text-gray-300 whitespace-pre-line">
                          {item.endGame}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Critical Interdependencies Section */}
          <div className="mb-6 border dark:border-gray-600 rounded-lg overflow-hidden">
            <div
              className="flex justify-between items-center p-3 bg-[#00308F] dark:bg-[#4A6CF7] text-white cursor-pointer"
              onClick={() => toggleSection("interdependencies")}
            >
              <h2 className="font-bold">Critical Interdependencies</h2>
              {expandedSections.interdependencies ? <FaChevronDown /> : <FaChevronRight />}
            </div>

            {expandedSections.interdependencies && (
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-100 dark:bg-[#353A47]">
                      <th className="p-3 text-left font-semibold text-gray-700 dark:text-gray-200 border dark:border-gray-600">
                        Item
                      </th>
                      <th className="p-3 text-left font-semibold text-gray-700 dark:text-gray-200 border dark:border-gray-600">
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {projectData.interdependencies.map((item, index) => (
                      <tr
                        key={index}
                        className={
                          index % 2 === 0
                            ? "bg-white dark:bg-[#1E232E]"
                            : "bg-gray-50 dark:bg-[#2A2F3B]"
                        }
                      >
                        <td className="p-3 border dark:border-gray-600 text-gray-700 dark:text-gray-300">
                          {item.item}
                        </td>
                        <td className="p-3 border dark:border-gray-600 text-gray-700 dark:text-gray-300">
                          {item.description}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Key Risks Section */}
          <div className="mb-6 border dark:border-gray-600 rounded-lg overflow-hidden">
            <div
              className="flex justify-between items-center p-3 bg-[#00308F] dark:bg-[#4A6CF7] text-white cursor-pointer"
              onClick={() => toggleSection("risks")}
            >
              <h2 className="font-bold">Key Risks</h2>
              {expandedSections.risks ? <FaChevronDown /> : <FaChevronRight />}
            </div>

            {expandedSections.risks && (
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-100 dark:bg-[#353A47]">
                      <th className="p-3 text-left font-semibold text-gray-700 dark:text-gray-200 border dark:border-gray-600">
                        Risk
                      </th>
                      <th className="p-3 text-left font-semibold text-gray-700 dark:text-gray-200 border dark:border-gray-600">
                        Description / Mitigation (if available)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {projectData.keyRisks.map((item, index) => (
                      <tr
                        key={index}
                        className={
                          index % 2 === 0
                            ? "bg-white dark:bg-[#1E232E]"
                            : "bg-gray-50 dark:bg-[#2A2F3B]"
                        }
                      >
                        <td className="p-3 border dark:border-gray-600 text-gray-700 dark:text-gray-300">
                          {item.risk}
                        </td>
                        <td className="p-3 border dark:border-gray-600 text-gray-700 dark:text-gray-300">
                          {item.description}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Key Deliverables Section */}
          <div className="mb-6 border dark:border-gray-600 rounded-lg overflow-hidden">
            <div
              className="flex justify-between items-center p-3 bg-[#00308F] dark:bg-[#4A6CF7] text-white cursor-pointer"
              onClick={() => toggleSection("deliverables")}
            >
              <h2 className="font-bold">Key Deliverables</h2>
              {expandedSections.deliverables ? <FaChevronDown /> : <FaChevronRight />}
            </div>

            {expandedSections.deliverables && (
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-100 dark:bg-[#353A47]">
                      <th className="p-3 text-left font-semibold text-gray-700 dark:text-gray-200 border dark:border-gray-600">
                        Deliverable
                      </th>
                      <th className="p-3 text-left font-semibold text-gray-700 dark:text-gray-200 border dark:border-gray-600">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {projectData.deliverables.map((item, index) => (
                      <tr
                        key={index}
                        className={
                          index % 2 === 0
                            ? "bg-white dark:bg-[#1E232E]"
                            : "bg-gray-50 dark:bg-[#2A2F3B]"
                        }
                      >
                        <td className="p-3 border dark:border-gray-600 text-gray-700 dark:text-gray-300">
                          {item.name}
                        </td>
                        <td className="p-3 border dark:border-gray-600 text-gray-700 dark:text-gray-300">
                          {item.date}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Resource Requirements Section */}
          <div className="mb-6 border dark:border-gray-600 rounded-lg overflow-hidden">
            <div
              className="flex justify-between items-center p-3 bg-[#00308F] dark:bg-[#4A6CF7] text-white cursor-pointer"
              onClick={() => toggleSection("resources")}
            >
              <h2 className="font-bold">Resource Requirements</h2>
              {expandedSections.resources ? <FaChevronDown /> : <FaChevronRight />}
            </div>

            {expandedSections.resources && (
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-100 dark:bg-[#353A47]">
                      <th className="p-3 text-left font-semibold text-gray-700 dark:text-gray-200 border dark:border-gray-600">
                        Role
                      </th>
                      <th className="p-3 text-left font-semibold text-gray-700 dark:text-gray-200 border dark:border-gray-600">
                        Required
                      </th>
                      <th className="p-3 text-left font-semibold text-gray-700 dark:text-gray-200 border dark:border-gray-600">
                        Name(s), if known
                      </th>
                      <th className="p-3 text-left font-semibold text-gray-700 dark:text-gray-200 border dark:border-gray-600">
                        FTE
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {projectData.resources.map((item, index) => (
                      <tr
                        key={index}
                        className={
                          index % 2 === 0
                            ? "bg-white dark:bg-[#1E232E]"
                            : "bg-gray-50 dark:bg-[#2A2F3B]"
                        }
                      >
                        <td className="p-3 border dark:border-gray-600 text-gray-700 dark:text-gray-300">
                          {item.role}
                        </td>
                        <td className="p-3 border dark:border-gray-600 text-gray-700 dark:text-gray-300">
                          {item.required}
                        </td>
                        <td className="p-3 border dark:border-gray-600 text-gray-700 dark:text-gray-300">
                          {item.name}
                        </td>
                        <td className="p-3 border dark:border-gray-600 text-gray-700 dark:text-gray-300">
                          {item.fte}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      
    </div>
  )
}
