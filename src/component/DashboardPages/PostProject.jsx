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
        <div>
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-1">
                    Post Project
                </h2>
                <p className="text-gray-500 dark:text-gray-400">
                    Show per project, Lessons learned, achieved results, ROI and savings
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                    <div
                        key={project.id}
                        className="bg-white dark:bg-[#1E232E] rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-5 hover:bg-gray-50 dark:hover:bg-[#2A2F3B] transition-colors"
                    >
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">
                            {project.name}
                        </h3>
                        <div className="space-y-2">
                            <div>
                                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Lessons Learned:
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {project.lessonsLearned}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Achieved Results:
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {project.achievedResults}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    ROI:
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {project.roi}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Savings:
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {project.savings}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PostProject;