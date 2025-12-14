import React from 'react';
import Primarybtn from '../../Component/Primarybtn';
import Useauth from '../../Component/Useauth';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { useParams } from 'react-router';


const Payment = () => {
  const { User } = Useauth();
  const { id } = useParams();

  const { data: contests = [], isLoading, error } = useQuery({
    queryKey: ['All-contest'],
    queryFn: async () => {
      const res = await fetch('http://localhost:3000/contests');
      if (!res.ok) throw new Error('Fetch failed');
      return res.json();
    },
  });

  if (isLoading)
    return <p className="text-2xl font-bold text-center mt-20">Loading...</p>;

  if (error)
    return (
      <p className="text-2xl font-bold text-red-600 text-center mt-20">
        Error loading contest
      </p>
    );

  const contest = contests.find(c => c._id === id);

  if (!contest)
    return (
      <p className="text-2xl font-bold text-red-600 text-center mt-20">
        Contest not found
      </p>
    );

  const isEnded = new Date(contest.deadline) < new Date();
  const platformFee = 10;
  const totalFee = contest.entryFee + platformFee;

  const handelpayment = async () => {
    try {
      const res = await fetch('http://localhost:3000/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cost: totalFee,
          name: contest.name,
          email: User?.email,
          id: contest._id,
        }),
      });

      if (!res.ok) {
        Swal.fire({
          icon: 'error',
          title: 'Payment Failed',
          text: 'Server error. Please try again',
        });
        return;
      }

      const session = await res.json();

      if (session?.url) {
        window.location.href = session.url;
      } else {
        Swal.fire({
          icon: 'warning',
          title: 'Error',
          text: 'Payment URL not received',
        });
      }
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Transaction Error',
        text: 'Something went wrong. Try again later',
      });
    }
  };

  return (
    <div className="max-w-[90%] mx-auto p-6 my-10 bg-white rounded-2xl shadow-xl">
      <div className="flex flex-col md:flex-row gap-6 p-6 rounded-xl bg-gradient-to-r from-purple-50 via-pink-50 to-yellow-50">
        <img
          src={contest.image}
          alt={contest.name}
          className="w-48 h-48 rounded-xl object-cover"
        />
        <div>
          <h2 className="text-3xl font-bold">{contest.name}</h2>
          <p>Entry Fee: ${contest.entryFee}</p>
          <p>Prize Money: ${contest.prizeMoney}</p>
          <p>
            Deadline:{' '}
            {new Date(contest.deadline).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="mt-8 p-6 border rounded-xl">
        <p>Name: {User?.displayName}</p>
        <p>Email: {User?.email}</p>
      </div>

      <div className="mt-8 p-6 border rounded-xl">
        <p>Entry Fee: ${contest.entryFee}</p>
        <p>Platform Fee: ${platformFee}</p>
        <p className="font-bold text-lg">Total: ${totalFee}</p>
      </div>

      <Primarybtn
        onClick={handelpayment}
        disabled={isEnded}
        className={`mt-6 w-full ${
          isEnded && 'bg-gray-400 cursor-not-allowed'
        }`}
      >
        {isEnded ? 'Contest Ended' : 'Pay Now'}
      </Primarybtn>
    </div>
  );
};

export default Payment;
