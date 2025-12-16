import React, { useEffect, useState } from 'react';
import { data, Link, useParams } from 'react-router';
import Primarybtn from '../Component/Primarybtn';
import { useQuery } from '@tanstack/react-query';
import Useauth from '../Component/Useauth';
import Swal from 'sweetalert2';

const Viewdetels = () => {
    const { id } = useParams();
    const { User } = Useauth();
    const [timeLeft, setTimeLeft] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [taskLink, setTaskLink] = useState('');
    const [message, setMessage] = useState('');

    const { data: contests = [], isLoading, error } = useQuery({
        queryKey: ["All-contest"],
        queryFn: async () => {
            const res = await fetch("http://localhost:3000/contests");
            return res.json();
        }
    });

    useEffect(() => {
        const interval = setInterval(() => {
            const contest = contests.find(d => d._id === id);
            if (contest) {
                const now = new Date();
                const deadline = new Date(contest.deadline);
                const diff = deadline - now;
                if (diff <= 0) {
                    setTimeLeft('Contest Ended');
                } else {
                    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
                    const minutes = Math.floor((diff / (1000 * 60)) % 60);
                    const seconds = Math.floor((diff / 1000) % 60);
                    setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
                }
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [contests, id]);

    if (isLoading) return <p className='text-2xl font-bold text-center mt-20'>Loading...</p>;
    if (error) return <p className='text-2xl text-red-600 font-bold text-center'>Something went wrong!</p>;

    const contest = contests.find(d => d._id === id);
    if (!contest) return <p className='text-center text-red-500 text-xl mt-20'>Contest not found</p>;

    const isEnded = new Date(contest.deadline) < new Date();
    const isSubmitEnabled = contest.paymentstatus === "paid" && !isEnded;

    const handleOpenModal = () => {
        if (isSubmitEnabled) {
            setIsModalOpen(true);
        }
    };

    const handleSubmitTask = async () => {
        if (!taskLink) return;

        const task = {
            email: User.email,
            taskLink: taskLink,
            contest_id: contest._id
        };

        try {
            const res = await fetch("http://localhost:3000/tasks", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(task)
            });



            if (res.ok) {
                setMessage("Task submitted successfully!");
                Swal.fire({
                    icon: 'success',
                    title: 'Task submitted successfully!',

                })
                setTaskLink("");
                setIsModalOpen(false);
            } else {
                setMessage("Submission failed.");
            }
        } catch (err) {
            console.log(err);
            setMessage("Server error!");
            Swal.fire({
                icon: 'error',
                title: 'Server error!',
            })
        }
    };

    return (
        <div className="max-w-[90%] mx-auto py-10 space-y-10">
            <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="md:w-1/2 w-full">
                    <img src={contest.image} alt={contest.name} className="w-full h-full object-cover" />
                </div>
                <div className="md:w-1/2 w-full p-6 flex flex-col justify-between space-y-6">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4">{contest.name}</h1>
                        <div className="overflow-auto max-h-96 p-2 bg-gray-50 rounded-lg mb-3">
                            <p className="text-gray-700 mb-4">{contest.description}</p>
                            <p className="text-gray-700"><span className="font-semibold">Task:</span> {contest.taskInstruction}</p>
                        </div>
                        <div className="flex flex-wrap gap-3 mt-4">
                            <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-medium shadow-sm">Participants: {contest.participantsCount || 0}</div>
                            <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-medium shadow-sm">Prize: ${contest.prizeMoney || 0}</div>
                            <div className={`px-4 py-2 rounded-full font-medium shadow-sm ${isEnded ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-800'}`}>
                                {isEnded ? 'Contest Ended' : 'Ongoing'}
                            </div>
                            <div className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full font-medium shadow-sm">
                                Deadline: {new Date(contest.deadline).toLocaleDateString()}
                            </div>
                            {!isEnded && (
                                <div className="bg-pink-100 text-pink-800 px-4 py-2 rounded-full font-medium shadow-sm">
                                    Time Left: {timeLeft}
                                </div>
                            )}
                        </div>
                    </div>

                    {contest.winnerId && isEnded && (
                        <div className="bg-yellow-50 p-4 rounded-xl shadow flex items-center gap-4 animate-pulse">
                            <p className="font-semibold text-gray-800">
                                Winner: {contest.winnerId}
                            </p>
                        </div>
                    )}

                    <div className="flex flex-col md:flex-row gap-4 mt-4">
                        {isEnded || contest.paymentstatus === "paid" ? (
                            <Primarybtn className="w-full md:w-auto bg-gray-400 cursor-not-allowed" disabled>
                                {isEnded ? 'Contest Ended' : 'Already Paid'}
                            </Primarybtn>
                        ) : (
                            <Link to={`/payment/${contest._id}`}>
                                <Primarybtn className="w-full md:w-auto">Register</Primarybtn>
                            </Link>
                        )}

                        <Primarybtn
                            className={`w-full md:w-auto ${!isSubmitEnabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
                            disabled={!isSubmitEnabled}
                            onClick={handleOpenModal}
                        >
                            Submit Task
                        </Primarybtn>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-2xl p-6 w-11/12 max-w-md mx-auto shadow-lg relative">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">Submit Your Task</h2>
                        <textarea
                            value={taskLink}
                            onChange={(e) => setTaskLink(e.target.value)}
                            placeholder="Paste your task link here..."
                            className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        ></textarea>
                        <div className="flex justify-end mt-4 gap-3">
                            <button
                                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                                onClick={handleSubmitTask}
                            >
                                Submit
                            </button>
                        </div>
                        {message && <p className="mt-2 text-green-600">{message}</p>}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Viewdetels;
