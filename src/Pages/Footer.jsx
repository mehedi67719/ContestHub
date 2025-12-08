import React from "react";
import logo from "../assets/Logo.avif";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-800 py-10 border-t border-gray-200">
      <div className="w-[90%] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <img src={logo} alt="logo" className="w-10 h-10 rounded-md object-cover" />
            <span className="text-2xl font-semibold tracking-wide">ContestHub</span>
          </div>
          <p className="text-gray-600 text-sm max-w-sm">
            ContestHub is your ultimate platform to create, participate, and manage creative contests. 
            Explore top contests, showcase your talent, and celebrate achievements with our vibrant community.
          </p>
          <div className="flex gap-4 mt-2 text-gray-600">
            <a href="https://facebook.com" target="_blank" className="hover:text-blue-600 transition"><FaFacebookF /></a>
            <a href="https://linkedin.com" target="_blank" className="hover:text-blue-600 transition"><FaLinkedinIn /></a>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-semibold text-lg">Quick Links</h3>
          <a href="/" className="hover:text-blue-600 transition">Home</a>
          <a href="/all-contests" className="hover:text-blue-600 transition">All Contests</a>
          <a href="/extra" className="hover:text-blue-600 transition">Extra Section</a>
          <a href="/leaderboard" className="hover:text-blue-600 transition">Leaderboard</a>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-semibold text-lg">Contact</h3>
          <p>Email: support@contesthub.com</p>
          <p>Phone: +880 123 456 789</p>
          <p>Address: Dhaka, Bangladesh</p>
        </div>
      </div>

      <div className="mt-10 text-center pt-5 text-gray-500 text-sm">
        &copy; 2025 ContestHub. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
