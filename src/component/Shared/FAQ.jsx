
import { FaMapLocationDot } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";
import { MdOutlineWifiCalling3 } from "react-icons/md";


const FAQ = () => {
  return (
    <div className="flex items-center justify-between p-8 container mx-auto">
      {/* Left Section: Get In Touch Info */}
      <div className="w-1/2 pr-8 lg:-mt-20 roboto">
        <h1 className="text-4xl font-bold mb-4">Get In Touch</h1>
        <p className="text-gray-600 mb-6">
          Have questions about our AI Project Manager? Our team is here to assist you in finding the perfect solution for your business. Whether you're looking to streamline project management, automate workflows, or enhance team collaboration with AI-driven insights, we are here to guide you every step of the way.
        </p>
        <div className="flex items-center space-x-5 mb-4">
          <div className="text-4xl text-[#00308F]">
            <IoIosMail />
          </div>
          <div>
            <h1 className="text-xl font-semibold">Email Us</h1>
            <p className="text-gray-600">info@aiprojectmanager.com</p>
          </div>
        </div>
        <div className="flex items-center space-x-5 mb-4">
          <div className="text-4xl text-[#00308F]">
            {/* Replace with your phone icon, e.g., <IoIosPhonePortrait /> */}
            <MdOutlineWifiCalling3 />

          </div>
          <div>
            <h1 className="text-xl font-semibold">Call Us</h1>
            <p className="text-gray-600">+1 (555) 123-4567</p>
          </div>
        </div>
        <div className="flex items-center space-x-5">
          <div className="text-4xl text-[#00308F]">
            {/* Replace with your location icon, e.g., <IoIosPin /> */}
            <FaMapLocationDot />

          </div>
          <div>
            <h1 className="text-xl font-semibold">Location Us</h1>
            <p className="text-gray-600">+1 (555) 123-4567</p>
          </div>
        </div>
      </div>

      {/* Right Section: Contact Form */}
      <div className="w-1/2">
        <form className="space-y-4">
          {/* Name Fields */}
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label htmlFor="firstName" className="block text-[21px] font-bold text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="firstName"
                placeholder="First"
                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="lastName" className="block text-sm font-bold text-gray-700">
                &nbsp;
              </label>
              <input
                type="text"
                id="lastName"
                placeholder="Last"
                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-[21px]    font-bold text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="info@aiprojectmanager.com"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Number Field */}
          <div>
            <label htmlFor="number" className="block text-[21px] font-bold text-gray-700">
              Number
            </label>
            <input
              type="tel"
              id="number"
              placeholder="+1(555) 123-4567"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Message Field */}
          <div>
            <label htmlFor="message" className="block text-[21px] font-bold text-gray-700">
              Message
            </label>
            <textarea
              id="message"
              placeholder="Write Your Message Here"
              rows="4"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          {/* Send Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-700 text-white font-semibold py-3 px-6 rounded-full hover:bg-blue-800 transition duration-300"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FAQ;