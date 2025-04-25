

import { useState } from "react"
import {
  Users,
  MessageSquare,
  Briefcase,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Building,
  UserCheck,
  FileText,
  Calendar,
  AlertCircle,
} from "lucide-react"

const GovernanceSetup = () => {
  const [expandedSections, setExpandedSections] = useState({
    structure: true,
    communication: true,
    stakeholders: true,
    impact: true,
  })

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  return (
    <div className="container py-6 bg-white dark:bg-[#1E232E] rounded-lg shadow-lg">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">Governance Setup</h1>
        <p className="text-gray-600 dark:text-gray-400">Communication Flow and Stakeholder Management</p>
      </div>

      {/* Governance Structure Section */}
      <div className="mb-8 border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden">
        <div
          className="bg-blue-50 dark:bg-[#3B5AEB]/20 p-4 flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection("structure")}
        >
          <div className="flex items-center">
            <Briefcase className="h-5 w-5 text-blue-600 dark:text-blue-300 mr-2" />
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Governance Structure</h2>
          </div>
          {expandedSections.structure ? (
            <ChevronUp className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          )}
        </div>

        {expandedSections.structure && (
          <div className="p-4 bg-white dark:bg-[#1E232E]">
            <div className="flex flex-col items-center">
              {/* Governance hierarchy diagram */}
              <div className="w-full max-w-5xl">
                <div className="bg-[#00308F] dark:bg-[#4A6CF7] text-white p-3 rounded-lg text-center mb-4">
                  <p className="font-bold">Executive Steering Committee</p>
                  <p className="text-sm text-blue-100 dark:text-blue-200">Strategic Direction & Final Approval</p>
                </div>

                <div className="flex justify-center mb-4">
                  <div className="w-1 h-8 bg-gray-300 dark:bg-gray-600"></div>
                </div>

                <div className="bg-[#00308F] dark:bg-[#4A6CF7] text-white p-3 rounded-lg text-center mb-4">
                  <p className="font-bold">Project Sponsor</p>
                  <p className="text-sm text-blue-100 dark:text-blue-200">Resource Allocation & Accountability</p>
                </div>

                <div className="flex justify-center mb-4">
                  <div className="w-1 h-8 bg-gray-300 dark:bg-gray-600"></div>
                </div>

                <div className="bg-[#00308F] dark:bg-[#4A6CF7] text-white p-3 rounded-lg text-center mb-4">
                  <p className="font-bold">Project Manager</p>
                  <p className="text-sm text-blue-100 dark:text-blue-200">Day-to-day Management & Reporting</p>
                </div>

                <div className="flex justify-center mb-4">
                  <div className="w-full flex justify-between items-start space-x-5">
                    <div className="w-1/3 flex flex-col items-center">
                      <div className="h-8 w-1 bg-gray-300 dark:bg-gray-600"></div>
                      <div className="bg-[#00308F] dark:bg-[#4A6CF7] text-white p-2 rounded-lg text-center w-full">
                        <p className="font-bold">Technical Team</p>
                        <p className="text-xs text-blue-100 dark:text-blue-200">Implementation</p>
                      </div>
                    </div>
                    <div className="w-1/3 flex flex-col items-center">
                      <div className="h-8 w-1 bg-gray-300 dark:bg-gray-600"></div>
                      <div className="bg-[#00308F] dark:bg-[#4A6CF7] text-white p-2 rounded-lg text-center w-full">
                        <p className="font-bold">Business Analysts</p>
                        <p className="text-xs text-blue-100 dark:text-blue-200">Requirements</p>
                      </div>
                    </div>
                    <div className="w-1/3 flex flex-col items-center">
                      <div className="h-8 w-1 bg-gray-300 dark:bg-gray-600"></div>
                      <div className="bg-[#00308F] dark:bg-[#4A6CF7] text-white p-2 rounded-lg text-center w-full">
                        <p className="font-bold">Quality Assurance</p>
                        <p className="text-xs text-blue-100 dark:text-blue-200">Testing & Validation</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Business Impact Section */}
      <div className="mb-8 border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden">
        <div
          className="p-4 flex justify-between items-center cursor-pointer bg-white dark:bg-[#2A2F3B]"
          onClick={() => toggleSection("impact")}
        >
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 mr-2" />
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Project Impact Analysis</h2>
          </div>
          {expandedSections.impact ? (
            <ChevronUp className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          )}
        </div>

        {expandedSections.impact && (
          <div className="p-4 bg-white dark:bg-[#1E232E]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 bg-white dark:bg-[#2A2F3B] shadow-sm">
                <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center">
                  <Users className="h-5 w-5 text-blue-600 dark:text-blue-300 mr-2" />
                  User Impact
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <ArrowRight className="h-4 w-4 text-blue-600 dark:text-blue-300 mr-2 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">New workflow requires training</span>
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="h-4 w-4 text-blue-600 dark:text-blue-300 mr-2 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">30% productivity improvement expected</span>
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="h-4 w-4 text-blue-600 dark:text-blue-300 mr-2 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">Reduced manual data entry</span>
                  </li>
                </ul>
              </div>

              <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 bg-white dark:bg-[#2A2F3B] shadow-sm">
                <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center">
                  <Building className="h-5 w-5 text-green-600 dark:text-green-400 mr-2" />
                  Business Impact
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <ArrowRight className="h-4 w-4 text-green-600 dark:text-green-400 mr-2 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">15% cost reduction in operations</span>
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="h-4 w-4 text-green-600 dark:text-green-400 mr-2 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">Improved data accuracy and reporting</span>
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="h-4 w-4 text-green-600 dark:text-green-400 mr-2 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">Competitive advantage in market</span>
                  </li>
                </ul>
              </div>

              <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 bg-white dark:bg-[#2A2F3B] shadow-sm">
                <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center">
                  <Calendar className="h-5 w-5 text-purple-600 dark:text-purple-400 mr-2" />
                  Timeline Impact
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <ArrowRight className="h-4 w-4 text-purple-600 dark:text-purple-400 mr-2 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">3-month implementation period</span>
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="h-4 w-4 text-purple-600 dark:text-purple-400 mr-2 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">Phased rollout by department</span>
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="h-4 w-4 text-purple-600 dark:text-purple-400 mr-2 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">2-week transition support per phase</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Risk and Mitigation */}
            <div className="mt-6 border border-gray-200 dark:border-gray-600 rounded-lg p-4 bg-white dark:bg-[#2A2F3B]">
              <h3 className="font-bold text-red-800 dark:text-red-400 mb-3">Key Risks and Mitigation</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white dark:bg-[#1E232E] border border-gray-200 dark:border-gray-600">
                  <thead>
                    <tr className="bg-gray-100 dark:bg-[#353A47]">
                      <th className="py-2 px-4 text-left border-b dark:border-gray-600 text-gray-800 dark:text-gray-200">Risk</th>
                      <th className="py-2 px-4 text-left border-b dark:border-gray-600 text-gray-800 dark:text-gray-200">Impact</th>
                      <th className="py-2 px-4 text-left border-b dark:border-gray-600 text-gray-800 dark:text-gray-200">Probability</th>
                      <th className="py-2 px-4 text-left border-b dark:border-gray-600 text-gray-800 dark:text-gray-200">Mitigation Strategy</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-2 px-4 border-b dark:border-gray-600 text-gray-700 dark:text-gray-300">User resistance to change</td>
                      <td className="py-2 px-4 border-b dark:border-gray-600">
                        <span className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 px-2 py-1 rounded text-xs">High</span>
                      </td>
                      <td className="py-2 px-4 border-b dark:border-gray-600">
                        <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 px-2 py-1 rounded text-xs">Medium</span>
                      </td>
                      <td className="py-2 px-4 border-b dark:border-gray-600 text-gray-700 dark:text-gray-300">Early engagement, training, champions program</td>
                    </tr>
                    <tr className="bg-gray-50 dark:bg-[#2A2F3B]">
                      <td className="py-2 px-4 border-b dark:border-gray-600 text-gray-700 dark:text-gray-300">Integration issues</td>
                      <td className="py-2 px-4 border-b dark:border-gray-600">
                        <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 px-2 py-1 rounded text-xs">Medium</span>
                      </td>
                      <td className="py-2 px-4 border-b dark:border-gray-600">
                        <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 px-2 py-1 rounded text-xs">Medium</span>
                      </td>
                      <td className="py-2 px-4 border-b dark:border-gray-600 text-gray-700 dark:text-gray-300">Early testing, phased approach, rollback plan</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-b dark:border-gray-600 text-gray-700 dark:text-gray-300">Resource constraints</td>
                      <td className="py-2 px-4 border-b dark:border-gray-600">
                        <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 px-2 py-1 rounded text-xs">Medium</span>
                      </td>
                      <td className="py-2 px-4 border-b dark:border-gray-600">
                        <span className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 px-2 py-1 rounded text-xs">High</span>
                      </td>
                      <td className="py-2 px-4 border-b dark:border-gray-600 text-gray-700 dark:text-gray-300">Prioritization, external resources, scope management</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default GovernanceSetup
