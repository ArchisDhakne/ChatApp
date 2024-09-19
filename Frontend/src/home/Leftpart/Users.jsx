import React from 'react'
import User from './User'
import UseGetAllUsers from '../../context/UseGetAllUsers'

function Users() {
  const [allUsers,loading] = UseGetAllUsers();

  
  return (
    <div className='flex flex-col h-full'>
      <h1 className='px-8 py-2 text-white font-semibold bg-slate-800 rounded-md'>Messages</h1>
      <div className='flex-1 overflow-y-auto py-2' style={{ maxHeight: "calc(92vh - 16vh)" }}>

     {allUsers.map((user,index)=>(
      <User key={index} user={user}/>
     )
           

     )}









       </div>
      </div>
    
  )
}

export default Users
