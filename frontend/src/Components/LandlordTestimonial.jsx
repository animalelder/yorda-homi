import React from 'react';
import landlord_img from '../Assets/landlord_img.png';
import Joshua from '../Assets/Joshua.png';
import Nora from '../Assets/Nora.png';

const LandlordTestimonial = () => {
  return (
    <div className="py-10 px-4 sm:px-6 lg:px-20 mb-[170px]">
      <div className="text-center mb-28">
        <h3 className="text-2xl  sm:text-3xl font-semibold text-gray-800">
          What people say about us
        </h3>
      </div>
      <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-10">
        {/* Testimonial 1 */}
        <div className="shadow-xl bg-white rounded-bl-3xl rounded-br-3xl p-4 max-w-[370px] h-auto lg:mt-44">
          <h4 className="text-lg font-medium text-gray-700 mb-2">Testimonial</h4>
          <hr className="border-gray-300 mb-4" />
          <div>
            <div className="flex gap-4">
              <img
                src={Joshua}
                alt="Joshua"
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className=''>
                <p className="font-medium text-gray-800">Joshua</p>
                <span className="text-sm text-gray-500">Just Now</span>
                </div>
            </div>
            <p className="mt-2 text-gray-600 text-sm">
              "Listing my property on Homi was straightforward, and I started
              getting inquiries within hours. The in-app chat made tenant
              communication so easy and professional."
            </p>
          </div>
        </div>

        {/* Center Image */}
        <div className="relative">
          <img
            src={landlord_img}
            alt="Landlord"
            className=" rounded-lg object-cover"
          />
          {/* Carousel Dots */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <div className="w-3 h-3 bg-white rounded-full"></div>
            <div className="w-3 h-3 bg-white rounded-full"></div>
          </div>
        </div>

        {/* Testimonial 2 */}
        <div className="shadow-xl bg-white rounded-bl-3xl rounded-br-3xl p-4 max-w-[370px] h-auto lg:mt-[-300px]">
          <h4 className="text-lg font-medium text-gray-700 mb-2">Testimonial</h4>
          <hr className="border-gray-300 mb-4" />
          <div>
            <div className="flex gap-4">
              <img
                src={Nora}
                alt="Nora"
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className=''>
                <p className="font-medium text-gray-800">Nora</p>
                <span className="text-sm text-gray-500">Just Now</span>
              </div>
            </div>
            <p className="mt-2 text-gray-600 text-sm">
              "With Homi, I didn't just find tenants faster, I found the right
              tenants. The verification process gave me peace of mind, and
              payments were hassle-free."
            </p>
          </div>
        </div>
      </div>

{/* Landlords Header */}
<div className="mt-[-200px] flex justify-end">
  <h3 className="text-lg font-bold text-gray-800 lg:mr-[25%] md:mr-[20%] sm:mr-[10%]">
    Landlords
  </h3>
</div>


    </div>
  );
};

export default LandlordTestimonial;
