"use client";

import { ChartDataType } from "@/src/app/(private)/dashboard/types/chart-data-type";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/src/components/core/chart";
import {
  Bar,
  CartesianGrid,
  BarChart as ReBarChart,
  XAxis,
  YAxis,
} from "recharts";

interface BarChartProps {
  data: ChartDataType[];
  config: ChartConfig;
  xAxisKey?: string;
  yAxisKey?: string;
  barKey?: string;
  barKeys?: string[];
  layout?: "vertical" | "horizontal";
  margin?: {
    left?: number;
    right?: number;
    top?: number;
    bottom?: number;
  };
  barRadius?: number;
}

export function BarChart({
  data,
  config,
  xAxisKey = "axisKey",
  yAxisKey = "axisKey",
  barKey = "barKey",
  barKeys,
  layout = "vertical",
  margin,
  barRadius = 8,
}: BarChartProps) {
  const keys =
    barKeys && barKeys.length > 0
      ? barKeys
      : barKey
      ? [barKey]
      : Object.keys(config);

  return (
    <ChartContainer config={config}>
      <ReBarChart
        accessibilityLayer
        data={data}
        layout={layout === "horizontal" ? "vertical" : "horizontal"}
        margin={margin}
      >
        {layout === "horizontal" ? (
          <>
            <XAxis type="number" dataKey={barKey} hide />
            <YAxis
              dataKey={yAxisKey}
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value: string) => value.slice(0, 3)}
            />
          </>
        ) : (
          <>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={xAxisKey}
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value: string) => value.slice(0, 3)}
            />
          </>
        )}
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        {keys.map((key) => (
          <Bar
            key={key}
            dataKey={key}
            fill={config[key]?.color || "var(--color-desktop)"}
            radius={barRadius}
          />
        ))}
      </ReBarChart>
    </ChartContainer>
  );
}
