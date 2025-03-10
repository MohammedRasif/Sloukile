"use client";

import img from "./Rectangle.png";
import img1 from "./image_1__1_-removebg-preview 1.png";

const Footer = () => {
  return (
    <div className="relative w-full overflow-hidden lg:h-[700px] h-[700px]">
      {/* Background Image */}
      <div className="absolute inset-0"> {/* Spans full viewport */}
        <img
          src={img}
          className="w-full lg:h-[700px] h-[700px]" // object-contain for natural size on md/lg
          alt="Footer background"
        />
      </div>

      {/* Overlay Content */}
      <div className="relative text-white py-8 px-4 sm:px-6 lg:px-8 mt-40 sm:mt-32 lg:mt-44">
        {/* CTA Section */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8 lg:mb-28">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">
            What are you waiting for?
          </h2>
          <button className="mt-2 sm:mt-3 lg:mt-7 bg-[#CBB702]  text-white px-3 sm:px-4 lg:px-10 py-1 sm:py-2 lg:py-3 rounded-full font-medium  transition">
            GET STARTED
          </button>
        </div>

        {/* Footer Content */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4  lg:gap-8 lg:px-20">
          {/* Left Section */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left mb-6 sm:mb-0 lg:-mt-24">
            <div className="rounded-full flex items-center justify-center">
              <img
                src={img1}
                className="w-40 sm:w-48 lg:w-60 h-32 sm:h-40 lg:h-52 lg:-pl-12"
                alt="Logo"
              />
            </div>
            <p className="mt-2 sm:mt-3 text-xs sm:text-sm lg:text-2xl opacity-80 max-w-xs sm:max-w-none">
              AI-Powered Project Management <br className="hidden sm:block lg:block" /> for
              Smarter Teams
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left lg:mt-0 md:mt-0 mt-10">
            <h3 className="text-sm sm:text-base lg:text-base font-semibold mb-2 sm:mb-3">
              Quick Links
            </h3>
            <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm lg:text-sm opacity-80">
              <li>Home</li>
              <li>Features</li>
              <li>Pricing</li>
              <li>Testimonials</li>
              <li>Contact</li>
            </ul>
          </div>

          {/* Resources */}
          <div className="mt-6 sm:mt-0 sm:ml-0 lg:ml-6 text-center sm:text-left">
            <h3 className="text-sm sm:text-base lg:text-base font-semibold mb-2 sm:mb-3">
              Resources
            </h3>
            <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm lg:text-sm opacity-80">
              <li>Help Center</li>
              <li>FAQs</li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="text-center sm:text-left mt-6 sm:mt-0">
            <h3 className="text-sm sm:text-base lg:text-base font-semibold mb-2 sm:mb-3">
              Subscribe To Our Newsletter
            </h3>
            <p className="text-xs sm:text-sm lg:text-sm opacity-80 mb-2 sm:mb-4 max-w-xs sm:max-w-none mx-auto sm:mx-0">
              Stay updated with the latest AI-powered project management tips,
              product updates, and exclusive offers.
            </p>
            <div className="hidden md:block">
            <div className="flex items-center border border-yellow-500 rounded-lg overflow-hidden mx-auto sm:mx-0 w-full max-w-xs sm:max-w-sm ">
              <input
                type="email"
                placeholder="Enter a valid email address"
                className="flex-1 px-2 sm:px-3 lg:px-4 py-1 sm:py-2 lg:py-2 text-black outline-none text-xs sm:text-sm lg:text-base"
              />
              <button className="bg-yellow-500 px-2 sm:px-3 lg:px-4 py-1 sm:py-2 lg:py-2 text-black font-medium hover:bg-yellow-600 transition text-xs sm:text-sm lg:text-base">
                Submit
              </button>
            </div>
            </div>
          </div>
          <div className="sm:hidden block">
            <div className="flex items-center  ml-7 mt-5 ">
            <input
                type="email"
                placeholder="Enter a valid email address"
                className="flex-1 px-4  border-2 border-y-amber-400 ml-5 rounded-l-full py-[2px]  "
              />
              <button className="bg-yellow-500 rounded-r-full px-2 sm:px-3 lg:px-4 py-2 sm:py-2 lg:py-2 text-black font-medium hover:bg-yellow-600 transition text-xs sm:text-sm lg:text-base">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;