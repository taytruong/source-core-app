import React from 'react';

import { MenuItem, Sidebar } from '@/src/shared/components';
import { menuItems } from '@/src/shared/constants';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="wrapper block h-screen pb-20 lg:grid lg:grid-cols-[300px__minmax(0,1fr)] lg:pb-0">
      <Sidebar />
      <div className="fixed bottom-0 left-0 flex h-16 w-full justify-center gap-5 bg-white p-3 lg:hidden">
        {menuItems.map((item, index) => (
          <MenuItem
            key={index}
            onlyIcon
            icon={item.icon}
            title={item.title}
            url={item.url}
          />
        ))}
      </div>
      <div className="hidden lg:block" />
      <main className="p-5">{children}</main>
    </div>
  );
};

export default layout;
