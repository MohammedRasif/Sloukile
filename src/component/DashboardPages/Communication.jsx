// "use client";

// import { useState, useRef, useEffect } from "react";
// import { Send } from "lucide-react";

// const Communication = () => {
//   const [messages, setMessages] = useState([
//     {
//       id: "1",
//       text: "Hello! How can I assist you today?",
//       sender: "AI",
//       timestamp: new Date(Date.now() - 1000 * 60 * 5),
//     },
//   ]);

//   const [newMessage, setNewMessage] = useState("");
//   const messagesEndRef = useRef(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const handleSendMessage = (e) => {
//     e.preventDefault();

//     if (newMessage.trim() === "") return;

//     const userMessage = {
//       id: Date.now().toString(),
//       text: newMessage,
//       sender: "1", // Current user ID
//       timestamp: new Date(),
//     };

//     setMessages([...messages, userMessage]);
//     setNewMessage("");

//     // Simulate AI response after a delay
//     setTimeout(() => {
//       const aiMessage = {
//         id: (Date.now() + 1).toString(),
//         text: "Thanks for your message! How can I help you further?",
//         sender: "AI",
//         timestamp: new Date(),
//       };
//       setMessages((prev) => [...prev, aiMessage]);
//     }, 1000);
//   };

//   const formatTime = (date) => {
//     return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
//   };

//   return (
//     <div className="flex flex-col h-[80vh] border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-[#1E232E] shadow-sm">
//       <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-[#2A2F3B] flex justify-between items-center">
//         <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Chat with AI</h2>
//       </div>

//       <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white dark:bg-[#1E232E]">
//         {messages.map((message) => {
//           const isCurrentUser = message.sender === "1";

//           return (
//             <div
//               key={message.id}
//               className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}
//             >
//               <div
//                 className={`flex ${isCurrentUser ? "flex-row-reverse" : "flex-row"} items-end gap-2 max-w-[80%]`}
//               >
//                 <img
//                   src={
//                     isCurrentUser
//                       ? "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1738133725/56832_cdztsw.png"
//                       : "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1740739500/Capa_2_inzboj.png"
//                   }
//                   alt={isCurrentUser ? "You" : "AI"}
//                   className="w-8 h-8 rounded-full object-cover"
//                 />
//                 <div
//                   className={`flex flex-col ${isCurrentUser ? "items-end" : "items-start"}`}
//                 >
//                   <div
//                     className={`px-4 py-2 rounded-2xl ${isCurrentUser
//                         ? "bg-blue-500 text-white dark:bg-[#4A6CF7] dark:text-gray-100 rounded-br-none"
//                         : "bg-gray-100 text-gray-800 dark:bg-[#2A2F3B] dark:text-gray-200 rounded-bl-none"
//                       }`}
//                   >
//                     <p>{message.text}</p>
//                   </div>
//                   <div className="flex items-center mt-1 text-xs text-gray-500 dark:text-gray-400 gap-1">
//                     <span>{isCurrentUser ? "You" : "AI"}</span>
//                     <span>•</span>
//                     <span>{formatTime(message.timestamp)}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//         <div ref={messagesEndRef} />
//       </div>

//       <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-[#2A2F3B] flex gap-2">
//         <input
//           type="text"
//           placeholder="Type a message..."
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//           className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md outline-none focus:border-blue-500 dark:focus:border-[#4A6CF7] focus:ring-2 focus:ring-blue-200 dark:focus:ring-[#4A6CF7]/50 bg-white dark:bg-[#353A47] text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
//         />
//         <button
//           type="submit"
//           className="flex items-center justify-center p-2 px-4 bg-blue-500 dark:bg-[#4A6CF7] text-white rounded-md hover:bg-blue-600 dark:hover:bg-[#3B5DE7] transition-colors cursor-pointer"
//         >
//           <Send className="h-6 w-6" />
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Communication;


"use client"

import { useState } from "react"
import { Send, Users, Mail, CheckCircle2, X, ChevronDown, Eye, Edit3, AlertCircle } from "lucide-react"

