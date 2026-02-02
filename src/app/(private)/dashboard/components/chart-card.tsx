import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/core";
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
  headerAction?: ReactNode;
  pending?: boolean;
  fetching?: boolean;
}

const ChartCard = ({
  title,
  description,
  children,
  className,
  headerClassName,
  contentClassName,
  footerContent,
  footerClassName,
  headerAction,
  fetching,
}: ChartCardProps) => {
  return (
    <Card className={cn("rounded-md shadow-sm h-full w-full", className)}>
      <CardHeader className={cn("mb-4", headerClassName)}>
        <CardTitle>{title}</CardTitle>
        <Row className="items-center justify-between">
          {description && <CardDescription>{description}</CardDescription>}
          {headerAction}
        </Row>
      </CardHeader>
      <CardContent className={contentClassName}>
        <div
          className={cn(
            "h-full w-full transition-all duration-300 ease-in-out",
            fetching
              ? "opacity-40 blur-[1px] pointer-events-none scale-[0.99]"
              : "opacity-100 blur-0 scale-100",
          )}
        >
          {children}
        </div>
      </CardContent>
      <CardFooter className={footerClassName}>
        {footerContent && <div>{footerContent}</div>}
      </CardFooter>
    </Card>
  );
};

export default ChartCard;
