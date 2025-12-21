import React from 'react';
import Useauth from '../../Component/Useauth';
import { FaEdit, FaTrophy, FaUserCheck } from 'react-icons/fa';
import Primarybtn from '../../Component/Primarybtn';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';

const MYprofile = () => {
    const { User} = Useauth();


    const { isLoading, error, data: users = [] } = useQuery({
        queryKey: ['role-user'],
        queryFn: async () => {
            const res = await fetch('http://localhost:3000/user');
            return res.json();
        },
    });



    const {
        data: Contests = [],
        isLoading: participatedLoading
    } = useQuery({
        queryKey: ['paymenthistory', User?.email],
        enabled: !!User?.email,
        queryFn: () =>
            fetch(`http://localhost:3000/payment?email=${User.email}`)
                .then(res => res.json())
    });



    const { isLoading: loadingwin, error: err, data: win = [] } = useQuery({
        queryKey: ['win', User?.email],
        enabled: !!User?.email,
        queryFn: async () => {
            const res = await fetch(`http://localhost:3000/win/${User.email}`);
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        },
    });




    if (participatedLoading) {
        return <p className="text-center mt-10">Loading...</p>;
    }




    if (isLoading || loadingwin ) {
        return <p className='text-2xl text-gray-600 text-center'>Loading...</p>
    }


    if (error || err) {
        return <p className='text-red-500 text-center '>{error}</p>
    }


    const realuser = users?.find(u => u.email == User?.email);




    const participatedContests = Contests.length;
    const wonContests = win.length;
    const winPercentage = participatedContests > 0 ? ((wonContests / participatedContests) * 100).toFixed(1) : 0;


    return (
        <div className="py-12 space-y-12 w-full">
            <h1 className="text-4xl font-bold text-center text-gray-800">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                    My Profile
                </span>
            </h1>

            <div className="w-full mx-auto bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100">

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                    <div className="col-span-1 flex flex-col items-center p-6 bg-blue-50/50 rounded-2xl border border-blue-200 shadow-md">
                        <div className="relative mb-6">
                            <img
                                src={User?.photoURL || 'https://via.placeholder.com/150'}
                                alt={`${User?.displayName}'s Profile`}
                                className="w-32 h-32 rounded-full object-cover ring-4 ring-blue-500 ring-offset-4 ring-offset-white"
                            />
                            <span className="absolute bottom-0 right-0 bg-teal-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                                {realuser?.role || "Normal User "}
                            </span>
                        </div>

                        <h2 className="text-2xl font-extrabold text-gray-800 mb-1">{User?.displayName || 'ContestHub User'}</h2>
                        <p className="text-sm text-gray-600 mb-6">{User?.email || 'user@example.com'}</p>

                        <Primarybtn >
                            <Link to="/dashboard/updateprofile" className="flex justify-center">
                                <FaEdit className="mr-2" />
                                Update Profile
                            </Link>
                        </Primarybtn>
                    </div>

                    <div className="col-span-1 lg:col-span-2 space-y-6">

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                            <div className="p-5 bg-teal-50 rounded-2xl shadow-inner border border-teal-200 flex flex-col items-center">
                                <FaUserCheck className="w-8 h-8 text-teal-600 mb-2" />
                                <p className="text-3xl font-extrabold text-teal-800">{participatedContests}</p>
                                <p className="text-sm font-medium text-gray-600">Total Participated</p>
                            </div>

                            <div className="p-5 bg-yellow-50 rounded-2xl shadow-inner border border-yellow-200 flex flex-col items-center">
                                <FaTrophy className="w-8 h-8 text-yellow-600 mb-2" />
                                <p className="text-3xl font-extrabold text-yellow-800">{wonContests}</p>
                                <p className="text-sm font-medium text-gray-600">Contests Won</p>
                            </div>

                            <div className="p-5 bg-purple-50 rounded-2xl shadow-inner border border-purple-200 flex flex-col items-center">
                                <span className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                                    {winPercentage}%
                                </span>
                                <p className="text-sm font-medium text-gray-600">Win Percentage</p>
                            </div>
                        </div>

                        <div className="p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">Win Rate Progress</h3>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                                <div
                                    className="h-3 rounded-full bg-gradient-to-r from-teal-500 to-blue-500 transition-all duration-1000"
                                    style={{ width: `${winPercentage}%` }}
                                ></div>
                            </div>
                        </div>

                        <div className="p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">Additional Information</h3>
                            <p className="text-gray-600 text-sm">
                                Your address, bio, and other custom fields will be managed and updated here.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MYprofile;