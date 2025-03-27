import "../Shared/banner.css";

const Management = () => {
    return (
        <div className="bg-[#f9f7f2] py-16">
            <div className="text-center max-w-3xl mx-auto px-4">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                    Ready to Transform Your Project Management?
                </h1>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    Join thousands of teams using our AI Project Manager to streamline workflows. Automate tasks, boost efficiency, and enhance collaboration—all in one smart platform!
                </p>
                <button
                    className="bg-blue-900 hover:bg-blue-800 text-white font-medium py-2 sm:py-3 px-6 sm:px-8 rounded-full flex items-center justify-center min-w-[150px] sm:min-w-[180px] mx-auto"
                    onClick={() => {
                        /* Add your loading logic here */
                    }}
                >
                    <div className="flex items-center">
                        {/* Normal state text */}
                        <span className="mr-2 text-[16px] sm:text-[18px]">Get started</span>

                        {/* Loading animation (hidden by default) */}
                        <div className="loading-animation flex items-center justify-center">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default Management;