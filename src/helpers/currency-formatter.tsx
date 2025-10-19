const currencyFormatter = (value: number | string | undefined) => {
  let numberValue: number;

  if (value === null || value === undefined || value === "") {
    numberValue = 0;
  } else if (typeof value === "number") {
    numberValue = value;
  } else if (typeof value === "string") {
    const cleaned = value.replace(/[^\d.,-]/g, "");
    const normalized = cleaned.replace(",", ".");
    numberValue = parseFloat(normalized);
  } else {
    numberValue = 0;
  }

  if (isNaN(numberValue)) {
    numberValue = 0;
  }

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numberValue);
};

export default currencyFormatter;
