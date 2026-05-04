import React from "react";
import { menuItems } from "@/src/constanst";
import { MenuItemProps } from "@/src/types";
import { LinkActive } from "../common";
import { UserButton } from "@clerk/nextjs";

const Sidebar = () => {
  return (
    <div className="p-5 border-r border-r-gray-200 bg-white flex flex-col">
      <a href="/" className="logo font-bold text-3xl inline-block mb-10">
        <span className="text-primary">U</span>
        cademy
      </a>
      <ul className="flex flex-col gap-2">
        {menuItems.map((item, index) => (
          <MenuItem
            key={index}
            url={item.url}
            title={item.title}
            icon={item.icon}
          ></MenuItem>
        ))}
      </ul>
      <div className="mt-auto flex items-center justify-end">
        <UserButton />
      </div>
    </div>
  );
};

function MenuItem({ url = "/", title = "", icon }: MenuItemProps) {
  return (
    <li>
      <LinkActive url={url}>
        {icon}
        {title}
      </LinkActive>
    </li>
  );
}

export default Sidebar;
