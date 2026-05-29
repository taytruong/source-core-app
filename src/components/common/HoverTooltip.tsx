import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
const HoverTooltip = ({
  children,
  label,
}: {
  children?: React.ReactNode;
  label?: string;
}) => {
  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>

        <TooltipContent side="top">{label}</TooltipContent>
      </Tooltip>
    </>
  );
};

export default HoverTooltip;
