"use client"; // vì có usePathname của next -> chỉ nên dùng cho server  component
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface LinkActiveProps {
  url: string;
  children?: React.ReactNode;
}

const LinkActive = ({ url, children }: LinkActiveProps) => {
  const pathName = usePathname();
  const isActive = url === pathName;
  return (
    <Link
      href={url}
      className={`p-3 rounded-md flex items-center gap-3 text-base transition-all ${
        isActive
          ? "text-primary bg-primary/25 svg-animate font-medium"
          : "hover:text-primary hover:bg-primary/10"
      }`}
    >
      {children}
    </Link>
  );
};

export default LinkActive;
