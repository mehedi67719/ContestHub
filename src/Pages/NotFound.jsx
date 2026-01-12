import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 text-center">
      
      {/* 404 Text */}
      <h1 className="text-7xl md:text-9xl font-extrabold text-blue-600">
        404
      </h1>

      {/* Message */}
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mt-4">
        Page Not Found
      </h2>

      <p className="text-gray-600 mt-2 max-w-md">
        Sorry, the page you are looking for doesn’t exist or has been moved.
      </p>

      {/* Button */}
      <Link
        to="/"
        className="mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition duration-300"
      >
        ⬅ Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
