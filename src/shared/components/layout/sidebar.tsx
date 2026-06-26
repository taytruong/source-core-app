"use client";
import React from "react";
import { useAuth, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { MenuItem } from "@/src/shared/components";
import IconLogin from "@/src/shared/components/icons/IconLogin";
import { menuItems } from "@/src/shared/constants";

const Sidebar = () => {
  const { userId } = useAuth();
  return (
    <div className="hidden p-5 border-r border-r-gray-200 bg-linear-to-r from-orange-200 to-white/40 lg:flex flex-col fixed top-0 left-0 bottom-0 w-70 shadow-sm">
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

export default Sidebar;
