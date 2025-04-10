import img1 from "./Group 1171275921.png";
import img2 from "./Group 1171275922.png";
import img3 from "./Group 1171275923.png";
import img5 from "./Group 1171275877.png";
import img6 from "./Black.png";
import img4 from "./rasif.png";

const Revolutionize = () => {
  const cardData = [
    {
      title: "AI-Powered Project Setup",
      description:
        "Tuae nam ex similique incidunt expedita exercitationem laudantium. Repellendus quisquam numquamper ferendis earum sapiente non tempore? Fugit repellatut maiores.",
      icon: img1,

    },
    {
      title: "Auto Milestones & Workflow",
      description:
"Tuae nam ex similique incidunt expedita exercitationem laudantium. Repellendus quisquam numquamper ferendis earum sapiente non tempore? Fugit repellatut maiores.",
      icon: img2,

    },
    {
      title: "KPI Tracking & Insights",
      description:
        "Tuae nam ex similique incidunt expedita exercitationem laudantium. Repellendus quisquam numquamper ferendis earum sapiente non tempore? Fugit repellatut maiores.",
      icon: img3,

    },
    {
      title: "Performance & KPI Monitoring",
      description:
        "Tuae nam ex similique incidunt expedita exercitationem laudantium. Repellendus quisquam numquamper ferendis earum sapiente non tempore? Fugit repellatut maiores.",
      icon: img4,

    },
    {
      title: "AI Chatbot for Assistance",
      description:
        "Tuae nam ex similique incidunt expedita exercitationem laudantium. Repellendus quisquam numquamper ferendis earum sapiente non tempore? Fugit repellatut maiores.",
      icon: img5,

    },
    {
      title: "Integrates with Tools",
      description:
        "Tuae nam ex similique incidunt expedita exercitationem laudantium. Repellendus quisquam numquamper ferendis earum sapiente non tempore? Fugit repellatut maiores.",
      icon: img6,

    },
  ];

  return (
    <div
      id="features"
      className="lg:mt-20 mt-12 sm:mt-10 px-4 sm:px-6 relative container mx-auto roboto"
    >
      {/* Heading Section */}
      <h1 className="text-[12px] sm:text-[16px] lg:text-[20px] text-center text-[#062960] dark:text-blue-600  font-semibold">
        Features
      </h1>
      <h1 className="text-[24px] sm:text-[40px] md:text-[50px] lg:text-[55px] text-center font-semibold text-gray-900 dark:text-gray-200">
        Comprehensive Project Management
      </h1>
      <p className="text-center text-gray-900 dark:text-gray-200 text-[14px] sm:text-[16px] lg:text-[18px] mt-3 sm:mt-4 max-w-md sm:max-w-lg lg:max-w-2xl mx-auto">
        Our AI-powered Project Manager offers a comprehensive suite of features to streamline your project management workflow.
      </p>

      {/* Card Grid Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-16 sm:mt-24 lg:mt-32 max-w-8xl mx-auto px-4">
        {cardData.map((card, index) => (
          <div
            key={index}
            className="bg-white dark:bg-[#1E232E] rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 transform w-full"
          >
            <div className="mb-4 flex items-center">
              <div className="w-12 h-12 rounded-md bg-blue-100 dark:bg-[#232831] flex items-center justify-center p-2">
                <img src={card.icon} alt={card.title} className="w-10 h-10 object-contain" />
              </div>
            </div>
            <h3 className={`text-[18px] sm:text-[20px] font-bold text-[#00308F] dark:text-gray-200 ${card.color} roboto`}>
              {card.title}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm sm:text-base py-2">{card.description}</p>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center">
              <button
                className="bg-blue-900 dark:bg-blue-700 hover:bg-blue-800 dark:hover:bg-blue-600 text-white font-medium sm:py-3 px-6 sm:px-8 rounded-full lg:mt-10 min-w-[150px] sm:min-w-[180px] mx-auto"
                onClick={() => {
                  /* Add your loading logic here */
                }}
              >
                <div className="flex items-center justify-center">
                  <span className="mr-2 text-[16px] sm:text-[18px]">View More...</span>
                </div>
              </button>
            </div>
    </div>
  );
};

export default Revolutionize;
