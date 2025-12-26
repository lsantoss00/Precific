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

const BarChart = ({
  data,
  config,
  xAxisKey,
  yAxisKey,
  barKey,
  barKeys,
  layout = "vertical",
  margin,
  barRadius = 8,
}: BarChartProps) => {
  const keys =
    barKeys && barKeys.length > 0
      ? barKeys
      : barKey
      ? [barKey]
      : Object.keys(config);

  const isHorizontal = layout === "horizontal";

  return (
    <ChartContainer
      config={config}
      className="mx-auto aspect-square max-h-[250px] w-full"
    >
      <ReBarChart
        accessibilityLayer
        data={data}
        layout={isHorizontal ? "vertical" : "horizontal"}
        margin={margin}
      >
        {!isHorizontal && <CartesianGrid vertical={false} />}
        {isHorizontal ? (
          <>
            <XAxis type="number" dataKey={barKey || keys[0]} hide />
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
            <XAxis
              dataKey={xAxisKey}
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value: string) => value.slice(0, 3)}
            />
            <YAxis
              dataKey={yAxisKey}
              hide
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value: number) =>
                value?.toLocaleString?.() ?? value
              }
              domain={[0, "dataMax"]}
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
};

export default BarChart;
