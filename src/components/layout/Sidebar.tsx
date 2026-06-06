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
    <div className="hidden p-5 border-r border-r-gray-200 bg-linear-to-r from-orange-200 to-white lg:flex flex-col fixed top-0 left-0 bottom-0 w-75">
      <a
        href="/"
        className="font-medium text-3xl mb-11 flex items-end text-primary justify-center"
      >
        <span className="mb-2">
          <Image
            src="/logo.png"
            alt="logo"
            width={27}
            height={27}
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
            className="size-8 rounded-full bg-primary text-white flex items-center justify-center"
          >
            <IconLogin />
          </Link>
        ) : (
          <UserButton
            appearance={{
              elements: {
                avatarBox: {
                  width: "40px",
                  height: "40px",
                },
              },
            }}
          />
        )}
      </div>
    </div>
  );
};

export function MenuItem({
  url = "/",
  title = "",
  icon,
  onlyIcon,
}: MenuItemProps) {
  return (
    <ul>
      <LinkActive url={url}>
        {icon}
        {onlyIcon ? null : title}
      </LinkActive>
    </ul>
  );
}

export default Sidebar;
