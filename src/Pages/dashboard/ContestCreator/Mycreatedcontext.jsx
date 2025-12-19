import React from 'react';
import Useauth from '../../../Component/Useauth';
import { useQuery } from '@tanstack/react-query';

const Mycreatedcontext = () => {
    const { User } = Useauth();

    const { data: contests = [], isLoading, error } = useQuery({
        queryKey: ["My-contests", User?.email],
        enabled: !!User?.email,
        queryFn: async () => {
            const res = await fetch(`http://localhost:3000/contests/${User.email}`);
            return res.json();
        }
    });

    if (error) return <div className="min-h-screen flex items-center justify-center text-red-600 font-bold text-2xl">Something went wrong!</div>;
    
    if (isLoading) return <div className="min-h-screen flex items-center justify-center text-2xl font-semibold text-blue-600 animate-pulse">Loading ....</div>;

    return (
        <div className="w-full mx-auto p-6  min-h-screen">
            <div className="mb-8">
                <h2 className="text-3xl font-extrabold text-gray-800">My Created Contests</h2>
                <p className="text-gray-500 mt-2">Manage and monitor all your added contests in one place.</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase">Contest Name</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase">Creator Email</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase text-center">Status</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase">Created Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {contests.length > 0 ? (
                                contests.map((contest) => (
                                    <tr key={contest._id} className="hover:bg-blue-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <span className="font-medium text-gray-900">{contest.name}</span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600 italic">
                                            {contest.creatorEmail}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                                                contest.status === 'approve' 
                                                ? 'bg-green-100 text-green-700' 
                                                : 'bg-yellow-100 text-yellow-700'
                                            }`}>
                                                {contest.status || 'Pending'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-500 text-sm">
                                            {new Date(contest.createdAt).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="px-6 py-10 text-center text-gray-400">No contests created yet.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Mycreatedcontext;