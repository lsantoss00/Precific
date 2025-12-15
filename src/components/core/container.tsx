import React, { forwardRef } from "react";

type ContainerVariant = "section" | "page";

const variantClasses: Record<ContainerVariant, string> = {
  section: "px-4 sm:px-6 md:px-12 lg:px-16 xl:px-16 2xl:px-25",
  page: "p-6 xl:px-0",
};

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: ContainerVariant;
}

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, variant = "section", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`w-full ${variantClasses[variant]} ${className || ""}`}
        {...props}
      />
    );
  }
);

Container.displayName = "Container";

export { Container };
