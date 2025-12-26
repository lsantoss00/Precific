"use client";

import {
  LabelList,
  RadialBar,
  RadialBarChart as RERadialBarChart,
} from "recharts";

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
    <ChartContainer
      config={config}
      className="mx-auto aspect-square max-h-[250px] w-full"
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
        <RadialBar dataKey={dataKey} background={barBackground}>
          <LabelList
            position="insideStart"
            dataKey={nameKey || dataKey}
            className="fill-white capitalize mix-blend-luminosity"
            fontSize={11}
          />
        </RadialBar>
      </RERadialBarChart>
    </ChartContainer>
  );
};

export default RadialChart;
