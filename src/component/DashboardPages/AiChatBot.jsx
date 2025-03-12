import { useState, useEffect, useRef } from "react";
import { Bot } from "lucide-react";

const AiChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef(null);

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

    // Add user message
    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate bot response (static for now)
    setTimeout(() => {
      const botMessage = {
        text: "This is a static response from the bot!",
        sender: "bot",
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
    }, 1000); // Simulate delay
  };

  return (
    <div className="border-t border-gray-300 px-10 p-5 bg-white h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center space-x-2">
        <Bot className="w-10 h-10 text-[#dbb929]" />
        <h1 className="text-3xl font-[500]">AI Chat</h1>
      </div>

      {/* Chat Area */}
      <div
        ref={chatContainerRef}
        className="flex-1 mt-5 overflow-y-auto"
        style={{ maxHeight: "calc(100% - 120px)" }} // Adjust height for header and input
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[70%] p-3 rounded-lg ${
                message.sender === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}

        {/* Loading Spinner */}
        {isLoading && (
          <div className="flex justify-start mb-4">
            <span className="loading loading-dots loading-xl text-gray-500"></span>
          </div>
        )}
      </div>

      {/* Input Field */}
      <form
        onSubmit={handleSendMessage}
        className="mt-5 flex items-center space-x-2 bottom-0 sticky"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#dbb929]"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-[#dbb929] text-white rounded-lg hover:bg-[#c9a523]"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default AiChatBot;