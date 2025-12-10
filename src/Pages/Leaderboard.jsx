import React from "react";

const Leaderboard = () => {
  const fakeLeaders = [
    { id: 1, name: "Aminul Islam", wins: 12, image: "https://i.ibb.co/vkY2tTh/avatar1.png" },
    { id: 2, name: "Shila Akter", wins: 10, image: "https://i.ibb.co/vkY2tTh/avatar1.png" },
    { id: 3, name: "Mehedi Hassan", wins: 8, image: "https://i.ibb.co/vkY2tTh/avatar1.png" },
    { id: 4, name: "Rakib Ahmed", wins: 7, image: "https://i.ibb.co/vkY2tTh/avatar1.png" },
    { id: 5, name: "Sadia Jahan", wins: 5, image: "https://i.ibb.co/vkY2tTh/avatar1.png" }
  ];

  return (
    <div className="w-[90%] mx-auto py-10">
      <h1 className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-8">
        Leaderboard
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {fakeLeaders.map((user, idx) => (
          <div
            key={user.id}
            className="border p-6 rounded-xl shadow-lg hover:shadow-xl transition bg-white"
          >
            <div className="flex items-center gap-5">
              <div className="relative">
                <img
                  src={user.image}
                  alt={user.name}
                  className="w-20 h-20 rounded-full object-cover border"
                />
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold">
                  {idx + 1}
                </span>
              </div>

              <div>
                <h2 className="text-xl font-semibold">{user.name}</h2>
                <p className="text-gray-600">Wins: {user.wins}</p>
              </div>
            </div>

            <div className="mt-5 h-2 bg-gray-200 rounded-full">
              <div
                className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
                style={{ width: `${user.wins * 7}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
