import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateProfile({ setUserData }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    bio: "",
    profilePictureUrl: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserData(formData); // Save to Global State
    navigate("/profile");  // Redirect to Profile
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <form
        className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6"
        onSubmit={handleSubmit}
      >
        <h1 className="text-3xl font-bold mb-6">Create Profile</h1>

        <label className="block mb-2 text-sm font-medium">First Name</label>
        <input
          type="text"
          name="firstName"
          className="block w-full p-2 border border-gray-300 rounded mb-4"
          value={formData.firstName}
          onChange={handleChange}
          required
        />

        <label className="block mb-2 text-sm font-medium">Last Name</label>
        <input
          type="text"
          name="lastName"
          className="block w-full p-2 border border-gray-300 rounded mb-4"
          value={formData.lastName}
          onChange={handleChange}
          required
        />

        <label className="block mb-2 text-sm font-medium">Email</label>
        <input
          type="email"
          name="email"
          className="block w-full p-2 border border-gray-300 rounded mb-4"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label className="block mb-2 text-sm font-medium">Phone</label>
        <input
          type="tel"
          name="phone"
          className="block w-full p-2 border border-gray-300 rounded mb-4"
          value={formData.phone}
          onChange={handleChange}
        />

        <label className="block mb-2 text-sm font-medium">Bio</label>
        <textarea
          name="bio"
          className="block w-full p-2 border border-gray-300 rounded mb-4"
          rows="4"
          value={formData.bio}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="w-full p-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Create Profile
        </button>
      </form>
    </div>
  );
}
