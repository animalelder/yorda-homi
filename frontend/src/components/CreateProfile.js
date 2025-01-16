import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateProfile = () => {
  const [formData, setFormData] = useState({
    userId: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    occupation: "", // STUDENT or EMPLOYED
    photo: null, // File object
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      photo: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("userId", formData.userId);
    data.append("firstName", formData.firstName);
    data.append("lastName", formData.lastName);
    data.append("phoneNumber", formData.phoneNumber);
    data.append("occupation", formData.occupation.toUpperCase());
    if (formData.photo) {
      data.append("photo", formData.photo);
    }

    try {
      const response = await axios.post("/api/profiles", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Profile created successfully!");
      navigate(`/profile/${response.data.id}`);
    } catch (error) {
      console.error("Error creating profile:", error.response?.data || error.message);
      alert("Failed to create profile. Please try again.");
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 shadow-lg rounded">
        <h1 className="text-2xl font-bold mb-4">Create Profile</h1>

        <label className="block mb-2">User ID</label>
        <input
          type="text"
          name="userId"
          value={formData.userId}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4"
          required
        />

        <label className="block mb-2">First Name</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4"
        />

        <label className="block mb-2">Last Name</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4"
        />

        <label className="block mb-2">Phone Number</label>
        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4"
        />

        <label className="block mb-2">Occupation</label>
        <select
          name="occupation"
          value={formData.occupation}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4"
          required
        >
          <option value="">Select Occupation</option>
          <option value="STUDENT">Student</option>
          <option value="EMPLOYED">Employed</option>
        </select>

        <label className="block mb-2">Profile Photo</label>
        <input type="file" onChange={handleFileChange} className="w-full mb-4" />

        <button
          type="submit"
          className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Create Profile
        </button>
      </form>
    </div>
  );
};

export default CreateProfile;
