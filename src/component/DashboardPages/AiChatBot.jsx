import { useState, useEffect, useRef } from "react";
import { Bot } from "lucide-react";
import ReactMarkdown from "react-markdown";
import img from "./dashboard 3.png"; // Bot image
import { LuSend } from "react-icons/lu";

const AiChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef(null);

  // User image URL
  const userImageUrl =
    "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1738148405/fotor-2025010923230_1_u9l6vi.png";

  // Scroll to the bottom whenever messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Handle message submission
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { question: input, type: "question", sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    setTimeout(() => {
      const botMessage = {
        answer:
          "This is a static response from the bot! This is a static response from the bot!This is a static response from the bot!This is a static response from the bot!This is a static response from the bot!This is a static response from the bot!This is a static response from the bot!This is a static response from the bot!This is a static response from the bot!",
        type: "answer",
        sender: "bot",
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="border-t border-gray-300 dark:border-gray-700 px-10 p-5  h-full flex flex-col overflow-hidden text-gray-800 dark:text-gray-200">
      {/* Header */}
      <div className="flex items-center space-x-2">
        <Bot className="w-10 h-10 text-[#00308F] dark:text-[#00308F]" />
        <h1 className="text-3xl font-[500] text-gray-800 dark:text-gray-100">
          AI Chat
        </h1>
      </div>

      {/* Chat Area */}
      <div
        ref={chatContainerRef}
        className="flex-1 mt-5 overflow-y-auto"
        style={{ maxHeight: "calc(100% - 120px)" }}
      >
        {/* Default Bot Message */}
        {messages.length === 0 && !isLoading && (
          <div className="flex justify-start mb-4 absolute bottom-22">
            <div className="flex items-start space-x-3">
              <img
                src={img}
                alt="Bot Avatar"
                className="w-8 h-10 rounded-full"
              />
              <div
                className="px-10 py-5 rounded-lg bg-[#00308F] dark:bg-[#00308F] lg:text-[20px] text-white dark:text-gray-100 shadow-sm max-w-[100%]"
                style={{
                  whiteSpace: "normal",
                  wordBreak: "break-word",
                  overflow: "hidden",
                }}
              >
                <ReactMarkdown>Hi! I Am Project Management AI. How Can I Help You?</ReactMarkdown>
              </div>
            </div>
          </div>
        )}

        {/* Chat Messages */}
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            {message.sender === "user" ? (
              // User's Question Layout (1/2 of screen width)
              <div className="flex flex-col items-end w-1/2">
                <div className="flex justify-start items-start space-x-3">
                  <div
                    className="px-4 py-3 rounded-xl bg-[#00308F] dark:bg-[#00308F] text-white dark:text-gray-100 lg:text-[18px] shadow-md w-full"
                    style={{
                      whiteSpace: "normal",
                      wordBreak: "break-word",
                      overflow: "hidden",
                    }}
                  >
                    <span>{message.question}</span>
                  </div>
                  <img
                    src={userImageUrl}
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full"
                  />
                </div>
              </div>
            ) : (
              // Bot's Answer Layout (3/4 of screen width)
              <div className="flex flex-col items-start w-3/4">
                <div className="flex items-start space-x-3">
                  <img
                    src={img}
                    alt="Bot Avatar"
                    className="w-8 h-10 rounded-full"
                  />
                  <div
                    className="px-5 py-4 rounded-lg bg-gray-200 dark:bg-[#1E232E] text-black dark:text-gray-200 lg:text-[16px] shadow-sm max-w-[70%]"
                    style={{
                      whiteSpace: "normal",
                      wordBreak: "break-word",
                      overflow: "hidden",
                    }}
                  >
                    <ReactMarkdown>{message.answer}</ReactMarkdown>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Loading Spinner */}
        {isLoading && (
          <div className="flex justify-start mb-4">
            <div className="flex space-x-3">
              <img src={img} alt="" className="w-8 h-10 rounded-full" />
              <span className="loading loading-dots loading-xl text-gray-600 dark:text-gray-400"></span>
            </div>
          </div>
        )}
      </div>

      {/* Input Field */}
      <form
        onSubmit={handleSendMessage}
        className="mt-5 flex items-center space-x-2 bottom-0 sticky"
      >
        <div className="relative w-full">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={messages.length === 0 ? "Type your message..." : ""}
            className="w-full p-3 py-4 pr-14 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#2A2F3B] text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00308F] dark:focus:ring-[#00308F]"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-[10px] bg-[#00308F] dark:bg-[#00308F] text-white rounded-r-lg cursor-pointer hover:bg-[#002266] dark:hover:bg-[#3B5AEB] "
            
          >
           <LuSend size={28} />

          </button>
        </div>
      </form>
    </div>
  );
};

export default AiChatBot;