"use client";
import React from "react";
import { menuItems } from "@/src/constanst";
import { MenuItemProps } from "@/src/types";
import { LinkActive } from "../common";
import { useAuth, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import IconLogin from "../icons/IconLogin";
import Image from "next/image";

const Sidebar = () => {
  const { userId } = useAuth();
  return (
    <div className="hidden p-5 border-r border-r-gray-200 bg-white lg:flex flex-col fixed top-0 left-0 bottom-0 w-75">
      <a
        href="/"
        className="font-semibold text-3xl mb-6 flex items-end text-primary"
      >
        <span className="mb-2">
          <Image
            src="/Logo.svg"
            alt="logo"
            width={40}
            height={40}
            className="object-cover"
          />
        </span>
        cademy
      </a>
      <ul className="flex flex-col gap-1.5">
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
        {!userId ? (
          <Link
            href="sign-in"
            className="size-8 rounded-full bg-primary text-white flex items-center justify-center "
          >
            <IconLogin />
          </Link>
        ) : (
          <UserButton />
        )}
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
