import React from "react";
import logo from "../assets/Logo.avif";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaGithub, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-800 py-16 border-t border-gray-200">
      <div className="w-[90%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <img src={logo} alt="logo" className="w-12 h-12 rounded-md object-cover" />
            <span className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">ContestHub</span>
          </div>
          <p className="text-gray-600 text-sm">
            Your ultimate platform to create, participate, and manage creative contests. 
            Showcase your talent and celebrate achievements with our vibrant community.
          </p>
          <div className="flex gap-4 mt-4">
            <a href="https://facebook.com/contesthub" target="_blank" rel="noopener noreferrer" className="bg-gray-100 hover:bg-blue-100 text-gray-800 hover:text-blue-600 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com/contesthub" target="_blank" rel="noopener noreferrer" className="bg-gray-100 hover:bg-blue-100 text-gray-800 hover:text-blue-400 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="https://instagram.com/contesthub" target="_blank" rel="noopener noreferrer" className="bg-gray-100 hover:bg-pink-100 text-gray-800 hover:text-pink-600 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com/company/contesthub" target="_blank" rel="noopener noreferrer" className="bg-gray-100 hover:bg-blue-100 text-gray-800 hover:text-blue-700 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300" aria-label="LinkedIn">
              <FaLinkedinIn />
            </a>
            <a href="https://github.com/contesthub" target="_blank" rel="noopener noreferrer" className="bg-gray-100 hover:bg-gray-200 text-gray-800 hover:text-gray-600 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300" aria-label="GitHub">
              <FaGithub />
            </a>
            <a href="https://youtube.com/contesthub" target="_blank" rel="noopener noreferrer" className="bg-gray-100 hover:bg-red-100 text-gray-800 hover:text-red-600 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300" aria-label="YouTube">
              <FaYoutube />
            </a>
          </div>
        </div>


        <div className="flex flex-col gap-4">
          <h3 className="font-semibold text-lg text-gray-800">Quick Links</h3>
          <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">Home</Link>
          <Link to="/all-contests" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">All Contests</Link>
          <Link to="/about-us" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">About Us</Link>
          <Link to="/leaderboard" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">Leaderboard</Link>
          <Link to="/contact-us" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">Contact Us</Link>
        </div>


        <div className="flex flex-col gap-4">
          <h3 className="font-semibold text-lg text-gray-800">Resources</h3>
          <Link to="/faq" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">FAQ</Link>
          <Link to="/terms-and-conditions" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">Terms of Service</Link>
          <Link to="/privacy-policy" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">Privacy Policy</Link>
          <Link to="/help-center" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">Help Center</Link>
          <Link to="/blog" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">Blog</Link>
        </div>


        <div className="flex flex-col gap-4">
          <h3 className="font-semibold text-lg text-gray-800">Contact Us</h3>
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-gray-500 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
            <span className="text-gray-600">support@contesthub.com</span>
          </div>
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-gray-500 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
            </svg>
            <span className="text-gray-600">+880 123 456 789</span>
          </div>
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-gray-500 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            <span className="text-gray-600">Dhaka, Bangladesh</span>
          </div>
          <div className="mt-4">
            <h4 className="font-semibold text-gray-800 mb-2">Business Hours</h4>
            <p className="text-gray-600 text-sm">Mon-Fri: 9AM - 6PM</p>
            <p className="text-gray-600 text-sm">Sat-Sun: Closed</p>
          </div>
        </div>
      </div>

      <div className="mt-16 text-center pt-8 text-gray-500 text-sm border-t border-gray-200">
        <p>&copy; {new Date().getFullYear()} ContestHub. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