// Mock user data - in a real app, this would come from your database
const mockUsers = [
  { id: 1, name: "John Doe", email: "john@example.com", department: "Engineering" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", department: "Design" },
  { id: 3, name: "Robert Johnson", email: "robert@example.com", department: "Marketing" },
  { id: 4, name: "Emily Davis", email: "emily@example.com", department: "Engineering" },
  { id: 5, name: "Michael Wilson", email: "michael@example.com", department: "Product" },
  { id: 6, name: "Sarah Brown", email: "sarah@example.com", department: "HR" },
  { id: 7, name: "David Miller", email: "david@example.com", department: "Engineering" },
  { id: 8, name: "Lisa Taylor", email: "lisa@example.com", department: "Finance" },
]

export default function Communication() {
  // State for selected users
  const [selectedUsers, setSelectedUsers] = useState([])
  const [showUserDropdown, setShowUserDropdown] = useState(false)
  const [filterText, setFilterText] = useState("")
  
  // State for newsletter content
  const [subject, setSubject] = useState("")
  const [content, setContent] = useState("")
  const [taskUpdate, setTaskUpdate] = useState("")
  
  // State for UI
  const [showPreview, setShowPreview] = useState(false)
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState(null)

  // Filter users based on search text
  const filteredUsers = mockUsers.filter(user => 
    user.name.toLowerCase().includes(filterText.toLowerCase()) || 
    user.email.toLowerCase().includes(filterText.toLowerCase()) ||
    user.department.toLowerCase().includes(filterText.toLowerCase())
  )

  // Toggle user selection
  const toggleUserSelection = (user) => {
    if (selectedUsers.some(u => u.id === user.id)) {
      setSelectedUsers(selectedUsers.filter(u => u.id !== user.id))
    } else {
      setSelectedUsers([...selectedUsers, user])
    }
  }

  // Select all filtered users
  const selectAllFiltered = () => {
    const allFilteredIds = new Set(filteredUsers.map(u => u.id))
    const currentSelectedNotInFilter = selectedUsers.filter(u => !allFilteredIds.has(u.id))
    setSelectedUsers([...currentSelectedNotInFilter, ...filteredUsers])
  }

  // Deselect all filtered users
  const deselectAllFiltered = () => {
    const filteredIds = new Set(filteredUsers.map(u => u.id))
    setSelectedUsers(selectedUsers.filter(u => !filteredIds.has(u.id)))
  }

  // Handle sending the newsletter
  const handleSendNewsletter = async () => {
    if (selectedUsers.length === 0) {
      setError("Please select at least one recipient")
      return
    }
    
    if (!subject.trim()) {
      setError("Subject is required")
      return
    }
    
    if (!content.trim()) {
      setError("Content is required")
      return
    }

    setError(null)
    setSending(true)
    
    try {
      // Prepare email data
      const emailData = {
        to: selectedUsers.map(user => user.email),
        subject: subject,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h2>Task Update Newsletter</h2>
            <p>Hello team,</p>
            <p>Here's an update on our recent tasks:</p>
            ${taskUpdate ? `
              <div style="background-color: #EFF6FF; padding: 15px; border-left: 4px solid #3B82F6; margin: 20px 0;">
                ${taskUpdate.replace(/\n/g, '<br>')}
              </div>
            ` : ''}
            ${content ? `<p>${content.replace(/\n/g, '<br>')}</p>` : ''}
            <p>Best regards,<br>The Team</p>
          </div>
        `,
      }

      // Replace this with your actual email sending API call
      // Example using fetch to a backend API (e.g., Node.js with Nodemailer or SendGrid)
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      })

      if (!response.ok) {
        throw new Error('Failed to send email')
      }

      const result = await response.json()
      console.log('Email sent:', result)

      setSending(false)
      setSent(true)
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setSent(false)
        setSubject("")
        setContent("")
        setTaskUpdate("")
        setSelectedUsers([])
      }, 3000)
    } catch (err) {
      setSending(false)
      setError("Failed to send newsletter. Please try again.")
      console.error('Email sending error:', err)
    }
  }

  return (
    <div className="container mx-auto p-6 bg-white dark:bg-[#1E232E] rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 flex items-center gap-2">
        <Mail className="h-6 w-6" />
        Task Update Newsletter
      </h1>

      {/* Error message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 dark:border-red-400 text-red-700 dark:text-red-300 flex items-center gap-2">
          <AlertCircle className="h-5 w-5" />
          <span>{error}</span>
          <button 
            onClick={() => setError(null)} 
            className="ml-auto text-red-700 dark:text-red-300 hover:text-red-900 dark:hover:text-red-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      )}

      {/* Success message */}
      {sent && (
        <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 dark:border-green-400 text-green-700 dark:text-green-300 flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5" />
          <span>Newsletter sent successfully!</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          {/* User selection section */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2 flex items-center gap-1">
              <Users className="h-4 w-4" />
              Select Recipients
            </label>
            
            <div className="relative">
              <div 
                className="border border-gray-300 dark:border-gray-600 rounded-md p-2 min-h-[42px] cursor-pointer flex flex-wrap gap-1 bg-white dark:bg-[#2A2F3B]"
                onClick={() => setShowUserDropdown(!showUserDropdown)}
              >
                {selectedUsers.length > 0 ? (
                  selectedUsers.map(user => (
                    <div 
                      key={user.id} 
                      className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded-full flex items-center"
                    >
                      {user.name}
                      <button 
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleUserSelection(user)
                        }}
                        className="ml-1 text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-100"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))
                ) : (
                  <span className="text-gray-500 dark:text-gray-400">Select users...</span>
                )}
                <div className="ml-auto flex items-center">
                  <ChevronDown className={`h-4 w-4 text-gray-600 dark:text-gray-300 transition-transform ${showUserDropdown ? "rotate-180" : ""}`} />
                </div>
              </div>
              
              {showUserDropdown && (
                <div className="absolute z-10 mt-1 w-full bg-white dark:bg-[#2A2F3B] border border-gray-300 dark:border-gray-600 rounded-md shadow-lg max-h-60 overflow-auto">
                  <div className="p-2 border-b dark:border-gray-600 sticky top-0 bg-white dark:bg-[#2A2F3B]">
                    <input
                      type="text"
                      placeholder="Search users..."
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#353A47] text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00308F] dark:focus:ring-[#4A6CF7]"
                      value={filterText}
                      onChange={(e) => setFilterText(e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                  
                  <div className="p-2 border-b dark:border-gray-600 flex justify-between">
                    <button 
                      className="text-xs text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-100"
                      onClick={(e) => {
                        e.stopPropagation()
                        selectAllFiltered()
                      }}
                    >
                      Select All
                    </button>
                    <button 
                      className="text-xs text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-100"
                      onClick={(e) => {
                        e.stopPropagation()
                        deselectAllFiltered()
                      }}
                    >
                      Deselect All
                    </button>
                  </div>
                  
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map(user => (
                      <div 
                        key={user.id}
                        className={`p-2 hover:bg-gray-100 dark:hover:bg-[#353A47] cursor-pointer flex items-center ${
                          selectedUsers.some(u => u.id === user.id) ? "bg-blue-50 dark:bg-blue-900/30" : ""
                        }`}
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleUserSelection(user)
                        }}
                      >
                        <div className="flex-1">
                          <div className="font-medium text-gray-800 dark:text-gray-200">{user.name}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
                        </div>
                        <div className="text-xs bg-gray-200 dark:bg-[#353A47] px-2 py-1 rounded-full text-gray-700 dark:text-gray-200">
                          {user.department}
                        </div>
                        {selectedUsers.some(u => u.id === user.id) && (
                          <CheckCircle2 className="h-4 w-4 text-blue-600 dark:text-blue-300 ml-2" />
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-gray-500 dark:text-gray-400">No users found</div>
                  )}
                </div>
              )}
            </div>
            
            <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              {selectedUsers.length} {selectedUsers.length === 1 ? "recipient" : "recipients"} selected
            </div>
          </div>

          {/* Newsletter content */}
          <div className="mb-6">
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              Subject Line
            </label>
            <input
              type="text"
              id="subject"
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#2A2F3B] text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00308F] dark:focus:ring-[#4A6CF7]"
              placeholder="Task Update: [Project Name]"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="taskUpdate" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              Task Update Details
            </label>
            <textarea
              id="taskUpdate"
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#2A2F3B] text-gray-800 dark:text-gray-200 h-24 focus:outline-none focus:ring-2 focus:ring-[#00308F] dark:focus:ring-[#4A6CF7]"
              placeholder="Describe the recent task updates..."
              value={taskUpdate}
              onChange={(e) => setTaskUpdate(e.target.value)}
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              Additional Content
            </label>
            <textarea
              id="content"
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#2A2F3B] text-gray-800 dark:text-gray-200 h-32 focus:outline-none focus:ring-2 focus:ring-[#00308F] dark:focus:ring-[#4A6CF7]"
              placeholder="Add any additional information or context..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </div>
        
        <div>
          {/* Preview section */}
          <div className="border border-gray-300 dark:border-gray-600 rounded-md p-4 h-full bg-white dark:bg-[#2A2F3B]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                {showPreview ? "Newsletter Preview" : "Newsletter Template"}
              </h2>
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="flex items-center gap-1 text-sm text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-100"
              >
                {showPreview ? (
                  <>
                    <Edit3 className="h-4 w-4" />
                    Edit
                  </>
                ) : (
                  <>
                    <Eye className="h-4 w-4" />
                    Preview
                  </>
                )}
              </button>
            </div>
            
            {showPreview ? (
              <div className="bg-gray-50 dark:bg-[#353A47] p-4 rounded-md h-[calc(100%-40px)] overflow-auto">
                <div className="bg-white dark:bg-[#1E232E] border border-gray-200 dark:border-gray-600 p-4 rounded-md shadow-sm">
                  <div className="border-b dark:border-gray-600 pb-2 mb-4">
                    <div className="font-medium text-gray-800 dark:text-gray-200">To: {selectedUsers.map(u => u.name).join(", ")}</div>
                    <div className="font-medium text-gray-800 dark:text-gray-200">Subject: {subject || "[No subject]"}</div>
                  </div>
                  
                  <div className="prose prose-sm max-w-none text-gray-800 dark:text-gray-200">
                    <p>Hello team,</p>
                    
                    <p>Here's an update on our recent tasks:</p>
                    
                    {taskUpdate && (
                      <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-md border-l-4 border-blue-500 dark:border-[#4A6CF7] my-4">
                        <p className="whitespace-pre-line">{taskUpdate}</p>
                      </div>
                    )}
                    
                    {content && <p className="whitespace-pre-line">{content}</p>}
                    
                    <p>Best regards,<br />The Team</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-gray-500 dark:text-gray-400 text-sm h-[calc(100%-40px)] overflow-auto">
                <p className="mb-4">This newsletter will include:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Greeting to recipients</li>
                  <li>Task update introduction</li>
                  <li>
                    Task update details
                    {taskUpdate ? (
                      <span className="text-green-600 dark:text-green-400 ml-2">✓</span>
                    ) : (
                      <span className="text-red-600 dark:text-red-400 ml-2">✗</span>
                    )}
                  </li>
                  <li>
                    Additional content
                    {content ? (
                      <span className="text-green-600 dark:text-green-400 ml-2">✓</span>
                    ) : (
                      <span className="text-red-600 dark:text-red-400 ml-2">✗</span>
                    )}
                  </li>
                  <li>Sign-off</li>
                </ul>
                
                <div className="mt-6 p-3 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 dark:border-yellow-400 text-yellow-800 dark:text-yellow-200">
                  <p className="font-medium">Tips:</p>
                  <ul className="list-disc pl-5 mt-2">
                    <li>Keep your update concise and focused</li>
                    <li>Highlight key achievements or milestones</li>
                    <li>Include next steps or action items if applicable</li>
                    <li>Use a professional but friendly tone</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Send button */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={handleSendNewsletter}
          disabled={sending || sent}
          className={`
            flex items-center gap-2 px-6 py-3 rounded-md text-white font-medium
            ${sending || sent 
              ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed" 
              : "bg-[#00308F] dark:bg-[#4A6CF7] hover:bg-[#00218f] dark:hover:bg-[#3B5AEB]"}
          `}
        >
          {sending ? (
            <>
              <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Sending...
            </>
          ) : sent ? (
            <>
              <CheckCircle2 className="h-5 w-5" />
              Sent!
            </>
          ) : (
            <>
              <Send className="h-5 w-5" />
              Send Newsletter
            </>
          )}
        </button>
      </div>
    </div>
  )
}