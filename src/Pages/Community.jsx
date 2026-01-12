import React from 'react';
import { Link } from 'react-router-dom';
import Primarybtn from '../Component/Primarybtn';

const Community = () => {
  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-center mb-4 text-gray-800">Community Support</h1>
      <p className="text-center text-gray-600 mb-12">Connect with other creators and get help from our community</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Discussion Forums</h3>
          <p className="text-gray-600 mb-4">Join discussions on various topics related to contests, design, and creative work.</p>
          <Link to="/forums">
            <Primarybtn>Visit Forums</Primarybtn>
          </Link>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Q&A Section</h3>
          <p className="text-gray-600 mb-4">Ask questions and get answers from experienced community members.</p>
          <Link to="/qa">
            <Primarybtn>Ask a Question</Primarybtn>
          </Link>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Community Guidelines</h3>
          <p className="text-gray-600 mb-4">Learn about our community standards and how to contribute positively.</p>
          <Link to="/community-guidelines">
            <Primarybtn>Read Guidelines</Primarybtn>
          </Link>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-xl mb-12">
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">Popular Topics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-2">Getting Started</h3>
            <p className="text-gray-600 text-sm">Questions for new community members</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-2">Contest Tips</h3>
            <p className="text-gray-600 text-sm">Advice on participating in contests</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-2">Design Resources</h3>
            <p className="text-gray-600 text-sm">Tools and resources for designers</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-2">Feedback Requests</h3>
            <p className="text-gray-600 text-sm">Get feedback on your work</p>
          </div>
        </div>
      </div>
      
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Join Our Community</h2>
        <p className="text-gray-600 mb-6">Be part of a growing community of creative professionals</p>
        <Primarybtn>Sign Up for Community Access</Primarybtn>
      </div>
    </div>
  );
};

export default Community;