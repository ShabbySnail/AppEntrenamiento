import { useState, useEffect } from 'react';
import { auth } from '../services/firebase';

const useAuth = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  setPersistence(auth, browserLocalPersistence);


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { currentUser, isLoading };
};

export default useAuth;
