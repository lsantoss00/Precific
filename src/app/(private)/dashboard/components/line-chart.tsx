"use client";

import { ChartDataType } from "@/src/app/(private)/dashboard/types/chart-data-type";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/src/components/core/chart";
import Show from "@/src/components/core/show";
import {
  CartesianGrid,
  Line,
  LineChart as RechartsLineChart,
  XAxis,
} from "recharts";

interface LineChartProps {
  data: ChartDataType[];
  config: ChartConfig;
  xAxisKey?: string;
  xAxisTickFormatterType?: "short" | "full";
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
}

const LineChart = ({
  data,
  config,
  xAxisKey,
  xAxisTickFormatterType,
  lineType,
  strokeWidth = 2,
  margin = {
    left: 12,
    right: 12,
  },
}: LineChartProps) => {
  const lineKeys = Object.keys(config).filter(
    (key) => key !== xAxisKey && config[key]?.label
  );

  const formatTick = (value: string) => {
    if (xAxisTickFormatterType === "short") {
      return value.slice(0, 3);
    }
    return value;
  };

  return (
    <ChartContainer config={config}>
      <RechartsLineChart accessibilityLayer data={data} margin={margin}>
        <CartesianGrid vertical={false} />
        <Show when={xAxisKey}>
          <XAxis
            dataKey={xAxisKey}
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={formatTick}
          />
        </Show>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel={lineKeys.length === 1} />}
        />
        {lineKeys.map((key) => (
          <Line
            key={key}
            dataKey={key}
            type={lineType}
            stroke={`var(--color-${key})`}
            strokeWidth={strokeWidth}
            dot={false}
          />
        ))}
      </RechartsLineChart>
    </ChartContainer>
  );
};
export default LineChart;
