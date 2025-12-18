import { useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { FaUserShield, FaUserEdit, FaUser } from 'react-icons/fa';
import Swal from 'sweetalert2';

const Manageuser = () => {
    const queryClient = useQueryClient();

    const { data: users = [], isLoading } = useQuery({
        queryKey: ['ManageUser'],
        queryFn: () =>
            fetch("http://localhost:3000/user")
                .then(res => res.json())
    });

    const handleRoleChange = async (role, useremail) => {
        // console.log(role, useremail)
        try {
            const res = await fetch('http://localhost:3000/user-request', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    useremail,
                    role
                }),
            });

            if (res.ok) {
                queryClient.invalidateQueries(['ManageUser']);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `Role updated to ${role}`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (error) {
            console.error(error);
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="p-2 md:p-6 bg-gray-50 min-h-screen w-full flex flex-col overflow-hidden">
            <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800">
                        Manage <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">Users</span>
                    </h2>
                    <p className="text-gray-500 text-sm font-medium">Total: {users.length} members</p>
                </div>
            </div>

            <div className="flex-1 bg-white rounded-3xl shadow-xl border border-gray-100 flex flex-col overflow-hidden">
                <div className="overflow-x-auto w-full scrollbar-hide">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-100 sticky top-0 z-10">
                            <tr>
                                <th className="px-4 md:px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">User</th>
                                <th className="px-4 md:px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider hidden sm:table-cell">Email</th>
                                <th className="px-4 md:px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Role</th>
                                <th className="px-4 md:px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Actions</th>
                            </tr>
                        </thead>
                    </table>
                </div>

                <div className="overflow-y-auto flex-1 max-h-[calc(100vh-250px)] custom-scrollbar">
                    <table className="w-full text-left">
                        <tbody className="divide-y divide-gray-100">
                            {users.map(user => (
                                <tr key={user._id} className="hover:bg-blue-50/40 transition-colors">
                                    <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-tr from-blue-100 to-purple-100 flex items-center justify-center text-blue-600 text-xs md:text-sm font-bold border border-white shadow-sm">
                                                {user.displayName ? user.displayName[0] : 'U'}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-bold text-gray-800 text-sm md:text-base truncate max-w-[120px] md:max-w-none">
                                                    {user.displayName || "Anonymous"}
                                                </span>
                                                <span className="text-[10px] text-gray-400 sm:hidden">{user.email}</span>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-4 md:px-6 py-4 whitespace-nowrap hidden sm:table-cell text-gray-600 text-sm">
                                        {user.email}
                                    </td>

                                    <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-0.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-tighter md:tracking-widest ${user.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                                                user.role === 'creator' ? 'bg-blue-100 text-blue-700' :
                                                    'bg-gray-100 text-gray-600'
                                            }`}>
                                            {user.role || "User"}
                                        </span>
                                    </td>

                                    <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                                        <div className="flex justify-center gap-1 md:gap-2">
                                            <button
                                                onClick={() => handleRoleChange('admin', user.email)}
                                                disabled={user.role === 'admin'}
                                                className={`p-1.5 md:p-2 rounded-lg transition-all ${user.role === 'admin' ? 'text-gray-200' : 'bg-green-50 text-green-600 hover:bg-green-600 hover:text-white'}`}
                                            >
                                                <FaUserShield size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleRoleChange('creator', user.email)}
                                                disabled={user.role === 'creator'}
                                                className={`p-1.5 md:p-2 rounded-lg transition-all ${user.role === 'creator' ? 'text-gray-200' : 'bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white'}`}
                                            >
                                                <FaUserEdit size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleRoleChange('user', user.email)}
                                                disabled={!user.role || user.role === 'user'}
                                                className={`p-1.5 md:p-2 rounded-lg transition-all ${(!user.role || user.role === 'user') ? 'text-gray-200' : 'bg-gray-100 text-gray-600 hover:bg-gray-600 hover:text-white'}`}
                                            >
                                                <FaUser size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>


        </div>
    );
};

export default Manageuser;