import React, { forwardRef } from "react";

type RowProps = React.HTMLAttributes<HTMLDivElement>;

const Row = forwardRef<HTMLDivElement, RowProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={`flex flex-row ${className}`} {...props}>
        {children}
      </div>
    );
  }
);

Row.displayName = "Row";

export default Row;
