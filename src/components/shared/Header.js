import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import handleLogOut from '../../utils/handleLogOut';

function Header() {
  let isLoggedIn;

  // get from localStorage
  const token = localStorage.getItem('token');
  if(token) {
    isLoggedIn = true;
  } else {
    isLoggedIn = false;
  }

  return (
    <header className="font-serif flex flex-col sm:flex-row items-center justify-between bg-gray-800 p-4 max-w-screen-xl mx-auto">
      <div className="flex items-center mb-4 sm:mb-0">
        <Link to="/" className="text-white text-xl font-bold">Holidaze</Link>
      </div>
      <div className="flex items-center">
        {isLoggedIn ? (
          <>
            <Link to="/profile" className="text-white mr-4">
              <FaUser size={20} />
            </Link>
            <button onClick={handleLogOut} className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded">Log out</button>
          </>
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
