import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">Rick and Morty</h1>
        <nav>
          <Link to="/" className="text-gray-800 hover:text-blue-500 px-4">Home</Link>
          <Link to="/dashboard" className="text-gray-800 hover:text-blue-500 px-4">Dashboard</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;