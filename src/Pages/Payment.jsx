import React, { useEffect, useState } from 'react';
import Useauth from '../Component/Useauth';
import { useParams } from 'react-router';
import Primarybtn from '../Component/Primarybtn';

const Payment = () => {
  const { User } = Useauth();
  const { id } = useParams();
  const [contest, setContest] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:3000/contests");
        const data = await res.json();
        const selectedContest = data.find(c => c._id === id);
        setContest(selectedContest);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return <p className='text-2xl font-bold text-gray-800 text-center mt-20'>Loading...</p>;
  }

  if (!contest) {
    return <p className='text-2xl font-bold text-red-600 text-center mt-20'>Contest not found!</p>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6 mt-10 bg-white rounded-2xl shadow-xl">
      
    
      <div className="flex flex-col md:flex-row items-center gap-6 p-6 bg-gradient-to-r from-purple-50 via-pink-50 to-yellow-50 rounded-xl shadow-md border border-gray-200">
        <img
          src={contest.image}
          alt={contest.name}
          className="w-48 h-48 rounded-xl object-cover border-2 border-purple-200"
        />
        <div className="flex-1 space-y-3">
          <h2 className="text-3xl font-extrabold text-gray-900">{contest.name}</h2>
          <p className="text-gray-700">Entry Fee: <span className="font-semibold text-purple-600">$10</span></p>
          <p className="text-gray-700">Prize Money: <span className="font-semibold text-green-600">${contest.prizeMoney}</span></p>
          <p className="text-gray-700">Deadline: <span className="font-semibold text-red-600">{contest.deadline}</span></p>
          <p className="text-gray-700">Participants: <span className="font-semibold text-blue-600">{contest.participantsCount}</span></p>
        </div>
      </div>

      
      <div className="mt-10 p-6 bg-white rounded-xl shadow-md border border-gray-200">
        <h3 className="text-2xl font-semibold text-gray-900 mb-5">Your Information</h3>
        <div className="flex flex-col md:flex-row items-center gap-5">
          <img
            src={User?.photoURL || 'https://via.placeholder.com/150'}
            alt={User?.displayName || "User"}
            className="w-20 h-20 rounded-full object-cover border-2 border-purple-200"
          />
          <div className="space-y-2">
            <p className="text-gray-800 font-medium">Name: {User?.displayName || "Mehedi Hassan"}</p>
            <p className="text-gray-800 font-medium">Email: {User?.email || "mehedi@example.com"}</p>
          </div>
        </div>
      </div>

      
      <div className="mt-10 p-6 bg-white rounded-xl shadow-md border border-gray-200">
        <h3 className="text-2xl font-semibold text-gray-900 mb-5">Payment Summary</h3>
        <div className="flex justify-between text-gray-700 font-medium mb-3">
          <span>Entry Fee</span>
          <span>$10.00</span>
        </div>
        <div className="flex justify-between text-gray-700 font-medium mb-3">
          <span>Platform Fee</span>
          <span>$0.00</span>
        </div>
        <div className="flex justify-between text-gray-900 font-bold text-xl border-t border-gray-300 pt-3">
          <span>Total</span>
          <span>$10.00</span>
        </div>
      </div>

      
      <div className="mt-10 text-center">
        <Primarybtn className="w-full md:w-1/2 text-lg ">
          Pay Now
        </Primarybtn>
      </div>

    </div>
  );
};

export default Payment;
