
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes,Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashbord";
import Navbar from "./components/Navbar";
import CreateProfile from "./components/CreateProfile";
import Profile from "./components/Profile";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [userData, setUserData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@example.com",
    phone: "123-456-7890",
    bio: "I am a landlord looking to rent out my properties.",
    profilePictureUrl: "",
  });

  return (
    <Router>
      <div className="App">
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

        
        <Routes>
          <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
          <Route path="/register" element={<Register setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/profile" element={<Profile userData={userData} />} />

          
          <Route
                 path="/create-profile"
                element={<CreateProfile setUserData={setUserData} />}
                 />

           
        </Routes>
      </div>
    </Router>
  );
}

export default App;


//export default App;

