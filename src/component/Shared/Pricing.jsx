import React from "react";

const plans = [
    {
        name: "Basic",
        price: 24,
        bg: "bg-white",
        textColor: "text-gray-800",
        btnBg: "bg-blue-700",
        features: [
            "AI-Powered Project Setup",
            "Automated Milestone Planning",
            "Basic KPI Tracking",
            "Limited Team Size (Up to 3 Members)",
        ],
        description: "A perfect plan for small teams to get started with AI-powered project setup.",
    },
    {
        name: "Best Value",
        price: 24,
        bg: "bg-white",
        textColor: "text-gray-800",
        btnBg: "bg-blue-700",
        features: [
            "AI-Powered Project Setup",
            "Automated Milestone Planning",
            "Advanced KPI Tracking & Insights",
            "Team Collaboration Tools",
        ],
        description: "The best plan for growing teams with advanced AI automation and analytics.",
    },
    {
        name: "Pro",
        price: 24,
        bg: "bg-white",
        textColor: "text-gray-800",
        btnBg: "bg-blue-700",
        features: [
            "AI-Powered Project Setup",
            "Automated Workflow Management",
            "Deep KPI Analytics",
            "Priority Support",
            "Limited team size (up to 5 members)"
        ],
        description: "For professionals who need in-depth analytics and automation tools.",
    },
    {
        name: "Enterprise",
        price: 24,
        bg: "bg-white",
        textColor: "text-gray-800",
        btnBg: "bg-blue-700",
        features: [
            "Custom AI Solutions",
            "Full Automation & Optimization",
            "Unlimited Team Members",
            "Limited team size (up to 5 members)",
            "24/7 Dedicated Support",
        ],
        description: "Enterprise-grade solutions for large teams with full automation support.",
    },
];

const Pricing = () => {
    return (
        <div className="flex flex-col items-center min-h-screen  py-16 px-4 mt-96">
            {/* Title */}
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-10">
                Pricing <span className="text-yellow-500">& plan</span>
            </h2>

            {/* Pricing Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-[85%] ">
                {plans.map((plan, index) => (
                   <div
                   key={index}
                   className={`relative flex flex-col items-center p-8 rounded-3xl shadow-lg transition duration-300 border border-gray-200 h-[550px] hover:scale-105 hover:shadow-2xl hover:bg-blue-900 hover:text-white group ${plan.bg} ${plan.textColor}`}
               >
                   {/* Title & Price Section */}
                   <div className="absolute top-0 left-0 w-full text-center rounded-t-3xl z-10 pt-8">
                       <h3 className="text-xl sm:text-2xl font-semibold group-hover:text-white">{plan.name}</h3>
                       <p className="text-3xl sm:text-4xl font-bold mt-2 pb-10 group-hover:text-white">${plan.price}</p>
                   </div>
               
                   {/* Features List */}
                   <ul className="text-sm sm:text-base text-center my-6 space-y-3 mt-36">
                       {plan.features.map((feature, i) => (
                           <li key={i} className="border-b border-dashed pb-2 last:border-none group-hover:text-white">
                               {feature}
                           </li>
                       ))}
                   </ul>
               
                   {/* Description & Button (Fixed at Bottom) */}
                   <div className="absolute bottom-0 left-0 w-full bg-gray-300 py-6 rounded-b-3xl flex flex-col items-center">
                       {/* Description */}
                       <p className="text-xs sm:text-sm text-center opacity-80 group-hover:text-white">{plan.description}</p>
               
                       {/* Button */}
                       <button
                           className={`mt-4 px-6 py-3 rounded-lg text-white font-semibold hover:opacity-80 transition ${plan.btnBg}`}
                       >
                           Choose Plan
                       </button>
                   </div>
               </div>
               


                ))}
            </div>
        </div>
    );
};

export default Pricing;
