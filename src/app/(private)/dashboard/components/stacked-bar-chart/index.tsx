"use client";

import {
  Bar,
  CartesianGrid,
  BarChart as REBarChart,
  TooltipProps,
  XAxis,
} from "recharts";

import { ChartDataType } from "@/src/app/(private)/dashboard/types/chart-data-type";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/src/components/core/chart";
import Show from "@/src/components/core/show";
import { cn } from "@/src/libs/shadcn-ui/utils";

interface StackedBarChartProps {
  data: ChartDataType[];
  config: ChartConfig;
  xAxisKey?: string;
  barKeys?: string[];
  stackId?: string;
  barRadius?: number | [number, number, number, number];
  margin?: { left?: number; right?: number; top?: number; bottom?: number };
  className?: string;
  legend?: boolean;
  tooltip?:
    | React.ReactElement
    | ((props: TooltipProps<number, string>) => React.ReactNode);
}

const StackedBarChart = ({
  data,
  config,
  xAxisKey,
  barKeys,
  stackId,
  barRadius = 4,
  margin,
  className = "",
  legend = false,
  tooltip,
}: StackedBarChartProps) => {
  const keys = barKeys && barKeys.length > 0 ? barKeys : Object.keys(config);
  return (
    <ChartContainer
      config={config}
      className={cn("mx-auto w-full h-full", className)}
    >
      <REBarChart accessibilityLayer data={data} margin={margin}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey={xAxisKey}
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 5)}
        />
        <ChartTooltip content={tooltip || <ChartTooltipContent hideLabel />} />
        <Show when={legend === true}>
          <ChartLegend
            content={
              <ChartLegendContent
                payload={keys.map((key) => ({
                  value: config[key]?.label || key,
                  color: config[key]?.color || "var(--secondary)",
                }))}
              />
            }
          />
        </Show>
        {keys.map((key, idx) => (
          <Bar
            key={key}
            dataKey={key}
            stackId={stackId}
            fill={config[key]?.color || "var(--secondary)"}
            radius={
              idx === keys.length - 1
                ? Array.isArray(barRadius)
                  ? barRadius
                  : [barRadius, barRadius, 0, 0]
                : 0
            }
          />
        ))}
      </REBarChart>
    </ChartContainer>
  );
};

export default StackedBarChart;
