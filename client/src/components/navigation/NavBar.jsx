import { Bell, CircleUserRound, Menu, SearchIcon, ShoppingCart, X } from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const [hamburgerMenu, setHamburgerMenu] = useState(false);
  return (
    <>
      <nav className="flex items-center justify-between py-4 px-8 bg-white text-black ubuntu-font w-full border-b border-gray-400">
        <Link to="/" className="text-5xl">
          SHOP
        </Link>

        <div className="hidden sm:flex items-center gap-2 p-2 rounded-md border border-gray-300 focus-within:border-black w-1/2">
          <SearchIcon />
          <input type="text" placeholder="Search" className="flex-1 outline-none" />
        </div>

        <div className="hidden md:flex items-center gap-5">
          <Link to="/cart" className="hover:bg-gray-400/30 p-2 rounded-md transition-all">
            <ShoppingCart />
          </Link>
          <Link to="/notification" className="hover:bg-gray-400/30 p-2 rounded-md transition-all">
            <Bell />
          </Link>
          <div className="flex items-center gap-2 hover:bg-gray-400/30 p-2 rounded-md transition-all">
            <Link to="/profile">
              <CircleUserRound />
            </Link>
            <p>Egip</p>
          </div>
        </div>

        <div
          className="md:hidden hover:bg-gray-400/30 p-2 rounded-md transition-all duration-75"
          onClick={() => setHamburgerMenu(!hamburgerMenu)}>
          {hamburgerMenu ? <X /> : <Menu />}
        </div>
      </nav>
      {hamburgerMenu && (
        <div className="z-10 absolute flex flex-col gap-4 p-4 bg-white shadow-lg rounded-md w-full ubuntu-font md:hidden">
          <Link
            to="/cart"
            className="flex items-center gap-4 hover:bg-gray-400/30 p-2 rounded-md transition-all w-full h-full border-b border-gray-300">
            <ShoppingCart />
            Cart
          </Link>
          <Link
            to="/notification"
            className="flex items-center gap-4 hover:bg-gray-400/30 p-2 rounded-md transition-all w-full border-b border-gray-300">
            <Bell />
            Notifications
          </Link>
          <Link
            to="/profile"
            className="flex items-center gap-4 hover:bg-gray-400/30 p-2 rounded-md transition-all w-full border-b border-gray-300">
            <CircleUserRound />
            Profile
          </Link>
          <div className="flex items-center gap-2 p-2 rounded-md border border-gray-300 focus-within:border-black w-full">
            <SearchIcon />
            <input type="text" placeholder="Search" className="flex-1 outline-none" />
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;
