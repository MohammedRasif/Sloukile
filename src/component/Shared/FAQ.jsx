import { FaMapLocationDot } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";
import { MdOutlineWifiCalling3 } from "react-icons/md";
import "../Shared/banner.css";
import img from "./Group 2147225525.png";

const FAQ = () => {
  return (
    <div id="contact" className="bg-[#FDFAF6] dark:bg-[#1E232E] w-full relative">
      <img
        src={img}
        alt=""
        className="absolute h-[500px] top-52 left-[60vh] hidden md:block"
      />
      <div className="flex flex-col lg:flex-row items-center justify-between p-4 sm:p-6 lg:p-8 container mx-auto">
        {/* Left Section: Get In Touch Info */}
        <div className="w-full lg:w-1/2 lg:pr-8 lg:-mt-20 roboto mb-8 lg:mb-0">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Get In Touch
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base lg:text-lg mb-6">
            Have questions about our AI Project Manager? Our team is here to assist you in finding the perfect solution for your business. Whether you're looking to streamline project management, automate workflows, or enhance team collaboration with AI-driven insights, we are here to guide you every step of the way.
          </p>
          <div className="flex items-center space-x-4 sm:space-x-5 mb-4">
            <div className="text-3xl sm:text-4xl text-[#00308F] dark:text-blue-400">
              <IoIosMail />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100">
                Email Us
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                info@aiprojectmanager.com
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4 sm:space-x-5 mb-4">
            <div className="text-3xl sm:text-4xl text-[#00308F] dark:text-blue-400">
              <MdOutlineWifiCalling3 />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100">
                Call Us
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                +1 (555) 123-4567
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4 sm:space-x-5">
            <div className="text-3xl sm:text-4xl text-[#00308F] dark:text-blue-400">
              <FaMapLocationDot />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100">
                Location Us
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                +1 (555) 123-4567
              </p>
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
                  className="block text-lg sm:text-xl lg:text-[21px] font-bold text-gray-700 dark:text-gray-300"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  placeholder="First"
                  className="mt-1 block w-full p-2 sm:p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                />
              </div>
              <div className="w-full sm:w-1/2 lg:mt-7">
                <label
                  htmlFor="lastName"
                  className="block text-lg sm:text-xl lg:text-[21px] font-bold text-gray-700 dark:text-gray-300 invisible sm:visible"
                >
                  {/* Empty label */}
                </label>
                <input
                  type="text"
                  id="lastName"
                  placeholder="Last"
                  className="mt-1 block w-full p-2 sm:p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-lg sm:text-xl lg:text-[21px] font-bold text-gray-700 dark:text-gray-300"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="info@aiprojectmanager.com"
                className="mt-1 block w-full p-2 sm:p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              />
            </div>

            {/* Number Field */}
            <div>
              <label
                htmlFor="number"
                className="block text-lg sm:text-xl lg:text-[21px] font-bold text-gray-700 dark:text-gray-300"
              >
                Number
              </label>
              <input
                type="tel"
                id="number"
                placeholder="+1(555) 123-4567"
                className="mt-1 block w-full p-2 sm:p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              />
            </div>

            {/* Message Field */}
            <div>
              <label
                htmlFor="message"
                className="block text-lg sm:text-xl lg:text-[21px] font-bold text-gray-700 dark:text-gray-300"
              >
                Message
              </label>
              <textarea
                id="message"
                placeholder="Write Your Message Here"
                rows="4"
                className="mt-1 block w-full p-2 sm:p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              ></textarea>
            </div>

            {/* Send Button */}
            <div className="">
              <button
                className="bg-blue-900 dark:bg-blue-700 hover:bg-blue-800 dark:hover:bg-blue-600 text-white font-medium sm:py-3 px-6 sm:px-8 rounded-full lg:mt-10 min-w-[150px] sm:min-w-[180px] mx-auto"
                onClick={() => {
                  /* Add your loading logic here */
                }}
              >
                <div className="flex items-center justify-center">
                  <span className="mr-2 text-[16px] sm:text-[18px]">Send</span>
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