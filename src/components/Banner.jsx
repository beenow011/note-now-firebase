import React from "react";

function Banner() {
  return (
    <div>
      {" "}
      <div className=" m-3 bg-gradient-to-r from-[#444772] via-[#474f99] to-[#5974ec] rounded-md p-6 flex my-8">
        <div>
          <h1 className="text-start text-[#50aaa3] p-3 text-3xl font-bold font-mono">
            Hello scribe..!
          </h1>
          <p className="text-start p-3 text-lg font-bold text-white font-mono">
            Start Scribbling Success - Note Now Your Key to Mastery!"
            <br></br> Let's Begin Your Journey!
          </p>
        </div>
      </div>
    </div>
  );
}

export default Banner;
