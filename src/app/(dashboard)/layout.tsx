import React from "react";

import { MenuItem, Sidebar } from "@/src/shared/components";
import { menuItems } from "@/src/shared/constants";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="wrapper block pb-20 lg:pb-0 lg:grid lg:grid-cols-[300px__minmax(0,1fr)] h-screen">
      <Sidebar />
      <div className="flex p-3 bg-white lg:hidden fixed bottom-0 left-0 w-full justify-center gap-5 h-16">
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
