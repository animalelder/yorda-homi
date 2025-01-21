import React from 'react';
import pinterest_icon from '../Assets/pinterest.png';
import twitter_icon from '../Assets/twitter.png';
import linkedin_icon from '../Assets/linkedin-box.png';
import homi from '../Assets/homi.png';
import instagram_icon from '../Assets/instagram.png';

const Footer = () => {
  return (
    <div className="bg-deepBlue text-white py-2 px-6 sm:px-10 lg:px-20">
      {/* Top Section */}
      <div className="flex flex-col lg:flex-row justify-between items-center mb-8 mt-10">
        <p className="text-xl sm:text-2xl font-light text-center lg:text-left mb-6 lg:mb-0 lg:max-w-[40%]">
        Choose HOMI for great apartments and roommate matching
        </p>
        <button className="text-white bg-primary py-2 px-6 rounded-full">
          Contact Us
        </button>
      </div>

      <hr className="border-gray-500 mb-8" />

      {/* Social Icons and Links */}
      <div className="flex flex-col lg:flex-row justify-between">
        {/* Social Icons */}
        <div className="flex justify-center lg:justify-start gap-4 mb-8 lg:mb-0">
          <img src={instagram_icon} alt="Instagram" className="w-8 h-8" />
          <img src={linkedin_icon} alt="LinkedIn" className="w-8 h-8" />
          <img src={pinterest_icon} alt="Pinterest" className="w-8 h-8" />
          <img src={twitter_icon} alt="Twitter" className="w-8 h-8" />
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 text-sm text-center lg:text-left">
          <div>
            <p className="text-deepGreen font-semibold mb-2">Services</p>
            <ul className="space-y-2">
              <li>Roommate matching</li>
              <li>Property Search</li>
              <li>Lease Signing</li>
              
            </ul>
          </div>
          <div>
            <p className="text-deepGreen font-semibold mb-2">Resources</p>
            <ul className="space-y-2">
              <li>Tenant Qualification</li>
              <li>Roommates </li>              
              <li>Blog</li>
            </ul>
          </div>
          <div>
            <p className="text-deepGreen font-semibold mb-2">Support</p>
            <ul className="space-y-2">
              <li>FAQs</li>
              <li>Contact Us</li>
              <li>Return Policy</li>              
            </ul>
          </div>
          <div>
            <p className="text-deepGreen font-semibold mb-2">Company</p>
            <ul className="space-y-2">
              <li>About Us</li>
              <li>Careers</li>
              <li>Testimonials</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Logo at the extreme bottom */}
      <div className="flex justify-center mt-12 mb-0">
        <img src={homi} alt="Homi Logo" className="w-auto h-auto" />
      </div>
    </div>
  );
};

export default Footer;
