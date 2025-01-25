import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashbord from "./components/Dashbord";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";
import CreateProfile from "./components/CreateProfile";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(""); // Manage user role
  const [userData, setUserData] = useState(null); // User data loaded from API

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("/api/users/validate-token", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setIsLoggedIn(true);
            setUserRole(data.user.role);
            setUserData(data.user);
          }
        })
        .catch(() => {
          localStorage.removeItem("token");
          setIsLoggedIn(false);
        });
    }
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole("");
    setUserData(null);
    localStorage.removeItem("token");
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
        />
        <Route
          path="/register"
          element={<Register setIsLoggedIn={setIsLoggedIn} setUserRole={setUserRole} />}
        />
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} setUserRole={setUserRole} />}
        />
        <Route
          path="/dashboard"
          element={
            isLoggedIn ? (
              <Dashbord userRole={userRole} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/profile"
          element={
            isLoggedIn ? (
              <Profile userData={userData} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/edit-profile"
          element={
            isLoggedIn ? (
              <EditProfile userData={userData} setUserData={setUserData} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/create-profile"
          element={
            isLoggedIn ? (
              <CreateProfile setUserData={setUserData} userRole={userRole} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
