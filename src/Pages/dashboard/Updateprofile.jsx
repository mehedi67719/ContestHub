import React from 'react';
import { FaCamera } from 'react-icons/fa';

const Updateprofile = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 w-full">
            <div className="  mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">

                <div className="bg-gradient-to-r from-blue-700 to-indigo-800 px-8 py-10">
                    <h2 className="text-3xl font-extrabold text-white">Profile Settings</h2>
                    <p className="text-blue-100 mt-2 font-light text-lg">Update your personal information and contact details</p>
                </div>

                <form className="p-6 md:p-10 space-y-10">

                    <div className="flex flex-col items-center md:flex-row md:space-x-8 border-b border-gray-100 pb-10">
                        <div className="relative group mb-4 md:mb-0">
                            <img
                                src="https://via.placeholder.com/150"
                                alt="User Profile"
                                className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-xl object-cover"
                            />
                            <label className="absolute text-white bottom-2 right-2 bg-blue-600 p-3 rounded-full cursor-pointer hover:bg-blue-700 transition-all shadow-lg transform hover:scale-110">
                                <FaCamera />
                            </label>
                        </div>
                        <div className="text-center md:text-left">
                            <h3 className="text-xl font-bold text-gray-800">Profile Picture</h3>
                            <p className="text-gray-500 text-sm mt-1">JPG, GIF or PNG. </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                        <div className="w-full">
                            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Full Name</label>
                            <input type="text" placeholder="John Doe" className="w-full px-4 py-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white shadow-sm" />
                        </div>

                        <div className="w-full">
                            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Phone Number</label>
                            <input type="tel" placeholder="+880 1XXX XXXXXX" className="w-full px-4 py-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition shadow-sm" />
                        </div>

                        <div className="w-full">
                            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Date of Birth</label>
                            <input type="date" className="w-full px-4 py-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition shadow-sm" />
                        </div>

                        <div className="w-full">
                            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Gender</label>
                            <select className="w-full px-4 py-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition shadow-sm bg-white cursor-pointer">
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div className="w-full lg:col-span-2">
                            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Email Address</label>
                            <input type="email" value="user@example.com" className="w-full px-4 py-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed outline-none font-medium" disabled />
                        </div>

                        <div className="w-full lg:col-span-3">
                            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Present Address</label>
                            <textarea rows="2" placeholder="Street name, House No, City" className="w-full px-4 py-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition shadow-sm resize-none"></textarea>
                        </div>

                        <div className="w-full lg:col-span-3">
                            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Permanent Address</label>
                            <textarea rows="2" placeholder="Village/Area, P.O., District" className="w-full px-4 py-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition shadow-sm resize-none"></textarea>
                        </div>

                        <div className="w-full">
                            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">LinkedIn Profile URL</label>
                            <input type="url" placeholder="https://linkedin.com/in/username" className="w-full px-4 py-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition shadow-sm" />
                        </div>

                        <div className="w-full">
                            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">GitHub Username</label>
                            <input type="text" placeholder="github_user" className="w-full px-4 py-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition shadow-sm" />
                        </div>

                        <div className="w-full">
                            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Emergency Contact</label>
                            <input type="tel" placeholder="Guardian's Number" className="w-full px-4 py-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition shadow-sm" />
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-end space-y-4 sm:space-y-0 sm:space-x-4 pt-10 border-t border-gray-100">
                        <button type="button" className="w-full sm:w-auto px-8 py-4 bg-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-200 transition-colors">
                            Discard Changes
                        </button>
                        <button type="submit" className="w-full sm:w-auto px-10 py-4 bg-blue-600 text-white font-extrabold rounded-xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 active:scale-95 transform">
                            Save Profile
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Updateprofile;