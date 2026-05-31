import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
const HoverTooltip = ({
  children,
  label,
  className,
  labelClassName,
  IsColorArrow,
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
          side="top"
          className={labelClassName}
          IsColorArrow={IsColorArrow}
        >
          {label}
        </TooltipContent>
      </Tooltip>
    </>
  );
};

export default HoverTooltip;
