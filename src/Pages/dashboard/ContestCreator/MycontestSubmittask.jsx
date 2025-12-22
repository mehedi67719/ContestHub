import { useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import Useauth from '../../../Component/Useauth';
import Swal from 'sweetalert2';

const MycontestSubmittask = () => {
  const { User } = Useauth();
  const queryClient = useQueryClient();

  const { data: contests = [], isLoading, error } = useQuery({
    queryKey: ["My-contests", User?.email],
    enabled: !!User?.email,
    queryFn: async () => {
      const res = await fetch(`https://contesthub-server-pink.vercel.app/contests/user/${User.email}`);
      return res.json();
    }
  });

  const { data: tasks = [], isLoading: loading, error: err } = useQuery({
    queryKey: ["all-tasks"],
    queryFn: async () => {
      const res = await fetch("https://contesthub-server-pink.vercel.app/task");
      return res.json();
    }
  });

  const { data: windata = [], isLoading: winloading, error: winerr } = useQuery({
    queryKey: ["Win"],
    queryFn: async () => {
      const res = await fetch("https://contesthub-server-pink.vercel.app/win");
      return res.json();
    }
  });

  const markWinner = async ({ taskId, contestname, winnerEmail, price, contestId }) => {
    try {
      const res = await fetch("https://contesthub-server-pink.vercel.app/win", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ taskId, contestname, winnerEmail, price, contestId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to mark winner");
      Swal.fire({ icon: 'success', title: 'Winner marked!', showConfirmButton: false, timer: 1500 });
      queryClient.invalidateQueries(["My-contests"]);
      queryClient.invalidateQueries(["Win"]);
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Error!', text: err.message });
    }
  };

  if (loading || isLoading || winloading) return <p className="text-center text-xl mt-10">Loading...</p>;
  if (error || err || winerr) return <p className="text-center text-red-600 text-xl mt-10">Something went wrong</p>;

  const filtertask = tasks.filter(task =>
    contests.some(contest => contest._id === task.contest_id)
  );

  const isDeadlinePassed = (deadline) => new Date(deadline) < new Date();

  return (
    <div className="w-full my-10 lg:mx-5 md:mx-4 mx-1.5">
      <h2 className="text-2xl font-bold text-center my-5">Your Tasks Submission</h2>
      <div className="relative w-full overflow-x-auto md:overflow-x-hidden rounded-2xl">
        <table className="w-full min-w-[720px] bg-white shadow-2xl rounded-2xl border border-gray-200">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold">Contest Name</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Submit Email</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Task Link</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Win</th>
            </tr>
          </thead>
          <tbody>
            {filtertask.map(task => {
              const contest = contests.find(c => c._id === task.contest_id);
              const deadlinePassed = contest ? isDeadlinePassed(contest.deadline) : false;
              const contestWinner = windata.find(w => w.contestId === task.contest_id);
              const winnerExists = windata.some(w => w.taskId === task._id);

              return (
                <tr key={task._id} className="border-b hover:bg-blue-50">
                  <td className="px-4 py-3 text-sm">{contest?.name}</td>
                  <td className="px-4 py-3 text-sm">{task.user_email || task.email}</td>
                  <td className="px-4 py-3 text-sm text-blue-600 break-all">{task.taskLink}</td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => markWinner({
                        taskId: task._id,
                        contestname: contest.name,
                        winnerEmail: task.user_email || task.email,
                        price: contest.prizeMoney,
                        contestId: contest._id
                      })}
                      disabled={!!contestWinner || !deadlinePassed}
                      className={`px-3 py-1 rounded-full ${winnerExists ? "bg-green-500 text-white" : contestWinner ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"}`}
                    >
                      {winnerExists ? "Winned" : contestWinner ? "Win" : "Mark Win"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MycontestSubmittask;
