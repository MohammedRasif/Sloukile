import image from "./Group 2147225444.png"; // Background image
import image1 from "./Group 2147225524.png"; // This will be replaced by a video

const WatchLearn = () => {
    return (
        <div
            className="relative flex flex-col items-center justify-center pt-20 "
            // style={{
            //     backgroundImage: `url(${image})`,
            //     backgroundSize: "cover",
            //     backgroundPosition: "center",
            //     height: "80vh",
            // }}
        >
             {/* Absolute Image - positioned as is */}
             <div className="absolute left-20 top-10">
                <img src={image1} className="h-52" alt="" />
            </div>

            <img src={image} className="h-[900px] w-full absolute pt-72" alt="" />
            <div className="">
                {/* Text Section - centered */}
            <div className="text-center max-w-4xl mb-8 z-10 bg-opacity-80 p-6 rounded-lg">
                <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
                    See How AI Transforms Project Management
                </h1>
                <p className="text-gray-600 text-lg">
                    Watch our video to see how AI-powered tools streamline workflows, deliver projects on time, and under budget.
                </p>
            </div>

           
            {/* Video Section - centered */}
            <div className="z-10">
                <div className="">
                    <video
                        className="w-[90vh] max-w-4xl h-[500px] rounded-md"
                        controls
                    >
                        <source src="path-to-your-video.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
            </div>
        </div>
        // <div
        //     className="relative flex flex-col items-center justify-center p-4 mt-52"
        //     style={{
        //         backgroundImage: `url(${image})`,
        //         backgroundSize: "cover",
        //         backgroundPosition: "center",
        //         height: "80vh",
        //     }}
        // >
        //     {/* Text Section - centered */}
        //     <div className="text-center max-w-lg mb-8 z-10 bg-opacity-80 p-6 rounded-lg">
        //         <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
        //             See How AI Transforms Project Management
        //         </h1>
        //         <p className="text-gray-600 text-lg">
        //             Watch our video to see how AI-powered tools streamline workflows, deliver projects on time, and under budget.
        //         </p>
        //     </div>

        //     {/* Absolute Image - positioned as is */}
        //     <div className="absolute left-20 top-0">
        //         <img src={image1} className="h-52" alt="" />
        //     </div>

        //     {/* Video Section - centered */}
        //     <div className="z-10">
        //         <div className="">
        //             <video
        //                 className="w-[80vh] max-w-2xl h-[400px]"
        //                 controls
        //             >
        //                 <source src="path-to-your-video.mp4" type="video/mp4" />
        //                 Your browser does not support the video tag.
        //             </video>
        //         </div>
        //     </div>
        // </div>
    );
};

export default WatchLearn;