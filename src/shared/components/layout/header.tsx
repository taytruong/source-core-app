'use client';
import { useAuth, UserButton } from '@clerk/nextjs';
import Link from 'next/link';

import IconLogin from '@/src/shared/components/icons/icon-login';

import { useUserContext } from '../../contexts';
import { Heading } from '../common';

export interface HeaderProps {
  title?: React.ReactNode;
}

function Header({ title }: HeaderProps) {
  const { userId } = useAuth();
  const { userInfo } = useUserContext();

  return (
    <div className="mb-10 flex h-20 flex-col justify-center">
      <div className="flex items-center justify-between">
        <Heading className="lg:text-3xl">{title}</Heading>
        <div className="flexCenter mt-auto gap-3">
          <h2 className="text-xl font-bold">
            {userInfo?.name ? <span>{userInfo.name} ! 👋</span> : null}
          </h2>
          <div className="m t-1">
            {userId ? (
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: {
                      width: '40px',
                      height: '40px',
                    },
                  },
                }}
              />
            ) : (
              <Link
                className="flexCenter text-logo gap-2 p-2"
                href="sign-in"
              >
                <span className="text-xl font-bold">👉 Sign in !</span>
                <IconLogin className="bg-logo flexCenter size-8 rounded-full text-white" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
