"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/core/card";
import Row from "@/src/components/core/row";
import { cn } from "@/src/libs/shadcn-ui/utils";
import { ReactNode } from "react";

interface ChartCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  footerContent?: ReactNode;
  footerClassName?: string;
  headerAction?: React.ReactNode;
}

const ChartCard = ({
  title,
  description,
  children,
  footerContent,
  className = "",
  headerClassName = "",
  contentClassName = "",
  footerClassName = "",
  headerAction,
}: ChartCardProps) => {
  return (
    <Card className={cn("rounded-md shadow-sm", className)}>
      <CardHeader className={headerClassName}>
        <CardTitle>{title}</CardTitle>
        <Row className="items-center justify-between">
          {description && <CardDescription>{description}</CardDescription>}
          {headerAction}
        </Row>
      </CardHeader>
      <CardContent className={contentClassName}>{children}</CardContent>
      <CardFooter className={footerClassName}>
        {footerContent && <div>{footerContent}</div>}
      </CardFooter>
    </Card>
  );
};

export default ChartCard;
