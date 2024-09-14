import React from 'react';
import useConversation from '../../zustland/useConversation.jsx';
import { useSocketContext } from '../../context/SocketContext.jsx';
import { CiMenuFries } from 'react-icons/ci';

function Chatuser() {
  const { selectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();

  const getOnlineUsersStatus = (userId) => {
    return onlineUsers.includes(userId) ? "Online" : "Offline";
  };

  return (
    <div className='relative flex items-center h-[8%] justify-center gap-4 bg-slate-800 hover:bg-slate-600 duration-300 rounded-md'>
      <label
        htmlFor="my-drawer-2"
        className='btn btn-ghost drawer-button lg:hidden absolute left-5'
      >
        <CiMenuFries className='text-white text-xl' />
      </label>
      <div className="flex space-x-3 items-center justify-center bg-gray-800 hover:bg-gray-700 duration-300 h-[8vh]">
        <div className="avatar">
          <div className="w-12 rounded-full">
            <img
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              alt={selectedConversation?.fullname || "User"}
            />
          </div>
        </div>
        <div>
          {selectedConversation ? (
            <>
              <h1 className="text-xl">{selectedConversation.fullname}</h1>
              <span className="text-sm">{getOnlineUsersStatus(selectedConversation._id)}</span>
            </>
          ) : (
            <h1 className="text-xl">Select a user</h1>
          )}
        </div>
      </div>
    </div>
  );
}

export default Chatuser;
