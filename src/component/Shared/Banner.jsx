// import { NavLink } from "react-router-dom";
// import img from "./Decoration.png";
// import img1 from "./Illustration.png";

// const Banner = () => {
//   return (
//     <div
//     id="banner"
//     className="relative w-full -mt-28  lg:h-[115vh] md:h-[170vh] h-[130vh]">
//       {/* Background Image */}
//       <img
//         src={img}
//         className="w-full h-full object-cover"
//         alt="Background"
//       />

//       {/* Overlay Content */}
//       <div className="absolute top-0 left-0 w-full h-full flex flex-col lg:flex-row items-center justify-center text-white px-6 sm:px-8 md:px-12 lg:px-20 space-y-6 lg:space-y-0 lg:space-x-10 lg:mt-0 mt-10">
//         {/* Text Section */}
//         <div className="text-center lg:text-left space-y-5 lg:space-y-7 lg:mt-[-80px]">
//           <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold leading-tight">
//             <span className="text-[#00BF63]">AI-Powered Project <br /> Management</span> for <br /> Smarter Execution
//           </h1>
//           <p className="text-sm sm:text-base md:text-lg">
//             Say goodbye to manual planning! Use AI to automate task <br className="hidden sm:block" /> allocation, predict risks, and ensure on-time project delivery
//           </p>
//           <NavLink to="/dashboard">
//             <button className="w-[160px] sm:w-[180px] md:w-[200px] h-[40px] sm:h-[48px] font-medium rounded-full bg-[#00BF63] text-white hover:bg-green-600 transition">
//               Get Started
//             </button>
//           </NavLink>
//         </div>

//         {/* Image Section */}
//         <div className="flex justify-center lg:justify-start lg:ml-52 mt-6 lg:mt-0">
//           <img
//             src={img1}
//             alt="Overlay Image"
//             className="w-[250px] sm:w-[300px] md:w-[400px] lg:w-[650px] h-auto"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Banner;

import { useState } from "react"
import img from "./Abstract Background.png"
import "../Shared/banner.css"
import svg from "./Component 25.svg"

const Banner = () => {


  return (
    <div
      className="relative w-full min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${img})`,
      }}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
        <div className="text-black text-center max-w-4xl">
          <div className="relative inline-block mb-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Streamline Projects with{" "}
              <span className="relative inline-block px-2">
                AI
                <div className="absolute top-1 left-2 right-0 bottom-0 -m-3">
                  <div className="relative w-[85px] h-[85px]">
                    <div className="absolute inset-0 rounded-full border-2 border-white/30"></div>
                    <div className="dot-animation absolute w-3 h-3 bg-blue-700 rounded-full"></div>
                  </div>
                </div>
              </span>{" "}
              Intelligence
            </h1>
          </div>

          <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            Our AI-powered Project Manager automates workflows, predicts risks, and optimizes resources to ensure project success.
          </p>

          {/* Updated Button with Loading Animation */}
          <button
            className="bg-blue-900 hover:bg-blue-800 text-white font-medium py-3 px-8 rounded-full flex items-center justify-center min-w-[180px] mx-auto"
            onClick={() => {/* Add your loading logic here */ }}
          >
            <div className="flex items-center">
              {/* Normal state text */}
              <span className="mr-2 text-[18px]">Get started</span>


              {/* Loading animation (hidden by default) */}
              <div className="loading-animation  flex items-center justify-center left-0   ">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                
               

              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Banner;


