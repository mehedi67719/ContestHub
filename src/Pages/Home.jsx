import React from "react";
import Primarybtn from "../Component/Primarybtn";
import contestImage from "../assets/Contest.jpeg";
import { Link } from "react-router";

const Home = () => {
  const popularContests = [
    { id: 1, name: "Creative Design Contest", image: contestImage, participants: 120, description: "Design a modern app UI/UX for a client project..." },
    { id: 2, name: "Article Writing Challenge", image: contestImage, participants: 85, description: "Write an engaging article about web development trends..." },
    { id: 3, name: "Business Idea Pitch", image: contestImage, participants: 60, description: "Submit innovative business ideas for startups..." },
    { id: 4, name: "Gaming Review Contest", image: contestImage, participants: 95, description: "Review the latest games with creativity and insight..." },
    { id: 5, name: "Photography Challenge", image: contestImage, participants: 70, description: "Capture the beauty of nature in a single shot..." },
  ];

  const winners = [
    { id: 1, name: "Alice Johnson", prize: "$500", image: contestImage },
    { id: 2, name: "Bob Smith", prize: "$300", image: contestImage },
    { id: 3, name: "Catherine Lee", prize: "$250", image: contestImage },
  ];

  return (
    <div className="w-[90%] mx-auto py-10 space-y-16">

      <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl p-10 flex flex-col md:flex-row items-center gap-6">
        <div className="flex-1 space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold">Join Creative Contests & Showcase Your Talent</h1>
          <p className="text-lg">Discover exciting contests, participate, and win amazing prizes.</p>

         <div className="flex gap-3 h-12">
           <input
             type="text"
             placeholder="Search contests by type..."
             className="flex-1 h-full px-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 placeholder-gray-400"
           />
           <Primarybtn >Search</Primarybtn>
         </div>
        </div>
        <div className="flex-1">
          <img src={contestImage} alt="banner" className="rounded-xl shadow-lg w-full object-cover" />
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Popular Contests</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularContests.map((contest) => (
            <div key={contest.id} className="border rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col">
              <img src={contest.image} alt={contest.name} className="rounded-xl mb-4 object-cover h-48 w-full" />
              <h3 className="font-semibold text-xl mb-2">{contest.name}</h3>
              <p className="text-gray-600 text-sm mb-2">{contest.description.slice(0, 60)}...</p>
              <p className="text-gray-500 text-sm mb-4">Participants: {contest.participants}</p>
              <Primarybtn>View Details</Primarybtn>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-6">
          <Link to='/all-contests'><Primarybtn>Show All Contests</Primarybtn></Link>
        </div>
      </section>

      <section className="bg-purple-100 rounded-xl p-10 flex flex-col md:flex-row items-center gap-6">
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-4 text-purple-800">Congratulations to Our Winners!</h2>
          <p className="mb-4 text-purple-700">Join our contests and you could be the next big winner. Amazing prizes and recognition await!</p>
          <Primarybtn>Join Now</Primarybtn>
        </div>
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {winners.map((winner) => (
            <div key={winner.id} className="bg-white rounded-xl shadow p-3 text-center">
              <img src={winner.image} alt={winner.name} className="rounded-full w-20 h-20 mx-auto mb-2 object-cover" />
              <h4 className="font-semibold text-gray-800">{winner.name}</h4>
              <p className="text-gray-500">{winner.prize}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="text-center p-10 bg-gray-50 rounded-xl">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">Why Choose ContestHub?</h2>
        <p className="text-gray-600 mb-4">Explore a variety of contests, showcase your skills, and win prizes. Stay updated with trending contests and discover new opportunities.</p>
        <Primarybtn>Explore Contests</Primarybtn>
      </section>

    </div>
  );
};

export default Home;
