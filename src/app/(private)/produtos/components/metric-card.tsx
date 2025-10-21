import Column from "@/src/components/core/column";
import currencyFormatter from "@/src/helpers/currency-formatter";

type VariantType = "primary" | "secondary" | "neutral" | "success" | "error";

export interface MetricCardProps {
  title: string;
  value: string | number;
  variant?: VariantType;
}

const MetricCard = ({ title, value, variant = "neutral" }: MetricCardProps) => {
  return (
    <Column className={`space-y-2 rounded-md p-4 ${variantStyles[variant]}`}>
      <p className="text-2xl font-bold">{currencyFormatter(value)}</p>
      <span className="text-sm">{title}</span>
    </Column>
  );
};

export default MetricCard;

const variantStyles: Record<VariantType, string> = {
  primary: "bg-[#66289B] text-white",
  secondary: "bg-[#E9BA67] text-white",
  neutral: "bg-gray-200 text-black",
  success: "bg-green-600 text-white",
  error: "bg-red-600 text-white",
};
