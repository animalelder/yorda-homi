import React from 'react';
import message from '../Assets/message.png';

const HomiMessage = () => {
  return (
    <div className="px-4 py-8 mx-4 sm:mx-[10%]">
      <div className="flex flex-col md:flex-row items-center justify-between gap-16">
        {/* Text Section */}
        <div className="flex flex-col space-y-4 w-full md:w-1/2">
          <h3 className="text-3xl font-semibold text-center md:text-left mb-6">
            Homi helps you find the right people and the right living space
          </h3>

          <div className="space-y-4">
            {/* Chatbox Messages */}
            <div className="flex justify-end">
              <div className="bg-primaryBlue p-4 rounded-tl-3xl rounded-tr-3xl rounded-bl-3xl shadow-md max-w-[60%]">
                <p className="text-white text-lg">
                  Easy property listing, you can post and browse properties in minutes, SOO LITT!!
                </p>
              </div>
            </div>

            <div className="flex justify-start">
              <div className="bg-black p-4 rounded-tl-3xl rounded-tr-3xl rounded-br-3xl shadow-md max-w-[60%]">
                <p className="text-white text-lg">
                  Roommate Matching: Find roommates who share your vibe.
                </p>
              </div>
            </div>

            <div className="flex justify-end">
              <div className="bg-primaryBlue p-4 rounded-tl-3xl rounded-tr-3xl rounded-bl-3xl shadow-md max-w-[60%]">
                <p className="text-white text-lg">
                  Online Lease Signing: Secure, paperless agreements you can trust.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="w-full md:w-1/2 flex justify-center rounded-lg">
          <img src={message} alt="Message Illustration" className="w-64 md:w-auto" />
        </div>
      </div>
    </div>
  );
};

export default HomiMessage;
