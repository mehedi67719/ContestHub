import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Useauth from '../../Component/Useauth';
import { LuWineOff } from 'react-icons/lu';

const Mywinner = () => {
    const { User } = Useauth();

    const { isLoading, error, data: win = [] } = useQuery({
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

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-600 mt-10">
                Something went wrong! Please try again later.
            </div>
        );
    }

    return (
        <div className="w-full  overflow-x-hidden my-10 px-4 md:px-8">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-800">
                    My <span className="text-blue-600">Winning</span> History
                </h2>
                <p className="text-gray-500 mt-2">Check all the contests you have won so far.</p>
            </div>

            <div className="overflow-hidden bg-white rounded-xl shadow-md border border-gray-200">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-blue-600 text-white">
                            <tr>
                                <th className="px-6 py-4 text-sm font-bold uppercase tracking-wider">
                                    Contest Name
                                </th>
                                <th className="px-6 py-4 text-sm font-bold uppercase tracking-wider">
                                    Winner Email
                                </th>
                                <th className="px-6 py-4 text-sm font-bold uppercase tracking-wider">
                                    Task ID
                                </th>
                                <th className="px-6 py-4 text-sm font-bold uppercase tracking-wider text-right">
                                    Prize Money
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-100 bg-white">
                            {win.length > 0 ? (
                                win.map((item) => (
                                    <tr key={item._id} className="hover:bg-blue-50 transition-colors">
                                        <td className="px-6 py-4 text-sm font-semibold text-gray-800">
                                            {item.contestname}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {item.winnerEmail}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-400 font-mono">
                                            {item.taskId}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-right font-bold text-emerald-600">
                                            ${item.price}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="px-6 py-20 text-center text-gray-400">
                                        <div className="flex flex-col items-center">
                                            <span className="text-4xl text-orange-400 mb-2"><LuWineOff /></span>
                                            <p className="text-lg">No wins recorded yet. Keep participating!</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {win.length > 0 && (
                <div className="mt-6 text-right">
                    <div className="inline-block bg-blue-50 border border-blue-100 p-4 rounded-lg">
                        <span className="text-gray-600 font-medium">Total Winnings: </span>
                        <span className="text-2xl font-black text-blue-700">
                            ${win.reduce((sum, item) => sum + parseInt(item.price || 0), 0)}
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Mywinner;