import img from "./Group 6.png";
import img1 from "./Avatar (1).png";
import img2 from "./image 2.png";
import img3 from "./Avatar.png";
import img4 from "./Avatar (1).png";

const UserSays = () => {
  const testimonials = [
    {
      quote:
        "The automation features are a game-changer! Milestone tracking and AI recommendations help us stay ahead without the hassle.",
      rating: 5,
      name: "Sarah L.",
      title: "Operations Lead",
      image: img,
      images: img1,
    },
    {
      quote:
        "The automation features are a game-changer! Milestone tracking and AI recommendations help us stay ahead without the hassle.",
      rating: 5,
      name: "Sarah L.",
      title: "Operations Lead",
      image: img,
      images: img2,
    },
    {
      quote:
        "Seamless integration with our existing tools made adoption smooth. The AI insights help us make better decisions every week.",
      rating: 5,
      name: "Michael R.",
      title: "Operations Lead",
      image: img,
      images: img3,
    },
    {
      quote:
        "A must-have for any team looking to streamline project execution. The AI chatbot support is incredibly helpful.",
      rating: 5,
      name: "Hears of Taras",
      title: "Logo Designer",
      image: img,
      images: img4,
    },
  ];

  return (
    <div className="bg-gradient-to-b from-white to-blue-50 py-8 px-4 sm:py-12 sm:px-6 lg:px-8">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-blue-900 mb-6 sm:mb-10">
        What Our Users Say
      </h2>
      <div className="max-w-full sm:max-w-3xl md:max-w-5xl lg:max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white p-4 sm:p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300 w-full"
          >
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-start">
                <img
                  src={testimonial.image}
                  className="h-8 sm:h-10 md:h-[40px] w-auto"
                  alt="Testimonial logo"
                />
                <div className="flex items-center space-x-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <span
                      key={i}
                      className={`text-yellow-400 text-sm sm:text-base ${
                        i < testimonial.rating ? "fill-current" : "text-gray-300"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex-1">
                <p className="text-sm sm:text-base md:text-lg text-gray-700 py-4 sm:py-5">
                  {testimonial.quote}
                </p>
              </div>

              <div className="flex items-center space-x-3 sm:space-x-4 mt-2 sm:mt-4">
                <img
                  src={testimonial.images}
                  className="rounded-full h-10 sm:h-12 md:h-[55px] w-10 sm:w-12 md:w-[55px]"
                  alt={`${testimonial.name}'s avatar`}
                />
                <div>
                  <p className="text-gray-900 font-semibold text-sm sm:text-base md:text-lg">
                    {testimonial.name}
                  </p>
                  <p className="text-gray-500 text-xs sm:text-sm">{testimonial.title}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserSays;