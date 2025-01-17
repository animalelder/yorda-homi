import React, { useState, useEffect, useRef } from 'react';
import logo from '../Assets/logo.png';
import hero_img from '../Assets/hero_img.png';
import featured from '../Assets/featured.png';

const Header = () => {
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
        style={{ backgroundImage: `url(${hero_img})` }}
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
                <div className="absolute top-full mt-2 left-0 bg-white shadow-lg rounded-md w-40 z-50">
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

          {/* Post a Rental Button */}
          <button className="cursor-pointer bg-gray-200 text-gray-800 px-8 py-5 rounded-full sm:block whitespace-nowrap hover:bg-primary hover:text-white transition-colors duration-300 z-50">
  Post a Rental
</button>

        
        </div>

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold max-w-2xl leading-tight">
            Welcome to HOMI Renting Made Simple and Seamless
          </h2>
          <button className="mt-6 bg-primary text-white hover:bg-primaryLight hover:text-gray-700 px-6 py-3 rounded-full text-lg cursor-pointer">
            Find Your Home
          </button>
        </div>
      </div>

      {/* Featured Image */}
      <div className="w-full flex justify-center py-8">
        <img src={featured} alt="Featured" className="w-11/12 max-w-5xl rounded-lg " />
      </div>
    </div>
  );
};

export default Header;
