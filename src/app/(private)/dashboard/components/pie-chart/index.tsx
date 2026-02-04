"use client";

import { ChartDataType } from "@/src/app/(private)/dashboard/types/chart-data-type";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/src/components/core/chart";
import Show from "@/src/components/core/show";
import { cn } from "@/src/libs/shadcn-ui/utils";
import { useReducedMotion } from "framer-motion";
import { Label, Pie, PieChart as REPieChart } from "recharts";

interface PieChartProps {
  data: ChartDataType[];
  config: ChartConfig;
  centralText?: string;
  centralTextLabel?: string;
  dataKey?: string;
  nameKey?: string;
  innerRadius?: number;
  strokeWidth?: number;
  className?: string;
}

const PieChart = ({
  data,
  config,
  centralText,
  centralTextLabel,
  dataKey,
  nameKey,
  innerRadius,
  strokeWidth,
  className = "",
}: PieChartProps) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <ChartContainer
      config={config}
      className={cn("mx-auto w-full h-full", className)}
    >
      <REPieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie
          data={data}
          dataKey={dataKey}
          nameKey={nameKey}
          innerRadius={innerRadius}
          strokeWidth={strokeWidth}
          isAnimationActive={!prefersReducedMotion}
        >
          <Show when={centralText}>
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground text-3xl font-bold"
                      >
                        {centralText}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 24}
                        className="fill-muted-foreground"
                      >
                        {centralTextLabel}
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </Show>
        </Pie>
      </REPieChart>
    </ChartContainer>
  );
};

export default PieChart;
