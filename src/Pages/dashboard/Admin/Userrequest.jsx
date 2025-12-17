import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { FcApprove } from 'react-icons/fc';

const Userrequest = () => {
  const queryClient = useQueryClient();
  const [updatingUserEmail, setUpdatingUserEmail] = useState(null);

  // Fetch users
  const { isLoading, error, data: users = [] } = useQuery({
    queryKey: ['role-user'],
    queryFn: () =>
      fetch('http://localhost:3000/role-user').then((res) => res.json()),
  });

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10">Error: {error.message}</p>;

  const handleApprove = async (userEmail) => {
    setUpdatingUserEmail(userEmail);
    try {
      const res = await fetch('http://localhost:3000/user-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ useremail: userEmail, role: 'admin' }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to approve');

      // Update local UI
      queryClient.setQueryData(['role-user'], (oldData) =>
        oldData.map((u) =>
          u.email === userEmail ? { ...u, role: 'admin' } : u
        )
      );
    } catch (err) {
      alert(err.message);
    } finally {
      setUpdatingUserEmail(null);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">User Requests</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-lg overflow-hidden">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Request</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Approve</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => {
              const isApproved = u.role !== 'requestcreator' && u.role !== 'requestadmin';
              const displayRequest =
                u.role === 'requestcreator' ? 'Creator' :
                u.role === 'requestadmin' ? 'Admin' : 'Pending';
              const displayStatus = isApproved ? 'Approved' : 'Pending';

              return (
                <tr key={u._id} className="border-b border-gray-300 hover:bg-gray-50">
                  <td className="px-6 py-4">{u.name}</td>
                  <td className="px-6 py-4">{u.email}</td>
                  <td className="px-6 py-4 font-medium">{displayRequest}</td>
                  <td className="px-6 py-4">
                    <div
                      className={`px-3 py-1 rounded-lg w-max font-medium border ${
                        isApproved
                          ? 'bg-green-100 text-green-700 border-green-400'
                          : 'bg-yellow-100 text-yellow-700 border-yellow-400'
                      }`}
                    >
                      {displayStatus}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleApprove(u.email)}
                      disabled={isApproved || updatingUserEmail === u.email}
                      className={`p-2 rounded-full shadow-md ${
                        isApproved || updatingUserEmail === u.email
                          ? 'opacity-50 cursor-not-allowed'
                          : 'hover:bg-green-200'
                      }`}
                    >
                      <FcApprove className="w-6 h-6" />
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

export default Userrequest;
