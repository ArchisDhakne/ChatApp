import React, { useState } from 'react'
import { IoIosLogOut } from "react-icons/io";
import axios from 'axios';
import Cookies from 'js-cookie'
import toast from 'react-hot-toast';

function Logout() {

const [loading,setLoading] = useState(false)
const handleLogout = async ()=>{
  setLoading(true);
  try {
    
   const res = await axios.post('/api/user/logout')

   localStorage.removeItem("ChatApp")
   Cookies.remove("token")
   setLoading(false);
   toast.success("LoggedOut succesful");
   window.location.reload();
    
  } catch (error) {
    console.log("Error in logout: ",error);
    toast.error("Error in logging out");
  }
}

  return (
   <div className='h-[10vh] bg-slate-600'>
   <div>
    <IoIosLogOut  className='text-5xl text-white hover:bg-slate-700 duration-300 cursor-pointer rounded-full p-2 ml-2 mt-1' 
    onClick={handleLogout}
    />
    </div>
   </div>
  )
}

export default Logout
