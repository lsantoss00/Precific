import { Card } from "@/src/components/core";
import Column from "@/src/components/core/column";

interface InfoCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

const InfoCard = ({ title, value, icon }: InfoCardProps) => {
  return (
    <Card className="p-6 flex flex-row justify-between items-center w-full h-28 rounded-md shadow-xs">
      <Column className="justify-between">
        <h3>{title}</h3>
        <p className="text-3xl">{value}</p>
      </Column>
      <Column>{icon}</Column>
    </Card>
  );
};

export default InfoCard;
