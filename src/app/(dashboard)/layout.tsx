import Link from 'next/link';
import React from 'react';

import { MenuItem } from '@/src/shared/components/common';
import { Sidebar } from '@/src/shared/components/layout';
import { menuItems } from '@/src/shared/constants';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="wrapper block min-h-screen pb-20 lg:grid lg:grid-cols-[300px__minmax(0,1fr)] lg:pb-0">
      <Sidebar />
      <ul className="fixed bottom-0 left-0 z-50 flex h-16 w-full justify-center gap-5 border-t border-t-gray-200 bg-linear-to-t from-orange-100 to-white/40 p-3 lg:hidden">
        {menuItems.map((item, index) => (
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
            Phát triển bởi{' '}
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

export default layout;
