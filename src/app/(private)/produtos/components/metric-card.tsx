import Column from "@/src/components/core/column";
import currencyFormatter from "@/src/helpers/currency-formatter";

type VariantType = "primary" | "secondary" | "neutral" | "success" | "error";

export interface MetricCardProps {
  title: string;
  value: string | number | undefined;
  variant?: VariantType;
  type?: "percentage" | "currency";
}

const MetricCard = ({
  title,
  value,
  variant = "neutral",
  type = "currency",
}: MetricCardProps) => {
  return (
    <Column className={`space-y-2 rounded-md p-4 ${variantStyles[variant]}`}>
      <p className="text-2xl font-bold">
        {type === "currency" ? currencyFormatter(value) : `${value}%`}
      </p>
      <span className="text-sm">{title}</span>
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
