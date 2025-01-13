


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register({ setIsLoggedIn, setUserRole }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "tenant", // Default role
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage("❌ Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:8001/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        }),
      });

  

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed.");
      }

      setMessage("✅ Registration Successful!");
      setIsLoggedIn(true);
      setUserRole(formData.role);

      setTimeout(() => {
        setMessage("");
        navigate("/create-profile", { state: { role: formData.role } });
      }, 2000);
    } catch (error) {
      setMessage(`❌ ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form className="bg-white p-8 shadow-lg rounded-md w-96" onSubmit={handleRegister}>
        <h2 className="text-2xl font-bold mb-6">Register</h2>

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

        <label className="block mb-2 text-sm font-medium">Role</label>
        <select
          name="role"
          className="block w-full p-2 border border-gray-300 rounded mb-4"
          value={formData.role}
          onChange={handleChange}
        >
          <option value="tenant">Tenant</option>
          <option value="landlord">Landlord</option>
        </select>

        {message && (
          <p className={`mt-2 ${message.includes("❌") ? "text-red-600" : "text-green-600"}`}>
            {message}
          </p>
        )}

        <button
          type="submit"
          className="w-full p-2 mt-4 bg-green-600 text-white rounded hover:bg-green-700"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}
