'use client';
import { useAuth } from '@clerk/nextjs';
import { createContext, useContext, useEffect, useState } from 'react';

import { getUserInfo } from '@/src/modules/user/actions';

import { UserModelProps } from '../types';

const UserContext = createContext<{
  userInfo: UserModelProps | null;
  setuserInfo: React.Dispatch<React.SetStateAction<UserModelProps | null>>;
} | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [userInfo, setuserInfo] = useState<UserModelProps | null>(null);
  const { userId } = useAuth();

  useEffect(() => {
    async function fetchUserInfo() {
      const user = await getUserInfo({ userId: userId || '' });

      if (user) {
        setuserInfo(user);
      }
    }
    fetchUserInfo();
  }, [userId]);

  return (
    <UserContext.Provider value={{ userInfo, setuserInfo }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser must be used within an UserProvider');
  }

  return context;
};
