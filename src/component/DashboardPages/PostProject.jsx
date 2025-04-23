import { useState } from "react";

const PostProject = () => {
    const [projects, setProjects] = useState([
        {
            id: 1,
            name: "Website Redesign",
            lessonsLearned:
                "Effective communication with stakeholders is key; early prototyping saved time.",
            achievedResults:
                "New website launched with 30% faster load times and improved user engagement.",
            roi: "150%",
            savings: "$10,000",
        },
        {
            id: 2,
            name: "Mobile App Development",
            lessonsLearned:
                "Underestimated testing phase; need better resource allocation for QA.",
            achievedResults:
                "App released on iOS and Android, with 10,000 downloads in the first month.",
            roi: "120%",
            savings: "$5,000",
        },
        {
            id: 3,
            name: "AI Integration",
            lessonsLearned:
                "AI model training required more data; collaboration with data team was crucial.",
            achievedResults:
                "AI feature increased user retention by 20% and reduced manual workload.",
            roi: "180%",
            savings: "$15,000",
        },
    ]);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-10 px-4 sm:px-6 lg:px-8">
            {/* Header Section */}
            <div className="max-w-7xl mx-auto mb-10 text-center">
                <h2 className="text-5xl font-semibold text-gray-800 dark:text-white mb-3">
                    Our Projects
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                    Explore the lessons learned, results achieved, ROI, and savings from our key projects.
                </p>
            </div>

            {/* Projects Grid */}
            <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                    <div
                        key={project.id}
                        className="relative bg-gray-100 dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 transform hover:scale-105 transition-transform duration-300 cursor-pointer"
                    >
                        {/* Project Title */}
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                            {project.name}
                        </h3>

                        {/* Project Details */}
                        <div className="space-y-4">
                            <div>
                                <p className="text-base font-semibold text-gray-700 dark:text-gray-200">
                                    Lessons Learned:
                                </p>
                                <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                                    {project.lessonsLearned}
                                </p>
                            </div>
                            <div>
                                <p className="text-base font-semibold text-gray-700 dark:text-gray-200">
                                    Achieved Results:
                                </p>
                                <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                                    {project.achievedResults}
                                </p>
                            </div>
                            <div className="flex justify-between">
                                <div>
                                    <p className="text-base font-semibold text-gray-700 dark:text-gray-200">
                                        ROI:
                                    </p>
                                    <p className="text-base text-green-600 dark:text-green-400 font-medium">
                                        {project.roi}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-base font-semibold text-gray-700 dark:text-gray-200">
                                        Savings:
                                    </p>
                                    <p className="text-base text-green-600 dark:text-green-400 font-medium">
                                        {project.savings}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PostProject;