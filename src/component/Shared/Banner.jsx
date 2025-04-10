import { useState, useEffect, useRef } from "react";
import img from "./Group 2147225095.png"; // Bot avatar
import "../Shared/banner.css";
import { RiRobot2Fill } from "react-icons/ri";
import userImageUrl from "./Group 2147225095.png"; // User avatar image

const Banner = () => {
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [conversation, setConversation] = useState([]);
  const chatContainerRef = useRef(null);

  // Scroll to bottom of chat container
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSending(true);
    const userQuestion = message.trim();
    
    setConversation(prev => [...prev, { sender: 'user', question: userQuestion }]);
    
    setTimeout(() => {
      setConversation(prev => [
        ...prev,
        { 
          sender: 'bot', 
          answer: "hey.. how are you."
        }
      ]);
      setIsSending(false);
      setMessage("");
    }, 2000);
  };

  return (
    <div
    id="banner"
      className="relative w-full h-[500px] lg:min-h-screen md:min-h-screen bg-cover bg-center dark:bg-[#1E232E] "
      style={{
        backgroundImage: `url(${img})`,
       
      }}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6 roboto">
        <div className="text-black dark:text-white text-center max-w-8xl">
          <div className="relative inline-block mb-4 sm:mb-6">
            <h1 className="text-3xl sm:text-4xl md:text-[60px] font-bold mb-3 sm:mb-4">
              Streamline Projects with{" "}
              <br />
              <span className="relative inline-block px-1 sm:px-2">
                AI
                <div className="absolute top-1 left-2 right-0 bottom-0 -m-2 sm:-m-3">
                  <div className="relative w-[60px] h-[60px] sm:w-[85px] sm:h-[85px]"></div>
                </div>
              </span>{" "}
              Intelligence
            </h1>
          </div>

          <p className="text-base sm:text-lg md:text-xl mb-8 sm:mb-10 max-w-md sm:max-w-lg md:max-w-4xl mx-auto">
          Our AI-powered Project Manager automates workflows, predicts risks, and optimizes resources to ensure project success.
          </p>

          <div className="bg-[#E3E8F1] dark:bg-gray-900 backdrop-blur-sm rounded-xl p-6 shadow-lg mb-10 max-w-4xl mx-auto flex flex-col h-[220px]">
            <div className="flex-shrink-0 mr-3 pb-3">
              <RiRobot2Fill className="h-8 w-8 text-[#00308F]" />
            </div>

            {/* Chat container */}
            <div 
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto mb-4"
            >
              {/* Default message when conversation is empty */}
              {conversation.length === 0 && (
                <div className="flex flex-col items-start mt-3 ">
                  <div className="flex items-start space-x-3">
                    <div
                      className="px-3 py-2 rounded-lg bg-[#00308F] text-white lg:text-[14px] shadow-sm max-w-[100%]"
                      style={{
                        whiteSpace: "normal",
                        wordBreak: "break-word",
                        overflow: "hidden",
                      }}
                    >
                      <span>Hi! I Am Project Management AI. How Can I Help You?</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Conversation messages */}
              {conversation.map((message, index) => (
                <div key={index} className="mb-4">
                  {message.sender === "user" ? (
                    <div className="flex flex-col items-end w-1/2 ml-auto">
                      <div className="flex justify-start items-start space-x-3">
                        <div
                          className="text-white lg:text-[16px] px-2 py-1 rounded-md bg-[#00308F] mr-5"
                          style={{
                            whiteSpace: "normal",
                            wordBreak: "break-word",
                            overflow: "hidden",
                          }}
                        >
                          <span>{message.question}</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-start w-3/4">
                      <div className="flex items-start space-x-3">
                        <div
                          className="px-2 py-1 rounded-lg bg-gray-200 text-black lg:text-[16px] shadow-sm max-w-[70%s]"
                          style={{
                            whiteSpace: "normal",
                            wordBreak: "break-word",
                            overflow: "hidden",
                          }}
                        >
                          <span>{message.answer}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Input form */}
            <form onSubmit={handleSendMessage} className="flex items-center mt-auto">
              <div className="flex-grow relative">
                <label htmlFor="message-input" className="sr-only">
                  Type your message
                </label>
                <input
                  id="message-input"
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask anything..."
                  className="w-full py-2 focus:outline-none border-b border-gray-300 bg-transparent text-sm"
                  aria-label="Type your message"
                />
              </div>
              <button
                type="submit"
                className="bg-[#00308F] hover:bg-blue-800 text-white rounded-full px-4 py-2 text-sm ml-2"
                disabled={isSending}
                aria-label={isSending ? "Sending message" : "Ask AI"}
              >
                {isSending ? (
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  "Ask AI"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;