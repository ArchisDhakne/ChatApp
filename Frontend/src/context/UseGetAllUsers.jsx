import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

function UseGetAllUsers() {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("Fetching users...");

    const getUsers = async () => {
      setLoading(true);
      try {
        const token = Cookies.get("token");
        console.log("token",token);
        
        const response = await axios.get("/api/user/allUsers", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true, // Makes sure cookies are sent with the request
        });

        console.log("Users fetched:");
        setAllUsers(response.data);
      } catch (error) {
        console.error("Error in useGetAllUsers:", error);
      } finally {
        setLoading(false); // Ensures loading is false after the request is completed or failed
      }
    };

    getUsers();
  }, []); // If you add dependencies, list them here

  return [allUsers, loading];
}

export default UseGetAllUsers;
