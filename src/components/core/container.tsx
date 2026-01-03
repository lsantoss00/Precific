import { cn } from "@/src/libs/shadcn-ui/utils";
import React, { forwardRef } from "react";

type ContainerVariant = "section" | "page";

const variantClasses: Record<ContainerVariant, string> = {
  section:
    "px-4 sm:px-6 md:px-12 lg:px-16 xl:px-16 2xl:px-25 py-12 md:py-16 xl:py-16 2xl:py-20",
  page: "flex flex-col max-w-7xl xl:max-w-5xl 2xl:max-w-[1500px] p-6 xl:px-0 gap-4",
};

type ContainerProps = React.ComponentProps<"div"> & {
  as?: React.ElementType;
  variant?: ContainerVariant;
};

const Container = forwardRef<HTMLElement, ContainerProps>(
  (
    { as: Component = "div", className, variant = "section", ...props },
    ref
  ) => {
    return (
      <Component
        ref={ref}
        className={cn("w-full h-full", variantClasses[variant], className)}
        {...props}
      />
    );
  }
);

Container.displayName = "Container";

export { Container };
