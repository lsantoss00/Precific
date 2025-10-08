"use client";

import * as LabelPrimitive from "@radix-ui/react-label";
import * as React from "react";

import { cn } from "@/src/libs/shadcn-ui/utils";
import Row from "./row";
import Show from "./show";

interface LabelProps extends React.ComponentProps<typeof LabelPrimitive.Root> {
  required?: boolean;
}

function Label({ className, required = false, ...props }: LabelProps) {
  return (
    <Row className="gap-1">
      <LabelPrimitive.Root
        data-slot="label"
        className={cn(
          "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
          className
        )}
        {...props}
      />
      <Show when={required}>
        <span className="text-red-500">*</span>
      </Show>
    </Row>
  );
}

export { Label };
