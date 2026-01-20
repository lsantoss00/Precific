import { ChartConfig } from "@/src/components/core/chart";
import { currencyFormatter } from "@/src/helpers/currency-formatter";

interface CustomLineChartTooltipProps {
  active?: boolean;
  payload?: Array<{
    dataKey: string;
    name?: string | number;
    value: number | string | Array<number | string>;
    payload: any;
    color?: string;
  }>;
  label?: string | number;
  chartConfig: ChartConfig;
}

const CustomLineChartTooltip = ({
  label,
  payload,
  chartConfig,
}: CustomLineChartTooltipProps) => {
  return (
    <div className="rounded-md border bg-background p-3 shadow-sm">
      <p className="mb-2 text-sm font-medium">{label}</p>
      <ul className="gap-1">
        {payload?.map((item) => {
          const config = chartConfig[item.dataKey];
          return (
            <li
              key={item.dataKey}
              className="flex items-start justify-between gap-2 text-sm"
            >
              <div className="flex items-center gap-2 max-w-60">
                <span
                  className="h-3 w-3 shrink-0 rounded-full"
                  style={{
                    backgroundColor: config?.color,
                  }}
                />
                <span className="block truncate text-muted-foreground">
                  {config?.label ?? item.dataKey}
                </span>
              </div>
              <span className="whitespace-nowrap font-medium">
                {currencyFormatter(item.value as number)}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CustomLineChartTooltip;
