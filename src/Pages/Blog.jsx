import React from 'react';
import { Link } from 'react-router-dom';
import Primarybtn from '../Component/Primarybtn';
import { FaUser, FaCalendar, FaTags } from 'react-icons/fa';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Top 10 Tips for Winning Design Contests",
      excerpt: "Learn from our top designers about how to stand out in design competitions and increase your chances of winning.",
      date: "January 10, 2026",
      author: "Sarah Johnson",
      category: "Design Tips",
      image: "https://placehold.co/400x250"
    },
    {
      id: 2,
      title: "The Future of Creative Contests in 2026",
      excerpt: "Explore the trends and innovations that are shaping the future of creative contests and how creators can prepare.",
      date: "January 5, 2026",
      author: "Michael Chen",
      category: "Industry Trends",
      image: "https://placehold.co/400x250"
    },
    {
      id: 3,
      title: "Building Your Creative Portfolio: A Complete Guide",
      excerpt: "A comprehensive guide on how to build an impressive portfolio that showcases your skills and attracts contest judges.",
      date: "December 28, 2025",
      author: "Emma Rodriguez",
      category: "Portfolio Tips",
      image: "https://placehold.co/400x250"
    },
    {
      id: 4,
      title: "Interview with ContestHub's Top Winners",
      excerpt: "Get insights from our most successful contest participants and learn what it takes to consistently win contests.",
      date: "December 20, 2025",
      author: "David Kim",
      category: "Winner Stories",
      image: "https://placehold.co/400x250"
    },
    {
      id: 5,
      title: "How to Create Compelling Contest Entries",
      excerpt: "Discover the secrets to creating contest entries that capture attention and meet judges' expectations.",
      date: "December 15, 2025",
      author: "Lisa Thompson",
      category: "Entry Tips",
      image: "https://placehold.co/400x250"
    },
    {
      id: 6,
      title: "The Psychology of Creative Judging",
      excerpt: "Understanding how judges evaluate creative work and what factors influence their decision-making process.",
      date: "December 10, 2025",
      author: "Robert Wilson",
      category: "Judging Insights",
      image: "https://placehold.co/400x250"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">ContestHub Blog</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">Stay updated with the latest trends, tips, and insights from the creative contest world.</p>
      </div>

      <div className="mb-8">
        <div className="relative max-w-xl mx-auto">
          <input 
            type="text" 
            placeholder="Search blog posts..." 
            className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {blogPosts.map((post) => (
          <div key={post.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">{post.category}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">{post.title}</h3>
              <p className="text-gray-600 mb-4">{post.excerpt}</p>
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <div className="flex items-center gap-1">
                  <FaUser className="text-gray-400" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <FaCalendar className="text-gray-400" />
                  <span>{post.date}</span>
                </div>
              </div>
              <Link to={`/blog/${post.id}`}>
                <Primarybtn className="w-full">Read More</Primarybtn>
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <Primarybtn className="px-8 py-3">Load More Articles</Primarybtn>
      </div>

      <div className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-xl">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Subscribe to Our Blog</h2>
          <p className="text-gray-600 mb-6">Get the latest articles and updates delivered directly to your inbox</p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Primarybtn>Subscribe</Primarybtn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;