"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import img from "./Decoration1.png"

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0)

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? -1 : index)
  }

  const faqItems = [
    {
      question: "Pellentesque ac bibendum tortor?",
      answer: "Vivamus sit amet interdum elit. Proin lacinia erat ac velit tempus auctor.",
    },
    {
      question: "In mi nulla, fringilla vestibulum?",
      answer:
        "Vestibulum sit amet tortor sit amet libero lobortis semper at et odio. Vivamus sit amet interdum elit. Proin lacinia erat ac velit tempus auctor.",
    },
    {
      question: "Quisque lacinia purus ut libero?",
      answer:
        "Vestibulum sit amet tortor sit amet libero lobortis semper at et odio. Vivamus sit amet interdum elit. Proin lacinia erat ac velit tempus auctor.",
    },
    {
      question: "Quisque ut metus sit amet augue?",
      answer:
        "Vestibulum sit amet tortor sit amet libero lobortis semper at et odio. Vivamus sit amet interdum elit. Proin lacinia erat ac velit tempus auctor.",
    },
    {
      question: "Pellentesque ac bibendum tortor?",
      answer:
        "Vestibulum sit amet tortor sit amet libero lobortis semper at et odio. Vivamus sit amet interdum elit. Proin lacinia erat ac velit tempus auctor.",
    },
  ]

  return (
    <div className=" py-12 px-4 md:px-8 lg:px-16 rounded-lg">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left Column - Title and Image */}
        <div className="flex flex-col items-center lg:items-start space-y-6 text-center lg:text-left">
          <h2 className="text-3xl font-bold text-navy-900">FAQ</h2>
          <div className="w-16 h-1 bg-navy-900"></div>
          <p className="text-gray-700 max-w-md">
            Vestibulum sit amet tortor sit amet libero lobortis semper at et odio.
          </p>
          <div className="w-full max-w-xs md:max-w-sm lg:max-w-md">
            <img src={img} alt="FAQ Decoration" className="w-full h-auto" />
          </div>
        </div>

        {/* Right Column - Accordion */}
        <div className="space-y-4 w-full lg:mt-20">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <button
                className={`w-full px-6 py-4 flex justify-between items-center text-left transition-all duration-500 ease-in-out ${
                  openIndex === index ? "bg-[#00BF63] text-white" : "bg-white text-gray-800 hover:bg-gray-50"
                }`}
                onClick={() => toggleAccordion(index)}
                aria-expanded={openIndex === index}
                aria-controls={`faq-content-${index}`}
              >
                <span className="font-medium">{item.question}</span>
                <div
                  className={`transform transition-transform duration-500 ease-in-out ${openIndex === index ? "rotate-180" : "rotate-0"}`}
                >
                  <ChevronDown className="h-5 w-5" />
                </div>
              </button>

              <div
                id={`faq-content-${index}`}
                className="overflow-hidden transition-all duration-500 ease-in-out"
                style={{
                  maxHeight: openIndex === index ? "300px" : "0",
                  opacity: openIndex === index ? 1 : 0,
                  transform: openIndex === index ? "translateY(0)" : "translateY(-10px)",
                }}
              >
                <div className="px-6 py-4 bg-white">
                  <p className="text-gray-700 transition-opacity duration-500 ease-in-out">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FAQ
