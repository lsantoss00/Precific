import Column from "@/src/components/core/column";
import Show from "@/src/components/core/show";
import currencyFormatter from "@/src/helpers/currency-formatter";

type VariantType = "primary" | "secondary" | "neutral" | "success" | "error";

export interface MetricCardProps {
  title: string;
  value: string | number | undefined;
  userValue?: string | number | undefined;
  variant?: VariantType;
  type?: "percentage" | "currency";
}

const MetricCard = ({
  title,
  value,
  userValue,
  variant = "neutral",
  type = "currency",
}: MetricCardProps) => {
  return (
    <Column className={`space-y-2 rounded-md p-4 ${variantStyles[variant]}`}>
      <span className="text-sm">{title}</span>
      <Column>
        <p className="text-2xl font-bold">
          {type === "currency"
            ? currencyFormatter(value)
            : `${Number(value).toFixed(2)}%`}
        </p>
        <Show when={userValue}>
          <p className="text-sm font-semibold bg-primary/20 rounded-md min-w-fit w-20 text-center px-1">
            {type === "currency"
              ? currencyFormatter(userValue)
              : `${Number(userValue).toFixed(2)}%`}
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
