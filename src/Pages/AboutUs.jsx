import React from "react";
import { motion } from "framer-motion";
import banner from "../assets/contesthub bannner.png";

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
    <div className="w-[90%] mx-auto py-16 space-y-32">
      
   
      <div >
        <img
          src={banner}
          alt="Hero"
          className="w-full h-96 object-cover rounded-xl shadow-lg"
        />
   
      </div>

 
      <div className="text-center space-y-6">
        <h2 className="text-3xl font-bold">Meet Our Team</h2>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Dedicated professionals driving our vision forward.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-10">
          {teamMembers.map((member, idx) => (
            <motion.div
              key={idx}
              className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-24 h-24 rounded-full object-cover mb-4"
              />
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-gray-500">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>


      <div className="text-center space-y-6">
        <h2 className="text-3xl font-bold">Our Milestones</h2>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Key achievements on our journey.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-10">
          {milestones.map((milestone, idx) => (
            <motion.div
              key={idx}
              className="bg-gray-100 rounded-xl p-6"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
            >
              <h3 className="text-2xl font-bold text-indigo-600">{milestone.year}</h3>
              <p className="text-gray-700 mt-2">{milestone.title}</p>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default PremiumAboutUs;
