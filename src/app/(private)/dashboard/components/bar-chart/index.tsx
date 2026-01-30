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
  Bar,
  CartesianGrid,
  BarChart as ReBarChart,
  TooltipProps,
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
  className?: string;
  tooltip?:
    | React.ReactElement
    | ((props: TooltipProps<number, string>) => React.ReactNode);
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
  className = "",
  tooltip,
}: BarChartProps) => {
  const keys =
    barKeys && barKeys.length > 0
      ? barKeys
      : barKey
        ? [barKey]
        : Object.keys(config);

  const isHorizontal = layout === "horizontal";

  return (
    <div
      className={cn(
        `w-full h-full ${!isHorizontal && "max-md:overflow-x-auto max-md:overflow-y-hidden"}`,
        className,
      )}
    >
      <ChartContainer
        config={config}
        style={{
          minWidth: !isHorizontal
            ? `${Math.max(data.length * 60, 300)}px`
            : "100%",
        }}
        className="h-full w-full"
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
              <XAxis type="number" hide />
              <YAxis
                dataKey={yAxisKey}
                type="category"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value: any) => String(value).slice(0, 5)}
              />
            </>
          ) : (
            <>
              <XAxis
                dataKey={xAxisKey || yAxisKey}
                type="category"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value: any) => String(value).slice(0, 5)}
              />
              <YAxis
                type="number"
                hide
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
            </>
          )}
          <ChartTooltip
            cursor={false}
            content={tooltip || <ChartTooltipContent hideLabel />}
          />
          {keys.map((key) => (
            <Bar
              key={key}
              dataKey={key}
              fill={config[key]?.color || "var(--color-desktop)"}
              radius={barRadius}
              barSize={!isHorizontal ? 60 : undefined}
            />
          ))}
        </ReBarChart>
      </ChartContainer>
    </div>
  );
};

export default BarChart;
