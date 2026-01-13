import Column from "@/src/components/core/column";
import Row from "@/src/components/core/row";
import Show from "@/src/components/core/show";
import CustomTooltip from "@/src/components/custom-tooltip";
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
        <p className="text-2xl font-semibold">{formatValue(value)}</p>
        <Show when={secondValue}>
          <Row className="items-center bg-primary/20 min-w-fit w-20 pl-1.5 rounded-md">
            <p className="text-sm font-semibold text-center">
              {formatValue(secondValue)}
            </p>
            <CustomTooltip
              message="Este é o valor que o seu produto possui hoje."
              className={`${variantStyles[variant]}!`}
            />
          </Row>
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
