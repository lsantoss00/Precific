export const monthYearFormatter = (date: string) => {
  const d = new Date(date);

  const month = d.toLocaleString("pt-BR", { month: "short" }).replace(".", "");

  const year = d.getFullYear();

  return `${month.charAt(0).toUpperCase()}${month.slice(1)}/${year}`;
};
