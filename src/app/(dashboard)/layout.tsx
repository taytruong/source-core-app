import { auth } from '@clerk/nextjs/server';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';

import { getUserInfo } from '@/src/modules/user/actions';
import { MenuItem } from '@/src/shared/components/common';
import { Sidebar } from '@/src/shared/components/layout';
import { menuItems, UserStatus } from '@/src/shared/constants';

import PageNotFound from '../not-found';

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const { userId } = await auth();

  if (!userId) return redirect('/sign-in');
  const user = await getUserInfo({ userId });

  if (!user?.role) {
    return <PageNotFound />;
  }

  if (user.status !== UserStatus.ACTIVE) {
    return <PageNotFound />;
  }

  const permissonRoleMenuItems = menuItems.filter((item) =>
    (item.role || []).includes(user.role),
  );

  return (
    <div className="wrapper block min-h-screen pb-20 lg:grid lg:grid-cols-[300px__minmax(0,1fr)] lg:pb-0">
      <Sidebar menuItems={permissonRoleMenuItems} />
      <ul className="fixed bottom-0 left-0 z-50 flex h-16 w-full justify-center gap-5 border-t border-t-gray-200 bg-linear-to-t from-orange-100 to-white/40 p-3 lg:hidden">
        {permissonRoleMenuItems.map((item, index) => (
          <MenuItem
            key={index}
            onlyIcon
            icon={item.icon}
            title={item.title}
            url={item.url}
          />
        ))}
      </ul>
      <div className="hidden lg:block" />
      <div className="flex min-h-screen flex-col">
        <main className="flex-1">
          <div className="px-14 py-5">{children}</div>
        </main>

        <footer className="p-4">
          <p className="text-right text-sm font-medium">
            Developed by{' '}
            <Link
              className="text-logo"
              href="https://www.linkedin.com/in/t%C3%A2y-tr%C6%B0%C6%A1ng-1203322a0/"
              target="_blank"
            >
              <strong>TayTruong</strong>
            </Link>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Layout;
