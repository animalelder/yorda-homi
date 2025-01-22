import React, { useState, useEffect, useRef } from 'react';
import logo from '../Assets/logo.png';
import property_bg from '../Assets/property_bg.png';
import calendar_icon from '../Assets/calendar_icon.png';
import chevron_button from '../Assets/chevron_button.png';
import home_img from '../Assets/home_img.png';
import location_img from '../Assets/location_img.png';
import property_size from '../Assets/property_size.png';
import pricing_icon from '../Assets/pricing_icon.png';

const PropertyHeader = () => {
 const [isDropdownOpen, setIsDropdownOpen] = useState(false); // For desktop dropdown
   const [isMobileNavOpen, setIsMobileNavOpen] = useState(false); // For mobile nav
   const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false); // For mobile login dropdown
   const dropdownRef = useRef(null); // Ref for the desktop dropdown menu
   const mobileDropdownRef = useRef(null); // Ref for the mobile dropdown menu
 
   // Close the dropdown menu when clicking outside (desktop)
   useEffect(() => {
     const handleClickOutside = (event) => {
       if (
         dropdownRef.current && 
         !dropdownRef.current.contains(event.target)
       ) {
         setIsDropdownOpen(false);
       }
     };
 
     document.addEventListener('mousedown', handleClickOutside);
 
     return () => {
       document.removeEventListener('mousedown', handleClickOutside);
     };
   }, []);
 
   // Close the mobile dropdown menu when clicking outside (mobile)
   useEffect(() => {
     const handleClickOutsideMobile = (event) => {
       if (
         mobileDropdownRef.current && 
         !mobileDropdownRef.current.contains(event.target)
       ) {
         setIsMobileDropdownOpen(false);
       }
     };
 
     document.addEventListener('mousedown', handleClickOutsideMobile);
 
     return () => {
       document.removeEventListener('mousedown', handleClickOutsideMobile);
     };
   }, []);
 
   return (
     <div className="relative bg-white">
       {/* Hero Section */}
       <div
         className="relative bg-cover bg-center h-screen"
         style={{ backgroundImage: `url(${property_bg})` }}
       >
         <div className="absolute top-6 left-0 w-full px-4 sm:px-12 flex items-center justify-center">
           {/* Navbar */}
           <nav className="flex justify-between items-center py-4 px-6 bg-white rounded-full shadow-lg w-full max-w-6xl z-50">
             {/* Logo */}
             <div>
               <img src={logo} alt="Logo" className="h-10" />
             </div>
 
             {/* Navigation Links */}
             <ul className="hidden sm:flex space-x-8 text-lg text-gray-700">
               <li className="hover:text-primary cursor-pointer">Home</li>
               <li className="hover:text-primary cursor-pointer">Properties</li>
               <li className="hover:text-primary cursor-pointer">Homi Match</li>
               <li className="hover:text-primary cursor-pointer">About Us</li>
             </ul>
 
             {/* Desktop Login Button with Dropdown */}
             <div
               className="relative hidden sm:flex space-x-4"
               ref={dropdownRef}
             >
               <button
                 className="bg-primary hover:bg-white text-gray-700 px-6 py-2 rounded-full cursor-pointer"
                 onClick={() => setIsDropdownOpen(!isDropdownOpen)}
               >
                 Login
               </button>
 
               {/* Dropdown Menu */}
               {isDropdownOpen && (
                 <div className="absolute top-full mt-2 right-1 bg-white shadow-lg rounded-md w-40 z-50">
                   <ul className="space-y-2 text-sm text-gray-700">
                     <li className="cursor-pointer block px-4 py-2 hover:bg-primary hover:rounded-full hover:text-white">
                       Rental
                     </li>
                     <li className="cursor-pointer block px-4 py-2 hover:bg-primary hover:rounded-full hover:text-white">
                       Landlord
                     </li>
                   </ul>
                 </div>
               )}
             </div>
 
             {/* Mobile Navigation */}
             <div className="sm:hidden">
               {isMobileNavOpen ? (
                 <button
                   onClick={() => setIsMobileNavOpen(false)}
                   className="text-2xl text-gray-700"
                 >
                   &times; {/* Close Icon */}
                 </button>
               ) : (
                 <button
                   onClick={() => setIsMobileNavOpen(true)}
                   className="text-2xl text-gray-700"
                 >
                   &#9776; {/* Hamburger Icon */}
                 </button>
               )}
             </div>
           </nav>
 
           {/* Mobile Nav Links */}
           {isMobileNavOpen && (
             <div className="absolute top-0 left-0 w-full h-[60vh] bg-white z-40 flex flex-col items-center justify-center">
               <ul className="space-y-6 text-lg text-gray-700 mb-8">
                 <li className="hover:text-primary cursor-pointer">Home</li>
                 <li className="hover:text-primary cursor-pointer">Properties</li>
                 <li className="hover:text-primary cursor-pointer">Homi Match</li>
                 <li className="hover:text-primary cursor-pointer">About Us</li>
               </ul>
               <div className="relative">
                 <button
                   onClick={() =>
                     setIsMobileDropdownOpen(!isMobileDropdownOpen)
                   }
                   className="bg-primary hover:bg-primaryLight text-white px-6 py-3 rounded-full text-lg cursor-pointer"
                 >
                   Login
                 </button>
 
                 {/* Mobile Dropdown Menu */}
                 {isMobileDropdownOpen && (
                   <div
                     className="absolute top-full mt-2 left-0 bg-white shadow-lg rounded-md w-40 z-50"
                     ref={mobileDropdownRef}
                   >
                     <ul className="space-y-2 text-sm text-gray-700">
                       <li className="cursor-pointer block px-4 py-2 hover:bg-primary hover:rounded-full hover:text-white">
                         Rental
                       </li>
                       <li className="cursor-pointer block px-4 py-2 hover:bg-primary hover:rounded-full hover:text-white">
                         Landlord
                       </li>
                     </ul>
                   </div>
                 )}
               </div>
             </div>
           )}
 
          
 
         
         </div>
 
         {/* Hero Content */}
         <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
  {/* Search Input and Find Property Button */}
  <div className="flex w-full max-w-lg">
    <div className="relative w-full bg-gray-100 rounded-lg p-2">
      <input
        type="text"
        placeholder="Search for a Property"
        className="w-full border rounded-lg py-2 px-4 pr-20" 
      />
      <button
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-primaryBlue text-white py-1 px-4 rounded-lg"
      >
        Find Property
      </button>
    </div>
  </div>

  {/* Other Input Fields */}
  <div className="hidden lg:flex  gap-2 mt-3 bg-gray-100 rounded-lg p-2">
    {/* Location Input */}
    <div className="relative flex items-center w-full max-w-xs">
      <img
        src={location_img}
        alt="Location"
        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
      />
      <input
        type="text"
        placeholder="Location"
        className="w-full border rounded-lg py-2 pl-10 pr-4"
      />
    </div>

    {/* Property Type Input */}
    <div className="relative flex items-center w-full max-w-xs">
      <img
        src={home_img}
        alt="Home"
        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
      />
      <input
        type="text"
        placeholder="Property Type"
        className="w-full border rounded-lg py-2 pl-10 pr-10"
      />
      <img
        src={chevron_button}
        alt="Chevron"
        className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
      />
    </div>

    {/* Pricing Range Input */}
    <div className="relative flex items-center w-full max-w-xs">
      <img
        src={pricing_icon}
        alt="Pricing"
        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
      />
      <input
        type="text"
        placeholder="Pricing Range"
        className="w-full border rounded-lg py-2 pl-10 pr-10"
      />
      <img
        src={chevron_button}
        alt="Chevron"
        className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
      />
    </div>

    {/* Property Size Input */}
    <div className="relative flex items-center w-full max-w-xs">
      <img
        src={property_size}
        alt="Property Size"
        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
      />
      <input
        type="text"
        placeholder="Property Size"
        className="w-full border rounded-lg py-2 pl-10 pr-10"
      />
      <img
        src={chevron_button}
        alt="Chevron"
        className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
      />
    </div>

    {/* Build Year Input */}
    <div className="relative flex items-center w-full max-w-xs">
      <img
        src={calendar_icon}
        alt="Calendar"
        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
      />
      <input
        type="text"
        placeholder="Build Year"
        className="w-full border rounded-lg py-2 pl-10 pr-10"
      />
      <img
        src={chevron_button}
        alt="Chevron"
        className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
      />
    </div>
  </div>
</div>
</div>
     </div>
   );
 };

export default PropertyHeader