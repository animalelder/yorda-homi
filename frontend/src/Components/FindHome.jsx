import React, { useState } from "react";
import home1 from "../Assets/home1.png";
import home2 from "../Assets/home2.png";
import home3 from "../Assets/home3.png";
import live_listing from "../Assets/Live_Listing.png";

const FindHome = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const listings = [
    {
      bg: home1,
      title: "Apartment in Toronto",
      description: "Region Home apartment",
      price: "$5,300/m",
    },
    {
      bg: home2,
      title: "Condo in Toronto",
      description: "Resource Home apartment",
      price: "$8,500/m",
    },
    {
      bg: home3,
      title: "Condo in Toronto",
      description: "Region Home apartment",
      price: "$5,300/m",
    },
  ];

  return (
    <div className="px-4 py-8 bg-primaryLight">
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-4xl font-bold mb-4 text-center">
          Find your Home with <span className="text-primary">homi</span>
        </h2>
        <p className="text-gray-600 mb-6 w-full md:w-[1020px] text-center">
          Discover the ease of finding your perfect space with Homi. Whether
          you're searching for a cozy apartment or the ideal roommate, our
          platform connects you with trusted listings, tailored matches, and
          seamless communication—all in one place. Your next home is just a few
          clicks away!
        </p>
        <button className="bg-buttonRed text-white rounded-full px-6 py-2 mb-8">
          Browse Now
        </button>
      </div>

      {/* Display Listings */}
      <div className="flex flex-wrap justify-center items-center gap-5">
        {listings.map((item, index) => (
          <div
            key={index}
            onClick={() => setActiveIndex(index)} // Set active index when image is clicked
            className={`relative bg-cover bg-center rounded-2xl overflow-hidden shadow-md w-full sm:w-[320px] md:w-[320px] lg:w-[320px] cursor-pointer`}
            style={{
              backgroundImage: `url(${item.bg})`,
              height: "400px",
            }}
          >
            <img
              src={live_listing}
              alt="Live Listing"
              className="absolute top-[-60px] left-4 w-48 h-48 object-contain"
            />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white rounded-2xl p-4 w-[90%]">
              <p className="font-semibold">{item.title}</p>
              <span className="block text-gray-600 text-sm">
                {item.description}
              </span>
              <span className="block font-bold">{item.price}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Carousel Dots */}
      <div className="flex justify-center mt-4">
        {listings.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`w-3 h-3 mx-2 rounded-full ${activeIndex === index ? "bg-primary" : "bg-gray-400"}`}
          />
        ))}
      </div>
    </div>
  );
};

export default FindHome;
