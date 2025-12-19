import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { FaUsers, FaClock } from "react-icons/fa";
import Primarybtn from "../Component/Primarybtn";
import { useQuery } from "@tanstack/react-query";

const Allcontest = () => {
  const [activeTab, setActiveTab] = useState("All");
  


  const tabs = ["All", "Design", "Article", "Business", "Gaming", "Video Editing"];



  const {data:contests=[],isLoading,error}=useQuery({
    queryKey:["All-contest"],
    queryFn:async ()=>{
      const res= await fetch("http://localhost:3000/contests")
      return res.json()
    }
  })


if(error){
  return <p className="text-red-600 font-bold text-center text-2xl">Something went wrong!</p>
}

 

  const filteredContests =
    activeTab === "All" ? contests : contests.filter((c) => c.contestType === activeTab);

  return (
    <div className="max-w-[90%] mx-auto  py-12 space-y-12">
      <h1 className="text-4xl font-bold text-center text-gray-800">All Contests</h1>

      {
        isLoading?(<p className="text-2xl font-bold text-center ">loading...</p>):(
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                    activeTab === tab
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                      : "bg-white border border-gray-300 text-gray-700 hover:bg-blue-50"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
      
        )
      }

      {filteredContests.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredContests.map((contest) => (
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
                  <p className="text-gray-600 text-sm">{contest.description?.slice(0, 80)}...</p>
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
      ) : (
        <p className="text-center text-gray-500 text-lg mt-12">No contests found in this category.</p>
      )}
    </div>
  );
};

export default Allcontest;
