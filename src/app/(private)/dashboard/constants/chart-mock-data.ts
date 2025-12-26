import { ChartDataType } from "@/src/app/(private)/dashboard/types/chart-data-type";

export const pieChartMockData: ChartDataType[] = [
  {
    name: "Categoria A",
    value: 400,
    fill: "var(--chart-1)",
  },
  {
    name: "Categoria B",
    value: 300,
    fill: "var(--chart-2)",
  },
  {
    name: "Categoria C",
    value: 200,
    fill: "var(--chart-3)",
  },
  {
    name: "Categoria D",
    value: 100,
    fill: "var(--chart-4)",
  },
  {
    name: "Categoria E",
    value: 50,
    fill: "var(--chart-5)",
  },
];

export const areaChartMockData: ChartDataType[] = [
  { Mes: "Jan", Vendas: 1000, Lucro: 400 },
  { Mes: "Fev", Vendas: 1200, Lucro: 500 },
  { Mes: "Mar", Vendas: 1500, Lucro: 700 },
  { Mes: "Abr", Vendas: 1100, Lucro: 450 },
  { Mes: "Mai", Vendas: 1600, Lucro: 900 },
  { Mes: "Jun", Vendas: 1700, Lucro: 950 },
];

export const lineChartSingleMockData: ChartDataType[] = [
  { Mes: "Jan", Total: 400 },
  { Mes: "Fev", Total: 500 },
  { Mes: "Mar", Total: 600 },
  { Mes: "Abr", Total: 400 },
  { Mes: "Mai", Total: 200 },
  { Mes: "Jun", Total: 800 },
];
export const lineChartMultipleMockData: ChartDataType[] = [
  { Mes: "Jan", Receita: 1200, Despesa: 800 },
  { Mes: "Fev", Receita: 1500, Despesa: 950 },
  { Mes: "Mar", Receita: 1700, Despesa: 1100 },
  { Mes: "Abr", Receita: 1400, Despesa: 900 },
  { Mes: "Mai", Receita: 1800, Despesa: 1200 },
  { Mes: "Jun", Receita: 1600, Despesa: 1000 },
];

export const radarChartMockData: ChartDataType[] = [
  { subject: "Marketing", A: 120, B: 110, fullMark: 150 },
  { subject: "Vendas", A: 98, B: 130, fullMark: 150 },
  { subject: "Desenvolvimento", A: 86, B: 130, fullMark: 150 },
  { subject: "Suporte", A: 99, B: 100, fullMark: 150 },
  { subject: "Financeiro", A: 85, B: 90, fullMark: 150 },
  { subject: "RH", A: 65, B: 85, fullMark: 150 },
];

export const barChartMockData: ChartDataType[] = [
  { Mes: "Jan", Valor: 400 },
  { Mes: "Fev", Valor: 300 },
  { Mes: "Mar", Valor: 500 },
  { Mes: "Abr", Valor: 200 },
  { Mes: "Mai", Valor: 600 },
  { Mes: "Jun", Valor: 700 },
];

export const stackedBarChartMockData: ChartDataType[] = [
  { Mes: "Jan", ProdutoA: 200, ProdutoB: 120, ProdutoC: 80 },
  { Mes: "Fev", ProdutoA: 180, ProdutoB: 140, ProdutoC: 100 },
  { Mes: "Mar", ProdutoA: 220, ProdutoB: 160, ProdutoC: 120 },
  { Mes: "Abr", ProdutoA: 160, ProdutoB: 110, ProdutoC: 90 },
  { Mes: "Mai", ProdutoA: 250, ProdutoB: 170, ProdutoC: 130 },
  { Mes: "Jun", ProdutoA: 210, ProdutoB: 150, ProdutoC: 110 },
];

export const radialChartMockData: ChartDataType[] = [
  { name: "Categoria A", value: 400, fill: "var(--chart-1)" },
  { name: "Categoria B", value: 300, fill: "var(--chart-2)" },
  { name: "Categoria C", value: 200, fill: "var(--chart-3)" },
  { name: "Categoria D", value: 100, fill: "var(--chart-4)" },
  { name: "Categoria E", value: 50, fill: "var(--chart-5)" },
];
