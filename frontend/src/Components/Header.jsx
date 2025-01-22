import React from 'react';
import property1 from '../Assets/property1.png';
import property2 from '../Assets/property2.png';
import property3 from '../Assets/property3.png';
import home4 from '../Assets/home4.png';
import home5 from '../Assets/home5.png';
import home6 from '../Assets/home6.png';
import home7 from '../Assets/home7.png';
import home8 from '../Assets/home8.png';
import home9 from '../Assets/home9.png';
import live_listing from '../Assets/Live_Listing.png';

const PropertyListing = () => {
  const listings = [
    {
      bg: home4,
      title: "Apartment in Toronto, Canada",
      description: "Region Home Apartment",
      price: "$5,300/m",
    },
    {
      bg: home5,
      title: "Condo in Toronto",
      description: "Resource Home apartment",
      price: "$8,500/m",
    },
    {
      bg: home6,
      title: "Duplex in Toronto, Canada",
      description: "Region Home apartment",
      price: "$8,300/m",
    },
    {
      bg: home7,
      title: "Duplex in Toronto, Canada",
      description: "Region Home apartment",
      price: "$8,300/m",
    },
    {
      bg: home8,
      title: "Duplex in Toronto, Canada",
      description: "Region Home apartment",
      price: "$8,300/m",
    },
    {
      bg: home9,
      title: "Condo in Toronto, Canada",
      description: "Region Home apartment",
      price: "$9,500/m",
    },
  ];

  return (
    <div className="bg-gradient-to-b from-white to-skyBlue min-h-screen">
      <div className=" mx-4 sm:mx-[10%]">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <h3 className="text-primary text-2xl sm:text-3xl font-semibold mb-4">
          Discover a World of Possibilities
        </h3>
        <p className="text-sm text-gray-600 mb-8">
          Our portfolio of properties is as diverse as your dreams. Explore the following categories to find the perfect property that resonates with your vision of home.
        </p>

        {/* Featured Properties */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[property1, property2, property3].map((property, index) => (
            <div key={index} className="p-4 bg-white rounded-lg shadow-md w-full max-w-sm">
              <img src={property} alt={`Property ${index + 1}`} className="w-full rounded-lg" />
              <p className="bg-primary text-[14px] rounded-full px-2 py-1 mt-2 inline-block">
                {index === 0 ? "Urban Living - Heart of Toronto" :
                  index === 1 ? "Urban Oasis - Life in the Heart of the City" :
                  "City Charm - Enjoy the City's Lights"}
              </p>
              <h4 className="font-bold text-lg mt-3">
                {index === 0 ? "Toronto Modern Apartment" :
                  index === 1 ? "Metropolitan Haven" :
                  "Rustic Retreat Cottage"}
              </h4>
              <p className="text-gray-600 text-sm mt-2">
                {index === 0 ? "Experience the vibrant city life with this beautifully designed modern apartment located in the heart of Toronto..."
                  : index === 1 ? "Immerse yourself in the energy of the city. This modern apartment in the heart..."
                  : "Find tranquility in the countryside. This charming cottage is nestled amidst rolling hills..."}
                <a href="#" className="text-primaryBlue ml-1">Read More</a>
              </p>
              <div className="flex items-center justify-between mt-4">
                <div>
                  <span className="text-gray-400 text-sm">Price</span>
                  <p className="font-bold text-lg">$1,250</p>
                </div>
                <button className="rounded-lg bg-primary px-4 py-2 hover:bg-primaryLight">
                  View Property Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <hr className="border-t border-red-600 h-[1px] my-6 w-[80%] mx-auto" />

      {/* Listings Section */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((item, index) => (
            <div
              key={index}
              className="relative bg-cover bg-center rounded-lg overflow-hidden shadow-md w-full cursor-pointer"
              style={{ backgroundImage: `url(${item.bg})`, height: "400px" }}
            >
              <img
                src={live_listing}
                alt="Live Listing"
                className="absolute top-[-60px] left-4 w-48 h-48 object-contain"
              />
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white rounded-2xl p-4 w-[90%]">
                <p className="font-semibold">{item.title}</p>
                <span className="block text-gray-600 text-sm">{item.description}</span>
                <span className="block font-bold">{item.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
};

export default PropertyListing;
