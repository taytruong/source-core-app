"use client";
import { useAuth, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { MenuItem } from "@/src/shared/components";
import IconLogin from "@/src/shared/components/icons/IconLogin";
import { menuItems } from "@/src/shared/constants";

const Sidebar = () => {
  const { userId } = useAuth();

  return (
    <div className="hidden p-5 border-r border-r-gray-200 bg-linear-to-r from-orange-200 to-white/40 lg:flex flex-col fixed top-0 left-0 bottom-0 w-70 shadow-sm">
      <a
        className="font-medium text-3xl mb-11 flex items-end text-primary justify-center"
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
      <ul className="flex flex-col gap-1.5">
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
                  width: "40px",
                  height: "40px",
                },
              },
            }}
          />
        ) : (
          <Link
            className="size-8 rounded-full bg-primary text-white flex items-center justify-center"
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
