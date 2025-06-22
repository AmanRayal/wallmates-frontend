import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full bg-transparent z-50 px-8 py-4 flex items-center">
      <Link
        to="/"
        className="
          inline-block
          text-lg font-bold text-gray-800
          transition-all
          relative duration-300 ease-in-out
          hover:text-blue-600
          after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px]
          after:bg-blue-600 after:transition-all after:duration-500 hover:after:w-full
          sm:text-2xl
        "
      >
        <span className="text-blue-600 text-3xl">Wall</span>mates
      </Link>
    </nav>
  );
};

export default Navbar;
