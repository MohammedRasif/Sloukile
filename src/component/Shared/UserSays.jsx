import img from "./Group 6.png";
import img1 from "./Avatar (1).png"
import img2 from "./image 2.png"
import img3 from "./Avatar.png"
import img4 from "./Avatar (1).png"

const UserSays = () => {
    const testimonials = [
        {
            quote: "The automation features are a game-changer! Milestone tracking and AI recommendations help us stay ahead without the hassle.",
            rating: 5,
            name: "Sarah L.",
            title: "Operations Lead",
            image: img, // Updated to use the imported image
            images: img1, // Updated to use the imported image
        },
        {
            quote: "The automation features are a game-changer! Milestone tracking and AI recommendations help us stay ahead without the hassle.",
            rating: 5,
            name: "Sarah L.",
            title: "Operations Lead",
            image: img, // Updated to use the imported image
            images: img2, // Updated to use the imported image
        },
        {
            quote: "Seamless integration with our existing tools made adoption smooth. The AI insights help us make better decisions every week.",
            rating: 5,
            name: "Michael R.",
            title: "Operations Lead",
            image: img, // Updated to use the imported image
            images: img3, // Updated to use the imported image
        },
        {
            quote: "A must-have for any team looking to streamline project execution. The AI chatbot support is incredibly helpful.",
            rating: 5,
            name: "Hears of Taras",
            title: "Logo Designer",
            image: img, // Updated to use the imported image
            images: img4, // Updated to use the imported image
        },
    ];

    return (
        <div className="bg-gradient-to-b from-white to-blue-50 py-12 px-4">
            <h2 className="text-4xl font-bold text-center text-blue-900 mb-10">What Our Users Say</h2>
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                {testimonials.map((testimonial, index) => (
                  
                    <div key={index}
                        className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300 "
                    >
                        <div>
                            <div className="flex  justify-between ">
                                <img src={testimonial.image} className="h-[40px]" alt="" />
                                <div className="flex items-center mt-2 ">
                                    {Array.from({ length: 5 }, (_, i) => (
                                        <span
                                            key={i}
                                            className={`text-yellow-400  ${i < testimonial.rating ? "fill-current" : ""
                                                }`}
                                        >
                                            ★
                                        </span>
                                    ))}
                                </div>

                            </div>

                            <div>
                                <h1 className="text-[20px] py-5 "> {testimonial.quote}</h1>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div>
                                    <img src={testimonial.images} className="rounded-full h-[55px] mt-3" alt="" />
                                </div>
                                <div className=" mt-4">
                                    <p className="text-gray-900 font-semibold">{testimonial.name}</p>
                                    <p className="text-gray-500 text-sm">{testimonial.title}</p>
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