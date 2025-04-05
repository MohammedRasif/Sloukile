import React, { useState } from 'react';
import img1 from "./Group 21472255233.png";
import img2 from "./Group 21472255233.png";

const Frequently = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "How does the AI-powered project work start?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      question: "Can I integrate with other tools we already use?",
      answer:
        "Yes, our platform supports integration with a wide range of tools to ensure seamless workflow and compatibility.",
    },
    {
      question: "How long does it take to set up?",
      answer:
        "Setup typically takes between 1-3 days, depending on the complexity of your requirements and existing systems.",
    },
    {
      question: "Can I customize the platform for my industry?",
      answer:
        "Absolutely! Our platform is highly customizable to meet the specific needs of various industries.",
    },
    {
      question: "What kind of support do you offer?",
      answer:
        "We provide 24/7 customer support, including live chat, email, and phone assistance, to ensure you get help whenever you need it.",
    },
    {
      question: "Is there a free trial?",
      answer:
        "Yes, we offer a 14-day free trial so you can explore all the features before committing to a plan.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="relative min-h-screen pt-10">
      <div className="max-w-6xl mx-auto p-8 roboto font-sans z-50 relative"> {/* Added relative to ensure z-index works */}
        <h2 className="text-[40px] font-bold text-center mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Here we’ve tried to answer questions we’ve heard a lot. If you can’t find
          what you’re looking for, please reach out to us.
        </p>
        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md">
              <div
                className="flex justify-between items-center p-4 cursor-pointer"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-lg font-medium">{faq.question}</span>
                <span className="text-2xl text-gray-800">
                  {openIndex === index ? '−' : '+'}
                </span>
              </div>
              {openIndex === index && (
                <div className="p-4 pt-0 text-gray-600 text-sm leading-relaxed">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <img
        src={img1}
        className="absolute left-0 top-5 h-52 hidden md:block pl-5 z-0" 
        alt="Decoration"
      />
      <img
        src={img2}
        className="absolute right-0 bottom-5 h-52 hidden md:block pr-5 z-0" 
        alt="Decoration"
      />
    </div>
  );
};

export default Frequently;