import React, { useState } from 'react';
import { IoSunnyOutline } from "react-icons/io5";
import { FaMoon } from "react-icons/fa6";
import { useTheme } from '../Context/ThemeContext';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme(); // Correct destructuring
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="navbar bg-base-100 shadow-sm relative">
      <div className={`absolute top-0 left-0 w-[250px] h-screen bg-base-200 z-30 transition-transform duration-300 ease-in-out transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-4 flex justify-between items-center">
          <a className="btn btn-ghost text-xl">Entra</a>
          <button onClick={toggleMenu} className="text-xl cursor-pointer">✕</button>
        </div>
        <ul className="menu menu-vertical p-4">
          <li><a>Item 1</a></li>
          <li>
            <details>
              <summary>Parent</summary>
              <ul className="p-2">
                <li><a>Submenu 1</a></li>
                <li><a>Submenu 2</a></li>
              </ul>
            </details>
          </li>
          <li><a>Item 3</a></li>
        </ul>
      </div>

      <div className="navbar-start z-20">
        <a className="btn btn-ghost text-xl" href='/'>Entra</a>

        <label className="swap swap-rotate ml-4">
          <input type="checkbox" onChange={toggleTheme} checked={theme === 'dark'} />
          <IoSunnyOutline className="swap-off h-6 w-6 text-yellow-400" />
          <FaMoon className="swap-on h-6 w-6 text-blue-500" />
        </label>
      </div>

      <div className="navbar-center hidden lg:flex z-20">
        <ul className="menu menu-horizontal px-1">
          <li><a>Item 1</a></li>
          <li>
            <details>
              <summary>Parent</summary>
              <ul className="p-2">
                <li><a>Submenu 1</a></li>
                <li><a>Submenu 2</a></li>
              </ul>
            </details>
          </li>
          <li><a>Item 3</a></li>
        </ul>
      </div>

      <div className="navbar-end flex items-center z-20">
        <a className="btn" href='/Sign-in'>Sign In</a>

        <div className="lg:hidden ml-4 cursor-pointer" onClick={toggleMenu}>
          <div className={`w-8 h-0.5 mb-[5px] transition-all duration-300 ${theme === 'light' ? 'bg-gray-600' : 'bg-white'}`}></div>
          <div className={`w-4 h-0.5 mb-[4px] transition-all duration-300 ${theme === 'light' ? 'bg-gray-600' : 'bg-white'}`}></div>
          <div className={`w-6 h-0.5 transition-all duration-300 ${theme === 'light' ? 'bg-gray-600' : 'bg-white'}`}></div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
