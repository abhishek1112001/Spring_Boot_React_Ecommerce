import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { isAuthenticated, isAdmin, logout, isUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const userId = localStorage.getItem("cartIdRetrive");

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      logout();
      navigate("/"); // Redirect to the home page after successful logout
    }
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-50 to-teal-50 py-4 shadow-lg">
      <ul className="flex justify-center space-x-6">
        {/* Link to Home/User Management System */}
        {!isAuthenticated && (
          <li>
            <Link
              to="/"
              className="text-gray-800 px-4 py-2 rounded hover:bg-indigo-100 transition-colors"
            >
              Book Store
            </Link>
          </li>
        )}

        {/* Link to Profile page for authenticated users */}
        {isAuthenticated && (
          <li>
            <Link
              to="/profile"
              className="text-gray-800 px-4 py-2 rounded hover:bg-indigo-100 transition-colors"
            >
              Profile
            </Link>
          </li>
        )}

        {/* Links visible only for admin */}
        {isAdmin && (
          <>
            <li>
              <Link
                to="/admin/user-management"
                className="text-gray-800 px-4 py-2 rounded hover:bg-indigo-100 transition-colors"
              >
                User Management
              </Link>
            </li>
            <li>
              <Link
                to="/admin/book-management"
                className="text-gray-800 px-4 py-2 rounded hover:bg-indigo-100 transition-colors"
              >
                Book Management
              </Link>
            </li>
          </>
        )}

        {/* Links visible only for user */}
        {isUser && (
          <>
            <li>
              <Link
                to="/user/all-books"
                className="text-gray-800 px-4 py-2 rounded hover:bg-indigo-100 transition-colors"
              >
                Books
              </Link>
            </li>
            <li>
              <Link
                to={`/user/get-cart/${userId}`}
                className="text-gray-800 px-4 py-2 rounded hover:bg-indigo-100 transition-colors"
              >
                Cart
              </Link>
            </li>
          </>
        )}

        {/* Logout button for authenticated users */}
        {isAuthenticated && (
          <li>
            <Link
              to="#"
              onClick={handleLogout}
              className="text-gray-800 px-4 py-2 rounded hover:bg-indigo-100 transition-colors"
            >
              Logout
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
