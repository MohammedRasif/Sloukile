import image from "./Group 2147225444.png"; // Background image
import image1 from "./Group 21472255233.png"; // This will be replaced by a video

const WatchLearn = () => {
    return (
        <div
            className="relative flex flex-col items-center justify-center pt-20 "
        >
            {/* Absolute Image - positioned as is */}
            <div className="absolute left-20 top-10">
                <img src={image1} className="h-52" alt="" />
            </div>

            <img src={image} className="h-[900px] w-full absolute pt-72" alt="" />
            <div className="">
                {/* Text Section - centered */}
                <div className="text-center max-w-4xl mb-8 z-10 bg-opacity-80 p-6 rounded-lg">
                    <h1 className="text-md md:text-2xl font-bold  text-[#2D4162] dark:text-blue-600  mb-4">
                        Watch & learn
                    </h1>
                    <h1 className="text-4xl md:text-5xl font-bold dark:text-gray-200 text-[#2D4162] mb-4">
                        See How AI Transforms Project Management
                    </h1>
                    <p className="text-gray-600 dark:text-gray-200 text-lg">
                        Watch our video to see how AI-powered tools streamline workflows, deliver projects on time, and under budget.
                    </p>
                </div>


                {/* Video Section - centered */}
                <div className=" ">
                    <div className="z-100 bg-black opacity-95">
                        <iframe
                            className="w-[90vh] max-w-4xl h-[500px] rounded-md"
                            src="https://www.youtube.com/embed/m7nFyD1P_jw?autoplay=1&mute=1"
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WatchLearn;