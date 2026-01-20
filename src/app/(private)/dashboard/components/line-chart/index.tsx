"use client";

import { ChartDataType } from "@/src/app/(private)/dashboard/types/chart-data-type";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/src/components/core/chart";
import Show from "@/src/components/core/show";
import { cn } from "@/src/libs/shadcn-ui/utils";
import {
  CartesianGrid,
  Line,
  LineChart as RechartsLineChart,
  TooltipProps,
  XAxis,
} from "recharts";

interface LineChartProps {
  data: ChartDataType[];
  config: ChartConfig;
  xAxisKey?: string;
  lineType?:
    | "step"
    | "basis"
    | "basisClosed"
    | "basisOpen"
    | "bumpX"
    | "bumpY"
    | "bump"
    | "linear"
    | "linearClosed"
    | "natural"
    | "monotoneX"
    | "monotoneY"
    | "monotone"
    | "stepBefore"
    | "stepAfter";
  strokeWidth?: number;
  margin?: {
    left?: number;
    right?: number;
    top?: number;
    bottom?: number;
  };
  className?: string;
  tooltip?:
    | React.ReactElement
    | ((props: TooltipProps<number, string>) => React.ReactNode);
}

const LineChart = ({
  data,
  config,
  xAxisKey,
  lineType,
  strokeWidth = 2,
  margin = {
    top: 12,
    left: 12,
    right: 12,
  },
  className = "",
  tooltip,
}: LineChartProps) => {
  const lineKeys = Object.keys(config).filter(
    (key) => key !== xAxisKey && config[key]?.label,
  );

  return (
    <ChartContainer
      config={config}
      className={cn("mx-auto w-full h-full", className)}
    >
      <RechartsLineChart accessibilityLayer data={data} margin={margin}>
        <CartesianGrid vertical={false} />
        <Show when={xAxisKey}>
          <XAxis
            dataKey={xAxisKey}
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            interval={0}
          />
        </Show>
        <ChartTooltip
          cursor={false}
          content={
            tooltip || <ChartTooltipContent hideLabel={lineKeys.length === 1} />
          }
        />
        {lineKeys.map((key) => (
          <Line
            key={key}
            dataKey={key}
            type={lineType}
            stroke={`var(--color-${key})`}
            strokeWidth={strokeWidth}
            dot={true}
          />
        ))}
      </RechartsLineChart>
    </ChartContainer>
  );
};
export default LineChart;
