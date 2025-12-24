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
}

const RadialChart = ({
  data,
  config,
  dataKey = "dataKey",
  nameKey,
  innerRadius = 30,
  outerRadius = 110,
  barBackground = true,
}: RadialChartProps) => {
  return (
    <ChartContainer config={config}>
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
};

export default RadialChart;
