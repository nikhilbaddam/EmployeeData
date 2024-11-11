import React, { useContext, useEffect, useState } from 'react';
import { FaUser, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { StoreContext } from '../storeContext';
import axios from 'axios';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const { token, setToken, username } = useContext(StoreContext);

  useEffect(() => {
    // Check if token exists to set the login state
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [token]);

  const handleLogout = () => {
    setToken(null); // Clear the token from context
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex items-center">
        
        {/* Site Logo */}
        <div className="text-white text-2xl font-bold">Alien</div>

        {/* Centered Navbar Links */}
        <div className="flex-grow flex justify-center space-x-6 text-white">
          <a href="/" className="hover:text-gray-300">Home</a>
          <a href="/employeelist" className="hover:text-gray-300">Employee List</a>
        </div>

        {/* Profile/Login Icon */}
        <div className="ml-auto text-white">
          {isLoggedIn ? (
            <div className="flex items-center space-x-4">
              <span className="text-lg">{`Hello, ${username}`}</span>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 hover:text-gray-300"
              >
                <FaSignOutAlt className="text-2xl" /> {/* Logout Icon */}
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <button className="flex items-center space-x-2 hover:text-gray-300">
              <FaSignInAlt className="text-2xl" /> {/* Login Icon */}
              <span><a href="/register">Register/Login</a></span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
