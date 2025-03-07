import img1 from "./Group 1171275921.png";
import img2 from "./Group 1171275922.png";
import img3 from "./Group 1171275923.png";
import img4 from "./Group 1171275877.png";
import img5 from "./Group 1171275877.png"; // Note: img4 and img5 are the same file
import img6 from "./Group 1171275925.png";
import img7 from "./Group 1171275879.png"; // Imported but not used in cardData

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
    <div className="mt-20 px-4 sm:px-6 lg:px-8 relative container mx-auto">
      {/* Heading Section */}
      <h1 className="text-[20px] sm:text-[50px] lg:text-[60px] text-center font-[500] text-[#062960]">
        Revolutionize <span className="text-[#CBB702]">Project Management</span>{" "}
        with AI
      </h1>
      <p className="text-center text-base sm:text-lg mt-4 max-w-2xl mx-auto">
        Unlock smarter planning, automation, and real-time insights with AI-driven
        tools
      </p>

      {/* Card Grid Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {cardData.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-lg p-6 border border-gray-200 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 transform z-10"
          >
            <div className="flex justify-center mb-4">
              <img
                src={card.icon}
                alt={`${card.title} icon`}
                className="w-16 h-16 object-contain " // Adjust size as needed
              />
            </div>
            <h3 className="text-xl font-bold text-[#062960] text-center">
              {card.title}
            </h3>
            <p className="text-center text-gray-600 mt-2">{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Revolutionize;