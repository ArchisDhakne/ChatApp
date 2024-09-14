import React, { useState } from 'react'
import { FaSearch } from "react-icons/fa";
import UseGetAllUsers from '../../context/UseGetAllUsers'
import useConversation from '../../zustland/useConversation';
import toast from 'react-hot-toast';

function Search() {
  const [search,setSearch] = useState("");
  const [allUsers]=UseGetAllUsers();
  const {setSelectedConversation} = useConversation();  
  const handlesubmit=(e)=>{
    e.preventDefault();
    if(!search) return;
    
    const conversation = allUsers.find((user)=>user.fullname.toLowerCase().includes(search.toLowerCase()));
   // console.log(user);
    
    if(conversation){
       setSelectedConversation(conversation);
     setSearch("");
    }else{
      toast.error("user not found");
    }
  }
  return (
   <div className='h-[10vh]'>
     <div className='px-6 py-4'>
      <form onSubmit={handlesubmit}>
        <div className='flex space-x-3'>
          <label className="border-[1px] rounded-lg p-3 border-gray-700 flex items-center gap-2 w-[80%] bg-slate-900">
            <input type="text" className="grow outline-none bg-transparent" placeholder="Search"
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            />
          </label>
          <button className=''>
            <FaSearch className='text-5xl p-2 hover:bg-gray-600 rounded-full duration-300' />
          </button>
        </div>
      </form>
    </div>
   </div>
  )
}

export default Search
