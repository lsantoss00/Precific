import React, { forwardRef } from "react";

type FlexProps = React.HTMLAttributes<HTMLDivElement>;

const Flex = forwardRef<HTMLDivElement, FlexProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={`flex ${className}`} {...props}>
        {children}
      </div>
    );
  }
);

Flex.displayName = "Flex";

export default Flex;
