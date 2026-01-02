import * as React from "react";

import { cn } from "@/lib/utils";

const Textarea = React.forwardRef(({ disabled, className, ...props }, ref) => {
  return (
    <textarea
      readOnly={disabled}
      className={cn(
        "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        disabled
          ? "cursor-default ring-0 border-transparent focus-visible:outline-none focus-visible:ring-0 focus-visible:border-transparent"
          : "",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
