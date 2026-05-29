import { cn } from "@/lib/utils";
import React from "react";

const Heading = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h1 className={cn("font-medium text-2xl lg:text-3xl", className)}>
      {children}
    </h1>
  );
};

export default Heading;
