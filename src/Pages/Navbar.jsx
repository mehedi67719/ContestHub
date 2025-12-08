import React, { useState, useEffect, useRef } from "react";

import logo from "../assets/Logo.avif";
import { Link, NavLink } from "react-router";
import Primarybtn from "../Component/Primarybtn";

const Navbar = ({ user, onLogout }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <header className="backdrop-blur-md bg-white/80 sticky top-0 z-50 shadow">
      <div className="w-[90%] mx-auto flex items-center justify-between py-3">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="logo" className="w-10 h-10 rounded-md object-cover" />
          <span className="text-2xl font-semibold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            ContestHub
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <NavLink to="/" className={({isActive}) => `relative group ${isActive ? 'text-blue-600' : 'text-gray-700'}`}>
            Home
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-600 group-hover:w-full transition-all"></span>
          </NavLink>

          <NavLink to="/all-contests" className={({isActive}) => `relative group ${isActive ? 'text-blue-600' : 'text-gray-700'}`}>
            All Contests
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-600 group-hover:w-full transition-all"></span>
          </NavLink>

          <NavLink to="/extra" className={({isActive}) => `relative group ${isActive ? 'text-blue-600' : 'text-gray-700'}`}>
            Extra Section
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-600 group-hover:w-full transition-all"></span>
          </NavLink>

          <NavLink to="/leaderboard" className="text-gray-700 hover:text-blue-600 transition">Leaderboard</NavLink>
        </nav>

        <div className="flex items-center gap-4">
          <div className="md:hidden">
            <button onClick={() => setOpen(p => !p)} className="p-2 rounded-md border hover:bg-gray-100">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button onClick={() => setOpen(p => !p)} className="flex items-center gap-3">
                <img src={user.photo || '/default-user.png'} alt="user" className="w-10 h-10 rounded-full border shadow-sm object-cover" />
              </button>

              {open && (
                <div className="absolute right-0 mt-3 w-48 bg-white shadow-lg rounded-xl p-3">
                  <div className="flex items-center gap-3 mb-2">
                    <img src={user.photo || '/default-user.png'} alt="u" className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <p className="font-semibold text-gray-700 text-sm">{user.name || user.displayName || user.email}</p>
                      <p className="text-xs text-gray-500">{user.role ? user.role.toUpperCase() : 'USER'}</p>
                    </div>
                  </div>

                  <Link to="/dashboard" className="block py-2 px-2 rounded-md hover:bg-gray-100 transition">Dashboard</Link>
                  <Link to="/profile" className="block py-2 px-2 rounded-md hover:bg-gray-100 transition">My Profile</Link>
                  <button onClick={onLogout} className="w-full text-left mt-2 py-2 px-2 rounded-md hover:bg-red-50 hover:text-red-600 transition">Logout</button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login"><Primarybtn>Login</Primarybtn></Link>
          )}
        </div>
      </div>

      <div className={`${open ? 'block' : 'hidden'} md:hidden bg-white/95 border-t`}>
        <div className="w-[90%] mx-auto py-3 flex flex-col gap-3">
          <Link to="/" className="py-2">Home</Link>
          <Link to="/all-contests" className="py-2">All Contests</Link>
          <Link to="/extra" className="py-2">Extra Section</Link>
          <Link to="/leaderboard" className="py-2">Leaderboard</Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
