import React from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGlobe, FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-start py-16 px-4">
      <div className="w-full max-w-[90%] bg-white rounded-xl shadow-lg p-8 md:p-12 flex flex-col gap-8">

        <h1 className="text-4xl font-bold text-gray-800">Contact Us</h1>
        <p className="text-gray-600">
          We're happy to hear from you! Reach out to us using the information below.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

      
          <div className="flex flex-col gap-6">
            <div className="flex items-start gap-4">
              <FaEnvelope className="text-blue-600 text-2xl mt-1" />
              <div>
                <h3 className="font-semibold text-gray-800">Email</h3>
                <p className="text-gray-600">meh67719@gmail.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <FaPhone className="text-green-600 text-2xl mt-1" />
              <div>
                <h3 className="font-semibold text-gray-800">Phone</h3>
                <p className="text-gray-600">+880 1747737704</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <FaMapMarkerAlt className="text-red-600 text-2xl mt-1" />
              <div>
                <h3 className="font-semibold text-gray-800">Address</h3>
                <p className="text-gray-600">123, Main Street, Jashore, Bangladesh</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <FaGlobe className="text-purple-600 text-2xl mt-1" />
              <div>
                <h3 className="font-semibold text-gray-800">Website</h3>
                <p className="text-gray-600"><a href="https://profound-rugelach-d9e61f.netlify.app/">Portfolio</a></p>
              </div>
            </div>

            
            <div className="flex items-center gap-6 mt-4">
              <a href="#" className="text-blue-600 hover:text-blue-800 text-2xl transition-colors">
                <FaFacebook />
              </a>
              <a href="#" className="text-blue-400 hover:text-blue-600 text-2xl transition-colors">
                <FaTwitter />
              </a>
              <a href="#" className="text-blue-700 hover:text-blue-900 text-2xl transition-colors">
                <FaLinkedin />
              </a>
            </div>
          </div>

         
          <div className="flex flex-col justify-center gap-4">
            <h2 className="text-2xl font-semibold text-gray-800">Office Hours</h2>
            <p className="text-gray-600">Monday to Friday, 9 AM to 6 PM</p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-4">Support Info</h2>
            <p className="text-gray-600">
              For urgent inquiries, please call our phone number. For general questions, email us and we will respond within 24 hours.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ContactUs;
