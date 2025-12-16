import React, { forwardRef } from "react";

type FlexProps = React.ComponentProps<"div"> & {
  as?: React.ElementType;
};

const Flex = forwardRef<HTMLElement, FlexProps>(
  ({ as: Component = "div", className, children, ...props }, ref) => {
    return (
      <Component ref={ref} className={`flex ${className}`} {...props}>
        {children}
      </Component>
    );
  }
);

Flex.displayName = "Flex";

export default Flex;
