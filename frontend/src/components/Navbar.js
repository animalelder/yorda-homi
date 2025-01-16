import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function Navbar({ isLoggedIn, onLogout }) {
  return (
    <nav className="bg-white shadow-lg p-4 text-gray-700 rounded-full mx-4 my-2">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
        <img src="/images/image.jpg" alt="Logo" className="h-12 w-auto rounded-full" />

          <FontAwesomeIcon icon={faHouse} className="text-green-600 text-3xl" />
          <h1 className="text-2xl font-bold">Homi</h1>
        </div>
        
        

        {/* Navigation Buttons */}
        <div className="space-x-4">
          {isLoggedIn ? (
            <>
              <Link
                to="/profile"
                className="px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700"
              >
                Profile
              </Link>
              <Link
                to="/dashboard"
                className="px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700"
              >
                Dashboard
              </Link>
              <button
                onClick={onLogout}
                className="px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}



