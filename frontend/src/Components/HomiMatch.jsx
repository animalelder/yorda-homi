import React from 'react';
import match_img from '../Assets/match_img.png';
import match_btn from '../Assets/match_btn.png';

const HomiMatch = () => {
  return (
    <div className="px-4 py-8  mx-4 sm:mx-[10%]">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-20">
        {/* Left Image Section */}
        <div className="w-full lg:w-1/2">
          <img src={match_img} alt="Match with Roommate" className="w-full h-auto" />
        </div>

        {/* Right Content Section */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <h3 className="text-primary text-3xl font-bold mb-4">
            Match with your ideal roommate effortlessly
          </h3>
          <p className="text-gray-600 mb-6">
            Find roommates that fit your lifestyle and budget seamlessly, making shared living comfortable and stress-free.
          </p>
          <button className="bg-primary  px-6 py-3 rounded-full mb-6">
            Get Started
          </button>
          <div className="flex justify-center lg:justify-end">
            <img src={match_btn} alt="Get Started Button" className="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomiMatch;
