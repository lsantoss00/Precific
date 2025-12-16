import React, { forwardRef } from "react";

type ColumnProps = React.ComponentProps<"div"> & {
  as?: React.ElementType;
};

const Column = forwardRef<HTMLElement, ColumnProps>(
  ({ as: Component = "div", className, children, ...props }, ref) => {
    return (
      <Component ref={ref} className={`flex flex-col ${className}`} {...props}>
        {children}
      </Component>
    );
  }
);

Column.displayName = "Column";

export default Column;
