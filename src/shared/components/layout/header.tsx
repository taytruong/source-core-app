'use client';
import { useAuth, UserButton } from '@clerk/nextjs';
import Link from 'next/link';

import IconLogin from '@/src/shared/components/icons/icon-login';

import { Input } from '../ui/input';

export interface HeaderProps {}

function Header(_props: HeaderProps) {
  const { userId } = useAuth();

  return (
    <div className="flex h-20 flex-col justify-center px-5 py-2">
      <div className="flex items-center justify-between gap-5">
        <Input
          className="w-100"
          placeholder="Tìm kiếm khóa học ..."
        />
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
    </div>
  );
}

export default Header;
