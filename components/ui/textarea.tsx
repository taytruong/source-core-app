import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-20 resize-none w-full rounded border border-gray-400 focus:border-primary px-2.5 py-2 text-sm transition-colors outline-none font-medium bg-white focus-primary",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
