import React, { useState } from 'react';

const Submittask = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [taskLink, setTaskLink] = useState('');

  const handleSubmit = () => {
    if (!taskLink) return alert("Please submit your task link!");
    console.log("Task submitted:", taskLink);
    alert("Task submitted successfully!");
    setTaskLink('');
    setIsOpen(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <button
        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
        onClick={() => setIsOpen(true)}
      >
        Submit Task
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl p-6 w-11/12 max-w-md mx-auto shadow-lg relative">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Submit Your Task</h2>
            <textarea
              value={taskLink}
              onChange={(e) => setTaskLink(e.target.value)}
              placeholder="Paste your task link here..."
              className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            ></textarea>
            <div className="flex justify-end mt-4 gap-3">
              <button
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Submittask;
