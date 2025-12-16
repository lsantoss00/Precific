import React, { forwardRef } from "react";

type ContainerVariant = "section" | "page";

const variantClasses: Record<ContainerVariant, string> = {
  section: "px-4 sm:px-6 md:px-12 lg:px-16 xl:px-16 2xl:px-25",
  page: "p-6 xl:px-0",
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
        className={`w-full ${variantClasses[variant]} ${className || ""}`}
        {...props}
      />
    );
  }
);

Container.displayName = "Container";

export { Container };
