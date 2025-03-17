import { NavLink } from "react-router-dom";
import img from "../Shared/image_1__1_-removebg-preview 1.png";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const getNavLinkClass = ({ isActive }) =>
    isActive
      ? "text-[#00BF63] transition duration-300 text-lg md:text-[22.5px] font-[600]"
      : "hover:text-[#00BF63] transition duration-300 text-lg md:text-[22.5px] font-[600]";

  return (
    <div className="top-0 left-0 w-full bg-black text-white z-50">
      <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 py-4">
        {/* Logo Section */}
        <div>
          <img
            src={img}
            alt="Logo"
            className="h-[60px] sm:h-[80px] md:h-[30px] w-auto"
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
          <NavLink to="/" className={getNavLinkClass}>
            Home
          </NavLink>
          <NavLink to="/features" className={getNavLinkClass}>
            Features
          </NavLink>
          <NavLink to="/pricing" className={getNavLinkClass}>
            Pricing
          </NavLink>
          <NavLink to="/contact" className={getNavLinkClass}>
            Contact
          </NavLink>
        </nav>

        {/* Auth Buttons - Desktop */}
        <div className="hidden md:flex items-center space-x-4 text-lg md:text-[22.5px]">
          <NavLink to="/login" className={getNavLinkClass}>
            SIGN IN
          </NavLink>
          <NavLink to="/register">
            <button className="bg-[#00BF63] hover:bg-green-700 px-4 py-2 rounded-lg transition duration-300 font-[600] cursor-pointer">
              Register
            </button>
          </NavLink>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="absolute top-[100px] sm:top-[120px] left-0 w-full bg-[#00BF63] text-white flex flex-col items-center space-y-4 py-6 md:hidden z-50">
            <NavLink to="/" className={getNavLinkClass} onClick={toggleMenu}>
              Home
            </NavLink>
            <NavLink
              to="/features"
              className={getNavLinkClass}
              onClick={toggleMenu}
            >
              Features
            </NavLink>
            <NavLink
              to="/pricing"
              className={getNavLinkClass}
              onClick={toggleMenu}
            >
              Pricing
            </NavLink>
            <NavLink
              to="/contact"
              className={getNavLinkClass}
              onClick={toggleMenu}
            >
              Contact
            </NavLink>
            <NavLink to="/login" className={getNavLinkClass} onClick={toggleMenu}>
              SIGN IN
            </NavLink>
            <NavLink to="/register">
              <button
                className="bg-[#00BF63] hover:bg-green-700 px-4 py-2 rounded-lg transition duration-300 text-lg font-[600] cursor-pointer"
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
