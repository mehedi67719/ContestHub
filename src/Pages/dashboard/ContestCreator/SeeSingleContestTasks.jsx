import { useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router';
import Swal from 'sweetalert2';

const SeeSingleContestTasks = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const { data: tasks = [], isLoading, error } = useQuery({
    queryKey: ["single-tasks", id],
    queryFn: async () => {
      const res = await fetch(`http://localhost:3000/task/${id}`);
      return res.json();
    },
  });

  const { data: contestData = {}, isLoading: contestLoading } = useQuery({
    queryKey: ["single-contest", id],
    queryFn: async () => {
      const res = await fetch(`http://localhost:3000/contests/${id}`);
      return res.json();
    },
    enabled: !!id,
  });

  const { data: windata = [], isLoading: winloading } = useQuery({
    queryKey: ["Win"],
    queryFn: async () => {
      const res = await fetch("http://localhost:3000/win");
      return res.json();
    },
  });

  const markWinner = async ({ taskId, winnerEmail, price, contestId }) => {
    try {
      const res = await fetch("http://localhost:3000/win", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ taskId, contestname: contestData.name, winnerEmail, price, contestId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to mark winner");
      Swal.fire({ icon: 'success', title: 'Winner marked!', showConfirmButton: false, timer: 1500 });
      queryClient.invalidateQueries(["single-tasks", id]);
      queryClient.invalidateQueries(["Win"]);
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Error!', text: err.message });
    }
  };

  if (isLoading || contestLoading || winloading) return <p className="text-center text-xl mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-600 text-xl mt-10">Something went wrong</p>;

  const isDeadlinePassed = (deadline) => new Date(deadline) < new Date();
  const contestWinner = windata.find(w => w.contestId === id);

  return (
    <div className="p-6 min-h-screen w-full">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">{contestData.name} - Submission Tasks</h2>

      {tasks.length === 0 ? (
        <p className="text-gray-500">No tasks submitted for this contest yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-md border">
          <table className="w-full text-left border-collapse">
            <thead className="bg-blue-600">
              <tr>
                <th className="px-6 py-3 border-b text-sm font-semibold text-white">Task ID</th>
                <th className="px-6 py-3 border-b text-sm font-semibold text-white">Submit Email</th>
                <th className="px-6 py-3 border-b text-sm font-semibold text-white">Task Link</th>
                <th className="px-6 py-3 border-b text-sm font-semibold text-white">Win</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {tasks.map((task) => {
                const winnerExists = windata.some(w => w.taskId === task._id);
                const deadlinePassed = isDeadlinePassed(contestData.deadline);
                const disableButton = !!contestWinner || !deadlinePassed;

                return (
                  <tr key={task._id} className="hover:bg-blue-50 transition-colors">
                    <td className="px-6 py-4 text-gray-800">{task._id}</td>
                    <td className="px-6 py-4 text-gray-800">{task.user_email || task.email}</td>
                    <td className="px-6 py-4 text-blue-600 underline break-all">
                      <a href={task.taskLink} target="_blank" rel="noopener noreferrer">{task.taskLink}</a>
                    </td>
                    <td className='px-6 py-4 text-center'>
                      <button
                        onClick={() => markWinner({
                          taskId: task._id,
                          winnerEmail: task.user_email || task.email,
                          price: contestData.prizeMoney,
                          contestId: contestData._id
                        })}
                        disabled={disableButton}
                        className={`px-3 py-1 rounded-full ${winnerExists ? "bg-green-500 text-white" : disableButton ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"}`}
                      >
                        {winnerExists ? "Winned" : disableButton ? "Win" : "Mark Win"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SeeSingleContestTasks;
