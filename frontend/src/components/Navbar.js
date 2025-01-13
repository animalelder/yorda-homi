



import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function Navbar({ isLoggedIn, onLogout }) {
  return (
    <nav className="bg-white border-b-4 border-green-600 shadow-lg p-4 text-gray-700">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center">
          <FontAwesomeIcon icon={faHouse} className="text-green-600 text-3xl mr-2" />
          <h1 className="text-2xl font-bold">Homi</h1>
        </div>

        {/* Navigation Buttons */}
        <div className="space-x-4">
          {isLoggedIn ? (
            <>
              <Link
                to="/profile"
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Profile
              </Link>
              <Link
                to="/dashboard"
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Dashboard
              </Link>
              <button
                onClick={onLogout}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
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
