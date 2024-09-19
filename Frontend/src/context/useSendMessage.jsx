import React, { useState } from 'react';
import useConversation from '../zustland/useConversation';
import axios from 'axios';

function useSendMessage() {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const sendMessages = async (message) => {
    if (!selectedConversation?._id) {
      console.error("No conversation selected");
      return;
    }

    setLoading(true);
    
  // console.log(selectedConversation._id);
   

    try {
      const res = await axios.post(
        `/api/message/send/${selectedConversation._id}`,
        { message }
      );

      // Assuming res.data contains { message: "Message sent successfully", newMessage }
      const { newMessage } = res.data;

      // Add the new message to the conversation's messages
      setMessages([...messages, newMessage]);
    } catch (error) {
      console.error("Error in sending message", error);
    } finally {
      setLoading(false); // Always stop loading
    }
  };

  return { loading, sendMessages };
}

export default useSendMessage;
