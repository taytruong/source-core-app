import React from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/src/shared/components/ui/tooltip";

const HoverTooltip = ({
  IsColorArrow,
  children,
  className,
  label,
  labelClassName,
}: {
  children?: React.ReactNode;
  className?: string;
  labelClassName?: string;
  label?: string;
  IsColorArrow?: boolean;
}) => {
  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild className={className}>
          {children}
        </TooltipTrigger>

        <TooltipContent
          className={labelClassName}
          IsColorArrow={IsColorArrow}
          side="top"
        >
          {label}
        </TooltipContent>
      </Tooltip>
    </>
  );
};

export default HoverTooltip;
