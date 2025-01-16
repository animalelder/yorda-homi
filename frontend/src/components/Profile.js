


import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const { userId } = useParams(); // Get userId from route
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (!userId) {
      console.error("userId is undefined");
      return;
    }

    // Fetch profile data
    axios.get(`/api/profiles/${userId}`)
      .then((response) => {
        setProfile(response.data); // Update the profile state with the response data
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
      });
  }, [userId]);

  if (!profile) return <p>Loading...</p>;

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <div className="flex items-center space-x-4">
          <img
            src={profile.photo || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover"
          />
          <div>
            <h1 className="text-3xl font-bold">
              {profile.firstName} {profile.lastName}
            </h1>
            <p className="text-gray-600">Email: {profile.email}</p>
            <p className="text-gray-600">Phone: {profile.phone}</p>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold">About Me</h2>
          <p className="text-gray-700">{profile.bio || "No bio available"}</p>
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
};

export default Profile;
