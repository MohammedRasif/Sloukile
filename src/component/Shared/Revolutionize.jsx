import img1 from "./Group 1171275921.png";
import img2 from "./Group 1171275922.png";
import img3 from "./Group 1171275923.png";
import img4 from "./Group 1171275877.png";
import img5 from "./Black.png"; // Note: img4 and img5 are the same file
import img6 from "./rasif.png";

const Revolutionize = () => {
  const cardData = [
    {
      title: "AI-Powered Project Setup",
      description:
        "Automatically set up your project with AI-driven task allocation, timeline creation, and resource planning",
      icon: img1, // Direct assignment of imported image
      color: "text-green-500", // Icon color (optional for styling consistency)
    },
    {
      title: "Auto Milestones & Workflow",
      description:
        "Define milestones and let AI auto-generate workflows, ensuring smooth execution from start to finish",
      icon: img2,
      color: "text-pink-500",
    },
    {
      title: "KPI Tracking & Insights",
      description:
        "Define milestones and let AI auto-generate workflows, ensuring smooth execution from start to finish.",
      icon: img3,
      color: "text-blue-500",
    },
    {
      title: "Performance  & KPI Monitoring",
      description:
        "Automatically set up your project with AI-driven task allocation, timeline creation, and resource planning",
      icon: img4,
      color: "text-purple-500",
    },
    {
      title: "AI Chatbot for Assistance",
      description:
        "Define milestones and let AI auto-generate workflows, ensuring smooth execution from start to finish",
      icon: img5,
      color: "text-blue-500",
    },
    {
      title: "Integrates with Tools",
      description:
        "Define milestones and let AI auto-generate workflows, ensuring smooth execution from start to finish",
      icon: img6,
      color: "text-pink-500",
    },
  ];

  return (
    <div
      id="features"
      className="lg:mt-20 -mt-32 px-4 sm:px-6 lg:px-8 relative container mx-auto roboto">
      {/* Heading Section */}
      <h1 className="text-[12px] sm:text-[20px] lg:text-[20px] text-center font-[500] text-[#062960] font-semibold">
      Features
      </h1>
      <h1 className="text-[20px] sm:text-[50px] lg:text-[55px] text-center font-semibold text-[#062960]">
        Comprehensive Project Management
      </h1>
      <p className="text-center text-[18px]  mt-4 max-w-2xl mx-auto">
        Our AI-powered Project Manager offers a comprehensive suite of features to streamline your project management workflow.
      </p>

      {/* Card Grid Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 mt-32 max-w-8xl mx-auto px-4">
        {cardData.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-lg p-8 border-[2px] border-blue-900 shadow-2xl hover:shadow-lg hover:scale-105 transition-all duration-300 transform w-full"
          >
            <div className="flex justify-center mb-6 relative">
              <img
                src={card.icon}
                alt={`${card.title} icon`}
                className="w-20 h-20 object-contain border-[2px] border-blue-900 p-5 rounded-full absolute -top-[70px] bg-white"
              />
            </div>
            <h3 className="text-[20px] font-bold text-[#062960] text-center">
              {card.title}
            </h3>
            <p className="text-center text-gray-600 mt-3 text-lg">{card.description}</p>
            <button className="border-[2px] border-blue-900 px-3 py-[3px] rounded-sm mt-2 flex justify-center items-center mx-auto">
              View More...
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Revolutionize;