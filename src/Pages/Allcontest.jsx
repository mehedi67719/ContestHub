import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { FaUsers, FaClock, FaStar, FaTag, FaSearch, FaSort, FaFilter } from "react-icons/fa";
import Primarybtn from "../Component/Primarybtn";
import { useQuery } from "@tanstack/react-query";

const Allcontest = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [priceFilter, setPriceFilter] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const contestsPerPage = 12;
  
  const tabs = ["All", "Design", "Article", "Business", "Gaming", "Video Editing"];

  const {data:contests=[],isLoading,error}=useQuery({
    queryKey:["All-contest"],
    queryFn:async ()=>{
      const res= await fetch("https://contesthub-server-pink.vercel.app/contests")
      return res.json()
    }
  })

if(error){
  return <p className="text-red-600 font-bold text-center text-2xl">Something went wrong!</p>
}

  // Filter contests based on multiple criteria
  const filteredContests = useMemo(() => {
    let result = contests;
    
    // Apply search term filter
    if (searchTerm) {
      result = result.filter(contest => 
        contest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contest.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contest.contestType.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply active tab filter
    if (activeTab !== "All") {
      result = result.filter(contest => contest.contestType === activeTab);
    }
    
    // Apply category filter
    if (categoryFilter !== "All") {
      result = result.filter(contest => contest.contestType === categoryFilter);
    }
    
    // Apply price filter
    if (priceFilter !== "All") {
      if (priceFilter === "Free") {
        result = result.filter(contest => contest.entryFee === 0);
      } else if (priceFilter === "Paid") {
        result = result.filter(contest => contest.entryFee > 0);
      }
    }
    
    // Apply sorting
    switch (sortBy) {
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "deadline":
        result.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
        break;
      case "entryFee":
        result.sort((a, b) => a.entryFee - b.entryFee);
        break;
      case "prizeMoney":
        result.sort((a, b) => b.prizeMoney - a.prizeMoney); // Descending order for prize
        break;
      default:
        // Default sort by creation date or ID
        break;
    }
    
    return result;
  }, [contests, searchTerm, activeTab, categoryFilter, priceFilter, sortBy]);
  
  // Pagination
  const indexOfLastContest = currentPage * contestsPerPage;
  const indexOfFirstContest = indexOfLastContest - contestsPerPage;
  const currentContests = filteredContests.slice(indexOfFirstContest, indexOfLastContest);
  const totalPages = Math.ceil(filteredContests.length / contestsPerPage);

  // Skeleton Loader Component
  const SkeletonCard = () => (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col h-96">
      <div className="h-48 bg-gray-200 animate-pulse"></div>
      <div className="p-5 flex flex-col flex-grow">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-3 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6 mb-4 animate-pulse"></div>
        <div className="space-y-2 mb-4">
          <div className="flex justify-between">
            <div className="h-4 w-1/3 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-1/3 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="flex justify-between">
            <div className="h-4 w-1/4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-1/4 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
        <div className="mt-auto">
          <div className="h-8 w-full bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
      </div>
    </div>
  );

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-[90%] mx-auto py-12 space-y-12">
      <h1 className="text-4xl font-bold text-center text-gray-800">Explore Contests</h1>

      {/* Search Bar */}
      <div className="relative max-w-2xl mx-auto">
        <div className="flex items-center border border-gray-300 rounded-full px-4 py-3 bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
          <FaSearch className="text-gray-400 mr-3" />
          <input
            type="text"
            placeholder="Search contests by name, category, or description..."
            className="w-full focus:outline-none"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to first page when searching
            }}
          />
        </div>
      </div>

      {/* Filters and Sorting Controls */}
      <div className="flex flex-wrap gap-4 items-center justify-between p-4 bg-gray-50 rounded-xl">
        <div className="flex flex-wrap gap-4">
          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <FaFilter className="text-gray-600" />
            <select 
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={categoryFilter}
              onChange={(e) => {
                setCategoryFilter(e.target.value);
                setCurrentPage(1); // Reset to first page when filtering
              }}
            >
              <option value="All">All Categories</option>
              {tabs.filter(tab => tab !== "All").map(tab => (
                <option key={tab} value={tab}>{tab}</option>
              ))}
            </select>
          </div>

          {/* Price Filter */}
          <div className="flex items-center gap-2">
            <FaTag className="text-gray-600" />
            <select 
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={priceFilter}
              onChange={(e) => {
                setPriceFilter(e.target.value);
                setCurrentPage(1); // Reset to first page when filtering
              }}
            >
              <option value="All">All Prices</option>
              <option value="Free">Free Entry</option>
              <option value="Paid">Paid Entry</option>
            </select>
          </div>
        </div>

        {/* Sorting */}
        <div className="flex items-center gap-2">
          <FaSort className="text-gray-600" />
          <select 
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
              setCurrentPage(1); // Reset to first page when sorting
            }}
          >
            <option value="default">Default Sort</option>
            <option value="name">Sort by Name</option>
            <option value="deadline">Sort by Deadline</option>
            <option value="entryFee">Sort by Entry Fee</option>
            <option value="prizeMoney">Sort by Prize Money</option>
          </select>
        </div>
      </div>

      {/* Category Tabs */}
      {
        isLoading ? (
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {tabs.map((tab) => (
              <div key={tab} className="px-6 py-2.5 rounded-full text-sm font-medium bg-gray-200 w-24 h-8 animate-pulse">
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setCurrentPage(1); // Reset to first page when changing tab
                }}
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

      {/* Contest Count */}
      <div className="text-center text-gray-600">
        Showing {indexOfFirstContest + 1}-{Math.min(indexOfLastContest, filteredContests.length)} of {filteredContests.length} contests
      </div>

      {currentContests.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading ? (
            Array.from({ length: 8 }).map((_, index) => (
              <SkeletonCard key={`skeleton-${index}`} />
            ))
          ) : (
            currentContests.map((contest) => (
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
                  
                  <div className="mt-auto">
                    <Link to={`/contest/${contest._id}`}>
                      <Primarybtn className="w-full py-2 text-sm">View Details</Primarybtn>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      ) : isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <SkeletonCard key={`skeleton-${index}`} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg mt-12">No contests found matching your criteria.</p>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-8">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg ${currentPage === 1 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-blue-100 text-blue-700 hover:bg-blue-200'}`}
          >
            Previous
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={`px-4 py-2 rounded-lg ${currentPage === pageNumber ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              {pageNumber}
            </button>
          ))}
          
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg ${currentPage === totalPages ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-blue-100 text-blue-700 hover:bg-blue-200'}`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Allcontest;
