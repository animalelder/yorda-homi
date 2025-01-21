import React, { useState } from "react";
import createProfile_bg from "../Assets/createProfile_bg.png";
import homi_logo from "../Assets/homi_logo.png";
import facebook_logo from "../Assets/facebook_logo.png";
import google_logo from "../Assets/google_logo.png";
import arrow_right from "../Assets/arrow-right-circle.png";

const ProfileCreation = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isChecked) {
      alert("You must agree to the terms and conditions.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("https://your-backend-url/api/account/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create account. Please try again.");
      }

      const result = await response.json();
      alert("Account created successfully!");
      console.log(result);
    } catch (error) {
      setError(error.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Background Image Section */}
      <div className="hidden lg:block w-1/2 relative">
        <img
          src={createProfile_bg}
          alt="Create Profile Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 h-[300px] left-0 w-full bg-black bg-opacity-70 text-white p-4">
          <h3 className="text-2xl font-bold w-[150px] pl-5">Welcome to HOMI</h3>
          <div className="flex items-center gap-2 pl-5">
            <p>Sign in or Create a new account with us.</p>
            <img src={arrow_right} alt="Arrow Right" className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div>
        {/* Logo Section */}
        <div className="flex justify-end items-end py-6">
          <img src={homi_logo} alt="Homi Logo" className="w-32" />
        </div>
        <div className="flex-1 flex items-center justify-center p-6 w-full">
          <form className="w-full max-w-md bg-white rounded-lg p-6" onSubmit={handleSubmit}>
            <h3 className="text-2xl font-bold mb-2 text-center">
              Create new account<span className="text-red-500">.</span>
            </h3>
            <p className="mb-6 text-center">
              Already a member? <span className="text-red-500 cursor-pointer">Sign in</span>
            </p>

            {/* Full Name Input */}
            <label htmlFor="fullname" className="block font-medium mb-1">
              Enter full name
            </label>
            <div className="flex flex-col md:flex-row md:gap-4 mb-4">
              <input
                type="text"
                name="firstName"
                placeholder="Enter first name"
                value={formData.firstName}
                onChange={handleChange}
                className="flex-1 border mb-4 md:mb-0 w-full md:w-1/2 border-gray-300 p-2 rounded-full focus:outline-none focus:ring focus:ring-red-300"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Enter last name"
                value={formData.lastName}
                onChange={handleChange}
                className="flex-1 border w-full md:w-1/2 border-gray-300 p-2 rounded-full focus:outline-none focus:ring focus:ring-red-300"
              />
            </div>

            {/* Email Input */}
            <label htmlFor="email" className="block font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-full mb-4 focus:outline-none focus:ring focus:ring-red-300"
            />

            {/* Password Input */}
            <label htmlFor="password" className="block font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-full mb-2 focus:outline-none focus:ring focus:ring-red-300"
            />
            <span className="text-sm text-gray-500">Must be at least 6 characters.</span>

            {/* Confirm Password Input */}
            <label htmlFor="confirm-password" className="block font-medium mt-4 mb-1">
              Confirm password
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-full mb-6 focus:outline-none focus:ring focus:ring-red-300"
            />

            {/* Terms and Conditions */}
            <div className="flex items-center gap-2 mb-6">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
                className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
              />
              <label className="text-sm text-gray-700">
                I’ve read and agree with Terms of Service and our{" "}
                Privacy Policy.
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full ${
                loading ? "bg-gray-400" : "bg-primaryBlue"
              } text-white font-medium py-2 px-4 rounded-full hover:bg-primary transition`}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

            {/* Or sign up with */}
            <div className="flex items-center justify-center my-6">
              <hr className="w-[30%] border-gray-300" />
              <div className="px-4 text-sm">Or sign up with</div>
              <hr className="w-[30%] border-gray-300" />
            </div>

            {/* Social Sign Up Buttons */}
            <div className="flex gap-4 justify-center">
              <button>
                <img
                  src={google_logo}
                  alt="Google"
                  className="w-8 h-8 cursor-pointer"
                />
              </button>
              <button>
                <img
                  src={facebook_logo}
                  alt="Facebook"
                  className="w-8 h-8 cursor-pointer"
                />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileCreation;
