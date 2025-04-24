"use client"

import { Cloud, Cpu, Rocket, CheckCircle, Clock } from "lucide-react"

const Deployment = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b  py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 tracking-tight sm:text-4xl">
            Deployment Strategy: Task Management Application
          </h1>
          <p className="mt-3 max-w-3xl mx-auto text-lg text-gray-600">
            A comprehensive plan for deploying an AI-powered task management application, ensuring scalability, reliability, and seamless AI integration.
          </p>
        </div>

        {/* Strategy Overview */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
            <Cloud className="h-6 w-6 text-blue-500" />
            Deployment Strategy
          </h2>
          <p className="text-gray-600 mb-4">
            The deployment strategy leverages modern cloud infrastructure and CI/CD practices to deliver a robust task management application with AI-driven features like task prioritization and NLP.
          </p>
          <ul className="space-y-3">
            {[
              { title: "Cloud Infrastructure", desc: "AWS with ECS Fargate, SageMaker, and RDS for scalability and AI model hosting.", icon: <Cloud className="h-5 w-5 text-blue-500" /> },
              { title: "AI Model Deployment", desc: "Host task prioritization and NLP models on SageMaker endpoints with continuous training.", icon: <Cpu className="h-5 w-5 text-blue-500" /> },
              { title: "Blue-Green Deployment", desc: "Use blue-green deployments to ensure zero downtime during updates.", icon: <Rocket className="h-5 w-5 text-blue-500" /> },
              { title: "Monitoring", desc: "Implement Prometheus and Grafana for real-time AI and application metrics.", icon: <CheckCircle className="h-5 w-5 text-blue-500" /> },
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="mt-1">{item.icon}</div>
                <div>
                  <span className="font-semibold text-gray-800">{item.title}:</span>
                  <span className="text-gray-600"> {item.desc}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Roll-Out Plan */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
            <Clock className="h-6 w-6 text-blue-500" />
            Roll-Out Plan
          </h2>
          <p className="text-gray-600 mb-4">
            The roll-out plan is structured in five phases to ensure a smooth deployment of the task management application, with a focus on AI feature validation and user feedback.
          </p>
          <div className="space-y-6">
            {[
              {
                phase: "Preparation (Weeks 1-2)",
                tasks: [
                  "Finalize AI models and application code.",
                  "Set up AWS infrastructure (ECS, SageMaker, RDS).",
                  "Configure CI/CD pipeline with GitHub Actions.",
                ],
              },
              {
                phase: "Alpha Release (Weeks 3-4)",
                tasks: [
                  "Deploy to staging for internal testing.",
                  "Validate AI features (e.g., NLP, prioritization).",
                  "Fix bugs based on feedback.",
                ],
              },
              {
                phase: "Beta Release (Weeks 5-6)",
                tasks: [
                  "Canary release to 5-10% of users.",
                  "Run A/B tests for AI algorithms.",
                  "Scale infrastructure as needed.",
                ],
              },
              {
                phase: "Full Roll-Out (Weeks 7-8)",
                tasks: [
                  "Gradual roll-out (25%, 50%, 100%).",
                  "Execute blue-green deployment.",
                  "Document deployment process.",
                ],
              },
              {
                phase: "Post-Deployment (Week 9+)",
                tasks: [
                  "Monitor AI model drift and application uptime.",
                  "Retrain models with live data.",
                  "Plan feature enhancements.",
                ],
              },
            ].map((phase, index) => (
              <div key={index} className="border-l-4 border-blue-500 pl-4">
                <h3 className="text-xl font-semibold text-gray-800">{phase.phase}</h3>
                <ul className="mt-2 space-y-2">
                  {phase.tasks.map((task, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-600">
                      <CheckCircle className="h-4 w-4 text-blue-500" />
                      {task}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Deployment