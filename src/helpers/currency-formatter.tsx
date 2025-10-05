interface CurrencyFormatterProps {
  children: number | string | undefined;
}

export const currencyFormatter = (value: number | string | undefined) => {
  if (value === null || value === undefined || value === "") return "R$ 0,00";

  if (typeof value === "number") {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  }

  const cleaned = value.replace(/[^\d.,-]/g, "");
  const normalized = cleaned.replace(",", ".");
  const numberValue = parseFloat(normalized);

  if (isNaN(numberValue)) return "R$ 0,00";

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numberValue);
};

const CurrencyFormatter = ({ children }: CurrencyFormatterProps) => {
  return <>{currencyFormatter(children)}</>;
};

export default CurrencyFormatter;
