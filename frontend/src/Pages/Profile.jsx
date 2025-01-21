import React from 'react';
import profile_bg from '../Assets/profile_bg.png';
import home_icon from '../Assets/home_icon.png';
import message_icon from '../Assets/message_icon.png';
import add_icon from '../Assets/add_icon.png';
import setting_icon from '../Assets/setting_icon.png';
import profile_icon from '../Assets/profile_icon.png';
import location_icon from '../Assets/location_icon.png';
import tenant_img from '../Assets/tenant_img.png';
import rental1 from '../Assets/rental1.png';
import rental2 from '../Assets/rental2.png';
import rental3 from '../Assets/rental3.png';
import rental4 from '../Assets/rental4.png';
import rental5 from '../Assets/rental5.png';
import rental6 from '../Assets/rental6.png';
import rental7 from '../Assets/rental7.png';
import rental8 from '../Assets/rental8.png';

const Profile = () => {
  return (
    <div className="flex flex-col items-center ">
      <img src={profile_bg} alt="Profile Background" className="w-full" />
      <div className="flex flex-col lg:flex-row gap-4 p-4 w-full">
        {/* Sidebar Icons */}
        <div className="hidden lg:flex lg:flex-col items-center lg:items-start gap-4 w-full justify-center lg:w-[250px] ">
          <img src={home_icon} alt="Home" className="w-6 h-6 sm:w-7 sm:h-7 cursor-pointer hover:bg-gray-100 hover:rounded-full" />
          <img src={message_icon} alt="Message" className="w-6 h-6 sm:w-7 sm:h-7 cursor-pointer hover:bg-primaryLight hover:rounded-3xl" />
          <img src={add_icon} alt="Add" className="w-6 h-6 sm:w-7 sm:h-7 cursor-pointer hover:bg-primaryLight hover:rounded-3xl" />
          <img src={setting_icon} alt="Settings" className="w-6 h-6 sm:w-7 sm:h-7 cursor-pointer hover:bg-primaryLight hover:rounded-3xl" />
          <img src={profile_icon} alt="Profile" className="w-6 h-6 sm:w-7 sm:h-7 cursor-pointer hover:bg-primaryLight hover:rounded-3xl" />
        </div>

        {/* Tenant Information */}
        <div className="relative -mt-20 sm:-mt-40 -ml-2 sm:-ml-4">
          <div className="flex flex-col items-center text-center gap-4 rounded-tl-full rounded-tr-full shadow-2xl bg-white w-[260px] sm:w-[300px] min-h-[360px] sm:min-h-[400px] pt-7">
            <div className="h-36 w-36 sm:h-40 sm:w-40 rounded-full">
              <img src={tenant_img} alt="Tenant" className="w-full h-full rounded-full" />
            </div>
            <h4 className="text-lg sm:text-xl font-semibold">Melisa Peters</h4>
            <p className="text-gray-700 text-sm">Interior Designer</p>
            <div className="flex items-center gap-2 text-gray-500">
              <img src={location_icon} alt="Location" className="w-4 h-4 sm:w-5 sm:h-5" />
              <p className="text-xs sm:text-sm">Toronto, Canada</p>
            </div>
            <div className="flex gap-4 w-full px-4">
              <button className="bg-blue-500 text-white rounded-lg hover:bg-blue-600 px-4 py-2 text-sm sm:text-base w-full">
                Edit Profile
              </button>
              <button className="bg-blue-500 text-white rounded-lg hover:bg-blue-600 px-4 py-2 text-sm sm:text-base w-full">
                Add HOMI
              </button>
            </div>
          </div>
        </div>

        {/* Rental Images */}
        <div className="flex-2 w-full lg:w-auto">
          <div className="flex gap-6 text-gray-600 mb-4">
            <p className="font-semibold">Rental List</p>
            <p className="font-semibold text-gray-400">FAVS</p>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:gap-4 sm:grid-cols-3 lg:grid-cols-4">
            <img src={rental1} alt="Rental 1" className="rounded-lg" />
            <img src={rental2} alt="Rental 2" className="rounded-lg" />
            <img src={rental3} alt="Rental 3" className="rounded-lg" />
            <img src={rental4} alt="Rental 4" className="rounded-lg" />
            <img src={rental5} alt="Rental 5" className="rounded-lg" />
            <img src={rental6} alt="Rental 6" className="rounded-lg" />
            <img src={rental7} alt="Rental 7" className="rounded-lg" />
            <img src={rental8} alt="Rental 8" className="rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
