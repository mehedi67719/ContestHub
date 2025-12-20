import { useQuery } from "@tanstack/react-query";
import React from "react";
import Useauth from "../Component/Useauth";

const Leaderboard = () => {
  const {User}=Useauth()
  console.log(User)


  const { data: users = [], isLoading: userloadin } = useQuery({
    queryKey: ['ManageUser'],
    queryFn: () =>
      fetch("http://localhost:3000/user")
        .then(res => res.json())
  });




  const { isLoading, data: win = [] } = useQuery({
    queryKey: ["leader-board"],
    queryFn: async () => {
      const res = await fetch("http://localhost:3000/win-leaderboard");
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
            `http://localhost:3000/payment?email=${user._id}`
          );
          const data = await res.json();
          allPayments.push(...data);
        }
        return allPayments;
      },
    });

  if (isLoading || participatedLoading || userloadin) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }


  console.log(users)
  console.log(win)



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
    <div className="w-[90%] mx-auto py-10">
      <h1 className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-8">
        Leaderboard
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sortedWin.map((user, idx) => {
          const userParticipatedCount = participateContests.filter(
            p => p.Customer_email === user._id
          ).length;
          const winRate =
            userParticipatedCount > 0
              ? Math.round((user.totalWins / userParticipatedCount) * 100)
              : 0;

          return (
            <div
              key={user._id}
              className="border p-6 rounded-xl shadow-lg hover:shadow-xl transition bg-white relative overflow-hidden"
            >
              <div className="absolute top-2 right-2 w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold text-white shadow-md bg-blue-600">
                {idx + 1}
              </div>


              <div className="flex items-center gap-5">
                <img
                  src={users?.find(u => u.email == user._id).photoURL ||users?.find(u => u.email == user._id).image|| "https://i.ibb.co/vkY2tTh/avatar1.png"}
                  alt="Winner Photo"
                  className="w-20 h-20 rounded-full object-cover border-2 border-blue-100"
                />

                <h2 className="text-xl font-semibold truncate w-40">
                  {users.find(u => u.email === user._id)?.displayName ||users.find(u => u.email === user._id)?.name|| "no name"}
                </h2>
                <div>
                  <h2 className="text-xl font-semibold truncate w-40">
                    {user.name}
                  </h2>
                  <p className="text-gray-500 text-xs">{user.winnerEmail}</p>
                  <div className="mt-1">
                    <span className="text-gray-400 text-xs ml-2">
                      Total Participation: {userParticipatedCount}
                    </span>
                    <span className="text-blue-600 font-bold text-sm ml-2">
                      Wins: {user.totalWins}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-medium text-gray-400">
                    Winning Rate
                  </span>
                  <span className="text-xs font-bold text-blue-600">
                    {winRate}%
                  </span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
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
