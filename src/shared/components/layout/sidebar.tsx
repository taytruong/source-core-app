'use client';
import { useAuth, UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';

import { MenuItem } from '@/src/shared/components';
import IconLogin from '@/src/shared/components/icons/icon-login';
import { menuItems } from '@/src/shared/constants';

const Sidebar = () => {
  const { userId } = useAuth();

  return (
    <div className="fixed top-0 bottom-0 left-0 hidden w-70 flex-col border-r border-r-gray-200 bg-linear-to-r from-orange-200 to-white/40 p-5 shadow-sm lg:flex">
      <a
        className="text-primary mb-11 flex items-end justify-center text-3xl font-semibold"
        href="/"
      >
        <span className="mb-2">
          <Image
            alt="logo"
            className="object-cover"
            height={27}
            src="/logo.png"
            width={27}
          />
        </span>
        cademy
      </a>
      <ul className="flex flex-col gap-1.5 font-medium">
        {menuItems.map((item, index) => (
          <MenuItem
            key={index}
            icon={item.icon}
            title={item.title}
            url={item.url}
          />
        ))}
      </ul>
      <div className="mt-auto flex items-center justify-end">
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
            className="bg-primary flex size-8 items-center justify-center rounded-full text-white"
            href="sign-in"
          >
            <IconLogin />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
