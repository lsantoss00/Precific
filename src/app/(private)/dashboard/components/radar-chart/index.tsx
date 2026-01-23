"use client";

import { ChartDataType } from "@/src/app/(private)/dashboard/types/chart-data-type";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/src/components/core/chart";
import { cn } from "@/src/libs/shadcn-ui/utils";
import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart as RERadarChart,
} from "recharts";

interface RadarChartProps {
  data: ChartDataType[];
  config: ChartConfig;
  angleAxisKey?: string;
  radarKeys?: string[];
  strokeWidth?: number;
  className?: string;
}

const RadarChart = ({
  data,
  config,
  angleAxisKey,
  radarKeys,
  strokeWidth = 2,
  className = "",
}: RadarChartProps) => {
  const keys =
    radarKeys && radarKeys.length > 0 ? radarKeys : Object.keys(config);

  return (
    <ChartContainer
      config={config}
      className={cn("mx-auto w-full h-full", className)}
    >
      <RERadarChart data={data}>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="line" />}
        />
        <PolarAngleAxis dataKey={angleAxisKey} />
        <PolarGrid radialLines={false} />
        {keys.map((key) => (
          <Radar
            key={key}
            dataKey={key}
            fill={config[key]?.color || "var(--color-desktop)"}
            fillOpacity={0}
            stroke={config[key]?.color || "var(--color-desktop)"}
            strokeWidth={strokeWidth}
          />
        ))}
      </RERadarChart>
    </ChartContainer>
  );
};

export default RadarChart;
