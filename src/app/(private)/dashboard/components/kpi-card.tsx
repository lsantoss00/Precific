import { Card, Skeleton } from "@/src/components/core";
import Column from "@/src/components/core/column";
import Flex from "@/src/components/core/flex";
import Row from "@/src/components/core/row";
import Show from "@/src/components/core/show";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";

interface KpiCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  pending: boolean;
  percentage?: number;
}

const KpiCard = ({ title, value, icon, pending, percentage }: KpiCardProps) => {
  const isPositivePercentage = percentage !== undefined && percentage > 0;

  return (
    <Card className="p-6 flex flex-row justify-between items-center w-full min-h-28 rounded-md shadow-sm">
      <Column className="justify-between h-full">
        <Row className="items-center gap-2">
          {icon}
          <span className="text-sm max-w-25 2xl:max-w-none text-muted-foreground">
            {title}
          </span>
        </Row>
        <Show when={!pending} fallback={<Skeleton className="h-8 w-20 mb-1" />}>
          <Flex className="flex-col lg:flex-row xl:flex-col 2xl:flex-row lg:gap-2 xl:gap-0 2xl:gap-2 items-start lg:items-center xl:items-start 2xl:items-center">
            <p className="text-3xl font-semibold">{value}</p>
            <span className="text-xs font-semibold flex items-center gap-1">
              {typeof percentage === "number" && percentage !== 0 && (
                <span
                  className={`px-1.5 py-0.5 rounded-md font-semibold ${
                    isPositivePercentage
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {percentage > 0 ? (
                    <Row className="gap-0.5 items-center">
                      {percentage}%
                      <ArrowUpRight size={14} className="inline-block" />
                    </Row>
                  ) : (
                    <Row className="gap-0.5 items-center">
                      {percentage}%
                      <ArrowDownLeft size={14} className="inline-block" />
                    </Row>
                  )}
                </span>
              )}
            </span>
          </Flex>
        </Show>
      </Column>
    </Card>
  );
};

export default KpiCard;
