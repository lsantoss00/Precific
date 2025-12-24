"use client";

import { ChartDataType } from "@/src/app/(private)/dashboard/types/chart-data-type";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/src/components/core/chart";
import { Area, CartesianGrid, AreaChart as REAreaChart, XAxis } from "recharts";

interface AreaChartProps {
  data: ChartDataType[];
  config: ChartConfig;
  xAxisKey?: string;
  areaKeys?: string[];
  gradients?: Record<string, { from: string; to: string }>;
  margin?: { left?: number; right?: number; top?: number; bottom?: number };
}

const AreaChart = ({
  data,
  config,
  xAxisKey,
  areaKeys,
  gradients,
  margin = { left: 12, right: 12 },
}: AreaChartProps) => {
  const keys = areaKeys && areaKeys.length > 0 ? areaKeys : Object.keys(config);
  const defaultGradients = keys.reduce((acc, key) => {
    acc[key] = {
      from: config[key]?.color || "var(--color-desktop)",
      to: config[key]?.color || "var(--color-desktop)",
    };
    return acc;
  }, {} as Record<string, { from: string; to: string }>);
  const usedGradients = gradients || defaultGradients;

  return (
    <ChartContainer config={config} className="w-full h-full">
      <REAreaChart accessibilityLayer data={data} margin={margin}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey={xAxisKey}
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <defs>
          {keys.map((key) => (
            <linearGradient
              key={key}
              id={`fill${key}`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="5%"
                stopColor={usedGradients[key].from}
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor={usedGradients[key].to}
                stopOpacity={0.1}
              />
            </linearGradient>
          ))}
        </defs>
        {keys.map((key) => (
          <Area
            key={key}
            dataKey={key}
            fill={`url(#fill${key})`}
            type="natural"
            fillOpacity={0.4}
            stroke={config[key]?.color || "var(--color-desktop)"}
            stackId="a"
          />
        ))}
      </REAreaChart>
    </ChartContainer>
  );
};

export default AreaChart;
