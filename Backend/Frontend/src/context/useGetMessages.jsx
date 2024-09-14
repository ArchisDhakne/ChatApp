import React, { useEffect, useState } from 'react'
import useConversation from '../zustland/useConversation'
import axios from 'axios'
function useGetMessages() {
 
  const [loading,setLoading] = useState(false)
 const {messages,setMessages,selectedConversation} = useConversation()

//  console.log(messages);
//  console.log(setMessages);


 useEffect(()=>{
   
  const getMessages=async()=>{
    setLoading(true);
    if(selectedConversation && selectedConversation._id){
      try {
        const res = await axios.get(
          `/api/message/get/${selectedConversation._id}`
        );
       //  console.log(res.data);
        
        setMessages(res.data);
        setLoading(false);
        
      } catch (error) {
        console.log("Error in getting messages",error);
        
      }
    }
  }
  getMessages();
  

 },[selectedConversation,setMessages])


  return {loading,setMessages,messages,selectedConversation}
}

export default useGetMessages
