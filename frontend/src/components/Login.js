import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login({ setIsLoggedIn, setUserRole }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Send login request to the backend
      const response = await axios.post("/api/users/login", { email, password });

      // Extract token and user details
      const { token, user } = response.data;

      // Save token to localStorage for persistent login
      localStorage.setItem("authToken", token);

      // Update app state
      setIsLoggedIn(true);
      setUserRole(user.role);

      setMessage("Login Successful!");
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setMessage("Invalid email or password");
      } else {
        setMessage("Something went wrong. Please try again.");
      }
      emailRef.current.focus();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form className="bg-white p-8 shadow-lg rounded-md w-96" onSubmit={handleLogin}>
        <h2 className="text-2xl font-bold mb-6">Login</h2>

        <label className="block mb-2 text-sm font-medium">Email</label>
        <input
          type="email"
          ref={emailRef}
          className="block w-full p-2 border border-gray-300 rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="block mb-2 text-sm font-medium">Password</label>
        <input
          type="password"
          className="block w-full p-2 border border-gray-300 rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {message && (
          <p className={`mt-4 ${message.includes("Successful") ? "text-green-600" : "text-red-600"}`}>
            {message}
          </p>
        )}

        <button
          type="submit"
          className="w-full p-2 mt-4 bg-green-600 text-white rounded hover:bg-green-700"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
