import React, { useEffect } from 'react'
import Chatuser from './Chatuser'
import Messages from './Messages'
import Typesend from './Typesend'
import useConversation from '../../zustland/useConversation'
import { useAuth } from '../../context/Authprovider';
import { CiMenuFries } from "react-icons/ci";

function Right() {

  const { selectedConversation, setSelectedConversation } = useConversation()
 
  useEffect(() => {

   setSelectedConversation(null);

  }, [setSelectedConversation]);

  return (
    <div className='w-full   h-screen flex flex-col text-gray-300 bg-slate-900 '>
    <div className='relative'>
      
        {!selectedConversation ? (<NoChatSelected /> 
      ) : (<>
          <Chatuser />
          <div className='flex-1 overflow-y-auto' style={{ maxHeight: "calc(92vh - 8vh)" }}>
            <Messages />
          </div>
          <Typesend />
        </>
        )}
      </div>
    </div>
  );
}

export default Right

const NoChatSelected = () => {
  const [authUser] = useAuth();
 // console.log(authUser);
  
  return (

  <>
 <div className='relative'>
  <label
    htmlFor="my-drawer-2"
    className='btn btn-ghost drawer-button lg:hidden absolute left-5'
  >
    <CiMenuFries className='text-white text-xl'/>
  </label>
    <div className='flex h-screen items-center justify-center'>
      <h1 className='text-center'>Welcome!{" "} 
        <span className='text-4xl font-bold text-yellow-300'>{authUser.
userwithThisLogin.fullname}</span>
        <br />
        No chat selected, please start conversation by selecting anyone to your contacts
      </h1>
    </div>
    </div>
    </>
  )
}