import AreaChart from "@/src/app/(private)/dashboard/components/area-chart";
import { ChartPieDonut } from "@/src/app/(private)/dashboard/components/donut-chart";
import { ChartPieDonutText } from "@/src/app/(private)/dashboard/components/donut-chart-with-text";
import { ChartBarHorizontal } from "@/src/app/(private)/dashboard/components/horizontal-bar-chart";
import { ChartLineDefault } from "@/src/app/(private)/dashboard/components/line-chart";
import { ChartBarMultiple } from "@/src/app/(private)/dashboard/components/multiple-bar-chart";
import { ChartLineMultiple } from "@/src/app/(private)/dashboard/components/multiple-line-chart";
import { ChartPieSimple } from "@/src/app/(private)/dashboard/components/pie-chart";
import { ChartRadarLinesOnly } from "@/src/app/(private)/dashboard/components/radar-chart";
import { ChartRadialSimple } from "@/src/app/(private)/dashboard/components/radial-chart";
import { ChartRadialShape } from "@/src/app/(private)/dashboard/components/shape-radial-chart";
import { ChartBarStacked } from "@/src/app/(private)/dashboard/components/stacked-bar-chart";
import { Card, Container } from "@/src/components/core";
import Column from "@/src/components/core/column";
import Row from "@/src/components/core/row";
import Show from "@/src/components/core/show";
import {
  ArrowDown,
  ArrowUp,
  BarChart3,
  DollarSign,
  Package,
  TrendingUp,
} from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "Acompanhe suas métricas e indicadores de precificação em tempo real. Visualize dados consolidados e tome decisões estratégicas.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DashboardPage() {
  const kpiCards = [
    {
      id: 1,
      title: "Produtos Salvos",
      value: "50.8K",
      change: "+26.2%",
      isPositive: true,
      icon: (
        <Package className="w-12 h-12 p-3 text-blue-600 bg-blue-100 rounded-lg" />
      ),
    },
    {
      id: 2,
      title: "Produtos em Estoque",
      value: "23.6K",
      change: "-10%",
      isPositive: false,
      icon: (
        <BarChart3 className="w-12 h-12 p-3 text-purple-600 bg-purple-100 rounded-lg" />
      ),
    },
    {
      id: 3,
      title: "Produtos Vendidos",
      value: "756",
      change: "+3%",
      isPositive: true,
      icon: (
        <TrendingUp className="w-12 h-12 p-3 text-green-600 bg-green-100 rounded-lg" />
      ),
    },
    {
      id: 4,
      title: "Receita Média",
      value: "2.3K",
      change: "+1.9%",
      isPositive: true,
      icon: (
        <DollarSign className="w-12 h-12 p-3 text-orange-600 bg-orange-100 rounded-lg" />
      ),
    },
  ];

  return (
    <Container
      variant="page"
      className="max-w-7xl xl:max-w-5xl 2xl:max-w-[1500px] space-y-4 flex flex-col"
    >
      <h1 className="text-3xl text-black font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((kpi) => (
          <Card
            key={kpi.id}
            className="p-6 flex flex-row justify-between items-center w-full h-28 rounded-md shadow-sm"
          >
            <Column className="space-y-1">
              <Row className="items-center gap-2">
                <p className="text-3xl font-semibold">{kpi.value}</p>
                <span
                  className={`flex items-center gap-1 text-sm font-medium ${
                    kpi.isPositive ? "text-green-600" : "text-red-600"
                  }`}
                >
                  <Show
                    when={kpi.isPositive}
                    fallback={<ArrowDown className="w-3 h-3" />}
                  >
                    <ArrowUp className="w-3 h-3" />
                  </Show>
                  {kpi.change}
                </span>
              </Row>
              <span className="text-sm max-w-[100px] 2xl:max-w-none text-muted-foreground">
                {kpi.title}
              </span>
            </Column>
            {kpi.icon}
          </Card>
        ))}
      </div>
      <AreaChart />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="md:col-span-2 lg:col-span-2">
          <ChartBarStacked />
        </div>
        <div className="md:col-span-2 lg:col-span-2">
          <ChartLineMultiple />
        </div>
        <ChartPieDonut />
        <ChartPieDonutText />
        <ChartRadialSimple />
        <ChartRadialShape />
        <div className="md:col-span-2">
          <ChartBarMultiple />
        </div>

        <ChartPieSimple />
        <ChartLineDefault />
        <ChartBarHorizontal />
        <div className="md:col-span-2">
          <ChartRadarLinesOnly />
        </div>
      </div>
    </Container>
  );
}
