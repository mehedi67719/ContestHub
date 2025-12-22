import React, { useState, useEffect, useRef } from "react";
import logo from "../assets/Logo.avif";
import Primarybtn from "./Primarybtn";
import Useauth from "./Useauth";
import Swal from "sweetalert2";
import { Link, NavLink, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";

const Navbar = () => {
  const { User, logout } = Useauth();
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const profileRef = useRef();
  const mobileRef = useRef();
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!"
    }).then((result) => {
      if (result.isConfirmed) {
        logout()
          .then(() => {
            Swal.fire("Logged out!", "You have been successfully logged out.", "success");
            navigate("/login");
          })
          .catch((error) => {
            Swal.fire("Error!", error.message, "error");
          });
      }
    });
  };

  const { isLoading, error, data: users = [] } = useQuery({
    queryKey: ['role-user'],
    queryFn: async () => {
      const res = await fetch('https://contesthub-server-pink.vercel.app/user');
      if (!res.ok) throw new Error("Failed to fetch users");
      return res.json();
    },
  });

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
      if (mobileRef.current && !mobileRef.current.contains(e.target)) {
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const realuser = users?.find(u => u.email === User?.email);

  return (
    <header className="backdrop-blur-md bg-white/80 sticky top-0 z-50 shadow">
      <div className="w-[90%] mx-auto flex items-center justify-between py-3">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="logo" className="w-10 h-10 rounded-md object-cover" />
          <span className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            ContestHub
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <NavLink to="/" className={({ isActive }) => isActive ? "text-blue-600" : "text-gray-700"}>Home</NavLink>
          <NavLink to="/all-contests" className={({ isActive }) => isActive ? "text-blue-600" : "text-gray-700"}>All Contests</NavLink>
          <NavLink to="/about-us" className={({ isActive }) => isActive ? "text-blue-600" : "text-gray-700"}>About Us</NavLink>
          <NavLink to="/leaderboard" className={({ isActive }) => isActive ? "text-blue-600" : "text-gray-700"}>Leaderboard</NavLink>
          <NavLink to="/contact-us" className={({ isActive }) => isActive ? "text-blue-600" : "text-gray-700"}>Contact Us</NavLink>
        </nav>

        <div className="flex items-center gap-4">
          <div className="md:hidden relative" ref={mobileRef}>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 border rounded-md"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {mobileOpen && (
              <div className="bg-white border shadow-xl w-64 absolute top-full right-0 z-40 rounded-lg mt-2 py-3 flex flex-col gap-1">
                <NavLink to="/" onClick={() => setMobileOpen(false)} className="px-4 py-2 hover:bg-gray-100">Home</NavLink>
                <NavLink to="/all-contests" onClick={() => setMobileOpen(false)} className="px-4 py-2 hover:bg-gray-100">All Contests</NavLink>
                <NavLink to="/about-us" onClick={() => setMobileOpen(false)} className="px-4 py-2 hover:bg-gray-100">About Us</NavLink>
                <NavLink to="/leaderboard" onClick={() => setMobileOpen(false)} className="px-4 py-2 hover:bg-gray-100">Leaderboard</NavLink>
                <NavLink to="/contact-us" onClick={() => setMobileOpen(false)} className="px-4 py-2 hover:bg-gray-100">Contact Us</NavLink>
              </div>
            )}
          </div>

          {User ? (
            <div className="relative" ref={profileRef}>
              <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center gap-3">
                <img src={User.photoURL} alt="user" className="w-10 h-10 rounded-full border object-cover" />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-white shadow-xl rounded-xl p-4 z-50 border border-gray-100">
                  {isLoading ? (
                    <p className='text-sm text-gray-500 text-center py-2'>Loading...</p>
                  ) : error ? (
                    <p className='text-xs text-red-500 text-center'>{error?.message || "Error"}</p>
                  ) : (
                    <>
                      <div className="flex items-center gap-3 mb-3 border-b pb-3">
                        <img src={User.photoURL} alt="u" className="w-10 h-10 rounded-full object-cover" />
                        <div className="overflow-hidden">
                          <p className="font-semibold text-gray-800 text-sm truncate">{User.displayName || User.email}</p>
                          <p className="text-xs text-blue-600 bg-blue-50 px-2 rounded-full inline-block uppercase font-bold">{realuser?.role || "User"}</p>
                        </div>
                      </div>
                      <Link to="/dashboard" onClick={() => setProfileOpen(false)} className="block py-2 px-2 text-sm rounded-md hover:bg-gray-100">Dashboard</Link>
                      <button onClick={handleLogout} className="w-full text-left mt-1 py-2 px-2 text-sm rounded-md hover:bg-red-50 hover:text-red-600 font-medium transition">
                        Logout
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          ) : (
            <Link to="/login"><Primarybtn>Login</Primarybtn></Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;