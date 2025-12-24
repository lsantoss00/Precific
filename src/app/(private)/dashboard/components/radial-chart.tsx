"use client";

import { RadialBar, RadialBarChart as RERadialBarChart } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/src/components/core/chart";

import { ChartDataType } from "@/src/app/(private)/dashboard/types/chart-data-type";

interface RadialChartProps {
  data: ChartDataType[];
  config: ChartConfig;
  dataKey?: string;
  nameKey?: string;
  innerRadius?: number;
  outerRadius?: number;
  barBackground?: boolean;
  className?: string;
}

export function RadialChart({
  data,
  config,
  dataKey = "visitors",
  nameKey = "browser",
  innerRadius = 30,
  outerRadius = 110,
  barBackground = true,
  className,
}: RadialChartProps) {
  return (
    <ChartContainer
      config={config}
      className={"mx-auto aspect-square max-h-[250px] " + (className || "")}
    >
      <RERadialBarChart
        data={data}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
      >
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel nameKey={nameKey} />}
        />
        <RadialBar dataKey={dataKey} background={barBackground} />
      </RERadialBarChart>
    </ChartContainer>
  );
}
