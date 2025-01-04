import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register({ setIsLoggedIn }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Handle Form Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submission
  const handleRegister = (e) => {
    e.preventDefault();

    // Validate Passwords Match
    if (formData.password !== formData.confirmPassword) {
      setMessage("❌ Passwords do not match!");
      return;
    }

    // Successful Registration
    setMessage("✅ Registration Successful!");
    setIsLoggedIn(true);

    // Clear the form after successful registration
    setTimeout(() => {
      setMessage("");
      navigate("/create-profile"); // Redirect to Create Profile page
    }, 2000); 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form className="bg-white p-8 shadow-lg rounded-md w-96" onSubmit={handleRegister}>
        <h2 className="text-2xl font-bold mb-6">Register</h2>

        <label className="block mb-2 text-sm font-medium">Email</label>
        <input
          type="email"
          name="email"
          className="block w-full p-2 border border-gray-300 rounded mb-4"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label className="block mb-2 text-sm font-medium">Password</label>
        <input
          type="password"
          name="password"
          className="block w-full p-2 border border-gray-300 rounded mb-4"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <label className="block mb-2 text-sm font-medium">Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          className="block w-full p-2 border border-gray-300 rounded mb-4"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />

        {message && <p className={`mt-2 ${message.includes("❌") ? "text-red-600" : "text-green-600"}`}>{message}</p>}

        <button
          type="submit"
          className="w-full p-2 mt-4 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Register
        </button>
      </form>
    </div>
  );
}
