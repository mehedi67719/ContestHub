import { useQuery } from "@tanstack/react-query";
import React from "react";
import Useauth from "../Component/Useauth";

const Leaderboard = () => {
  const { User } = Useauth();

  const { data: users = [], isLoading: userLoading } = useQuery({
    queryKey: ['ManageUser'],
    queryFn: () =>
      fetch("https://contesthub-server-pink.vercel.app/user").then(res => res.json())
  });

  const { isLoading, data: win = [] } = useQuery({
    queryKey: ["leader-board"],
    queryFn: async () => {
      const res = await fetch("https://contesthub-server-pink.vercel.app/win-leaderboard");
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    },
  });

  const { data: participateContests = [], isLoading: participatedLoading } =
    useQuery({
      queryKey: ["paymenthistory", win],
      enabled: win.length > 0,
      queryFn: async () => {
        let allPayments = [];
        for (let user of win) {
          const res = await fetch(
            `https://contesthub-server-pink.vercel.app/payment?email=${user._id}`
          );
          const data = await res.json();
          allPayments.push(...data);
        }
        return allPayments;
      },
    });

  if (isLoading || participatedLoading || userLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  const sortedWin = [...win].sort((a, b) => {
    const aParticipated = participateContests.filter(
      p => p.Customer_email === a._id
    ).length;
    const bParticipated = participateContests.filter(
      p => p.Customer_email === b._id
    ).length;
    const aWinRate = aParticipated ? a.totalWins / aParticipated : 0;
    const bWinRate = bParticipated ? b.totalWins / bParticipated : 0;
    return bWinRate - aWinRate;
  });

  return (
    <div className="w-[95%] lg:max-w-[90%] md:max-w-[90%] w-full mx-auto py-10">
      <h1 className="text-5xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-10">
        Leaderboard
      </h1>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {sortedWin.map((user, idx) => {
          const userParticipatedCount = participateContests.filter(
            p => p.Customer_email === user._id
          ).length;
          const winRate =
            userParticipatedCount > 0
              ? Math.round((user.totalWins / userParticipatedCount) * 100)
              : 0;

          const userInfo = users.find(u => u.email === user._id);

          return (
            <div
              key={user._id}
              className="relative border rounded-xl shadow-lg hover:shadow-2xl transition p-6 bg-white flex flex-col items-center"
            >
              <div className="absolute -top-5 right-5 w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold text-white shadow-md bg-gradient-to-r from-yellow-400 to-orange-500">
                {idx + 1}
              </div>

              <img
                src={userInfo?.photoURL || userInfo?.image || "https://i.ibb.co/vkY2tTh/avatar1.png"}
                alt="Winner Photo"
                className="w-28 h-28 rounded-full object-cover border-4 border-blue-100 shadow-md mb-4"
              />

              <h2 className="text-xl font-semibold text-center mb-1">
                {userInfo?.displayName || userInfo?.name || "No Name"}
              </h2>
              <p className="text-gray-500 text-xs text-center mb-3">
                {user.winnerEmail}
              </p>

              <div className="flex justify-between w-full mb-3">
                <span className="text-gray-400 text-sm">
                  Participation: {userParticipatedCount}
                </span>
                <span className="text-blue-600 font-semibold text-sm">
                  Wins: {user.totalWins}
                </span>
              </div>

              <div className="w-full">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-gray-400">Winning Rate</span>
                  <span className="text-xs font-bold text-blue-600">{winRate}%</span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full transition-all duration-1000"
                    style={{ width: `${winRate}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Leaderboard;
