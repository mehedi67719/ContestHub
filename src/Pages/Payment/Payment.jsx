import React from 'react';
import { Link, useParams } from 'react-router';
import Primarybtn from '../../Component/Primarybtn';
import Useauth from '../../Component/Useauth';
import { useQuery } from '@tanstack/react-query';

const Payment = () => {
  const { User } = Useauth();
  const { id } = useParams();
  const { data: contests = [], isLoading, error } = useQuery({
    queryKey: ['All-contest'],
    queryFn: async () => {
      const res = await fetch('http://localhost:3000/contests');
      if (!res.ok) throw new Error('Failed to fetch contests');
      return res.json();
    },
  });

  const contest = contests.find(c => c._id === id);

  console.log(contest);
  if (isLoading) return <p className='text-2xl font-bold text-gray-800 text-center mt-20'>Loading...</p>;
  if (error) return <p className='text-2xl font-bold text-red-600 text-center mt-20'>Error loading contest!</p>;
  if (!contest) return <p className='text-2xl font-bold text-red-600 text-center mt-20'>Contest not found!</p>;

  const isEnded = new Date(contest.deadline) < new Date();
  const platformFee = 10;
  const totalFee = contest.entryFee + platformFee;

  const handelpayment = async () => {

    const paymentinfo = {
      cost: totalFee,
      name: contest.name,
      email: User.email,
      id: contest._id
    };

    try {
      const res = await fetch("http://localhost:3000/create-checkout-session", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentinfo)
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const session = await res.json();
      console.log("Payment session created:", session);
      console.log("Stripe Checkout URL:", session.url);

      if (session.url) {
        window.location.href = session.url;
      } else {
        throw new Error("Payment URL not received from server.");
      }

    } catch (err) {
      console.error("Error creating payment session:", err);
      alert("Failed to initiate payment. Please try again.");
    }
  };


  return (
    <div className="max-w-[90%] mx-auto p-6 my-10 bg-white rounded-2xl shadow-xl">
      <div className="flex flex-col md:flex-row items-center gap-6 p-6 bg-gradient-to-r from-purple-50 via-pink-50 to-yellow-50 rounded-xl shadow-md border border-gray-200">
        <img
          src={contest.image}
          alt={contest.name}
          className="w-48 h-48 rounded-xl object-cover border-2 border-purple-200"
        />
        <div className="flex-1 space-y-3">
          <h2 className="text-3xl font-extrabold text-gray-900">{contest.name}</h2>
          <p className="text-gray-700">Entry Fee: <span className="font-semibold text-purple-600">${contest.entryFee.toFixed(2)}</span></p>
          <p className="text-gray-700">Prize Money: <span className="font-semibold text-green-600">${contest.prizeMoney}</span></p>
          <p className="text-gray-700">Deadline: <span className="font-semibold text-red-600">{new Date(contest.deadline).toLocaleDateString()}</span></p>
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
          <span>${contest.entryFee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-700 font-medium mb-3">
          <span>Platform Fee</span>
          <span>${platformFee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-900 font-bold text-xl border-t border-gray-300 pt-3">
          <span>Total</span>
          <span>${totalFee.toFixed(2)}</span>
        </div>
      </div>
      <div className="mt-10 flex justify-center">
        <div className="w-full md:w-1/2">
          <Primarybtn
            onClick={handelpayment}
            className={`w-full text-lg ${isEnded ? 'bg-gray-400 cursor-not-allowed hover:bg-gray-400' : ''}`}
            disabled={isEnded}
          >
            {isEnded ? 'Contest Ended' : 'Pay Now'}
          </Primarybtn>
        </div>
      </div>
    </div>
  );
};

export default Payment;