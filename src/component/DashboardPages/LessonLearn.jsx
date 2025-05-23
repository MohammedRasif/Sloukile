"use client"

import { useState, useEffect } from "react"
import { Archive, Calendar, FileText, MessageSquare, Plus, Trash2, Moon, Sun } from "lucide-react"

export default function LessonsLearnedPage() {
  const [showSurveyForm, setShowSurveyForm] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [surveys, setSurveys] = useState([
    {
      id: 1,
      name: "Project Alpha Phase 1 Feedback",
      date: "May 1, 2025",
      status: "Active",
      responses: 18,
      recipients: 24,
      description: "Feedback for Project Alpha Phase 1",
      projectName: "Project Alpha",
      deadline: "2025-05-20",
      recipientsEmails: "john.doe@example.com, jane.smith@example.com",
      questions: [
        { id: 1, text: "How would you rate the project management?", required: true },
        { id: 2, text: "What went well during this project?", required: true },
      ],
    },
    {
      id: 2,
      name: "Marketing Campaign Retrospective",
      date: "April 15, 2025",
      status: "Completed",
      responses: 10,
      recipients: 12,
      description: "Retrospective for marketing campaign",
      projectName: "Marketing Campaign",
      deadline: "2025-04-20",
      recipientsEmails: "team@example.com",
      questions: [
        { id: 1, text: "What was the campaign's impact?", required: true },
      ],
    },
    {
      id: 3,
      name: "Q2 Budget Performance Review",
      date: "March 30, 2025",
      status: "Draft",
      responses: 0,
      recipients: 8,
      description: "Review of Q2 budget performance",
      projectName: "Q2 Budget",
      deadline: "2025-04-10",
      recipientsEmails: "finance@example.com",
      questions: [
        { id: 1, text: "Was the budget allocation effective?", required: true },
      ],
    },
  ])

  const [questions, setQuestions] = useState([
    { id: 1, text: "How would you rate the project management?", required: true },
    { id: 2, text: "What went well during this project?", required: true },
    { id: 3, text: "What could be improved for future projects?", required: true },
    { id: 4, text: "Which areas need the most improvement?", required: false },
  ])

  const [editingSurvey, setEditingSurvey] = useState(null)
  const [formData, setFormData] = useState({
    title: "Project Feedback Survey",
    description: "Please provide your feedback on the recently completed project.",
    projectName: "Project Alpha",
    deadline: "2025-05-20",
    recipients: "john.doe@example.com, jane.smith@example.com, team@example.com",
  })

  // Toggle dark mode and persist in localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark') {
      setIsDarkMode(true)
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    if (!isDarkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  const addQuestion = () => {
    try {
      const newId = questions.length > 0 ? Math.max(...questions.map((q) => q.id)) + 1 : 1
      setQuestions([...questions, { id: newId, text: "", required: false }])
    } catch (error) {
      console.error("Error adding question:", error)
    }
  }

  const removeQuestion = (id) => {
    try {
      setQuestions(questions.filter((q) => q.id !== id))
    } catch (error) {
      console.error("Error removing question:", error)
    }
  }

  const updateQuestion = (id, text) => {
    try {
      setQuestions(questions.map((q) => (q.id === id ? { ...q, text } : q)))
    } catch (error) {
      console.error("Error updating question:", error)
    }
  }

  const handleInputChange = (e) => {
    try {
      const { id, value } = e.target
      setFormData({ ...formData, [id.replace("survey-", "")]: value })
    } catch (error) {
      console.error("Error handling input change:", error)
    }
  }

  const handleAddSurvey = () => {
    try {
      if (!formData.title || questions.length === 0 || questions.some((q) => !q.text)) {
        console.warn("Validation failed: Please fill in the survey title and all questions.")
        return
      }

      const newSurvey = {
        id: editingSurvey ? editingSurvey.id : surveys.length > 0 ? Math.max(...surveys.map((s) => s.id)) + 1 : 1,
        name: formData.title,
        date: new Date().toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
        status: "Draft",
        responses: 0,
        recipients: formData.recipients.split(",").length,
        description: formData.description,
        projectName: formData.projectName,
        deadline: formData.deadline,
        recipientsEmails: formData.recipients,
        questions: [...questions],
      }

      if (editingSurvey) {
        setSurveys(surveys.map((s) => (s.id === editingSurvey.id ? newSurvey : s)))
      } else {
        setSurveys([...surveys, newSurvey])
      }

      setShowSurveyForm(false)
      setEditingSurvey(null)
      setFormData({
        title: "Project Feedback Survey",
        description: "Please provide your feedback on the recently completed project.",
        projectName: "Project Alpha",
        deadline: "2025-05-20",
        recipients: "john.doe@example.com, jane.smith@example.com, team@example.com",
      })
      setQuestions([
        { id: 1, text: "How would you rate the project management?", required: true },
        { id: 2, text: "What went well during this project?", required: true },
        { id: 3, text: "What could be improved for future projects?", required: true },
        { id: 4, text: "Which areas need the most improvement?", required: false },
      ])
    } catch (error) {
      console.error("Error adding/updating survey:", error)
    }
  }

  const handleEditSurvey = (survey) => {
    try {
      setEditingSurvey(survey)
      setFormData({
        title: survey.name,
        description: survey.description,
        projectName: survey.projectName,
        deadline: survey.deadline,
        recipients: survey.recipientsEmails,
      })
      setQuestions(survey.questions)
      setShowSurveyForm(true)
    } catch (error) {
      console.error("Error editing survey:", error)
    }
  }

  const archivedLessons = [
    {
      id: 1,
      project: "Website Redesign Project",
      date: "March 15, 2025",
      insights: [
        "Communication was excellent throughout the project",
        "The timeline was realistic and well-managed",
        "Budget allocation could be more transparent",
      ],
    },
    {
      id: 2,
      project: "CRM Implementation",
      date: "February 28, 2025",
      insights: [
        "Team collaboration was strong and effective",
        "More frequent stakeholder updates would be helpful",
        "Better documentation of decisions and changes",
      ],
    },
  ]

  return (
    <div className="py-6 space-y-8 px-4 bg-gray-50 dark:bg-[#1E232E] min-h-screen transition-colors duration-300">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            Lessons Learned
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Collect feedback, analyze performance, and archive project insights
          </p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => {
              try {
                setShowSurveyForm(!showSurveyForm)
                setEditingSurvey(null)
                setFormData({
                  title: "Project Feedback Survey",
                  description: "Please provide your feedback on the recently completed project.",
                  projectName: "Project Alpha",
                  deadline: "2025-05-20",
                  recipients: "john.doe@example.com, jane.smith@example.com, team@example.com",
                })
                setQuestions([
                  { id: 1, text: "How would you rate the project management?", required: true },
                  { id: 2, text: "What went well during this project?", required: true },
                  { id: 3, text: "What could be improved for future projects?", required: true },
                  { id: 4, text: "Which areas need the most improvement?", required: false },
                ])
              } catch (error) {
                console.error("Error resetting form:", error)
              }
            }}
            className="flex items-center px-4 py-2 bg-[#00308F] text-white rounded-md hover:bg-[#002A7A] dark:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            {showSurveyForm ? "Cancel" : "New Survey"}
          </button>
         
        </div>
      </div>

      {showSurveyForm ? (
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg">
          <div className="px-6 py-4 border-b dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              {editingSurvey ? "Edit Survey" : "Create New Survey"}
            </h2>
          </div>
          <div className="p-6 space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="survey-title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Survey Title
                </label>
                <input
                  id="survey-title"
                  placeholder="Enter survey title"
                  className="mt-1 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00308F] dark:focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="survey-description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Description
                </label>
                <textarea
                  id="survey-description"
                  placeholder="Enter survey description"
                  className="mt-1 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00308F] dark:focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="project-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Project Name
                </label>
                <input
                  id="project-name"
                  placeholder="Enter project name"
                  className="mt-1 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00308F] dark:focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  value={formData.projectName}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="survey-deadline" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Response Deadline
                </label>
                <input
                  id="survey-deadline"
                  type="date"
                  className="mt-1 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00308F] dark:focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  value={formData.deadline}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="recipients" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email Addresses
                </label>
                <textarea
                  id="recipients"
                  placeholder="Enter email addresses, separated by commas"
                  className="mt-1 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00308F] dark:focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  value={formData.recipients}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">Survey Questions</h3>
                <button
                  onClick={addQuestion}
                  className="flex items-center px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Question
                </button>
              </div>

              <div className="space-y-4">
                {questions.map((question, index) => (
                  <div key={question.id} className="flex gap-2">
                    <div className="flex-1">
                      <input
                        value={question.text}
                        onChange={(e) => updateQuestion(question.id, e.target.value)}
                        placeholder={`Question ${index + 1}`}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00308F] dark:focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      />
                    </div>
                    <button
                      onClick={() => removeQuestion(question.id)}
                      className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2 justify-end">
              <button
                onClick={() => {
                  try {
                    setShowSurveyForm(false)
                    setEditingSurvey(null)
                    setFormData({
                      title: "Project Feedback Survey",
                      description: "Please provide your feedback on the recently completed project.",
                      projectName: "Project Alpha",
                      deadline: "2025-05-20",
                      recipients: "john.doe@example.com, jane.smith@example.com, team@example.com",
                    })
                    setQuestions([
                      { id: 1, text: "How would you rate the project management?", required: true },
                      { id: 2, text: "What went well during this project?", required: true },
                      { id: 3, text: "What could be improved for future projects?", required: true },
                      { id: 4, text: "Which areas need the most improvement?", required: false },
                    ])
                  } catch (error) {
                    console.error("Error canceling form:", error)
                  }
                }}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleAddSurvey}
                className="px-4 py-2 bg-[#00308F] dark:bg-blue-600 text-white rounded-md hover:bg-[#002A7A] dark:hover:bg-blue-700"
              >
                {editingSurvey ? "Update Survey" : "Save Survey"}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-gray-100">Active Surveys</h2>
          <div className="space-y-4">
            {surveys.map((survey) => (
              <div key={survey.id} className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-[#E6E9F2] dark:bg-gray-700 p-3 rounded-full">
                      <FileText className="h-6 w-6 text-[#00308F] dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">{survey.name}</h3>
                      <p className="text-gray-500 dark:text-gray-400">Created on {survey.date}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                          <span>{survey.responses}</span> of <span>{survey.recipients}</span> responses
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <span
                      className={`px-2 py-1 text-sm rounded-full ${
                        survey.status === "Active"
                          ? "bg-[#00308F] dark:bg-blue-600 text-white"
                          : "border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300"
                      }`}
                    >
                      {survey.status}
                    </span>
                    <div className="flex gap-2 mt-4">
                      <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300">
                        View Results
                      </button>
                      <button
                        onClick={() => handleEditSurvey(survey)}
                        className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-gray-100">Archived Lessons</h2>
          <div className="space-y-4">
            {archivedLessons.map((lesson) => (
              <div key={lesson.id} className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-[#E6E9F2] dark:bg-gray-700 p-3 rounded-full">
                      <Archive className="h-6 w-6 text-[#00308F] dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">{lesson.project}</h3>
                      <p className="text-gray-500 dark:text-gray-400">Archived on {lesson.date}</p>
                      <div className="mt-4 space-y-2">
                        <h4 className="font-medium text-gray-900 dark:text-gray-100">Key Insights:</h4>
                        <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300">
                          {lesson.insights.map((insight, index) => (
                            <li key={index}>{insight}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div>
                    <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}