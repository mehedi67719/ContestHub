import React from 'react';

const Primarybtn = ({children}) => {
    return (
    <button className="px-6 py-2 font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-800 rounded-md shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200">
      {children}
    </button>
    );
};

export default Primarybtn;