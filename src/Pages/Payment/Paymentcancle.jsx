import React from 'react';
import { GoXCircleFill } from 'react-icons/go';
import { Link, useParams } from 'react-router-dom';


const Paymentcancle = () => {
    const { id } = useParams();

    return (
        <div className="min-h-[70vh] flex items-center justify-center p-4 bg-gray-50">
            <div className="w-full max-w-lg bg-white p-8 md:p-12 rounded-2xl shadow-2xl border border-red-200 text-center transform transition duration-500 hover:scale-[1.01] hover:shadow-red-300/50">
                
                <GoXCircleFill className="w-20 h-20 text-red-500 mx-auto mb-6 animate-pulse" />

                <h1 className="text-4xl font-extrabold text-gray-800 mb-3">
                    Payment Failed or Canceled!
                </h1>
                
                <p className="text-xl text-red-600 font-semibold mb-6">
                    Your transaction was not completed.
                </p>

                <div className="bg-red-50 p-4 rounded-lg mb-8 border border-red-200 text-left">
                    <p className="text-sm font-medium text-gray-700 mb-2">
                        We apologize! Your payment process was cancelled or was unsuccessful.
                    </p>
                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                        <li>Please try again to complete the payment.</li>
                        <li>Try using an alternative payment method.</li>
                        <li>If funds were deducted, please check your bank statement.</li>
                    </ul>
                    <p className="text-xs font-medium text-gray-500 mt-2">
                         Contest ID: <span className="font-mono">{id || 'N/A'}</span>
                    </p>
                </div>

                <div className="flex flex-col space-y-4">
                    
                    <Link
                        to={`/payment/${id}`} 
                        className="w-full px-6 py-3 text-lg font-semibold text-white bg-red-600 rounded-lg shadow-md transition duration-300 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300"
                    >
                        Try Payment Again
                    </Link>
                    
                    <Link
                        to={`/contest/${id}`}
                        className="w-full px-6 py-3 text-lg font-semibold text-red-600 bg-white border border-red-600 rounded-lg transition duration-300 hover:bg-red-50 focus:outline-none focus:ring-4 focus:ring-red-100"
                    >
                        Back to Contest Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Paymentcancle;