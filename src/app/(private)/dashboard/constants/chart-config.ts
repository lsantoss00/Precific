import { ChartConfig } from "@/src/components/core/chart";

export const pieChartConfig: ChartConfig = {
  "Categoria A": { label: "Categoria A", color: "var(--chart-1)" },
  "Categoria B": { label: "Categoria B", color: "var(--chart-2)" },
  "Categoria C": { label: "Categoria C", color: "var(--chart-3)" },
  "Categoria D": { label: "Categoria D", color: "var(--chart-4)" },
  "Categoria E": { label: "Categoria E", color: "var(--chart-5)" },
};

export const areaChartConfig: ChartConfig = {
  Mes: { label: "Mês" },
  Vendas: { label: "Vendas", color: "var(--chart-1)" },
  Lucro: { label: "Lucro", color: "var(--chart-2)" },
};

export const lineChartSingleConfig: ChartConfig = {
  Mes: { label: "Mês" },
  Total: { label: "Total", color: "var(--chart-1)" },
};

export const lineChartMultipleConfig: ChartConfig = {
  Mes: { label: "Mês" },
  Receita: { label: "Receita", color: "var(--chart-1)" },
  Despesa: { label: "Despesa", color: "var(--chart-2)" },
};

export const radarChartConfig: ChartConfig = {
  subject: { label: "Área" },
  A: { label: "Equipe A", color: "var(--chart-1)" },
  B: { label: "Equipe B", color: "var(--chart-2)" },
  fullMark: { label: "Máximo", color: "var(--chart-3)" },
};

export const radialChartConfig: ChartConfig = {
  name: { label: "Categoria" },
  value: { label: "Valor", color: "var(--chart-1)" },
  fill: { label: "Cor" },
};

export const barChartConfig: ChartConfig = {
  Mes: { label: "Mês" },
  Valor: { label: "Valor", color: "var(--chart-1)" },
};

export const stackedBarChartConfig: ChartConfig = {
  ProdutoA: { label: "Produto A", color: "var(--chart-1)" },
  ProdutoB: { label: "Produto B", color: "var(--chart-2)" },
  ProdutoC: { label: "Produto C", color: "var(--chart-3)" },
};
