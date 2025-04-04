import { FaMapLocationDot } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";
import { MdOutlineWifiCalling3 } from "react-icons/md";
import "../Shared/banner.css";


const FAQ = () => {
  return (
    <div className="bg-[#FDFAF6] w-full">
      <div className="flex flex-col lg:flex-row items-center justify-between p-4 sm:p-6 lg:p-8 container mx-auto ">
        {/* Left Section: Get In Touch Info */}
        <div className="w-full lg:w-1/2 lg:pr-8 lg:-mt-20 roboto mb-8 lg:mb-0">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">Get In Touch</h1>
          <p className="text-gray-600 text-sm sm:text-base lg:text-lg mb-6">
            Have questions about our AI Project Manager? Our team is here to assist you in finding the perfect solution for your business. Whether you're looking to streamline project management, automate workflows, or enhance team collaboration with AI-driven insights, we are here to guide you every step of the way.
          </p>
          <div className="flex items-center space-x-4 sm:space-x-5 mb-4">
            <div className="text-3xl sm:text-4xl text-[#00308F]">
              <IoIosMail />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-semibold">Email Us</h1>
              <p className="text-gray-600 text-sm sm:text-base">info@aiprojectmanager.com</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 sm:space-x-5 mb-4">
            <div className="text-3xl sm:text-4xl text-[#00308F]">
              <MdOutlineWifiCalling3 />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-semibold">Call Us</h1>
              <p className="text-gray-600 text-sm sm:text-base">+1 (555) 123-4567</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 sm:space-x-5">
            <div className="text-3xl sm:text-4xl text-[#00308F]">
              <FaMapLocationDot />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-semibold">Location Us</h1>
              <p className="text-gray-600 text-sm sm:text-base">+1 (555) 123-4567</p>
            </div>
          </div>
        </div>

        {/* Right Section: Contact Form */}
        <div className="w-full lg:w-1/2">
          <form className="space-y-4">
            {/* Name Fields */}
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="w-full sm:w-1/2">
                <label
                  htmlFor="firstName"
                  className="block text-lg sm:text-xl lg:text-[21px] font-bold text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  placeholder="First"
                  className="mt-1 block w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="w-full sm:w-1/2 lg:mt-7">
                <label
                  htmlFor="lastName"
                  className="block text-lg sm:text-xl lg:text-[21px] font-bold text-gray-700 invisible sm:visible"
                >

                </label>
                <input
                  type="text"
                  id="lastName"
                  placeholder="Last"
                  className="mt-1 block w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-lg sm:text-xl lg:text-[21px] font-bold text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="info@aiprojectmanager.com"
                className="mt-1 block w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Number Field */}
            <div>
              <label
                htmlFor="number"
                className="block text-lg sm:text-xl lg:text-[21px] font-bold text-gray-700"
              >
                Number
              </label>
              <input
                type="tel"
                id="number"
                placeholder="+1(555) 123-4567"
                className="mt-1 block w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Message Field */}
            <div>
              <label
                htmlFor="message"
                className="block text-lg sm:text-xl lg:text-[21px] font-bold text-gray-700"
              >
                Message
              </label>
              <textarea
                id="message"
                placeholder="Write Your Message Here"
                rows="4"
                className="mt-1 block w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            {/* Send Button */}
            <div className="">
              <button
                className="bg-blue-900  hover:bg-blue-800 text-white font-medium py-2 sm:py-3 px-6 sm:px-8 rounded-full lg:mt-10 min-w-[150px] sm:min-w-[180px] mx-auto"
                onClick={() => {
                  /* Add your loading logic here */
                }}
              >
                <div className="flex items-center">
                  {/* Normal state text */}
                  <span className="mr-2 text-[16px] sm:text-[18px]">Send</span>

                  {/* Loading animation (hidden by default) */}
                  {/* <div className="loading-animation flex items-center justify-center">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div> */}
                </div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FAQ;