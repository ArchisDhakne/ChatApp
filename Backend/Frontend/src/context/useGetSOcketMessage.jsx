import React, { useEffect } from 'react'
import { useSocketContext } from './SocketContext'
import useConversation from '../zustland/useConversation.jsx'
import sound from '../assets/sound.wav'

function useGetSOcketMessage() {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversation();

  useEffect(() => {
    socket.on("newMessage", (newMessage) => {
       const notification = new Audio(sound);
       notification.play();
      setMessages([...messages, newMessage])
    });
    return () => {
      socket.off("newMessage");
    }
  }, [socket, messages, setMessages]);
}

export default useGetSOcketMessage
