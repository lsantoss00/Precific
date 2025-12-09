import { Card, Skeleton } from "@/src/components/core";
import Column from "@/src/components/core/column";
import Show from "@/src/components/core/show";

interface InfoCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  pending: boolean;
}

const InfoCard = ({ title, value, icon, pending }: InfoCardProps) => {
  return (
    <Card className="p-6 flex flex-row justify-between items-center w-full h-28 rounded-md shadow-sm">
      <Column>
        <Show when={!pending} fallback={<Skeleton className="h-8 w-20 mb-1" />}>
          <p className="text-3xl font-semibold">{value}</p>
        </Show>
        <span className="text-sm max-w-[100px] 2xl:max-w-none">{title}</span>
      </Column>
      {icon}
    </Card>
  );
};

export default InfoCard;
