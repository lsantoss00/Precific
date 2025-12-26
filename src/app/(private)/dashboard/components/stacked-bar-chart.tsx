"use client";

import { Bar, CartesianGrid, BarChart as REBarChart, XAxis } from "recharts";

import { ChartDataType } from "@/src/app/(private)/dashboard/types/chart-data-type";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/src/components/core/chart";

interface StackedBarChartProps {
  data: ChartDataType[];
  config: ChartConfig;
  xAxisKey?: string;
  barKeys?: string[];
  stackId?: string;
  barRadius?: number | [number, number, number, number];
  margin?: { left?: number; right?: number; top?: number; bottom?: number };
}

const StackedBarChart = ({
  data,
  config,
  xAxisKey,
  barKeys,
  stackId,
  barRadius = 4,
  margin,
}: StackedBarChartProps) => {
  const keys = barKeys && barKeys.length > 0 ? barKeys : Object.keys(config);
  return (
    <ChartContainer
      config={config}
      className="mx-auto aspect-square max-h-[250px] w-full"
    >
      <REBarChart accessibilityLayer data={data} margin={margin}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey={xAxisKey}
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
        <ChartLegend
          content={
            <ChartLegendContent
              payload={keys.map((key) => ({
                value: config[key]?.label || key,
                color: config[key]?.color || "var(--color-desktop)",
              }))}
            />
          }
        />
        {keys.map((key, idx) => (
          <Bar
            key={key}
            dataKey={key}
            stackId={stackId}
            fill={config[key]?.color || "var(--color-desktop)"}
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
