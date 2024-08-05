import React from "react";
import { FaPenFancy } from "react-icons/fa";

function Banner() {
  return (
    <div className="m-3 bg-gradient-to-r from-[#444772] via-[#474f99] to-[#5974ec] rounded-lg p-6 flex flex-col sm:flex-row items-center my-8 shadow-xl">
      <div className="flex items-center space-x-4">
        <FaPenFancy className="text-[#50aaa3] text-4xl sm:text-6xl animate-bounce" />
        <div className="ml-4">
          <h1 className="text-[#50aaa3] text-3xl sm:text-4xl font-bold font-mono">
            Hello scribe..!
          </h1>
          <p className="text-white text-lg sm:text-xl font-semibold font-mono mt-2">
            Start Scribbling Success - Note Now Your Key to Mastery!
            <br /> Let's Begin Your Journey!
          </p>
        </div>
      </div>
      <div className="mt-6 sm:mt-0 sm:ml-auto">
        <button className="bg-[#50aaa3] hover:bg-[#439e95] text-white font-bold py-2 px-6 rounded-lg transition duration-300 transform hover:scale-105">
          Get Started
        </button>
      </div>
    </div>
  );
}

export default Banner;
