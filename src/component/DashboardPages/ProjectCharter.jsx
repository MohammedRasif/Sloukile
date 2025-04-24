"use client"

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
} from "react-icons/fa"
import { IoIosTimer } from "react-icons/io"
import { MdAccountBalance } from "react-icons/md"
import {
  FacebookShareButton,
  FacebookMessengerShareButton,
  TwitterShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  EmailShareButton,
  FacebookIcon,
  FacebookMessengerIcon,
  TwitterIcon,
  TelegramIcon,
  WhatsappIcon,
  LinkedinIcon,
  EmailIcon,
} from "react-share"
import ProjectRisks from "./ProjectRisks.jsx"
import Planning from "./Planning.jsx"
import Budget from "./Bugget.jsx"
import Tasks from "./Tasks.jsx"
import Team from "./Team.jsx"
import Timeline from "./Timeline.jsx"
import GovernmentSetup from "./GovernanceSetup.jsx"
import RACI from "./RACI.jsx"
import Deployment from "./Deployment.jsx"
import Overview from "./Overview.jsx"

// Updated charterSections with correct icons and order
const charterSections = [
  { label: "Overview", icon: <FaClipboardList />, component: <Overview /> },
  { label: "Government Setup", icon: <MdAccountBalance />, component: <GovernmentSetup /> },
  { label: "Planning", icon: <FaCogs />, component: <Planning /> },
  { label: "Tasks", icon: <FaTasks />, component: <Tasks /> },
  { label: "Team", icon: <FaUsers />, component: <Team /> },
  { label: "Timeline", icon: <IoIosTimer />, component: <Timeline /> },
  { label: "Budget", icon: <FaDollarSign />, component: <Budget /> },
  { label: "Risks", icon: <FaExclamationTriangle />, component: <ProjectRisks /> },
  { label: "RACI", icon: <FaSitemap />, component: <RACI /> },
  { label: "Strategy", icon: <FaRocket />, component: <Deployment /> },
]

export default function ProjectCharter() {
  const [selectedSection, setSelectedSection] = useState("Overview") // Default to Overview
  const [isShareDropdownOpen, setIsShareDropdownOpen] = useState(false)

  const handleSectionClick = (section) => {
    setSelectedSection(section.label)
    setIsShareDropdownOpen(false)
  }

  const toggleShareDropdown = () => {
    setIsShareDropdownOpen((prev) => !prev)
  }

  const shareUrl = typeof window !== "undefined" ? window.location.href : ""
  const shareTitle = `Project Charter: ${selectedSection || "Overview"}`

  return (
    <div className="flex flex-col items-center justify-center dark:bg-gray-900 p-6 w-full min-h-screen">
      {/* Title and Description */}
      <div className="flex items-center justify-between w-full max-w-7xl">
        <div></div>
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

        <div className="relative mb-4">
          <FaShareAlt
            className="text-3xl text-[#00308F] cursor-pointer hover:text-[#002080]"
            onClick={toggleShareDropdown}
          />
          {isShareDropdownOpen && (
            <div className="absolute top-full right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 flex flex-wrap gap-2 z-50">
              <FacebookShareButton url={shareUrl} quote={shareTitle}>
                <FacebookIcon size={32} round />
              </FacebookShareButton>
              <FacebookMessengerShareButton url={shareUrl} appId="YOUR_FB_APP_ID">
                <FacebookMessengerIcon size={32} round />
              </FacebookMessengerShareButton>
              <TwitterShareButton url={shareUrl} title={shareTitle}>
                <TwitterIcon size={32} round />
              </TwitterShareButton>
              <TelegramShareButton url={shareUrl} title={shareTitle}>
                <TelegramIcon size={32} round />
              </TelegramShareButton>
              <WhatsappShareButton url={shareUrl} title={shareTitle}>
                <WhatsappIcon size={32} round />
              </WhatsappShareButton>
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

      {/* Circular Chart */}
      <div className="relative w-[500px] h-[500px] flex items-center justify-center">
        <div className="absolute text-center z-10">
          <h1 className="text-3xl font-bold text-[#00308F] mt-14">
            PROJECT CHARTER
          </h1>
        </div>
        <div className="absolute w-[300px] h-[300px] border-8 border-[#00308F] rounded-full mt-14" />

        {charterSections.map((section, index) => {
          const angle = (index / charterSections.length) * 360
          const radians = (angle * Math.PI) / 180
          const radius = 220
          const x = radius * Math.cos(radians)
          const y = radius * Math.sin(radians)
          const isLeftSide = angle > 90 && angle < 270

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
              <div className="text-3xl text-[#00308F] mb-2" style={{ fontSize: "35px" }}>
                {section.icon}
              </div>
              <span
                className="text-xl font-extrabold text-[#00308F] text-center"
                style={{
                  transform: isLeftSide
                    ? `translateX(-50%) rotate(0deg)`
                    : `translateX(-50%) rotate(0deg)`,
                  width: "120px",
                  position: "absolute",
                  left: "50%",
                  top: "50px",
                }}
              >
                {section.label}
              </span>
            </div>
          )
        })}
      </div>

      {/* Section Content Display */}
      <div className="p-4 sm:p-6 w-full max-w-8xl flex justify-center mt-10">
        <div className="w-full">
          {charterSections.find((section) => section.label === selectedSection)?.component || (
            <div className="text-gray-500 dark:text-gray-400 text-center">
              Select a section to view details
            </div>
          )}
        </div>
      </div>
    </div>
  )
}