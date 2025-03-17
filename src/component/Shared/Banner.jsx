import { NavLink } from "react-router-dom";
import img from "./Decoration.png";
import img1 from "./Illustration.png";

const Banner = () => {
  return (
    <div
    id="banner"
    className="relative w-full  lg:h-[110vh] md:h-[170vh] h-[130vh]">
      {/* Background Image */}
      <img
        src={img}
        className="w-full h-full object-cover"
        alt="Background"
      />

      {/* Overlay Content */}
      <div className="absolute top-0 left-0 w-full h-full flex flex-col lg:flex-row items-center justify-center text-white px-6 sm:px-8 md:px-12 lg:px-20 space-y-6 lg:space-y-0 lg:space-x-10 lg:mt-0 mt-10">
        {/* Text Section */}
        <div className="text-center lg:text-left space-y-5 lg:space-y-7 lg:mt-[-80px]">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold leading-tight">
            <span className="text-[#00BF63]">AI-Powered Project <br /> Management</span> for <br /> Smarter Execution
          </h1>
          <p className="text-sm sm:text-base md:text-lg">
            Say goodbye to manual planning! Use AI to automate task <br className="hidden sm:block" /> allocation, predict risks, and ensure on-time project delivery
          </p>
          <NavLink to="/dashboard">
            <button className="w-[160px] sm:w-[180px] md:w-[200px] h-[40px] sm:h-[48px] font-medium rounded-full bg-[#00BF63] text-white hover:bg-green-600 transition">
              Get Started
            </button>
          </NavLink>
        </div>

        {/* Image Section */}
        <div className="flex justify-center lg:justify-start lg:ml-52 mt-6 lg:mt-0">
          <img
            src={img1}
            alt="Overlay Image"
            className="w-[250px] sm:w-[300px] md:w-[400px] lg:w-[550px] h-auto"
          />
        </div>
      </div>
    </div>
  );
}

export default Banner;
