import { cn } from "@/lib/utils";
import { commonClassNames } from "@/src/constanst";
import React from "react";

const StatusBadge = ({
  item,
  onClick,
}: {
  item?: {
    className?: string;
    title: string;
  };
  onClick?: () => void;
}) => {
  if (!item) return null;
  return (
    <span
      className={cn(commonClassNames.status, item?.className)}
      onClick={onClick}
    >
      {item?.title}
    </span>
  );
};

export default StatusBadge;
