import { cn } from "@/src/libs/shadcn-ui/utils";
import * as React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        data-slot="input"
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground border w-full min-w-0 rounded-md bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-[#66289B] focus-visible:ring-[#66289B]/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 aria-invalid:border-destructive h-12 bg-white",
          error && "border-red-500",
          className
        )}
        aria-invalid={!!error}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
