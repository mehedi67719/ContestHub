import React from 'react';
import { Link } from 'react-router-dom';
import Primarybtn from '../Component/Primarybtn';
import { FaQuestionCircle, FaComments, FaEnvelope, FaPhone } from 'react-icons/fa';

const HelpCenter = () => {
  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-center mb-4 text-gray-800">Help Center</h1>
      <p className="text-center text-gray-600 mb-12">Find answers to common questions or get in touch with our support team</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <div className="text-blue-600 text-3xl mb-4">
            <FaQuestionCircle />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">FAQ</h3>
          <p className="text-gray-600 mb-4">Find answers to common questions about using ContestHub</p>
          <Link to="/faq">
            <Primarybtn className="px-4 py-2">View FAQ</Primarybtn>
          </Link>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <div className="text-green-600 text-3xl mb-4">
            <FaComments />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Community Support</h3>
          <p className="text-gray-600 mb-4">Get help from our community of users and experts</p>
          <Link to="/community">
            <Primarybtn className="px-4 py-2">Visit Community</Primarybtn>
          </Link>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <div className="text-purple-600 text-3xl mb-4">
            <FaEnvelope />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Email Support</h3>
          <p className="text-gray-600 mb-4">Contact our support team directly via email</p>
          <a href="mailto:support@contesthub.com">
            <Primarybtn className="px-4 py-2">Email Support</Primarybtn>
          </a>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-xl mb-12">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">How can we help you?</h2>
        <div className="max-w-2xl mx-auto">
          <input 
            type="text" 
            placeholder="Search help topics..." 
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-2">Getting Started</h3>
              <ul className="text-gray-600 space-y-1">
                <li className="hover:text-blue-600 cursor-pointer">Creating an account</li>
                <li className="hover:text-blue-600 cursor-pointer">Setting up your profile</li>
                <li className="hover:text-blue-600 cursor-pointer">Understanding the dashboard</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-2">Contests</h3>
              <ul className="text-gray-600 space-y-1">
                <li className="hover:text-blue-600 cursor-pointer">Finding contests</li>
                <li className="hover:text-blue-600 cursor-pointer">Submitting entries</li>
                <li className="hover:text-blue-600 cursor-pointer">Judging process</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-center mb-12">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Still need help?</h2>
        <p className="text-gray-600 mb-6">Our support team is here to assist you</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <div className="flex items-center gap-2 bg-white p-4 rounded-lg shadow-md">
            <FaPhone className="text-blue-600" />
            <span className="text-gray-700">+880 123 456 789</span>
          </div>
          <div className="flex items-center gap-2 bg-white p-4 rounded-lg shadow-md">
            <FaEnvelope className="text-blue-600" />
            <span className="text-gray-700">support@contesthub.com</span>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Contact Support</h2>
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input 
              type="text" 
              placeholder="Your name" 
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input 
              type="email" 
              placeholder="Your email" 
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Select a topic</option>
            <option>Account Issues</option>
            <option>Payment Problems</option>
            <option>Contest Issues</option>
            <option>Technical Support</option>
            <option>Other</option>
          </select>
          <textarea 
            rows="5" 
            placeholder="Describe your issue in detail" 
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
          <div className="text-center">
            <Primarybtn>Send Message</Primarybtn>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HelpCenter;