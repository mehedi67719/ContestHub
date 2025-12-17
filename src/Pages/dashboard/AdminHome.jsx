import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Useauth from '../../Component/Useauth';
import { FaCheckCircle, FaTimesCircle, FaTrophy, FaUsers, FaChartBar } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { MdOutlinePending } from 'react-icons/md';
import { Link } from 'react-router';

const AdminHome = () => {
    const { User } = Useauth();

    const { data: all_contests = [], isLoading } = useQuery({
        queryKey: ['ManageContest'],
        queryFn: () =>
            fetch("http://localhost:3000/All-contests")
                .then(res => res.json())
    });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen bg-white">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
            </div>
        );
    }

    const totalContests = all_contests.length;
    const approve_contest = all_contests.filter(ac => ac.status === "approve").length;
    const rejectcontest = all_contests.filter(ac => ac.status === "reject").length;
    const Pendingcontest = all_contests.filter(ac => ac.status === "pending").length;

    const chartData = [
        { name: 'Total', value: totalContests, color: '#3B82F6' },
        { name: 'Approved', value: approve_contest, color: '#10B981' },
        { name: 'Pending', value: Pendingcontest, color: '#F59E0B' },
        { name: 'Rejected', value: rejectcontest, color: '#EF4444' },
    ];

    return (
        <div className="p-4 md:p-10 bg-gray-50/50 min-h-screen w-full font-sans">
          
            <div className="flex flex-col md:flex-row items-center justify-between bg-white p-8 rounded-[2rem] shadow-lg mb-10 border border-gray-100 gap-6">
                <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="relative">
                        <img 
                            src={User?.photoURL || "https://i.ibb.co/mRmsS6p/user-placeholder.png"} 
                            alt="Admin" 
                            className="w-24 h-24 rounded-3xl object-cover ring-4 ring-blue-50 shadow-2xl"
                        />
                        <span className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-4 border-white rounded-full"></span>
                    </div>
                    <div className="text-center md:text-left">
                        <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">
                            Welcome, <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">{User?.displayName || 'Admin'}</span>
                        </h1>
                        <p className="text-gray-500 font-medium mt-1">Manage your contest platform and monitor growth.</p>
                        <div className="mt-3 inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                            <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
                            System Administrator
                        </div>
                    </div>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-5 rounded-2xl border border-blue-100 hidden lg:block">
                    <p className="text-xs text-blue-400 font-bold uppercase mb-1">Current Session</p>
                    <p className="text-gray-700 font-bold">{new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                </div>
            </div>

       
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                
                <div className="bg-gradient-to-br from-blue-600 to-purple-700 p-8 rounded-[2rem] shadow-xl hover:shadow-blue-200 transition-all duration-300 group relative overflow-hidden">
                    <div className="relative z-10">
                        <p className="text-blue-100 text-sm font-bold uppercase tracking-wider mb-2">Total Contests</p>
                        <h3 className="text-4xl font-black text-white">{totalContests}</h3>
                    </div>
                    <FaTrophy className="absolute -right-4 -bottom-4 text-white/20 group-hover:scale-110 transition-transform duration-500" size={100} />
                </div>

                <div className="bg-white p-8 rounded-[2rem] shadow-md border border-gray-100 hover:border-green-200 transition-all group">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-2">Approved</p>
                            <h3 className="text-4xl font-black text-emerald-600">{approve_contest}</h3>
                        </div>
                        <div className="bg-emerald-50 p-4 rounded-2xl text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                            <FaCheckCircle size={28} />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-[2rem] shadow-md border border-gray-100 hover:border-amber-200 transition-all group">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-2">Pending</p>
                            <h3 className="text-4xl font-black text-amber-500">{Pendingcontest}</h3>
                        </div>
                        <div className="bg-amber-50 p-4 rounded-2xl text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300">
                            <MdOutlinePending size={28} />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-[2rem] shadow-md border border-gray-100 hover:border-rose-200 transition-all group">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-2">Rejected</p>
                            <h3 className="text-4xl font-black text-rose-500">{rejectcontest}</h3>
                        </div>
                        <div className="bg-rose-50 p-4 rounded-2xl text-rose-500 group-hover:bg-rose-500 group-hover:text-white transition-all duration-300">
                            <FaTimesCircle size={28} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] shadow-lg border border-gray-100">
                    <div className="flex items-center justify-between mb-10">
                        <h2 className="text-2xl font-black text-gray-800 flex items-center gap-3">
                            <span className="p-3 bg-blue-600 rounded-xl text-white"><FaChartBar size={20} /></span>
                            Contest Insights
                        </h2>
                    </div>
                    <div className="h-[350px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 13, fontWeight: 600}} dy={15} />
                                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 13}} />
                                <Tooltip 
                                    cursor={{fill: '#f8fafc'}}
                                    contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', padding: '15px'}}
                                />
                                <Bar dataKey="value" radius={[10, 10, 0, 0]} barSize={60}>
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-gradient-to-b from-white to-gray-50 p-10 rounded-[2.5rem] shadow-lg border border-gray-100 flex flex-col justify-center items-center text-center">
                    <div className="w-24 h-24 bg-gradient-to-tr from-blue-600 to-purple-600 p-0.5 rounded-full mb-6">
                        <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                            <FaUsers size={45} className="text-blue-600" />
                        </div>
                    </div>
                    <h2 className="text-2xl font-black text-gray-800 mb-3">User Management</h2>
                    <p className="text-gray-500 leading-relaxed mb-8">
                        Review platform users, assign roles, and maintain community guidelines.
                    </p>
                    <Link 
                        to="/dashboard/manage-users" 
                        className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-200 text-center"
                    >
                        Manage All Users
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;