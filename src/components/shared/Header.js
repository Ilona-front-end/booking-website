import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';

function Header({ isLoggedIn }) {
  isLoggedIn = false;

  return (
    <header className="font-serif flex flex-col md:flex-row items-center justify-between bg-gray-800 p-4">
      <div className="flex items-center mb-4 md:mb-0">
        <Link to="/" className="text-white text-xl font-bold">Holidaze</Link>
      </div>
      <div className="flex items-center">
        {isLoggedIn ? (
          <Link to="/profile" className="text-white mr-4">
            <FaUser size={20} />
          </Link>
        ) : (
          <>
        <Link to="/login" className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded mr-4">Log in</Link>
        <Link to="/signup" className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded">Sign up</Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
