/* eslint-disable no-alert */

import { User } from 'firebase/auth';
import React, { createContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { handleAuthStateChange, setDoc } from '@lib/firebase';

interface IContext {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

interface IProps {
  children: React.ReactNode;
}

const UserContext = createContext<IContext>({
  user: null,
  setUser: () => null,
});

const UserProvider: React.FC<IProps> = function ({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState<IContext['user']>(null);
  const value = useMemo(() => ({ user, setUser }), [user]);

  useEffect(() => {
    handleAuthStateChange(async (newUser) => {
      if (newUser) {
        await setDoc(newUser);
        navigate('/', { replace: true });
      }

      setUser(newUser);
    });
  }, [navigate]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };
