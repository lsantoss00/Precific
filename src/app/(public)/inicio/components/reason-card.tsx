import { Card } from "@/src/components/core";
import { ReactNode } from "react";

interface ReasonCardProps {
  reason: {
    icon: ReactNode;
    title: string;
    description: string;
  };
}

const ReasonCard = ({ reason }: ReasonCardProps) => {
  return (
    <Card className="bg-white w-full h-auto p-6 space-y-3 md:space-y-4 hover:scale-105 duration-300">
      <span className="[&>svg]:w-10 [&>svg]:h-10 md:[&>svg]:w-12 md:[&>svg]:h-12">
        {reason?.icon}
      </span>
      <h3 className="text-xl md:text-2xl font-medium">{reason?.title}</h3>
      <p className="text-sm md:text-base text-muted-foreground">
        {reason?.description}
      </p>
    </Card>
  );
};

export default ReasonCard;
