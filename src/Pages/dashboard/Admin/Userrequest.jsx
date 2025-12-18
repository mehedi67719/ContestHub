import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { FcApprove } from 'react-icons/fc';

const Userrequest = () => {
  const queryClient = useQueryClient();
  const [updatingUserEmail, setUpdatingUserEmail] = useState(null);

  const { isLoading, error, data: users = [] } = useQuery({
    queryKey: ['role-user'],
    queryFn: async () => {
      const res = await fetch('http://localhost:3000/user');
      return res.json();
    },
  });

  const handleApprove = async (user) => {
    setUpdatingUserEmail(user.email);

    let approvedRole = '';
    if (user.role === 'requestcreator') approvedRole = 'creator';
    else if (user.role === 'requestadmin') approvedRole = 'admin';
    else return;

    try {
      const res = await fetch('http://localhost:3000/user-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          useremail: user.email,
          role: approvedRole,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed');

      queryClient.setQueryData(['role-user'], (oldData) =>
        oldData.map((u) =>
          u.email === user.email ? { ...u, role: approvedRole } : u
        )
      );
    } catch (err) {
      alert(err.message);
    } finally {
      setUpdatingUserEmail(null);
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      u.role === 'requestcreator' || u.role === 'requestadmin' || u.role === 'user'
  );

  let content = null;

  if (isLoading) {
    content = <p className="text-center mt-10">Loading...</p>;
  } else if (error) {
    content = <p className="text-center mt-10">Error: {error.message}</p>;
  } else {
    content = (
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
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No Request
                </td>
              </tr>
            ) : (
              filteredUsers.map((u) => {
                const isApproved =
                  u.role !== 'requestcreator' && u.role !== 'requestadmin';

                const displayRequest =
                  u.role === 'requestcreator'
                    ? 'Creator'
                    : u.role === 'requestadmin'
                    ? 'Admin'
                    : 'Normal User';

                const displayStatus =
                  u.role === 'creator'
                    ? 'Creator'
                    : u.role === 'admin'
                    ? 'Admin'
                    : 'Pending';

                return (
                  <tr
                    key={u._id || u.email}
                    className="border-b border-gray-300 hover:bg-gray-50"
                  >
                    <td className="px-6 py-4">{u.displayName || u.name || 'No name'}</td>
                    <td className="px-6 py-4">{u.email}</td>
                    <td className="px-6 py-4 font-medium">{displayRequest}</td>
                    <td className="px-6 py-4">
                      <div
                        className={`px-3 py-1 rounded-lg w-max font-medium border ${
                          u.role === 'creator' || u.role === 'admin'
                            ? 'bg-green-100 text-green-700 border-green-400'
                            : 'bg-yellow-100 text-yellow-700 border-yellow-400'
                        }`}
                      >
                        {displayStatus}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleApprove(u)}
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
              })
            )}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="p-6 w-full">
      <h1 className="text-3xl font-bold mb-6 text-center">User Requests</h1>
      {content}
    </div>
  );
};

export default Userrequest;
