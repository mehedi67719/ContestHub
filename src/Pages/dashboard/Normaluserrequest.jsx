import React, { useState } from 'react';
import { FaShieldAlt, FaPenNib, FaPaperPlane } from 'react-icons/fa';
import Swal from 'sweetalert2';
import Primarybtn from '../../Component/Primarybtn';

const NormalUserRequest = () => {
    const [requestType, setRequestType] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

      
        setTimeout(() => {
            setLoading(false);
            Swal.fire({
                title: "Request Sent!",
                text: `Your application for ${requestType} has been submitted.`,
                icon: "success",
                confirmButtonColor: "#3b82f6"
            });
            setRequestType(null);
        }, 1500);
    };

    return (
        <div className="min-h-screen w-full bg-gray-50/50">
            <div className="w-[90%] mx-auto pt-12 pb-8">
                <h1 className="text-4xl md:text-5xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                    Account Request Portal
                </h1>
                <p className="text-gray-500 text-center mt-4 text-lg max-w-2xl mx-auto">
                    Choose your desired role and submit your application to get specialized access.
                </p>
            </div>

            <div className="w-[90%] mx-auto pb-20">
                <div className="flex flex-col lg:flex-row gap-8 items-start">
                    

                    <div className="w-full lg:w-2/5 grid grid-cols-1 gap-6">
                  
                        <div 
                            onClick={() => setRequestType('Admin')}
                            className={`group p-8 rounded-3xl cursor-pointer border-2 transition-all duration-300 shadow-sm ${
                                requestType === 'Admin' 
                                ? 'border-blue-500 bg-blue-50/50 shadow-blue-100 shadow-xl scale-[1.02]' 
                                : 'border-white bg-white hover:border-blue-200 hover:shadow-lg'
                            }`}
                        >
                            <div className="flex items-center gap-5">
                                <div className={`h-16 w-16 rounded-2xl flex items-center justify-center text-3xl transition-colors ${requestType === 'Admin' ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white'}`}>
                                    <FaShieldAlt />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-800">Admin Role</h3>
                                    <p className="text-blue-600 font-medium text-sm">System Management</p>
                                </div>
                            </div>
                            <p className="mt-4 text-gray-600 leading-relaxed">
                                Request administrative access to manage contests, users, and overall system configuration.
                            </p>
                        </div>

                
                        <div 
                            onClick={() => setRequestType('Creator')}
                            className={`group p-8 rounded-3xl cursor-pointer border-2 transition-all duration-300 shadow-sm ${
                                requestType === 'Creator' 
                                ? 'border-purple-500 bg-purple-50/50 shadow-purple-100 shadow-xl scale-[1.02]' 
                                : 'border-white bg-white hover:border-purple-200 hover:shadow-lg'
                            }`}
                        >
                            <div className="flex items-center gap-5">
                                <div className={`h-16 w-16 rounded-2xl flex items-center justify-center text-3xl transition-colors ${requestType === 'Creator' ? 'bg-purple-600 text-white' : 'bg-purple-100 text-purple-600 group-hover:bg-purple-600 group-hover:text-white'}`}>
                                    <FaPenNib />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-800">Creator Role</h3>
                                    <p className="text-purple-600 font-medium text-sm">Contest Management</p>
                                </div>
                            </div>
                            <p className="mt-4 text-gray-600 leading-relaxed">
                                Apply to become a creator to host your own contests and manage participant submissions.
                            </p>
                        </div>
                    </div>

                  
                    <div className="w-full lg:w-3/5">
                        {requestType ? (
                            <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className={`h-3 w-full bg-gradient-to-r ${requestType === 'Admin' ? 'from-blue-500 to-blue-700' : 'from-purple-500 to-purple-700'}`}></div>
                                
                                <form onSubmit={handleSubmit} className="p-10">
                                    <div className="flex items-center gap-3 mb-8">
                                        <FaPaperPlane className={requestType === 'Admin' ? 'text-blue-600' : 'text-purple-600'} />
                                        <h2 className="text-2xl font-bold text-gray-800">Application for {requestType}</h2>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="col-span-2">
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                                            <input 
                                                type="text" 
                                                required
                                                placeholder={`Why do you want to be an ${requestType}?`}
                                                className="w-full px-5 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                                            />
                                        </div>

                                        <div className="col-span-2">
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Cover Letter / Detailed Reason</label>
                                            <textarea 
                                                required
                                                rows="6"
                                                placeholder="Describe your experience and why we should approve your request..."
                                                className="w-full px-5 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                                            ></textarea>
                                        </div>
                                    </div>

                                    <div className="mt-10 flex flex-col sm:flex-row items-center justify-end gap-4">
                                        <button 
                                            type="button"
                                            onClick={() => setRequestType(null)}
                                            className="text-gray-400 font-bold hover:text-red-500 transition-colors px-6 py-2"
                                        >
                                            Cancel Request
                                        </button>
                                        <Primarybtn className="px-12 py-4 text-lg">
                                            {loading ? "Processing..." : "Submit Application"}
                                        </Primarybtn>
                                    </div>
                                </form>
                            </div>
                        ) : (
                            <div className="h-full min-h-[450px] border-4 border-dashed border-gray-200 rounded-[2.5rem] flex flex-col items-center justify-center p-12 text-center bg-white/50">
                                <div className="bg-white p-6 rounded-full shadow-sm mb-6">
                                    <FaPaperPlane className="text-5xl text-gray-300 animate-bounce" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-400">No Category Selected</h3>
                                <p className="text-gray-400 mt-2 max-w-sm">
                                    Please select a role from the left side to begin your application process.
                                </p>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default NormalUserRequest;