

import img from "../Shared/image_1__1_-removebg-preview 1.png"
import img1 from "../Shared/icon_shapes_93.png"

const Footer = () => {
  return (
    <footer className="bg-[#1a2a44] text-white py-12">
      <div className="max-w-[170vh] mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo and Tagline */}
        <div>
          <div className="flex items-center mb-4">
            
            <div className="flex items-center space-x-2">
            <img src={img1}className="h-12 "  alt="" />
            <img src={img}className="h-12 "  alt="" />
            </div>
          </div>
          <p className="text-gray-400">
            AI-Powered Project Management for <br /> Smarter Teams
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-gray-400 hover:text-white transition">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white transition">
                Features
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white transition">
                Pricing
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white transition">
                Testimonials
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white transition">
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
              <a href="#" className="text-gray-400 hover:text-white transition">
                Help Center
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white transition">
                FAQs
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white transition">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Us */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
          <ul className="space-y-2">
            <li className="flex items-center">
              <span className="mr-2">✉️</span>
              <a href="mailto:info@projectxpai.com" className="text-gray-400 hover:text-white transition">
                info@projectxpai.com
              </a>
            </li>
            <li className="flex items-center">
              <span className="mr-2">📞</span>
              <a href="tel:+880123456789" className="text-gray-400 hover:text-white transition">
                +880 123 456 789
              </a>
            </li>
            <li className="flex items-center">
              <span className="mr-2">📍</span>
              <span className="text-gray-400">Dharmond, Dhaka</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-500 mt-8">
        © 2023 Your Brand Name. All rights reserved.
      </div>
    </footer>
  );
};



export default Footer;
