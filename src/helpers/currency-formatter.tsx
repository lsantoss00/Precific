interface CurrencyFormatterProps {
  children: number | string | undefined;
}

export const currencyFormatter = (value: number) => {
  if (!value) return "R$ 0,00";

  const number = String(value).replace(/[^0-9\-]/g, "") ?? 0;

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(number) / 100);
};

const CurrencyFormatter = ({ children }: CurrencyFormatterProps) => {
  return <>{currencyFormatter(Number(children))}</>;
};

export default CurrencyFormatter;
