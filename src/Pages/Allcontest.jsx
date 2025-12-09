import React, { useState } from "react";
import { Link } from "react-router";


const Allcontest = () => {
  const [activeTab, setActiveTab] = useState("All");

  const tabs = ["All", "Design", "Article", "Business", "Gaming", "Video Editing"];

  const contests = [
    {
      _id: "1",
      name: "Creative Design Contest",
      description: "Design a modern app UI/UX for a client project...",
      participants: 120,
      image: "https://via.placeholder.com/400x250",
    },
    {
      _id: "2",
      name: "Article Writing Challenge",
      description: "Write an engaging article about web development trends...",
      participants: 85,
      image: "https://via.placeholder.com/400x250",
    },
    {
      _id: "3",
      name: "Business Idea Pitch",
      description: "Submit innovative business ideas for startups...",
      participants: 60,
      image: "https://via.placeholder.com/400x250",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">

      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">All Contests</h1>

      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
              activeTab === tab
                ? "bg-blue-600 text-white shadow"
                : "bg-white border border-gray-300 text-gray-700 hover:bg-blue-100"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
        {contests.map((contest) => (
          <div
            key={contest._id}
            className="bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden"
          >
            <img
              src={contest.image}
              alt={contest.name}
              className="w-full h-56 object-cover"
            />

            <div className="p-5 space-y-3">
              <h2 className="text-xl font-semibold text-gray-800">
                {contest.name}
              </h2>

              <p className="text-gray-600 text-sm">
                {contest.description.slice(0, 80)}...
              </p>

              <p className="text-sm font-medium text-gray-700">
                Participants:{" "}
                <span className="text-blue-600 font-bold">
                  {contest.participants}
                </span>
              </p>

              <Link to={`/contest/${contest._id}`}>
                <button className="w-full py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition font-medium">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {contests.length === 0 && (
        <p className="text-center text-gray-500 mt-12 text-lg">No contests found.</p>
      )}
    </div>
  );
};

export default Allcontest;
