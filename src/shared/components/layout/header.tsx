'use client';
import { useAuth, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import IconLogin from '@/src/shared/components/icons/icon-login';

import { useUserContext } from '../../contexts';
import { Heading } from '../common';

export interface HeaderProps {
  title?: React.ReactNode;
}

function Header({ title }: HeaderProps) {
  const { userId } = useAuth();
  const { userInfo } = useUserContext();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  useEffect(() => {
    const checkUserMenu = () => {
      const userMenu = document.querySelector('.cl-userButtonPopoverCard');

      setIsUserMenuOpen(!!userMenu);
    };

    const observer = new MutationObserver(checkUserMenu);

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    checkUserMenu();

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {!!isUserMenuOpen && (
        <div
          aria-hidden="true"
          className="fixed inset-0 z-40 bg-black/5 backdrop-blur-sm"
        />
      )}
      <div className="relative mb-7 flex h-20 flex-col justify-center">
        <div className="flex items-center justify-between">
          <Heading className="lg:text-3xl">{title}</Heading>
          <div className="flexCenter mt-auto gap-3">
            {!!userId && !!userInfo?.name && (
              <h2 className="hidden text-xl font-bold sm:block">
                <span>{userInfo.name} ! 👋</span>
              </h2>
            )}
            <div className={`relative mt-1 ${isUserMenuOpen ? 'z-50' : ''}`}>
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
                  href="/sign-in"
                >
                  <span className="text-xl font-bold">👉 Sign in !</span>
                  <IconLogin className="bg-logo flexCenter size-8 rounded-full text-white" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
