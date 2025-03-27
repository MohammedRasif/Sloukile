import React, { useState } from 'react';

const Frequently = () => {
  // State to track which FAQ item is open, default to 0 for the first item
  const [openIndex, setOpenIndex] = useState(0); // Changed from null to 0

  // FAQ data
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

  // Function to toggle FAQ item
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-[#f9f7f2]">
      <div className="max-w-6xl mx-auto p-8 roboto font-sans">
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
    </div>
  );
};

export default Frequently;