

import React from "react";
import { useNavigate } from "react-router-dom";

export default function Profile({ userData }) {
  const navigate = useNavigate();

  const {
    firstName = "N/A",
    lastName = "N/A",
    email = "Not Provided",
    phone = "Not Provided",
    bio = "No bio available",
    profilePictureUrl = "https://via.placeholder.com/150",
  } = userData;

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <div className="flex items-center space-x-4">
          <img
            src={userData.profilePictureUrl || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover"
          />
          <div>
            <h1 className="text-3xl font-bold">
              {userData.firstName} {userData.lastName}
            </h1>
            <p className="text-gray-600">Email: {userData.email}</p>
            <p className="text-gray-600">Phone: {userData.phone}</p>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold">About Me</h2>
          <p className="text-gray-700">{userData.bio}</p>
        </div>

        <button
          onClick={() => navigate("/edit-profile")}
          className="mt-8 p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
}
