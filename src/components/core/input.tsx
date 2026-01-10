import { Button } from "@/src/components/core/button";
import Show from "@/src/components/core/show";
import { cn } from "@/src/libs/shadcn-ui/utils";
import { Eye, EyeOff } from "lucide-react";
import * as React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const isPassword = type === "password";

    const inputType = isPassword && showPassword ? "text" : type;

    return (
      <div className="relative w-full">
        <input
          ref={ref}
          type={inputType}
          data-slot="input"
          className={cn(
            "file:text-foreground placeholder:text-muted-foreground border w-full min-w-0 rounded-md bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            "focus-visible:border-primary focus-visible:ring-primary/50 focus-visible:ring-[3px]",
            "aria-invalid:ring-destructive/20 aria-invalid:border-destructive h-12 bg-white",
            error && "border-red-500",
            isPassword && "pr-10",
            className
          )}
          aria-invalid={!!error}
          {...props}
        />
        <Show when={isPassword}>
          <Button
            type="button"
            variant="link"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-500 focus:outline-none transition-colors !pr-0"
            aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
            tabIndex={-1}
          >
            <Show when={showPassword} fallback={<Eye className="h-5 w-5" />}>
              <EyeOff className="h-5 w-5" />
            </Show>
          </Button>
        </Show>
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
