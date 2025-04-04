const Revolutionize = () => {
  const cardData = [
    {
      title: "AI-Powered Project Setup",
      description:
        "Tuae nam ex similique incidunt expedita exerci tationem laudantium. Repellendus quisquam numquam perferendis earum sapiente non tempore? Fugit repellatut maiores.",
      icon: "blue",
      color: "text-blue-700",
    },
    {
      title: "Auto Milestones & Workflow",
      description:
        "Tuae nam ex similique incidunt expedita exercitationem laudantium. Repellendus quisquam numquam perferendis earum sapiente non tempore? Fugit repellatut maiores.",
      icon: "pink",
      color: "text-pink-600",
    },
    {
      title: "KPI Tracking & Insights",
      description:
        "Tuae nam ex similique incidunt expedita exercitationem laudantium. Repellendus quisquam numquam perferendis earum sapiente non tempore? Fugit repellatut maiores.",
      icon: "blue",
      color: "text-blue-600",
    },
    {
      title: "Performance & KPI Monitoring",
      description:
        "Tuae nam ex similique incidunt expedita exercitationem laudantium. Repellendus quisquam numquam perferendis earum sapiente non tempore? Fugit repellatut maiores.",
      icon: "purple",
      color: "text-purple-600",
    },
    {
      title: "AI Chatbot for Assistance",
      description:
        "Tuae nam ex similique incidunt expedita exercitationem laudantium. Repellendus quisquam numquam perferendis earum sapiente non tempore? Fugit repellatut maiores.",
      icon: "blue",
      color: "text-blue-600",
    },
    {
      title: "Integrates with Tools",
      description:
        "Tuae nam ex similique incidunt expedita exercitationem laudantium. Repellendus quisquam numquam perferendis earum sapiente non tempore? Fugit repellatut maiores.",
      icon: "pink",
      color: "text-pink-600",
    },
  ]

  return (
    <div id="features" className="lg:mt-20 mt-12 sm:mt-10 px-4 sm:px-6 relative container mx-auto roboto">
      {/* Heading Section */}
      <h1 className="text-[12px] sm:text-[16px] lg:text-[20px] text-center text-[#062960] font-semibold">Features</h1>
      <h1 className="text-[24px] sm:text-[40px] md:text-[50px] lg:text-[55px] text-center font-semibold text-[#062960]">
        Comprehensive Project Management
      </h1>
      <p className="text-center text-[14px] sm:text-[16px] lg:text-[18px] mt-3 sm:mt-4 max-w-md sm:max-w-lg lg:max-w-2xl mx-auto">
        Our AI-powered Project Manager offers a comprehensive suite of features to streamline your project management
        workflow.
      </p>

      {/* Card Grid Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-16 sm:mt-24 lg:mt-32 max-w-8xl mx-auto px-4">
        {cardData.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 transform w-full"
          >
            <div className="mb-4">
              <div className={`w-10 h-10 rounded-md bg-blue-100 flex items-center justify-center`}>
                <div className={`w-5 h-5 rounded-sm bg-blue-700`}></div>
              </div>
            </div>
            <h3 className={`text-[18px] sm:text-[20px] font-medium ${card.color}`}>{card.title}</h3>
            <p className="text-gray-500 mt-2 text-sm sm:text-base">{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Revolutionize

