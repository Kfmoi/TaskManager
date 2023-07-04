import { useState, useEffect } from 'react';

const useUserID = () => {
  const [userID, setUserID] = useState(null);

  useEffect(() => {
    const storedUserID = localStorage.getItem('userID');
    if (storedUserID) {
      setUserID(storedUserID);
    }
  }, []);

  return userID;
};

export default useUserID;