import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Primarybtn from '../Component/Primarybtn';
import { useQuery } from '@tanstack/react-query';
import Useauth from '../Component/Useauth';
import Swal from 'sweetalert2';
import { GiPodiumWinner } from 'react-icons/gi';
import { FaUsers, FaClock, FaDollarSign, FaStar, FaCalendarAlt, FaTag, FaGlobe } from 'react-icons/fa';

const Viewdetels = () => {
    const { id } = useParams();
    const { User } = Useauth();
    const [timeLeft, setTimeLeft] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [taskLink, setTaskLink] = useState('');
    const [message, setMessage] = useState('');

    const { data: contests = [], isLoading, error } = useQuery({
        queryKey: ["All-contest"],
        queryFn: async () => fetch("https://contesthub-server-pink.vercel.app/contests").then(res => res.json())
    });

    const { data: users = [], isLoading: userLoading } = useQuery({
        queryKey: ['ManageUser'],
        queryFn: () =>
          fetch("https://contesthub-server-pink.vercel.app/user").then(res => res.json())
    });

    const { data: paymenthistory = [], isLoading: participatedLoading } = useQuery({
        queryKey: ['paymenthistory', User?.email],
        enabled: !!User?.email,
        queryFn: () => fetch(`https://contesthub-server-pink.vercel.app/payment?email=${User.email}`).then(res => res.json())
    });

    const contest = contests.find(d => d._id === id);
    const isEnded = contest ? new Date(contest.deadline) < new Date() : false;

    const { data: win = [], isLoading: winloading } = useQuery({
        queryKey: ['contest-win', id],
        queryFn: () => fetch(`https://contesthub-server-pink.vercel.app/win/contest/${id}`).then(res => res.json()),
        enabled:  isEnded
    });

    useEffect(() => {
        if (!contest) return;
        const interval = setInterval(() => {
            const now = new Date();
            const deadline = new Date(contest.deadline);
            const diff = deadline - now;
            if (diff <= 0) setTimeLeft('Contest Ended');
            else {
                const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((diff / (1000 * 60)) % 60);
                const seconds = Math.floor((diff / 1000) % 60);
                setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [contest]);

    if (isLoading || participatedLoading || winloading || userLoading) return <p className="text-center mt-10">Loading...</p>;
    if (error) return <p className='text-2xl text-red-600 font-bold text-center'>Something went wrong!</p>;
    if (!contest) return <p className='text-center text-red-500 text-xl mt-20'>Contest not found</p>;

    const filterpayment = paymenthistory.find(p => p.contest_id === contest._id);
    const isSubmitEnabled = filterpayment?.payment_status === "paid" && !isEnded;

    const handleOpenModal = () => { if (isSubmitEnabled) setIsModalOpen(true); };
    const handleSubmitTask = async () => {
        if (!taskLink) return;
        const task = { user_email: User.email, taskLink, contest_id: contest._id };
        try {
            const res = await fetch("https://contesthub-server-pink.vercel.app/tasks", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(task)
            });
            const data = await res.json();
            if (res.ok) {
                setMessage("Task submitted successfully!");
                Swal.fire({ icon: 'success', title: 'Task submitted successfully!' });
                setTaskLink("");
                setIsModalOpen(false);
            } else {
                Swal.fire({ icon: "warning", title: 'Submission Failed', text: data.message || 'You may have already submitted this task.' });
            }
        } catch (err) {
            console.log(err);
            setMessage("Server error!");
            Swal.fire({ icon: 'error', title: 'Server error!' });
        }
    };

    const winnerUsers = win.map(w => {
        return users.find(u => u.email === w.winnerEmail);
    }).filter(Boolean);

    const mockReviews = [
        { id: 1, user: 'John Doe', rating: 5, comment: 'Great contest with clear instructions and fair judging process.', date: '2025-12-15' },
        { id: 2, user: 'Sarah Johnson', rating: 4, comment: 'Enjoyed participating. The prize money was a great motivation.', date: '2025-12-10' },
        { id: 3, user: 'Michael Chen', rating: 5, comment: 'Well organized contest with excellent support team.', date: '2025-12-05' },
    ];
    

    const relatedContests = contests.filter(c => c._id !== id && c.contestType === contest.contestType).slice(0, 4);
    
    return (
        <div className="max-w-[95%] xl:max-w-7xl mx-auto py-10 space-y-10">
            {/* Main Contest Header */}
            <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="md:w-1/2 w-full">
                    <img src={contest.image} alt={contest.name} className="w-full h-full object-cover" />
                </div>
                <div className="md:w-1/2 w-full p-6 flex flex-col justify-between space-y-6">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4">{contest.name}</h1>
                        <div className="flex flex-wrap gap-3 mb-4">
                            <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-medium shadow-sm flex items-center gap-2">
                                <FaUsers className="text-blue-600" /> Participants: {contest.participantsCount || 0}
                            </div>
                            <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-medium shadow-sm flex items-center gap-2">
                                <FaDollarSign className="text-green-600" /> Prize: ${contest.prizeMoney || 0}
                            </div>
                            <div className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full font-medium shadow-sm flex items-center gap-2">
                                <FaCalendarAlt className="text-purple-600" /> Deadline: {new Date(contest.deadline).toLocaleDateString()}
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <div className={`px-4 py-2 rounded-full font-medium shadow-sm flex items-center gap-2 ${isEnded ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-800'}`}>
                                <FaClock className="text-yellow-600" /> {isEnded ? 'Contest Ended' : 'Ongoing'}
                            </div>
                            {!isEnded && <div className="bg-pink-100 text-pink-800 px-4 py-2 rounded-full font-medium shadow-sm flex items-center gap-2">
                                <FaClock className="text-pink-600" /> Time Left: {timeLeft}
                            </div>}
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 mt-4">
                        {isEnded || filterpayment?.payment_status === "paid" ? (
                            <Primarybtn className="w-full md:w-auto bg-gray-400 cursor-not-allowed" disabled>
                                {isEnded ? 'Contest Ended' : 'Already Participated'}
                            </Primarybtn>
                        ) : (
                            <Link to={`/payment/${contest._id}`}>
                                <Primarybtn className="w-full md:w-auto">Join Contest</Primarybtn>
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

            {/* Description / Overview Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <FaTag className="text-blue-600" /> Description & Overview
                </h2>
                <div className="prose max-w-none">
                    <p className="text-gray-700 mb-4">{contest.description}</p>
                    <div className="mt-4">
                        <h3 className="font-semibold text-gray-800 mb-2">Task Instructions:</h3>
                        <p className="text-gray-700">{contest.taskInstruction}</p>
                    </div>
                    <div className="mt-4">
                        <h3 className="font-semibold text-gray-800 mb-2">Eligibility:</h3>
                        <p className="text-gray-700">{contest.eligibility || 'Open to all participants.'}</p>
                    </div>
                    <div className="mt-4">
                        <h3 className="font-semibold text-gray-800 mb-2">Rules:</h3>
                        <p className="text-gray-700">{contest.rules || 'Follow standard contest guidelines.'}</p>
                    </div>
                </div>
            </div>

            {/* Key Information / Specifications Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <FaGlobe className="text-green-600" /> Key Information & Specifications
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-semibold text-gray-800 mb-2">Entry Fee</h3>
                        <p className="text-2xl font-bold text-blue-600">${contest.entryFee || 0}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-semibold text-gray-800 mb-2">Total Prize</h3>
                        <p className="text-2xl font-bold text-green-600">${contest.prizeMoney || 0}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-semibold text-gray-800 mb-2">Participants</h3>
                        <p className="text-2xl font-bold text-purple-600">{contest.participantsCount || 0}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-semibold text-gray-800 mb-2">Contest Type</h3>
                        <p className="text-xl font-bold text-yellow-600">{contest.contestType}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-semibold text-gray-800 mb-2">Start Date</h3>
                        <p className="text-lg font-medium text-gray-700">{new Date(contest.startDate || contest.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-semibold text-gray-800 mb-2">End Date</h3>
                        <p className="text-lg font-medium text-gray-700">{new Date(contest.deadline).toLocaleDateString()}</p>
                    </div>
                </div>
            </div>

            {/* Reviews / Ratings Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <FaStar className="text-yellow-500" /> Reviews & Ratings
                </h2>
                <div className="space-y-4">
                    {mockReviews.map((review) => (
                        <div key={review.id} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-semibold">
                                        {review.user.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-800">{review.user}</h4>
                                        <div className="flex items-center gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <FaStar key={i} className={`${i < review.rating ? 'text-yellow-500' : 'text-gray-300'} text-sm`} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <span className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</span>
                            </div>
                            <p className="text-gray-600">{review.comment}</p>
                        </div>
                    ))}
                </div>
                
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-semibold text-gray-800 mb-2">Overall Rating</h3>
                    <div className="flex items-center gap-4">
                        <div className="text-3xl font-bold text-blue-600">4.7</div>
                        <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                                <FaStar key={i} className={`${i < 5 ? 'text-yellow-500' : 'text-gray-300'}`} />
                            ))}
                        </div>
                        <span className="text-gray-600">(Based on 128 reviews)</span>
                    </div>
                </div>
            </div>

            {/* Related Items Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <FaGlobe className="text-indigo-600" /> Related Contests
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {relatedContests.length > 0 ? (
                        relatedContests.map((relContest) => (
                            <div key={relContest._id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                                <img src={relContest.image} alt={relContest.name} className="w-full h-32 object-cover" />
                                <div className="p-3">
                                    <h3 className="font-semibold text-gray-800 text-sm line-clamp-1">{relContest.name}</h3>
                                    <div className="flex justify-between text-xs text-gray-600 mt-2">
                                        <span>${relContest.prizeMoney}</span>
                                        <span>{new Date(relContest.deadline).toLocaleDateString()}</span>
                                    </div>
                                    <Link to={`/contest/${relContest._id}`}>
                                        <Primarybtn className="w-full mt-2 py-1 text-xs">View Details</Primarybtn>
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 col-span-full text-center py-4">No related contests found</p>
                    )}
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
                            <button className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition" onClick={() => setIsModalOpen(false)}>Cancel</button>
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition" onClick={handleSubmitTask}>Submit</button>
                        </div>
                        {message && <p className="mt-2 text-green-600">{message}</p>}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Viewdetels;
