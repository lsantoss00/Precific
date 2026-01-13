import Column from "@/src/components/core/column";
import Show from "@/src/components/core/show";
import currencyFormatter from "@/src/helpers/currency-formatter";

type VariantType = "primary" | "secondary" | "neutral" | "success" | "error";

export interface MetricCardProps {
  title: string;
  value: string | number | undefined;
  secondValue?: string | number | undefined;
  variant?: VariantType;
  type?: "percentage" | "currency";
}

const MetricCard = ({
  title,
  value,
  secondValue,
  variant = "neutral",
  type = "currency",
}: MetricCardProps) => {
  const formatValue = (value: string | number | undefined): string => {
    if (value === undefined) return "";

    return type === "currency"
      ? currencyFormatter(value)
      : `${Number(value).toFixed(2)}%`;
  };

  return (
    <Column
      className={`space-y-2 rounded-md p-4 h-full justify-center ${variantStyles[variant]}`}
    >
      <span className="text-sm">{title}</span>
      <Column>
        <p className="text-2xl font-bold">{formatValue(value)}</p>
        <Show when={secondValue}>
          <p className="text-sm font-semibold bg-primary/20 rounded-md min-w-fit w-20 text-center px-1">
            {formatValue(secondValue)}
          </p>
        </Show>
      </Column>
    </Column>
  );
};

export default MetricCard;

const variantStyles: Record<VariantType, string> = {
  primary: "bg-primary text-white",
  secondary: "bg-secondary text-white",
  neutral: "bg-gray-200 text-black",
  success: "bg-green-600 text-white",
  error: "bg-red-600 text-white",
};
