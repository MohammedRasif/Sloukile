import { useState, useEffect, useRef } from "react";
import img from "./image 3.png"; // Light mode logo
import img1 from "./Group (2).png"; // Dark mode logo
import { useDarkMode } from "../../context/ThemeContext";
import { useGetProfileQuery } from "../../Redux/feature/ApiSlice";
import { GoChevronRight, GoChevronDown } from "react-icons/go";
import { FaRegCircleUser } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // Mobile menu toggle
  const [activeSection, setActiveSection] = useState("banner");
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false); // Profile dropdown toggle
  const { darkMode, setDarkMode } = useDarkMode();

  // Refs for dropdown and mobile menu
  const profileDropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Check for access token in localStorage
  const accessToken = localStorage.getItem("access_token");

  // Fetch user profile if access token exists
  const { data: profile, isLoading, isError } = useGetProfileQuery(undefined, {
    skip: !accessToken, // Skip query if no access token
  });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    window.location.href = "/login";
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

  // Close dropdown and mobile menu on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if click is outside profile dropdown
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target)
      ) {
        setIsProfileDropdownOpen(false);
      }
      // Check if click is outside mobile menu
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

        {/* Auth Buttons or Profile - Desktop */}
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

          {accessToken && profile && !isLoading && !isError ? (
            <div className="relative" ref={profileDropdownRef}>
              <button
                onClick={toggleProfileDropdown}
                className="flex items-center space-x-2 focus:outline-none cursor-pointer"
              >
                {profile.image ? (
                  <img
                    src={profile.image}
                    alt="Profile"
                    className="h-9 w-9 rounded-full object-cover"
                  />
                ) : (
                  <FaRegCircleUser className="h-9 w-9 text-gray-600 dark:text-gray-300" />
                )}
                <span className="text-[18px] md:text-[16px] font-bold text-black dark:text-white">
                  {profile.full_name}
                </span>
                {isProfileDropdownOpen ? (
                  <GoChevronDown className="h-5 w-5 text-black dark:text-white" />
                ) : (
                  <GoChevronRight className="h-5 w-5 text-black dark:text-white" />
                )}
              </button>
              {isProfileDropdownOpen && (
                <div className="absolute right-[5px] mt-3 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
                  <NavLink
                    to={profile.is_staff ? "/dashboard" : "/dashboard"}
                    className="block px-4 py-2 text-black dark:text-white hover:bg-gray-100 font-bold dark:hover:bg-gray-700 cursor-pointer"
                    onClick={() => setIsProfileDropdownOpen(false)}
                  >
                    {profile.is_staff ? "Admin Dashboard" : "User Dashboard"}
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-black dark:text-white font-bold hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div
            ref={mobileMenuRef}
            className="absolute top-[100px] sm:top-[120px] left-0 w-full bg-blue-500 dark:bg-gray-800 text-white flex flex-col items-center space-y-4 py-6 md:hidden z-50"
          >
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
            {accessToken && profile && !isLoading && !isError ? (
              <div className="relative w-full flex justify-center" ref={profileDropdownRef}>
                <button
                  onClick={toggleProfileDropdown}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  {profile.image ? (
                    <img
                      src={profile.image}
                      alt="Profile"
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  ) : (
                    <FaRegCircleUser className="h-10 w-10 text-white" />
                  )}
                  <span className="text-[18px] font-medium text-white">{profile.full_name}</span>
                  {isProfileDropdownOpen ? (
                    <GoChevronDown className="h-5 w-5 text-white" />
                  ) : (
                    <GoChevronRight className="h-5 w-5 text-white" />
                  )}
                </button>
                {isProfileDropdownOpen && (
                  <div className="mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
                    <NavLink
                      to={profile.is_staff ? "/dashboard" : "/dashboard"}
                      className="block px-4 py-2 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => {
                        setIsProfileDropdownOpen(false);
                        toggleMenu();
                      }}
                    >
                      {profile.is_staff ? "Admin Dashboard" : "User Dashboard"}
                    </NavLink>
                    <button
                      onClick={() => {
                        handleLogout();
                        toggleMenu();
                      }}
                      className="block w-full text-left px-4 py-2 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
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
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;