"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Moon, Sun } from "lucide-react";

const users = [
  { id: "1", avatar: "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1738133725/56832_cdztsw.png" },
  { id: "2", avatar: "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529178/samples/man-portrait.jpg" },
  { id: "3", avatar: "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529177/samples/smile.jpg" },
  { id: "4", avatar: "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529169/samples/people/boy-snow-hoodie.jpg" },
];

const Communication = () => {
  const [messages, setMessages] = useState([
    {
      id: "1",
      text: "Hey everyone! How are you doing?",
      sender: "2",
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
    },
    {
      id: "2",
      text: "I'm good, thanks for asking!",
      sender: "1",
      timestamp: new Date(Date.now() - 1000 * 60 * 14),
    },
    {
      id: "3",
      text: "Just finished my project. What about you all?",
      sender: "3",
      timestamp: new Date(Date.now() - 1000 * 60 * 10),
    },
    {
      id: "4",
      text: "I'm working on a new design. Would love your feedback later!",
      sender: "4",
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
    },
  ]);

  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (newMessage.trim() === "") return;

    const message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: "1", // Current user ID
      timestamp: new Date(),
    };

    setMessages([...messages, message]);
    setNewMessage("");

    // Simulate response from another user after a delay
    setTimeout(() => {
      const randomUser = users[Math.floor(Math.random() * (users.length - 1)) + 1];
      const responseMessage = {
        id: (Date.now() + 1).toString(),
        text: `This is a response from ${randomUser.name || "User"}`,
        sender: randomUser.id,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, responseMessage]);
    }, 1000);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const getUserById = (id) => {
    return users.find((user) => user.id === id) || users[0];
  };

  return (
    <div className="flex flex-col h-[80vh] border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-[#1E232E] shadow-sm">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-[#2A2F3B] flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Group Chat</h2>
        
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white dark:bg-[#1E232E]">
        {messages.map((message) => {
          const isCurrentUser = message.sender === "1";
          const user = getUserById(message.sender);

          return (
            <div
              key={message.id}
              className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`flex ${isCurrentUser ? "flex-row-reverse" : "flex-row"} items-end gap-2 max-w-[80%]`}
              >
                <img
                  src={user.avatar || "/placeholder.svg"}
                  alt={user.name || "User"}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div
                  className={`flex flex-col ${isCurrentUser ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`px-4 py-2 rounded-2xl ${
                      isCurrentUser
                        ? "bg-blue-500 text-white dark:bg-[#4A6CF7] dark:text-gray-100 rounded-br-none"
                        : "bg-gray-100 text-gray-800 dark:bg-[#2A2F3B] dark:text-gray-200 rounded-bl-none"
                    }`}
                  >
                    <p>{message.text}</p>
                  </div>
                  <div className="flex items-center mt-1 text-xs text-gray-500 dark:text-gray-400 gap-1">
                    <span>{user.name || "User"}</span>
                    <span>•</span>
                    <span>{formatTime(message.timestamp)}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-[#2A2F3B] flex gap-2">
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md outline-none focus:border-blue-500 dark:focus:border-[#4A6CF7] focus:ring-2 focus:ring-blue-200 dark:focus:ring-[#4A6CF7]/50 bg-white dark:bg-[#353A47] text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
        />
        <button
          type="submit"
          className="flex items-center justify-center p-2 px-4 bg-blue-500 dark:bg-[#4A6CF7] text-white rounded-md hover:bg-blue-600 dark:hover:bg-[#3B5DE7] transition-colors cursor-pointer"
        >
          <Send className="h-6 w-6" />
        </button>
      </form>
    </div>
  );
};

export default Communication;