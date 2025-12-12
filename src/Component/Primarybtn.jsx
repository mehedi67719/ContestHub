import React from 'react';

const Primarybtn = ({ children, className = '', disabled = false, onClick }) => {
  return (
    <button
      className={`px-6 py-2 font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-800 rounded-md shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 ${className} ${disabled ? 'opacity-50 cursor-not-allowed hover:scale-100 hover:shadow-md' : ''}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Primarybtn;
