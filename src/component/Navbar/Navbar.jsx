import { useState, useEffect } from "react";
import img from "./image 3.png"; // Light mode logo
import img1 from "./Group (2).png"; // Dark mode logo
import { useDarkMode } from "../../context/ThemeContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("banner");
  const { darkMode, setDarkMode } = useDarkMode();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      const offset = 50; // Offset for fixed navbar
      const sectionPosition = section.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = sectionPosition - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveSection(id);
    } else {
      console.log(`Section with id "${id}" not found`);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["banner", "features", "about", "pricing", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            if (activeSection !== section) {
              setActiveSection(section);
            }
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection]);

  const getSectionLinkClass = (sectionId) => {
    const baseClasses = "transition duration-300 text-[18px] md:text-[20px] font-[600] px-3 py-2";
    if (activeSection === sectionId) {
      return `${baseClasses} text-blue-800 dark:text-gray-100 rounded-full underline underline-offset-8 decoration-2`;
    }
    return `${baseClasses} text-black dark:text-white hover:text-blue-200 dark:hover:text-blue-200`;
  };

  return (
    <div className="w-full top-0 text-black dark:text-white z-50 absolute roboto">
      <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 py-4">
        {/* Logo Section */}
        <div>
          <img
            src={darkMode ? img1 : img}
            alt="Logo"
            className="h-[30px] sm:h-[80px] md:h-[34px] w-auto"
          />
        </div>

        {/* Hamburger Menu Button */}
        <button
          className="md:hidden text-3xl text-black dark:text-white focus:outline-none z-50"
          onClick={toggleMenu}
        >
          {isOpen ? "✕" : "☰"}
        </button>

        {/* Navigation Links - Desktop */}
        <nav className="hidden md:flex items-center space-x-2">
          <a
            href="#banner"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("banner");
            }}
            className={getSectionLinkClass("banner")}
          >
            Home
          </a>
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("about");
            }}
            className={getSectionLinkClass("about")}
          >
            About
          </a>
          <a
            href="#features"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("features");
            }}
            className={getSectionLinkClass("features")}
          >
            Features
          </a>
          <a
            href="#pricing"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("pricing");
            }}
            className={getSectionLinkClass("pricing")}
          >
            Pricing
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("contact");
            }}
            className={getSectionLinkClass("contact")}
          >
            Contact
          </a>
        </nav>

        {/* Auth Buttons - Desktop */}
        <div className="hidden md:flex items-center space-x-3">
          <button
            onClick={toggleDarkMode}
            className="h-14 w-14 rounded-lg p-2 transition duration-300 cursor-pointer"
          >
            <svg
              className="fill-gray-500 block dark:hidden"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
            </svg>
            <svg
              className="fill-yellow-500 hidden dark:block"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
          <a
            href="/login"
            className="font-medium py-2 px-4 text-[#00308F] dark:text-white rounded-full duration-300 text-[18px] md:text-[20px] hover:bg-[#00308F] hover:text-white dark:hover:bg-[#00308F] cursor-pointer"
          >
            Sign In
          </a>
          <a
            href="/register"
            className="font-medium py-2 px-4 text-[#00308F] dark:text-white rounded-full duration-300 text-[18px] md:text-[20px] hover:bg-[#00308F] hover:text-white dark:hover:bg-[#00308F] cursor-pointer"
          >
            Sign Up
          </a>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="absolute top-[100px] sm:top-[120px] left-0 w-full bg-blue-500 dark:bg-gray-800 text-white flex flex-col items-center space-y-4 py-6 md:hidden z-50">
            <a
              href="#banner"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("banner");
                toggleMenu();
              }}
              className={getSectionLinkClass("banner")}
            >
              Home
            </a>
            <a
              href="#features"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("features");
                toggleMenu();
              }}
              className={getSectionLinkClass("features")}
            >
              Features
            </a>
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("about");
                toggleMenu();
              }}
              className={getSectionLinkClass("about")}
            >
              About
            </a>
            <a
              href="#pricing"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("pricing");
                toggleMenu();
              }}
              className={getSectionLinkClass("pricing")}
            >
              Pricing
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("contact");
                toggleMenu();
              }}
              className={getSectionLinkClass("contact")}
            >
              Contact
            </a>
            <a
              href="/login"
              className="text-white hover:text-blue-200 transition duration-300 text-[18px] font-[600] px-3 py-2"
              onClick={toggleMenu}
            >
              Login
            </a>
            <a
              href="/register"
              className="bg-white dark:bg-gray-700 text-blue-900 dark:text-white font-medium py-2 px-4 rounded-full hover:bg-blue-50 dark:hover:bg-gray-600 transition duration-300 text-[18px]"
              onClick={toggleMenu}
            >
              Sign Up
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;