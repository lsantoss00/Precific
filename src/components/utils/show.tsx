import React from "react";

interface ShowProps {
  when?: unknown;
  fallback?: React.ReactNode;
  children?: React.ReactNode | React.ReactNode[];
}

const Show = (props: ShowProps) => {
  return <>{props.when ? props.children : props.fallback}</>;
};

export default Show;
