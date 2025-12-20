import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { FaCheck, FaTimes, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';

const Managecontest = () => {
    const { data: all_contests = [], isLoading, refetch } = useQuery({
        queryKey: ['ManageContest'],
        queryFn: () => fetch("http://localhost:3000/All-contests").then(res => res.json())
    });

    const handleStatus = async (id, status) => {
        const res = await fetch(`http://localhost:3000/contest-status/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status })
        });
        if (res.ok) {
            refetch();
            Swal.fire({
                icon: "success",
                title: `Contest ${status}ed`,
                showConfirmButton: false,
                timer: 1500
            });

        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen bg-white">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
            </div>
        );
    }



    const handledelete = async (id) => {
        console.log(id)
        try {
            const res = await fetch(`http://localhost:3000/contests/${id}`, {
                method: "DELETE"
            })
            if (res.ok) {
                Swal.fire({
                    title: "Deleted!",
                    text: "The contest has been deleted.",
                    icon: "success"
                })
                refetch()
            }
        }
        catch (err) {
            console.log(err)
            Swal.fire({
                title: "Error",
                text: "The contest was not deleted.",
                icon: "error"
            })
        }
    }

    return (
        <div className="h-[100dvh] flex flex-col bg-gray-50 overflow-hidden w-full p-2 md:p-6">
            <div className="mb-4 shrink-0">
                <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800">
                    Manage <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">Contests</span>
                </h2>
            </div>

            <div className="flex-1 bg-white rounded-2xl shadow-xl border border-gray-100 flex flex-col overflow-hidden">
                <div className="overflow-auto flex-1 custom-scrollbar">
                    <table className="w-full text-left min-w-[800px] border-separate border-spacing-0">
                        <thead className="sticky top-0 z-20">
                            <tr className="bg-blue-600">
                                <th className="px-6 py-4 text-xs font-bold text-white uppercase tracking-wider rounded-tl-2xl">Contest Name</th>
                                <th className="px-6 py-4 text-xs font-bold text-white uppercase tracking-wider">Type</th>
                                <th className="px-6 py-4 text-xs font-bold text-white uppercase tracking-wider">Entry/Prize</th>
                                <th className="px-6 py-4 text-xs font-bold text-white uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-white uppercase tracking-wider text-center rounded-tr-2xl">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {all_contests.map((contest) => (
                                <tr key={contest._id} className="hover:bg-blue-50/40 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="font-bold text-gray-800 text-sm truncate max-w-[200px]">{contest.name}</span>
                                            <span className="text-[10px] text-gray-400 truncate max-w-[200px]">{contest.creatorEmail}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded-md whitespace-nowrap">
                                            {contest.contestType}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-xs font-semibold whitespace-nowrap">
                                        <div className="text-emerald-600 font-bold">Entry: ${contest.entryFee}</div>
                                        <div className="text-purple-600 font-bold">Prize: ${contest.prizeMoney}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full border whitespace-nowrap ${contest.status === 'approve' ? 'bg-green-50 text-green-700 border-green-200' :
                                            contest.status === 'reject' ? 'bg-red-50 text-red-700 border-red-200' :
                                                'bg-amber-50 text-amber-700 border-amber-200'
                                            }`}>
                                            {contest.status || "Pending"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex justify-center gap-2">
                                            <button
                                                onClick={() => handleStatus(contest._id, 'approve')}
                                                disabled={contest.status === 'approve'}
                                                className={`p-2 rounded-lg transition-all shadow-sm ${contest.status === 'approve' ? 'bg-gray-100 text-gray-300' : 'bg-green-50 text-green-600 hover:bg-green-600 hover:text-white'}`}
                                            >
                                                <FaCheck size={14} />
                                            </button>
                                            <button
                                                onClick={() => handleStatus(contest._id, 'reject')}
                                                disabled={contest.status === 'reject'}
                                                className={`p-2 rounded-lg transition-all shadow-sm ${contest.status === 'reject' ? 'bg-gray-100 text-gray-300' : 'bg-amber-50 text-amber-600 hover:bg-amber-600 hover:text-white'}`}
                                            >
                                                <FaTimes size={14} />
                                            </button>
                                            <button onClick={() => handledelete(contest._id)} className="p-2 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-600 hover:text-white transition-all shadow-sm">
                                                <FaTrash size={14} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>


        </div>
    );
};

export default Managecontest;