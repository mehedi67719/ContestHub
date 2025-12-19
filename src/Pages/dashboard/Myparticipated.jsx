import React from 'react';
import Useauth from '../../Component/Useauth';
import { useQuery } from '@tanstack/react-query';

const Myparticipated = () => {
    const { User } = Useauth();

    const {
        data: Contests = [],
        isLoading: participatedLoading
    } = useQuery({
        queryKey: ['paymenthistory', User?.email],
        enabled: !!User?.email,
        queryFn: () =>
            fetch(`http://localhost:3000/payment?email=${User.email}`)
                .then(res => res.json())
    });



    if (participatedLoading) {
        return <p className="text-center mt-10">Loading...</p>;
    }




    return (
        <div className="w-full my-10 overflow-x-auto">
            <table className="w-full border-collapse min-w-[900px]">
                <thead className="bg-blue-600 text-white">
                    <tr>
                        <th className="px-4 py-3 text-left">SL</th>
                        <th className="px-4 py-3 text-left">Customer Email</th>
                        <th className="px-4 py-3 text-left">contest name</th>
                        <th className="px-4 py-3 text-left">Amount</th>
                        <th className="px-4 py-3 text-left">Currency</th>
                        <th className="px-4 py-3 text-left">Payment Status</th>
                        <th className="px-4 py-3 text-left">Paid At</th>
                        <th className="px-4 py-3 text-left">Transaction ID</th>
                        <th className="px-4 py-3 text-left">Tracking ID</th>
                    </tr>
                </thead>
                {
                    Contests.length === 0 ? (<p className='text-gray-600 text-center mt-2'>no participated</p>) : (
                        <tbody>
                            {Contests.map((item, index) => (
                                <tr
                                    key={item._id}
                                    className="odd:bg-gray-100 even:bg-white hover:bg-blue-50 transition"
                                >
                                    <td className="px-4 py-3">{index + 1}</td>
                                    <td className="px-4 py-3">{item.Customer_email}</td>
                                    <td className="px-4 py-3 break-all">{item.contest_name}</td>
                                    <td className="px-4 py-3 font-semibold">${item.amount}</td>
                                    <td className="px-4 py-3 uppercase">{item.currency}</td>
                                    <td className="px-4 py-3">
                                        <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-700">
                                            {item.payment_status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        {new Date(item.paidat).toLocaleString()}
                                    </td>
                                    <td className="px-4 py-3 break-all">{item.tranjectionid}</td>
                                    <td className="px-4 py-3 break-all">{item.trackingid}</td>
                                </tr>
                            ))}
                        </tbody>
                    )
                }
            </table>
        </div>
    );
};

export default Myparticipated;
