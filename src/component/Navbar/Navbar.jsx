import { useState, useEffect } from "react";
import img from "./image 3.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("banner");

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
      return `${baseClasses} text-blue-800 rounded-full underline underline-offset-8 decoration-2`;
    }
    return `${baseClasses} text-black hover:text-blue-200`;
  };

  return (
    <div className="w-full top-0 text-black z-50 absolute roboto">
      <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 py-4">
        {/* Logo Section */}
        <div>
          <img src={img} alt="Logo" className="h-[30px] sm:h-[80px] md:h-[34px] w-auto" />
        </div>

        {/* Hamburger Menu Button */}
        <button
          className="md:hidden text-3xl text-black focus:outline-none z-50"
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
          <a
            href="/login"
            className="font-medium py-2 px-4 text-[#00308F] rounded-full duration-300 text-[18px] md:text-[20px] hover:bg-[#00308F] hover:text-white cursor-pointer"
          >
            Sign In
          </a>
          <a
            href="/register"
            className="font-medium py-2 px-4 text-[#00308F] rounded-full duration-300 text-[18px] md:text-[20px] hover:bg-[#00308F] hover:text-white cursor-pointer"
          >
            Sign Up
          </a>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="absolute top-[100px] sm:top-[120px] left-0 w-full bg-blue-500 text-white flex flex-col items-center space-y-4 py-6 md:hidden z-50">
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
              className="bg-white text-blue-900 font-medium py-2 px-4 rounded-full hover:bg-blue-50 transition duration-300 text-[18px]"
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