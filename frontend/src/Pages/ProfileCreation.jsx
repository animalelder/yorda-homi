import React, { useState } from "react";
import createProfile_bg from "../Assets/createProfile_bg.png";
import homi_logo from "../Assets/homi_logo.png";
import facebook_logo from "../Assets/facebook_logo.png";
import google_logo from "../Assets/google_logo.png";
import arrow_right from "../Assets/arrow-right-circle.png";

const ProfileCreation = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mode, setMode] = useState("create"); // "create" for sign-up, "sign-in" for login

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (mode === "create") {
        // Sign up logic
        if (!isChecked) {
          alert("You must agree to the terms and conditions.");
          setLoading(false);
          return;
        }
        if (formData.password !== formData.confirmPassword) {
          alert("Passwords do not match!");
          setLoading(false);
          return;
        }

        // API call for sign-up
        const response = await fetch("https://backend-url/api/account/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) throw new Error("Failed to create account.");
        alert("Account created successfully!");
      } else {
        // Sign-in logic
        // API call for sign-in
        const response = await fetch("https://backend-url/api/account/signin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });

        if (!response.ok) throw new Error("Sign-in failed.");
        alert("Signed in successfully!");
      }
    } catch (err) {
      setError(err.message);
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
          <h3 className="text-2xl font-semibold w-[170px] pl-5">Welcome to <span className="text-3xl font-bold">HOMI</span> </h3>
          <div className="flex items-center gap-2 pl-5">
            <p>Sign in or Create a new account with us.</p>
            <img src={arrow_right} alt="Arrow Right" className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div>
        <div className="flex justify-end items-end py-6">
          <img src={homi_logo} alt="Homi Logo" className="w-32" />
        </div>
        <div className="flex-1 flex items-center justify-center p-6 w-full">
          <form className="w-full max-w-md bg-white rounded-lg p-6" onSubmit={handleSubmit}>
            <h3 className="text-2xl font-bold mb-2 text-center">
              {mode === "create" ? "Create new account" : "Sign in"}<span className="text-red-500">.</span>
            </h3>
            <p className="mb-6 text-center">
              {mode === "create" ? (
                <>
                  Already a member?{" "}
                  <span
                    className="text-red-500 font-medium cursor-pointer"
                    onClick={() => setMode("sign-in")}
                  >
                    Sign in
                  </span>
                </>
              ) : (
                <>
                  New here?{" "}
                  <span
                    className="text-red-500 font-medium cursor-pointer"
                    onClick={() => setMode("create")}
                  >
                    Create an account
                  </span>
                </>
              )}
            </p>

            {/* Conditional Fields */}
            {mode === "create" && (
              <>
                <label htmlFor="fullname" className="block font-medium mb-1">
                  Enter full name
                </label>
                <div className="flex flex-col md:flex-row md:gap-4 mb-4">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First name"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="flex-1 border mb-4 md:mb-0 w-full md:w-1/2 border-gray-300 p-2 rounded-full focus:outline-none focus:ring focus:ring-red-300"
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last name"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="flex-1 border w-full md:w-1/2 border-gray-300 p-2 rounded-full focus:outline-none focus:ring focus:ring-red-300"
                  />
                </div>
              </>
            )}

            {/* Email Input */}
            <label htmlFor="email" className="block font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
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
              placeholder="Enter your password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-full mb-2 focus:outline-none focus:ring focus:ring-red-300"
            />

            {mode === "create" && (
              <>
                <label htmlFor="confirm-password" className="block font-medium mt-4 mb-1">
                  Confirm password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded-full mb-6 focus:outline-none focus:ring focus:ring-red-300"
                />
                <div className="flex items-center gap-2 mb-6">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                  />
                  <label className="text-sm text-gray-700">
                    I’ve read and agree with Terms of Service and Privacy Policy.
                  </label>
                </div>
              </>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full ${loading ? "bg-gray-400" : "bg-primaryBlue"} text-white font-medium py-2 px-4 rounded-full hover:bg-red-500 transition`}
            >
              {loading ? (mode === "create" ? "Creating Account..." : "Signing In...") : mode === "create" ? "Create Account" : "Sign In"}
            </button>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

            {/* Or sign in/up with */}
            <div className="flex items-center justify-center my-6">
              <hr className="w-[20%] border-gray-300" />
              <div className="px-4 text-sm text-gray-400">Or sign {mode === "create" ? "up" : "in"} with</div>
              <hr className="w-[20%] border-gray-300" />
            </div>

            <div className="flex gap-4 justify-center">
              <button type="button">
                <img src={facebook_logo} alt="Facebook" className="w-8 h-8" />
              </button>
              <button type="button">
                <img src={google_logo} alt="Google" className="w-8 h-8" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileCreation;
