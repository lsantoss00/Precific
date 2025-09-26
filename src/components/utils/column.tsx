import React, { forwardRef } from "react";

type ColumnProps = React.HTMLAttributes<HTMLDivElement>;

const Column = forwardRef<HTMLDivElement, ColumnProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={`flex flex-col ${className}`} {...props}>
        {children}
      </div>
    );
  }
);

Column.displayName = "Column";

export default Column;
