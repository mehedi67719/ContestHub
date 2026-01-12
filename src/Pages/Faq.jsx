import React from 'react';
import { Link } from 'react-router-dom';
import Primarybtn from '../Component/Primarybtn';

const Faq = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-center mb-12 text-gray-800">Frequently Asked Questions</h1>
      
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">What is ContestHub?</h3>
          <p className="text-gray-600">ContestHub is a platform where creators can participate in contests, showcase their talents, and win amazing prizes. It also allows contest creators to host and manage their own contests.</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">How do I join a contest?</h3>
          <p className="text-gray-600">Simply browse our contests, select one you like, pay the entry fee, and submit your entry before the deadline. Make sure to read the contest guidelines carefully before participating.</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">How are winners chosen?</h3>
          <p className="text-gray-600">Winners are chosen by our expert panel based on creativity, quality, and adherence to contest guidelines. The judging criteria are clearly outlined in each contest description.</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Can I host my own contest?</h3>
          <p className="text-gray-600">Yes! As a verified user, you can create and host your own contests to engage the community. Simply navigate to the 'Create Contest' section in your dashboard.</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">What payment methods do you accept?</h3>
          <p className="text-gray-600">We accept all major credit cards, PayPal, and various digital payment methods. Your payment information is securely processed through our trusted payment partners.</p>
        </div>
      </div>
      
      <div className="mt-12 text-center">
        <Link to="/contact-us">
          <Primarybtn>Still Have Questions? Contact Us</Primarybtn>
        </Link>
      </div>
    </div>
  );
};

export default Faq;