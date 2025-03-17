import { NavLink } from "react-router-dom";
import img from "../Shared/image_1__1_-removebg-preview 1.png";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("home");

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Smooth scroll to the section
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      const offset = 50; // Offset for fixed navbar
      const sectionPosition =
        section.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = sectionPosition - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const handleNavClick = (id) => {
    setActiveLink(id);
    scrollToSection(id);
  };

  const getNavLinkClass = ({ isActive }) =>
    isActive
      ? "text-[#00BF63] transition duration-300 text-[18px] md:text-[20px] font-[600]" // Active link style
      : "text-white hover:text-[#00BF63] transition duration-300 text-[18px] md:text-[20px] font-[600]"; // Inactive link style with hover

  // Set 'home' as default active link when the page loads
  useEffect(() => {
    setActiveLink("home");
  }, []);

  return (
    <div className="w-full bg-[#000524] text-white z-50">
      <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 py-4">
        {/* Logo Section */}
        <div>
          <img
            src={img}
            alt="Logo"
            className="h-[60px] sm:h-[80px] md:h-[34px] w-auto"
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
            to="#banner"
            onClick={() => handleNavClick("banner")}
            className={getNavLinkClass}
          >
            Home
          </NavLink>
          <NavLink
            to="#features"
            onClick={() => handleNavClick("features")}
            className={getNavLinkClass}
          >
            Features
          </NavLink>
          <NavLink
            to="#pricing"
            onClick={() => handleNavClick("pricing")}
            className={getNavLinkClass}
          >
            Pricing
          </NavLink>
          <NavLink
            to="#contact"
            onClick={() => handleNavClick("contact")}
            className={getNavLinkClass}
          >
            Contact
          </NavLink>
        </nav>

        {/* Auth Buttons - Desktop */}
        <div className="hidden md:flex items-center space-x-4 text-[18px] md:text-[22.5px]">
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
            <NavLink
              to="#home"
              className={getNavLinkClass}
              onClick={() => handleNavClick("home")}
            >
              Home
            </NavLink>
            <NavLink
              to="#features"
              className={getNavLinkClass}
              onClick={() => handleNavClick("features")}
            >
              Features
            </NavLink>
            <NavLink
              to="#pricing"
              className={getNavLinkClass}
              onClick={() => handleNavClick("pricing")}
            >
              Pricing
            </NavLink>
            <NavLink
              to="#contact"
              className={getNavLinkClass}
              onClick={() => handleNavClick("contact")}
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