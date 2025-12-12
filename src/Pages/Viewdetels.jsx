import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import Primarybtn from '../Component/Primarybtn';

const Viewdetels = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const [timeLeft, setTimeLeft] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await fetch("http://localhost:3000/contests");
                const data = await res.json();
                setData(data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            const filterdata = data.find(d => d._id === id);
            if (filterdata) {
                const now = new Date();
                const deadline = new Date(filterdata.deadline);
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
    }, [data, id]);

    if (loading) {
        return <p className='text-2xl font-bold text-black text-center mt-20'>Loading...</p>;
    }

    const filterdata = data.find(d => d._id === id);

    if (!filterdata) {
        return <p className='text-center text-red-500 text-xl mt-20'>Contest not found</p>;
    }

    const isEnded = new Date(filterdata.deadline) < new Date();

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-8">

           
            <div className="relative rounded-xl overflow-hidden shadow-lg">
                <img src={filterdata.image} alt={filterdata.name} className="w-full lg:h-[700px] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg">{filterdata.name}</h1>
                </div>
            </div>

            
            <div className="grid md:grid-cols-3 gap-8">

                <div className="md:col-span-2 space-y-6">

                    <div className="space-y-3">
                        <h2 className="text-xl font-semibold text-gray-800">Description</h2>
                        <p className="text-gray-700 leading-relaxed">{filterdata.description}</p>
                    </div>

                  
                    <div className="space-y-2">
                        <h2 className="text-lg font-semibold text-gray-800">Task Details</h2>
                        <p className="text-gray-700">{filterdata.task}</p>
                    </div>

                    
                    <div className="flex flex-wrap gap-4 mt-4">
                        <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-medium shadow-sm">
                            Participants: {filterdata.participantsCount || 0}
                        </div>
                        <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-medium shadow-sm">
                            Prize: ${filterdata.prizeMoney || 0}
                        </div>
                        <div className={`px-4 py-2 rounded-full font-medium shadow-sm ${isEnded ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-800'}`}>
                            {isEnded ? 'Contest Ended' : 'Ongoing'}
                        </div>
                        <div className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full font-medium shadow-sm">
                            Deadline: {new Date(filterdata.deadline).toLocaleDateString()}
                        </div>
                        {!isEnded && (
                            <div className="bg-pink-100 text-pink-800 px-4 py-2 rounded-full font-medium shadow-sm">
                                Time Left: {timeLeft}
                            </div>
                        )}
                    </div>

                   
                    {filterdata.winner && isEnded && (
                        <div className="bg-yellow-50 p-4 rounded-xl shadow mt-6 flex items-center gap-4 animate-pulse">
                            <img src={filterdata.winner.photoURL} alt={filterdata.winner.name} className="w-16 h-16 rounded-full object-cover border-2 border-yellow-400" />
                            <p className="font-semibold text-gray-800">
                                Winner: {filterdata.winner.name} ({filterdata.winner.email})
                            </p>
                        </div>
                    )}

                </div>

               
           <div className="flex flex-col gap-4 sticky top-60">           
               <Link to={`/payment/${filterdata._id}`}>           
                   <Primarybtn className={`w-full ${isEnded ?'bg-gray-400 cursor-not-allowed' : ''}`} >
                       {isEnded ? 'Contest Ended' : 'Register'}
                   </Primarybtn>           
               </Link>           
           
               {!isEnded && (
                   <Link >
                       <Primarybtn className="w-full" >
                           Submit Task
                       </Primarybtn>
                   </Link>
               )}
           </div>

            </div>
        </div>
    );
};

export default Viewdetels;
