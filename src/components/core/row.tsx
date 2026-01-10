import React, { forwardRef } from "react";

type RowProps = React.ComponentProps<"div"> & {
  as?: React.ElementType;
};

const Row = forwardRef<HTMLElement, RowProps>(
  ({ as: Component = "div", className, children, ...props }, ref) => {
    return (
      <Component ref={ref} className={`flex flex-row ${className}`} {...props}>
        {children}
      </Component>
    );
  }
);

Row.displayName = "Row";

export default Row;
