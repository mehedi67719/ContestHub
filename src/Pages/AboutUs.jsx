import React from "react";
import { motion } from "framer-motion";

const teamMembers = [
  { name: "Aminul Islam", role: "Founder & CEO", image: "https://i.ibb.co/vkY2tTh/avatar1.png" },
  { name: "Shila Akter", role: "Lead Designer", image: "https://i.ibb.co/vkY2tTh/avatar1.png" },
  { name: "Mehedi Hassan", role: "Lead Developer", image: "https://i.ibb.co/vkY2tTh/avatar1.png" },
  { name: "Rakib Ahmed", role: "Marketing Head", image: "https://i.ibb.co/vkY2tTh/avatar1.png" }
];

const milestones = [
  { year: "2023", title: "Platform Idea Born" },
  { year: "2024", title: "First Contests Launched" },
  { year: "2025", title: "1,000+ Participants" },
  { year: "2025", title: "International Creators Join" }
];

const PremiumAboutUs = () => {
  return (
    <div className="w-[90%] mx-auto py-16">
      <div className="relative mb-20">
        <img
          src="https://i.ibb.co/7Q0mK0S/contest-team.jpg"
          alt="banner"
          className="w-full h-96 object-cover rounded-3xl shadow-lg"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-700/50 to-purple-600/50 rounded-3xl flex items-center justify-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white text-center">
            About ContestHub
          </h1>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-20 grid md:grid-cols-2 gap-12 items-center"
      >
        <div>
          <h2 className="text-3xl font-semibold mb-6">Who We Are</h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            ContestHub is a modern contest platform connecting creators and participants globally.
            We make creativity, participation, and achievement seamless and inspiring.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            Our mission is to empower individuals to showcase talent, compete fairly, and win meaningful rewards.
          </p>
        </div>
        <img
          src="https://i.ibb.co/7Q0mK0S/contest-team.jpg"
          alt="team"
          className="rounded-2xl shadow-lg w-full object-cover"
        />
      </motion.div>

      <div className="mb-20">
        <h2 className="text-3xl font-semibold text-center mb-10">Our Journey</h2>
        <div className="relative border-l-2 border-blue-600 ml-8">
          {milestones.map((milestone, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="mb-10 ml-8"
            >
              <div className="flex items-center gap-4 mb-2">
                <div className="w-6 h-6 bg-blue-600 rounded-full border-2 border-white"></div>
                <span className="font-semibold text-blue-600">{milestone.year}</span>
              </div>
              <p className="text-gray-700 text-lg">{milestone.title}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mb-20">
        <h2 className="text-3xl font-semibold text-center mb-10">Meet Our Team</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {teamMembers.map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-white/70 backdrop-blur-md rounded-2xl p-6 flex flex-col items-center shadow-lg hover:shadow-xl transition"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-24 h-24 rounded-full mb-4 object-cover border-2 border-blue-600"
              />
              <h3 className="font-semibold text-xl">{member.name}</h3>
              <p className="text-gray-700">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-16 rounded-3xl shadow-xl text-center">
        <h2 className="text-3xl font-semibold mb-6">Our Mission & Vision</h2>
        <p className="text-lg leading-relaxed max-w-3xl mx-auto">
          ContestHub aims to be the world's leading creative contest platform. 
          We provide fair competition, celebrate talent, and foster a global community of creators and innovators.
        </p>
      </div>
    </div>
  );
};

export default PremiumAboutUs;
