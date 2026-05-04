"use client"; // vì có usePathname của next -> chỉ nên dùng cho server  component
import { LinkActiveProps } from "@/src/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const LinkActive = ({ url, children }: LinkActiveProps) => {
  const pathName = usePathname();
  const isActive = url === pathName;
  return (
    <Link
      href={url}
      className={`p-3 rounded-md flex items-center gap-3 transition-all ${
        isActive
          ? "text-white bg-primary svg-animate"
          : "hover:text-primary hover:bg-primary hover:bg-primary/10"
      }`}
    >
      {children}
    </Link>
  );
};

export default LinkActive;
