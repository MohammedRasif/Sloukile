import { useDarkMode } from "../../context/ThemeContext"; // Import useDarkMode
import img from "../Navbar/image 3.png"; // Light mode logo
import img1 from "../Navbar/Group (2).png"; // Dark mode logo
import { FaMapLocationDot } from "react-icons/fa6";
import { MdOutlineWifiCalling3 } from "react-icons/md";
import { IoMdMail } from "react-icons/io";

const Footer = () => {
  const { darkMode } = useDarkMode(); // Get darkMode state from context

  return (
    <footer className="bg-[#30476D] dark:bg-[#1E232E] text-white py-12">
      <div className="max-w-[170vh] mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo and Tagline */}
        <div>
          <div className="flex items-center mb-4">
            <div className="flex items-center space-x-2">
              <img
                src={darkMode ? img1 : img} // Conditionally render img1 in dark mode, img in light mode
                className="h-12"
                alt="Logo"
              />
            </div>
          </div>
          <p className="text-gray-200">
            AI-Powered Project Management for <br /> Smarter Teams
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-gray-200 hover:text-white transition">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-200 hover:text-white transition">
                Features
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-200 hover:text-white transition">
                Pricing
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-200 hover:text-white transition">
                Testimonials
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-200 hover:text-white transition">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Information */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Information</h4>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-gray-200 hover:text-white transition">
                Help Center
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-200 hover:text-white transition">
                FAQs
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-200 hover:text-white transition">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Us */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
          <ul className="space-y-2">
            <li className="flex ">
              <span className="mr-2 text-4xl md:mt-2"><IoMdMail />
              </span>
              <div>
              <a href="mailto:info@projectxpai.com" className="text-gray-200 text-xl hover:text-white transition">
                info@projectxpai.com
              </a>
              <p className="text-[12px] text-gray-400">info@aiprojectmanager.com</p>
              </div>
            </li>
            <li className="flex ">
              <span className="mr-2 text-4xl md:mt-2"><MdOutlineWifiCalling3 /></span>
              <div>
              <a href="mailto:info@projectxpai.com" className="text-gray-200 text-xl hover:text-white transition">
              Call Us
              </a>
              <p className="text-[12px] text-gray-400">+1 (555) 123-4567</p>
              </div>
            </li>
            <li className="flex ">
              <span className="mr-2 text-4xl md:mt-2"><FaMapLocationDot/></span>
              <div>
              <a href="mailto:info@projectxpai.com" className="text-gray-200 text-xl hover:text-white transition">
              location us
              </a>
              <p className="text-[12px] text-gray-400">Dhanmondi. Dhaka</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-500 dark:text-gray-400 mt-8">
        © 2023 Your Brand Name. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;