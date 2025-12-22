import React, { useState } from 'react';
import { FaShieldAlt, FaPenNib } from 'react-icons/fa';
import Swal from 'sweetalert2';
import Primarybtn from '../../../Component/Primarybtn';
import Useauth from '../../../Component/Useauth';

const NormalUserRequest = () => {
  const [requestType, setRequestType] = useState('');
  const [loading, setLoading] = useState(false);
  const {User}=Useauth()

  console.log(User)

  const handleSubmit = async () => {
    if (!requestType) return;

    setLoading(true);

    const requestData = {
      role: requestType === 'Admin'
        ? 'requestadmin'
        : 'requestcreator',
        useremail:User.email
    };

    try {
      const res = await fetch('https://contesthub-server-pink.vercel.app/user-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData)
      });

      if (res.ok) {
        Swal.fire(
          'Success!',
          `${requestType} request sent successfully`,
          'success'
        );
        setRequestType('');
      }
    } catch  {
      Swal.fire('Error', 'Request failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  const RoleCard = ({ type, icon, color }) => (
    <div
      onClick={() => setRequestType(type)}
      className={`p-6 rounded-2xl cursor-pointer border-2 transition
        ${requestType === type
          ? `border-${color}-500 bg-${color}-50`
          : 'bg-white hover:shadow'}`}
    >
      <div className="flex gap-4 items-center">
        <div className={`p-4 rounded-xl bg-${color}-100 text-${color}-600 text-2xl`}>
          {icon}
        </div>
        <h3 className="text-xl font-bold">{type}</h3>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen w-full bg-gray-50 p-10">
      <h1 className="text-4xl font-bold text-center mb-10">
        Account Request
      </h1>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* LEFT */}
        <div className="space-y-6">
          <RoleCard
            type="Admin"
            icon={<FaShieldAlt />}
            color="blue"
          />
          <RoleCard
            type="Creator"
            icon={<FaPenNib />}
            color="purple"
          />
        </div>

        {/* RIGHT */}
        <div className="bg-white rounded-2xl shadow p-8 flex flex-col justify-center items-center">
          {requestType ? (
            <>
              <p className="text-xl font-semibold mb-6">
                Send request for <span className="text-blue-600">{requestType}</span>?
              </p>

              <Primarybtn type="sumbit" onClick={handleSubmit}>
                {loading ? 'Sending...' : `Send ${requestType} Request`}
              </Primarybtn>

              <button
                onClick={() => setRequestType('')}
                className="mt-4 text-red-500 font-semibold"
              >
                Cancel
              </button>
            </>
          ) : (
            <p className="text-gray-400 text-lg">
              Select a role to send request
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NormalUserRequest;
