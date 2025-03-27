import { useState } from "react";
import img from "./Abstract Background.png";
import "../Shared/banner.css";
import svg from "./Component 25.svg";

const Banner = () => {
  return (
    <div
      className="relative w-full h-[500px] lg:min-h-screen md:min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${img})`,
      }}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6 roboto ">
        <div className="text-black text-center max-w-4xl">
          <div className="relative inline-block mb-4 sm:mb-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4">
              Streamline Projects with{" "}
              <span className="relative inline-block px-1 sm:px-2">
                AI
                <div className="absolute top-1 left-2 right-0 bottom-0 -m-2 sm:-m-3">
                  <div className="relative w-[60px] h-[60px] sm:w-[85px] sm:h-[85px]">
                    {/* <div className="absolute inset-0 rounded-full border-2 border-white/30"></div>
                    <div className="dot-animation absolute w-2 h-2 sm:w-3 sm:h-3 bg-blue-700 rounded-full"></div> */}
                  </div>
                </div>
              </span>{" "}
              Intelligence
            </h1>
          </div>

          <p className="text-base sm:text-lg md:text-xl mb-8 sm:mb-10 max-w-md sm:max-w-lg md:max-w-2xl mx-auto">
            Our AI-powered Project Manager automates workflows, predicts risks, and optimizes resources to ensure project success.
          </p>

          {/* Updated Button with Loading Animation */}
          <button
            className="bg-blue-900 hover:bg-blue-800 text-white font-medium py-2 sm:py-3 px-6 sm:px-8 rounded-full flex items-center justify-center min-w-[150px] sm:min-w-[180px] mx-auto"
            onClick={() => {
              /* Add your loading logic here */
            }}
          >
            <div className="flex items-center">
              {/* Normal state text */}
              <span className="mr-2 text-[16px] sm:text-[18px]">Get started</span>

              {/* Loading animation (hidden by default) */}
              <div className="loading-animation flex items-center justify-center">
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
};

export default Banner;