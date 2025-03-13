import { NavLink } from "react-router-dom";
import img from "./image_1__1_-removebg-preview 1.png";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    console.log("click buttonb", !isOpen); // Debug state change
  };

  console.log("isOpen state:", isOpen); // Debug render

  return (
    <div className="absolute top-0 left-0 w-full bg-transparent text-white z-50">
      <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 py-4">
        {/* Logo Section */}
        <div>
          <img
            src={img}
            alt="Logo"
            className="h-[60px] sm:h-[80px] md:h-[105.67px] w-auto"
          />
        </div>

        {/* Hamburger Menu Button */}
        <button
          className="md:hidden text-3xl focus:outline-none z-50"
          onClick={toggleMenu}
        >
          {isOpen ? "✕" : "☰"}
        </button>

        {/* Navigation Links - Desktop */}
        <nav className="hidden md:flex items-center space-x-6">
          <NavLink
            to="/"
            className="hover:text-[#CBB702] transition duration-300 text-lg md:text-[22.5px] font-[600]"
          >
            Home
          </NavLink>
          <NavLink
            to="/features"
            className="hover:text-[#CBB702] transition duration-300 text-lg md:text-[22.5px] font-[600]"
          >
            Features
          </NavLink>
          <NavLink
            to="/pricing"
            className="hover:text-[#CBB702] transition duration-300 text-lg md:text-[22.5px] font-[600]"
          >
            Pricing
          </NavLink>
          <NavLink
            to="/contact"
            className="hover:text-[#CBB702] transition duration-300 text-lg md:text-[22.5px] font-[600]"
          >
            Contact
          </NavLink>
        </nav>

        {/* Auth Buttons - Desktop */}
        <div className="hidden md:flex items-center space-x-4 text-lg md:text-[22.5px]">
          <NavLink
            to="/login"
            className="hover:text-[#CBB702] transition duration-300"
          >
            SIGN IN
          </NavLink>
         <NavLink to="/register">
         <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition duration-300 font-[600] cursor-pointer">
            Register
          </button>
         </NavLink>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="absolute top-[100px] sm:top-[120px] left-0 w-full bg-blue-900 text-white flex flex-col items-center space-y-4 py-6 md:hidden z-50">
            <NavLink
              to="/"
              className="hover:text-[#CBB702] transition duration-300 text-lg font-[600]"
              onClick={toggleMenu}
            >
              Home
            </NavLink>
            <NavLink
              to="/features"
              className="hover:text-[#CBB702] transition duration-300 text-lg font-[600]"
              onClick={toggleMenu}
            >
              Features
            </NavLink>
            <NavLink
              to="/pricing"
              className="hover:text-[#CBB702] transition duration-300 text-lg font-[600]"
              onClick={toggleMenu}
            >
              Pricing
            </NavLink>
            <NavLink
              to="/contact"
              className="hover:text-[#CBB702] transition duration-300 text-lg font-[600]"
              onClick={toggleMenu}
            >
              Contact
            </NavLink>
            <NavLink
              to="/login"
              className="hover:text-[#CBB702] transition duration-300 text-lg"
              onClick={toggleMenu}
            >
              SIGN IN
            </NavLink>
            <NavLink to="/register">
            <button
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition duration-300 text-lg font-[600] cursor-pointer"
              onClick={toggleMenu}
            >
              Register
            </button>
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;