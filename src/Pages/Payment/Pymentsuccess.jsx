import React, { useEffect, useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { Link, useParams, useSearchParams } from 'react-router-dom';


const Pymentsuccess = () => {
    const { id } = useParams();
    const [searchparams] = useSearchParams()
    const session_id = searchparams.get('session_id');
    const [Transaction, setTransaction] = useState();
    const [tracking, settracking] = useState()
    // console.log(session_id)



    useEffect(() => {
        if (session_id) {
            fetch(`https://contesthub-server-pink.vercel.app/payment-success?session_id=${session_id}`)
                .then(res => res.json())
                .then(data => {
                    setTransaction(data.tranjectionid)
                    settracking(data.trackingid)
                })
        }
    }, [session_id])

    return (
        <div className="min-h-[70vh] flex items-center justify-center p-4 bg-gray-50">
            <div className="w-full max-w-lg bg-white p-8 md:p-12 rounded-2xl shadow-2xl border border-green-200 text-center transform transition duration-500 hover:scale-[1.01] hover:shadow-green-300/50">

                <FaCheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6 animate-pulse" />

                <h1 className="text-4xl font-extrabold text-gray-800 mb-3">
                    Payment Successful!
                </h1>

                <p className="text-xl text-green-600 font-semibold mb-6">
                    Your contest entry is confirmed.
                </p>

                <div className="bg-green-50 p-4 rounded-lg mb-8 border border-green-200">
                    <p className="text-sm font-medium text-gray-600">
                        Transaction ID: <span className="font-mono text-gray-700 select-all text-xs">{Transaction}</span>
                    </p>
                    <p className="text-sm font-medium text-gray-600 mt-1">
                        Contest ID: <span className="font-mono text-gray-700 text-xs">{id || 'Loading...'}</span>
                    </p>
                    <p className="text-sm font-medium text-gray-600 mt-1">
                        Tracking ID: <span className="font-mono text-gray-700 text-xs">{tracking}</span>
                    </p>
                </div>

                <div className="flex flex-col space-y-4">
                    <Link
                        to={`/contest/${id}`}
                        className="w-full px-6 py-3 text-lg font-semibold text-white bg-purple-600 rounded-lg shadow-md transition duration-300 hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-300"
                    >
                        View Contest Details
                    </Link>


                </div>
            </div>
        </div>
    );
};

export default Pymentsuccess;