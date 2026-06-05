import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-10 w-full min-w-0 rounded border border-slate-400 focus:border-primary transition-all px-3 py-1 text-sm font-medium outline-none bg-white focus-primary",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
