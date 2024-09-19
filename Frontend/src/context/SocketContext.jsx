import { createContext, useEffect, useState, useContext } from 'react';
import { useAuth } from './Authprovider';
import io from 'socket.io-client';

const SocketContext = createContext();

// Custom hook to access the SocketContext
export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [authUser] = useAuth();
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    if (authUser) {
      const newSocket = io('https://chatapp-cz01.onrender.com', {
        query: {
          userId: authUser.userwithThisLogin._id,
        },
        withCredentials: true,
      });

      // Set the new socket instance in state
      setSocket(newSocket);

      // Listen for the "getOnlineUsers" event
      newSocket.on('getOnlineUsers', (users) => {
        setOnlineUsers(users);
      });

      // Cleanup: Remove the event listener and close the socket when unmounting
      return () => {
        newSocket.off('getOnlineUsers'); // Remove the listener
        newSocket.close(); // Close the socket connection
      };
    } else {
      // Close socket if authUser is not available
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContext;
