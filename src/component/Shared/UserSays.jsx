"use client"

import { useState } from "react"
import img2 from "./helllllllllooooo.png"
import { ChevronLeft, ChevronRight } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Suntan",
    position: "Frontend Developer",
    image: "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529177/samples/smile.jpg",
    quote:
      '"The AI recommendations have saved us countless hours of planning and helped us identify risks we would have missed. Our project delivery time has improved by 30%."',
  },
  {
    id: 2,
    name: "Rasif",
    position: "Frontend Developer",
    image: "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529178/samples/man-portrait.jpg",
    quote:
      '"The AI recommendations have saved us countless hours of planning and helped us identify risks we would have missed. Our project delivery time has improved by 30%."',
  },
  {
    id: 3,
    name: "Bijoy Vi",
    position: "Frontend Developer",
    image: "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529169/samples/people/boy-snow-hoodie.jpg",
    quote:
      '"The AI recommendations have saved us countless hours of planning and helped us identify risks we would have missed. Our project delivery time has improved by 30%."',
  },
  {
    id: 4,
    name: "Pappu Bhai",
    position: "Frontend Developer",
    image: "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529168/samples/people/kitchen-bar.jpg",
    quote:
      '"The AI recommendations have saved us countless hours of planning and helped us identify risks we would have missed. Our project delivery time has improved by 30%."',
  },
  {
    id: 5,
    name: "Sojib Bhai",
    position: "Frontend Developer",
    image: "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529167/samples/animals/cat.jpg",
    quote:
      '"The AI recommendations have saved us countless hours of planning and helped us identify risks we would have missed. Our project delivery time has improved by 30%."',
  },
]

const UserSays = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const handlePrev = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
    setTimeout(() => setIsAnimating(false), 600)
  }

  const handleNext = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
    setTimeout(() => setIsAnimating(false), 600)
  }

  const getCardPosition = (index) => {
    const totalItems = testimonials.length
    const distance = (index - currentIndex + totalItems) % totalItems
    const shortestDistance = distance <= totalItems / 2 ? distance : distance - totalItems

    if (shortestDistance === 0) return "center"
    if (shortestDistance === 1 || shortestDistance === -1) return "adjacent"
    return "edge"
  }

  return (
    <div className="py-16 px-4">
      <div className=" mx-auto">
        <div className="text-center mb-12">
          <p className="text-blue-600 font-medium mb-2">Testimonial</p>
          <h2 className="text-3xl md:text-4xl font-bold">What Client Think About Us</h2>
        </div>

        <div className="relative">
          <div className="relative h-[500px] flex items-center justify-center overflow-hidden perspective-1000">
            <div className="absolute w-full flex justify-center items-center">
              {testimonials.map((testimonial, index) => {
                const position = getCardPosition(index)

                let transform = ""
                switch (position) {
                  case "center":
                    transform = "translateX(0%) scale(1) rotateY(0deg)"
                    break
                  case "adjacent":
                    transform =
                      (index - currentIndex + testimonials.length) % testimonials.length === 1
                        ? "translateX(100%) scale(0.85) rotateY(-5deg)"
                        : "translateX(-100%) scale(0.85) rotateY(5deg)"
                    break
                  case "edge":
                    transform =
                      (index - currentIndex + testimonials.length) % testimonials.length <= 2
                        ? "translateX(185%) scale(0.7) rotateY(-10deg)"
                        : "translateX(-185%) scale(0.7) rotateY(10deg)"
                    break
                }

                // Fixed dimensions for all cards to prevent content overflow
                const cardStyles = {
                  transform,
                  transformStyle: "preserve-3d",
                  zIndex: position === "center" ? 30 : position === "adjacent" ? 20 : 10,
                  opacity: position === "center" ? 1 : position === "adjacent" ? 0.9 : 0.7,
                  height: "350px", // Fixed height for all positions
                  width: "100%",
                  maxWidth: "380px", // Fixed width for all positions
                  transitionProperty: "transform, opacity",
                }

                return (
                  <div
                    key={testimonial.id}
                    className="absolute shadow-md transition-all duration-600 ease-[cubic-bezier(0.4,0,0.2,1)]"
                    style={cardStyles}
                  >
                    <div className="bg-white rounded-lg shadow-xl p-6 h-full flex flex-col items-center overflow-hidden">
                      <div
                        className={`absolute -top-14 rounded-full overflow-hidden border-2 border-blue-100 ${position === "center" ? "w-32 h-32" : position === "adjacent" ? "w-24 h-24" : "w-16 h-16"
                          }`}
                      >
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div
                        className={`text-blue-600 mb-2 ${position === "center" ? "h-8 mt-20" : position === "adjacent" ? "h-6 mt-10" : "h-4 mt-2"
                          }`}
                      >
                        <img src={img2} alt="Quote decoration" className="w-full h-full object-contain" />
                      </div>

                      <h3
                        className={`font-bold mb-2 ${position === "center" ? "text-xl" : position === "adjacent" ? "text-lg" : "text-base"
                          }`}
                      >
                        {testimonial.name}
                      </h3>

                      <p
                        className={`text-gray-600 mb-4 font-bold ${position === "center" ? "text-base" : position === "adjacent" ? "text-sm" : "text-xs"
                          }`}
                      >
                        {testimonial.position}
                      </p>

                      <p
                        className={`text-center font-[500] text-gray-500 overflow-hidden ${position === "center"
                            ? "text-base leading-relaxed"
                            : position === "adjacent"
                              ? "text-sm leading-snug"
                              : "text-xs leading-tight line-clamp-3"
                          }`}
                      >
                        {position === "center"
                          ? testimonial.quote
                          : position === "adjacent"
                            ? testimonial.quote.length > 120
                              ? `${testimonial.quote.substring(0, 120)}...`
                              : testimonial.quote
                            : testimonial.quote.length > 80
                              ? `${testimonial.quote.substring(0, 80)}...`
                              : testimonial.quote}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="flex justify-center mt-8 gap-4">
            <button
              onClick={handlePrev}
              className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-800 transition-colors duration-300 disabled:opacity-50 cursor-pointer"
              aria-label="Previous testimonial"
              disabled={isAnimating}
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={handleNext}
              className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-800 transition-colors duration-300 disabled:opacity-50 cursor-pointer"
              aria-label="Next testimonial"
              disabled={isAnimating}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserSays