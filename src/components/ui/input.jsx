import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef(
  ({ disabled, className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        readOnly={disabled}
        disabled={disabled}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          disabled
            ? "cursor-default ring-0 border-transparent focus-visible:outline-none focus-visible:ring-0 focus-visible:border-transparent"
            : "",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
