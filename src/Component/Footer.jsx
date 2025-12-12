import React from "react";
import logo from "../assets/Logo.avif";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-800 py-12 border-t border-gray-200">
      <div className="w-[90%] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
        <div className="flex flex-col gap-4 md:w-1/3">
          <div className="flex items-center gap-3">
            <img src={logo} alt="logo" className="w-12 h-12 rounded-md object-cover" />
            <span className="text-3xl font-bold tracking-wide">ContestHub</span>
          </div>
          <p className="text-gray-600 text-sm md:text-base">
            ContestHub is your ultimate platform to create, participate, and manage creative contests.
            Explore top contests, showcase your talent, and celebrate achievements with our vibrant community.
          </p>
          <div className="flex gap-5 mt-2 text-gray-600">
            <a href="https://facebook.com" target="_blank" className="hover:text-blue-600 transition text-lg"><FaFacebookF /></a>
            <a href="https://linkedin.com" target="_blank" className="hover:text-blue-600 transition text-lg"><FaLinkedinIn /></a>
          </div>
        </div>

        <div className="flex flex-col gap-4 md:w-1/4">
          <h3 className="font-semibold text-lg">Quick Links</h3>
          <a href="/" className="hover:text-blue-600 transition">Home</a>
          <a href="/all-contests" className="hover:text-blue-600 transition">All Contests</a>
          <a href="/about-us" className="hover:text-blue-600 transition">About Us</a>
          <a href="/leaderboard" className="hover:text-blue-600 transition">Leaderboard</a>
        </div>

        <div className="flex flex-col gap-4 md:w-1/4">
          <h3 className="font-semibold text-lg">Contact</h3>
          <p>Email: support@contesthub.com</p>
          <p>Phone: +880 123 456 789</p>
          <p>Address: Dhaka, Bangladesh</p>
        </div>
      </div>

      <div className="mt-12 text-center pt-6 text-gray-500 text-sm border-t border-gray-200">
        &copy; 2025 ContestHub. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
