"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/core/card";
import { ReactNode } from "react";

interface ChartCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
}

export function ChartCard({
  title,
  description,
  children,
  className = "",
  headerClassName = "",
  contentClassName = "",
}: ChartCardProps) {
  return (
    <Card className={"rounded-md shadow-sm " + className}>
      <CardHeader className={headerClassName}>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className={contentClassName}>{children}</CardContent>
    </Card>
  );
}
