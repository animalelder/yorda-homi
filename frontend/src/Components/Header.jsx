import React from 'react';
import logo from '../Assets/logo.png';
import hero_img from '../Assets/hero_img.png';
import featured from '../Assets/featured.png';

const Header = () => {
  return (
    <div className='relative bg-white'>
      {/* Hero Section */}
      <div
        className='relative bg-cover bg-center h-screen'
        style={{ backgroundImage: `url(${hero_img})` }}
      >
        <div className='absolute top-6 left-0 w-full px-4 sm:px-12 flex items-center justify-center'>
          {/* Navbar */}
          <nav className='flex justify-between items-center py-4 px-6 bg-white rounded-full shadow-lg w-full max-w-6xl'>
            {/* Logo */}
            <div>
              <img src={logo} alt="Logo" className="h-10" />
            </div>

            {/* Navigation Links */}
            <ul className='hidden sm:flex space-x-8 text-lg text-gray-700'>
              <li><a href="#home" className='hover:text-primary'>Home</a></li>
              <li><a href="#properties" className='hover:text-primary'>Properties</a></li>
              <li><a href="#homi-match" className='hover:text-primary'>Homi Match</a></li>
              <li><a href="#about-us" className='hover:text-primary'>About Us</a></li>
            </ul>

            {/* Desktop Login Button */}
            <div className='hidden sm:flex space-x-4'>
              <button className='bg-primary hover:bg-white text-gray-700 px-6 py-2 rounded-full'>
                Login
              </button>
            </div>

            {/* Mobile Navigation */}
            <div className='sm:hidden'>
              <button className='text-2xl text-gray-700'>
                &#9776; {/* Hamburger menu icon */}
              </button>
            </div>
          </nav>

          {/* Post a Rental Button */}
          <button className='bg-gray-200 text-gray-800 px-8 py-5 rounded-full hidden sm:block whitespace-nowrap'>
            Post a Rental
          </button>
        </div>

        {/* Hero Content */}
        <div className='absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4'>
          <h2 className='text-3xl sm:text-5xl md:text-6xl font-bold max-w-2xl leading-tight'>
            Welcome to HOMI  Renting Made Simple and Seamless
          </h2>
          <button className='mt-6 bg-primary text-white px-6 py-3 rounded-full text-lg'>
            Find Your Home
          </button>
        </div>
      </div>

      {/* Featured Image */}
      <div className='w-full flex justify-center py-8'>
        <img src={featured} alt="Featured" className='w-11/12 max-w-5xl rounded-lg shadow-lg' />
      </div>
    </div>
  );
};

export default Header;
