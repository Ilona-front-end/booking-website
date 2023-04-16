import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="flex flex-col md:flex-row items-center justify-between bg-gray-800 p-4">
      <div className="flex items-center mb-4 md:mb-0">
        <Link to="/" className="text-white text-xl font-bold">Holidaze</Link>
      </div>
      <div className="flex items-center">
        <button className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded mr-4">Log in</button>
        <button className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded">Sign up</button>
      </div>
    </header>
  );
}

export default Header;
