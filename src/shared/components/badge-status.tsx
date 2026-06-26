import { cn } from "@/lib/utils";
import { commonClassNames } from "@/src/shared/constants";
import React from "react";

interface BadgeStatusProps {
  item?: {
    className?: string;
    title: string;
  };
  onClick?: () => void;
}

const BadgeStatus = ({ item, onClick }: BadgeStatusProps) => {
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

export default BadgeStatus;
