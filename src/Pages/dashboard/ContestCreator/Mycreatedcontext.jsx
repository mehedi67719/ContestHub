import React from 'react';
import Useauth from '../../../Component/Useauth';
import { useQuery } from '@tanstack/react-query';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import Primarybtn from '../../../Component/Primarybtn';

const Mycreatedcontext = () => {
    const { User } = Useauth();
    const navigate = useNavigate();

    const { data: contests = [], isLoading, refetch, error } = useQuery({
        queryKey: ['My-contests', User?.email],
        enabled: !!User?.email,
        queryFn: async () => {
            const res = await fetch(`http://localhost:3000/contests/user/${User.email}`);
            return res.json();
        }
    });

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center text-red-600 font-bold text-2xl">
                Something went wrong!
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-2xl font-semibold text-blue-600 animate-pulse">
                Loading ....
            </div>
        );
    }

    const handleedit = (id) => {
        navigate(`/dashboard/editcontest/${id}`);
    };

    const handledelete = async (id) => {
        try {
            const res = await fetch(`http://localhost:3000/contests/${id}`, {
                method: "DELETE"
            });
            if (res.ok) {
                Swal.fire({
                    title: "Deleted!",
                    text: "The contest has been deleted.",
                    icon: "success"
                });
                refetch();
            }
        } catch (err) {
            console.log(err);
            Swal.fire({
                title: "Error",
                text: "The contest was not deleted.",
                icon: "error"
            });
        }
    };

    const seesubmission = (id) => {
        navigate(`/dashboard/See-single-contest-task/${id}`);
    };

    return (
        <div className="w-full mx-auto p-6 min-h-screen">
            <div className="mb-8">
                <h2 className="text-3xl font-extrabold text-gray-800">
                    My Created Contests
                </h2>
                <p className="text-gray-500 mt-2">
                    Manage and monitor all your added contests in one place.
                </p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase">
                                    Contest Name
                                </th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase">
                                    Creator Email
                                </th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase text-center">
                                    Status
                                </th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase">
                                    Created Date
                                </th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase">
                                    Edit / Delete
                                </th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase">
                                    Submission Tasks
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-100">
                            {contests.length > 0 ? (
                                contests.map((contest) => {
                                    const isDisabled =
                                        contest.status === 'approve' ||
                                        contest.status === 'reject';

                                    const isDeadlinePassed = new Date(contest.deadline) < new Date();

                                    return (
                                        <tr
                                            key={contest._id}
                                            className="hover:bg-blue-50/50 transition-colors"
                                        >
                                            <td className="px-6 py-4">
                                                <span className="font-medium text-gray-900">
                                                    {contest.name}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4 text-gray-600 italic">
                                                {contest.creatorEmail}
                                            </td>

                                            <td className="px-6 py-4 text-center">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                                                        contest.status === 'approve'
                                                            ? 'bg-green-100 text-green-700'
                                                            : contest.status === 'reject'
                                                                ? 'bg-red-100 text-red-700'
                                                                : 'bg-yellow-100 text-yellow-700'
                                                    }`}
                                                >
                                                    {contest.status || 'Pending'}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4 text-gray-500 text-sm">
                                                {new Date(contest.createdAt).toLocaleDateString()}
                                            </td>

                                            <td className="px-6 py-4 flex gap-2">
                                                <button
                                                    disabled={isDisabled}
                                                    onClick={() => handleedit(contest._id)}
                                                    className={`p-2 rounded ${
                                                        isDisabled
                                                            ? 'bg-gray-400 cursor-not-allowed'
                                                            : 'bg-yellow-500 hover:bg-yellow-600'
                                                    }`}
                                                >
                                                    <FaEdit />
                                                </button>

                                                <button
                                                    disabled={isDisabled}
                                                    onClick={() => handledelete(contest._id)}
                                                    className={`p-2 rounded text-white ${
                                                        isDisabled
                                                            ? 'bg-gray-400 cursor-not-allowed'
                                                            : 'bg-red-500 hover:bg-red-600'
                                                    }`}
                                                >
                                                    <MdDelete />
                                                </button>
                                            </td>

                                            <td>
                                                {(isDeadlinePassed && contest.status === 'approve') && (
                                                    <Primarybtn onClick={() => seesubmission(contest._id)}>
                                                        See Tasks
                                                    </Primarybtn>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td
                                        colSpan="6"
                                        className="px-6 py-10 text-center text-gray-400"
                                    >
                                        No contests created yet.
                                    </td>
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
