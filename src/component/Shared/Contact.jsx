import { useState } from "react";
import img from "./Group 1171275910.png";
import img1 from "./Group 21472255233.png";
import "../Shared/banner.css";

const Contact = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const fullDescription =
    "AI-driven solutions are revolutionizing the way businesses operate, providing the tools necessary for smarter decision-making, increased operational efficiency, and improved customer engagement. With AI, businesses can leverage data more effectively, automate repetitive tasks, and predict future trends with remarkable accuracy. From enhancing workflow automation to personalizing customer interactions, AI is reshaping industries across the globe. Companies are now able to optimize supply chains, detect fraud in real time.";

  const shortDescription =
    "AI-driven solutions are revolutionizing the way businesses operate, providing the tools necessary for smarter decision-making, increased operational efficiency, and improved customer engagement.With AI, businesses can leverage data more effectively,";

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      id="about"
      className="bg-gradient-to-r  w-full"
    >
      <div className="container mx-auto flex flex-col md:flex-row py-10 px-4 pt-28">
        {/* About Section */}
        <div className="w-full md:w-1/2 p-5 roboto">
          <h3 className="text-[#00308F] dark:text-[#00728f] text-[16px] sm:text-[20px] font-semibold mb-3">
            About Us
          </h3>
          <h1 className="text-[32px] sm:text-[40px] md:text-[48px] font-bold text-gray-900 dark:text-gray-200 mb-6">
            AI-Powered Solutions for Business Transformation
          </h1>
          <div className="mb-7">
            <p
              className={`text-gray-700 dark:text-gray-200 text-base sm:text-lg transition-all duration-300 ${
                isExpanded ? "h-[16vh]" : "h-[16vh] overflow-hidden"
              }`}
            >
              {isExpanded ? fullDescription : shortDescription}{" "}
              {!isExpanded && (
                <span
                  onClick={toggleDescription}
                  className="text-[#00308F] dark:text-[#00728f] font-semibold cursor-pointer hover:underline"
                >
                  Learn More...
                </span>
              )}
              {isExpanded && (
                <span
                  onClick={toggleDescription}
                  className="text-[#00308F]  dark:text-[#00728f] font-semibold cursor-pointer hover:underline"
                >
                  Show Less
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Image Section */}
        <div className="w-full md:w-1/2 p-5 order-first md:order-last">
          <img src={img} alt="AI Project Management" className="w-full h-auto rounded-lg" />
        </div>
        <div className="absolute right-20 top-[175vh]">
          <img src={img1} className="h-52" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Contact;