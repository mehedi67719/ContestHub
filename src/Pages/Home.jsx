import Primarybtn from "../Component/Primarybtn";
import contestImage from "../assets/Contest.jpeg";
import { Link } from "react-router";
import { FaUsers } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";

const Home = () => {
  const { data: contests = [], isLoading, error } = useQuery({
    queryKey: ["contests"],
    queryFn: async () => {
      const res = await fetch("http://localhost:3000/top-contests");
      if (!res.ok) {
        throw new Error("Failed to fetch contests");
      }
      return res.json();
    },
  });

  const winners = [
    { id: 1, name: "Alice Johnson", prize: "$500", image: contestImage },
    { id: 2, name: "Bob Smith", prize: "$300", image: contestImage },
    { id: 3, name: "Catherine Lee", prize: "$250", image: contestImage },
  ];

  return (
    <div className="w-[90%] mx-auto py-10 space-y-16">
      <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl p-10 flex flex-col md:flex-row items-center gap-6">
        <div className="flex-1 space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold">
            Join Creative Contests & Showcase Your Talent
          </h1>
          <p className="text-lg">
            Discover exciting contests, participate, and win amazing prizes.
          </p>
          <div className="flex gap-3 h-12">
            <input
              type="text"
              placeholder="Search contests by type..."
              className="flex-1 h-full px-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 placeholder-gray-400"
            />
            <Primarybtn>Search</Primarybtn>
          </div>
        </div>
        <div className="flex-1">
          <img
            src={contestImage}
            alt="banner"
            className="rounded-xl shadow-lg w-full object-cover"
          />
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Popular Contests</h2>

        {isLoading && (
          <p className="text-2xl font-bold text-black text-center">Loading...</p>
        )}

        {error && (
          <p className="text-2xl font-bold text-red-500 text-center">
            Something went wrong! {error.message}
          </p>
        )}

        {!isLoading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {contests.map((contest) => (
              <div
                key={contest._id}
                className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all flex flex-col overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={contest.image}
                    alt={contest.name}
                    className="w-full h-56 object-cover"
                  />
                  <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {contest.contestType}
                  </span>
                </div>

                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-gray-800">{contest.name}</h2>
                    <p className="text-gray-600 text-sm">
                      {contest.description?.slice(0, 80)}...
                    </p>
                    <div className="flex items-center justify-between mt-2 text-gray-700 text-sm">
                      <div className="flex items-center gap-1">
                        <FaUsers className="text-blue-600" />
                        <span>{contest.participantsCount}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        Deadline: {new Date(contest.deadline).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="bg-green-100 text-green-700 font-semibold px-2 py-1 rounded-lg text-sm">
                        Entry: ${contest.entryFee}
                      </span>
                      <span className="bg-yellow-100 text-yellow-800 font-semibold px-2 py-1 rounded-lg text-sm">
                        Prize: ${contest.prizeMoney}
                      </span>
                    </div>
                  </div>
                  <div className="mt-5">
                    <Link to={`/contest/${contest._id}`}>
                      <Primarybtn className="w-full">View Details</Primarybtn>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-center mt-6">
          <Link to="/all-contests">
            <Primarybtn>Show All Contests</Primarybtn>
          </Link>
        </div>
      </section>

      <section className="bg-purple-100 rounded-xl p-10 flex flex-col md:flex-row items-center gap-6">
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-4 text-purple-800">
            Congratulations to Our Winners!
          </h2>
          <p className="mb-4 text-purple-700">
            Join our contests and you could be the next big winner. Amazing prizes and recognition await!
          </p>
          <Primarybtn>Join Now</Primarybtn>
        </div>
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {winners.map((winner) => (
            <div key={winner.id} className="bg-white rounded-xl shadow p-3 text-center">
              <img
                src={winner.image}
                alt={winner.name}
                className="rounded-full w-20 h-20 mx-auto mb-2 object-cover"
              />
              <h4 className="font-semibold text-gray-800">{winner.name}</h4>
              <p className="text-gray-500">{winner.prize}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="text-center p-10 bg-gray-50 rounded-xl">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">Why Choose ContestHub?</h2>
        <p className="text-gray-600 mb-4">
          Explore a variety of contests, showcase your skills, and win prizes. Stay updated with trending contests and discover new opportunities.
        </p>
        <Primarybtn>Explore Contests</Primarybtn>
      </section>
    </div>
  );
};

export default Home;
