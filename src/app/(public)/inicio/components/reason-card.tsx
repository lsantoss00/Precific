import { Card } from "@/src/components/core";

interface ReasonCardProps {
  reason: ReasonType;
}

const ReasonCard = ({ reason }: ReasonCardProps) => {
  return (
    <Card className="bg-white w-full h-full max-h-80 lg:max-w-sm p-7 space-y-4 hover:scale-105 duration-300">
      <span className="[&>svg]:w-12 [&>svg]:h-12">{reason?.icon}</span>
      <h3 className="text-2xl font-medium">{reason?.title}</h3>
      <p>{reason?.description}</p>
    </Card>
  );
};

export default ReasonCard;
