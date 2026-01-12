import { Link } from "react-router-dom";
import Primarybtn from "../Component/Primarybtn";
import contestImage from "../assets/Contest.jpeg";
import contestImage1 from "../assets/contesthub bannner.png";
import { FaUsers, FaTrophy, FaStar, FaChartBar, FaRegComments, FaQuestionCircle, FaEnvelope, FaGlobe, FaHeart, FaBolt, FaClock, FaTag } from "react-icons/fa";
import Useauth from "../Component/Useauth";
import { useQuery } from "@tanstack/react-query";
import React from 'react';

const Home = () => {
  const { User } = Useauth();

  const { data: contests = [], isLoading, error } = useQuery({
    queryKey: ["contests"],
    queryFn: async () => {
      const res = await fetch("https://contesthub-server-pink.vercel.app/top-contests");
      if (!res.ok) throw new Error("Failed to fetch contests");
      return res.json();
    },
  });

  const { data: users = [], isLoading: userLoading } = useQuery({
    queryKey: ['ManageUser'],
    queryFn: async () => {
      const res = await fetch("https://contesthub-server-pink.vercel.app/user");
      return res.json();
    },
  });

  const { data: win = [], isLoading: winLoading } = useQuery({
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

  const loading = isLoading || userLoading || winLoading || participatedLoading;

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

  // Hero Section
  const [currentSlide, setCurrentSlide] = React.useState(0);
  
  const slides = [
    { image: contestImage, title: "Join Creative Contests & Showcase Your Talent" },
    { image: contestImage1, title: "Discover Exciting Contests & Win Amazing Prizes" },
    { image: contestImage, title: "Connect with Creators & Build Your Portfolio" },
  ];
  
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="max-w-[90%] mx-auto space-y-16">

      {/* Hero Section */}
      <section className="relative h-screen md:h-[70vh] max-h-[700px] overflow-hidden rounded-2xl" style={{ height: '65vh' }}>
        <div className="absolute inset-0 flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {slides.map((slide, index) => (
            <div key={index} className="w-full flex-shrink-0 relative">
              <img 
                src={slide.image} 
                alt={`Slide ${index + 1}`} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <div className="text-center text-white max-w-3xl px-4">
                  <h1 className="text-3xl md:text-5xl font-bold mb-4">{slide.title}</h1>
                  <p className="text-lg md:text-xl mb-8">Discover exciting contests, participate, and win amazing prizes.</p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/all-contests">
                      <Primarybtn className="px-8 py-3 text-lg">Explore Contests</Primarybtn>
                    </Link>
                    <Link to="/dashboard">
                      <Primarybtn className="px-8 py-3 text-lg bg-gray-800 hover:bg-gray-900">My Dashboard</Primarybtn>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Slider indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full ${currentSlide === index ? 'bg-white' : 'bg-gray-400'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        
        {/* Navigation arrows */}
        <button 
          onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
          aria-label="Previous slide"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
        <button 
          onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
          aria-label="Next slide"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </section>


      <section id="featured-contests" className="py-12 bg-gray-50 rounded-2xl">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-2 justify-center"><FaStar className="text-yellow-500" /> Featured Contests</h2>

        {isLoading && <p className="text-2xl font-bold text-black text-center">Loading...</p>}
        {error && <p className="text-2xl font-bold text-red-500 text-center">{error?.message || "Something went wrong"}</p>}

        {!isLoading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contests.slice(0, 8).map((contest) => (
              <div
                key={contest._id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col h-96 overflow-hidden"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={contest.image}
                    alt={contest.name}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                    {contest.contestType}
                  </span>
                </div>

                <div className="p-5 flex flex-col flex-grow">
                  <div className="space-y-2">
                    <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">{contest.name}</h2>
                    <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-2">{contest.description?.slice(0, 100)}...</p>
                                      
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <FaUsers className="text-blue-500" />
                          <span>{contest.participantsCount} participants</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FaClock className="text-gray-400" />
                          <span>{new Date(contest.deadline).toLocaleDateString()}</span>
                        </div>
                      </div>
                                        
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <FaTag className="text-green-500 text-xs" />
                          <span className="text-xs text-gray-600">${contest.entryFee}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FaStar className="text-yellow-500 text-xs" />
                          <span className="text-xs text-gray-600">${contest.prizeMoney}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-auto">
                    <Link to={`/contest/${contest._id}`}>
                      <Primarybtn className="w-full py-2 text-sm">View Details</Primarybtn>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>


      <section id="statistics" className="py-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 flex items-center justify-center gap-2"><FaChartBar className="text-blue-600" /> Platform Statistics</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">{contests.length}</div>
            <div className="text-gray-600">Active Contests</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">{users.length}</div>
            <div className="text-gray-600">Creative Users</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <div className="text-4xl font-bold text-purple-600 mb-2">{participateContests.length}</div>
            <div className="text-gray-600">Participations</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <div className="text-4xl font-bold text-yellow-600 mb-2">${contests.reduce((sum, contest) => sum + contest.prizeMoney, 0)}</div>
            <div className="text-gray-600">Total Prizes</div>
          </div>
        </div>
      </section>


      <section id="categories" className="py-12 bg-gray-50 rounded-2xl">
        <h2 className="text-3xl font-bold mb-8 text-gray-800 flex items-center gap-2"><FaGlobe className="text-indigo-600" /> Contest Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Design', 'Photography', 'Writing', 'Video', 'Music', 'Coding', 'Art', 'Marketing'].map((category, index) => (
            <div key={index} className="bg-gradient-to-br from-blue-100 to-purple-100 p-6 rounded-xl text-center shadow-md hover:shadow-lg transition-shadow cursor-pointer">
              <div className="text-2xl font-bold text-gray-800 mb-2">{category}</div>
              <div className="text-sm text-gray-600">{Math.floor(Math.random() * 50) + 10} contests</div>
            </div>
          ))}
        </div>
      </section>


      <section id="highlights" className="py-12 bg-gray-50 rounded-2xl">
        <h2 className="text-3xl font-bold mb-8 text-gray-800 flex items-center gap-2 justify-center"><FaBolt className="text-yellow-500" /> Today's Highlights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-md h-96 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">Top Winner</h3>
              <p className="text-gray-600 mb-4 text-center">Congratulations to {users[0]?.name || 'Sarah Johnson'} for winning the Photography contest!</p>
              <div className="flex items-center gap-3 justify-center">
                <img src={users[0]?.image || contestImage} alt="Winner" className="w-12 h-12 rounded-full object-cover" />
                <div className="text-center">
                  <div className="font-semibold">{users[0]?.name || 'Sarah Johnson'}</div>
                  <div className="text-sm text-yellow-600">$500 Prize Winner</div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md h-96 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">New Contest</h3>
              <p className="text-gray-600 mb-4 text-center">Join our new "Summer Photography" contest with $1000 in prizes!</p>
            </div>
            <div className="mt-auto">
              <Link to="/all-contests">
                <Primarybtn>View Contest</Primarybtn>
              </Link>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md h-96 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">Community Spotlight</h3>
              <p className="text-gray-600 mb-4 text-center">Featured creator of the month: {users[1]?.name || 'Michael Chen'} with 15 contest wins!</p>
            </div>
            <div className="mt-auto">
              <Link to="/leaderboard">
                <Primarybtn>View Leaderboard</Primarybtn>
              </Link>
            </div>
          </div>
        </div>
      </section>


      <section id="testimonials" className="py-12 bg-gray-50 rounded-2xl">
        <h2 className="text-3xl font-bold mb-8 text-gray-800 flex items-center gap-2 justify-center mx-auto text-center"><FaRegComments className="text-green-600" /> What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[1, 2, 3].map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-md h-80 flex flex-col justify-between">
              <div className="text-yellow-400 text-2xl mb-3">
                {'★'.repeat(5)}
              </div>
              <p className="text-gray-600 mb-4 text-center">"ContestHub has transformed my creative journey. I've won 3 contests and connected with amazing creators from around the world!"</p>
              <div className="flex items-center gap-3 justify-center">
                <img src={users[index]?.image || contestImage} alt="User" className="w-10 h-10 rounded-full object-cover" />
                <div className="text-center">
                  <div className="font-semibold">{users[index]?.name || `User ${index + 1}`}</div>
                  <div className="text-sm text-gray-500">Professional Designer</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>


      <section id="features" className="py-12 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 flex items-center justify-center gap-2"><FaTrophy className="text-indigo-600" /> Why Choose ContestHub</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {[
            { title: 'Diverse Contests', desc: 'From design to coding, find contests in every category', icon: <FaTrophy className="text-3xl text-blue-600" /> },
            { title: 'Fair Judging', desc: 'Transparent and professional judging process', icon: <FaStar className="text-3xl text-yellow-500" /> },
            { title: 'Global Community', desc: 'Connect with creators worldwide', icon: <FaGlobe className="text-3xl text-green-600" /> },
            { title: 'Real Prizes', desc: 'Win cash rewards and recognition', icon: <FaHeart className="text-3xl text-red-500" /> },
          ].map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-md h-64 flex flex-col justify-between text-center items-center">
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>


      <section id="blog" className="py-12 bg-gray-50 rounded-2xl">
        <h2 className="text-3xl font-bold mb-8 text-gray-800 flex items-center gap-2 justify-center mx-auto text-center"><FaRegComments className="text-blue-600" /> Latest News & Updates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            { title: 'New Contest Launch: Summer Photography Challenge', date: 'Jan 10, 2026', excerpt: 'Join our biggest photography contest of the year with $5000 in prizes...' },
            { title: 'Tips for Winning Design Contests', date: 'Jan 5, 2026', excerpt: 'Expert advice from our top designers on how to stand out in design competitions...' },
            { title: 'Community Spotlight: Rising Artists to Watch', date: 'Dec 28, 2025', excerpt: 'Meet the talented creators who have made significant impact in our community...' },
          ].map((post, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-md h-80 flex flex-col justify-between">
              <div className="text-blue-600 font-semibold text-sm mb-2 text-center">{post.date}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">{post.title}</h3>
              <p className="text-gray-600 mb-4 text-center">{post.excerpt}</p>
              <Primarybtn className="text-sm px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800">Read More</Primarybtn>
            </div>
          ))}
        </div>
      </section>


      <section id="faq" className="py-12 bg-gray-50 rounded-2xl">
        <h2 className="text-3xl font-bold mb-8 text-gray-800 flex items-center gap-2 justify-center"><FaQuestionCircle className="text-purple-600" /> Frequently Asked Questions</h2>
        <div className="max-w-4xl mx-auto space-y-4">
          {[
            { q: 'How do I join a contest?', a: 'Simply browse our contests, select one you like, pay the entry fee, and submit your entry before the deadline.' },
            { q: 'How are winners chosen?', a: 'Winners are chosen by our expert panel based on creativity, quality, and adherence to contest guidelines.' },
            { q: 'Can I host my own contest?', a: 'Yes! As a verified user, you can create and host your own contests to engage the community.' },
            { q: 'What payment methods do you accept?', a: 'We accept all major credit cards, PayPal, and various digital payment methods.' },
          ].map((item, index) => (
            <div key={index} className="bg-white p-5 rounded-xl shadow-md border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-2 text-center">{item.q}</h3>
              <p className="text-gray-600 text-center">{item.a}</p>
            </div>
          ))}
        </div>
      </section>


      <section id="newsletter" className="py-12 bg-white rounded-2xl">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-800 flex items-center justify-center gap-2 mx-auto w-fit">
            <FaEnvelope className="text-xl text-purple-600" /> Subscribe to Our Newsletter
          </h2>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">Stay updated with new contests, tips, and community highlights. Get the latest updates delivered to your inbox.</p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 px-4 py-3 rounded-lg text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Primarybtn className="bg-blue-600 text-white hover:bg-blue-700 px-6">Subscribe</Primarybtn>
          </div>
        </div>
      </section>


      <section id="cta" className="py-16 text-center bg-white rounded-2xl mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Ready to Showcase Your Talent?</h2>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">Join thousands of creators competing in exciting contests. Win prizes and recognition for your skills.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/all-contests">
            <Primarybtn className="px-8 py-3 text-lg bg-blue-600 text-white hover:bg-blue-700">Explore Contests</Primarybtn>
          </Link>
          {!User && (
            <Link to="/register">
              <Primarybtn className="px-8 py-3 text-lg bg-gray-800 text-white hover:bg-gray-900">Create Account</Primarybtn>
            </Link>
          )}
          {User && (
            <Link to="/dashboard">
              <Primarybtn className="px-8 py-3 text-lg bg-gray-800 text-white hover:bg-gray-900">Go to Dashboard</Primarybtn>
            </Link>
          )}
        </div>
      </section>

    </div>
  );
};

export default Home;
