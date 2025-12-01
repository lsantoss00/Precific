import { Card } from "@/src/components/core";
import Column from "@/src/components/core/column";

interface InfoCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}

const InfoCard = ({ title, value, icon }: InfoCardProps) => {
  return (
    <Card className="p-6 flex flex-row justify-between items-center w-full h-28 rounded-md shadow-sm">
      <Column>
        <p className="text-3xl font-semibold">{value}</p>
        <span className="text-sm max-w-[100px] 2xl:max-w-none">{title}</span>
      </Column>
      {icon}
    </Card>
  );
};

export default InfoCard;
