import React, { useState } from 'react'
import { IoSend } from "react-icons/io5";
import useSendMessage from '../../context/useSendMessage';

function Typesend() {
  const [message,setMessage] = useState("")
    const {loading,sendMessages} = useSendMessage();

    const handleSubmit=async(e)=>{
      //console.log(e);      
      e.preventDefault();
      await sendMessages(message)
      setMessage("");
    }
   // console.log(message);
    

  return (
    <form onSubmit={handleSubmit}>
    <div className='flex space-x-1 h-[8vh] text-center bg-gray-800'>
      <div className='w-[70%] mx-4 '>
        <input type="text" placeholder="Type here" 
        value={message}
        onChange={(e)=>setMessage(e.target.value)}
        className="border border-gray-700 rounded-xl outline-none px-4 py-3 mt-1 w-full  " />
        </div>
        <button>
           <IoSend className='text-3xl' />
        </button>
        

    </div>
    </form>
      )
}

export default Typesend
