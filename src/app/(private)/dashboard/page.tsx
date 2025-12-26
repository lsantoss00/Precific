import {
  AreaChart,
  LineChart,
  PieChart,
  RadarChart,
  RadialChart,
} from "@/src/app/(private)/dashboard/components";
import BarChart from "@/src/app/(private)/dashboard/components/bar-chart";
import StackedBarChart from "@/src/app/(private)/dashboard/components/stacked-bar-chart";

import { ChartCard } from "@/src/app/(private)/dashboard/components/chart-card";
import {
  areaChartConfig,
  barChartConfig,
  lineChartMultipleConfig,
  lineChartSingleConfig,
  pieChartConfig,
  radarChartConfig,
  radialChartConfig,
  stackedBarChartConfig,
} from "@/src/app/(private)/dashboard/constants/chart-config";
import {
  areaChartMockData,
  barChartMockData,
  lineChartMultipleMockData,
  lineChartSingleMockData,
  pieChartMockData,
  radarChartMockData,
  radialChartMockData,
  stackedBarChartMockData,
} from "@/src/app/(private)/dashboard/constants/chart-mock-data";
import ComingSoonBadge from "@/src/components/coming-soon-badge";
import { Container } from "@/src/components/core";
import Row from "@/src/components/core/row";
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
  return (
    <Container variant="page">
      <Row className="items-center gap-4">
        <h1 className="text-3xl text-black font-bold">Dashboard</h1>
        <ComingSoonBadge />
      </Row>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-6 gap-4 relative">
        <ChartCard
          title="Bar Chart - Vertical"
          description="Gráfico de Barras Verticais"
          className="col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-2 gap-y-4"
        >
          <BarChart
            data={barChartMockData}
            config={barChartConfig}
            xAxisKey="Mes"
            barKey="Valor"
            layout="vertical"
            barRadius={8}
          />
        </ChartCard>
        <ChartCard
          title="Bar Chart - Horizontal"
          description="Gráfico de Barras Horizontais"
          className="col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-2 gap-y-4"
        >
          <BarChart
            data={barChartMockData}
            config={barChartConfig}
            yAxisKey="Mes"
            barKey="Valor"
            layout="horizontal"
            margin={{ left: -20 }}
            barRadius={8}
          />
        </ChartCard>
        <ChartCard
          title="Stacked Bar Chart"
          description="Gráfico de Barras Empilhadas"
          className="col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-2 gap-y-4"
        >
          <StackedBarChart
            data={stackedBarChartMockData}
            config={stackedBarChartConfig}
            xAxisKey="Mes"
            barKeys={Object.keys(stackedBarChartConfig)}
            stackId="a"
            barRadius={8}
          />
        </ChartCard>
        <ChartCard
          title="Pie Chart - Variant 1"
          description="Gráfico de Pizza"
          className="col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-2 gap-y-4"
        >
          <PieChart
            data={pieChartMockData}
            config={pieChartConfig}
            dataKey="value"
            nameKey="name"
          />
        </ChartCard>
        <ChartCard
          title="Pie Chart - Variant 2"
          description="Gráfico de Pizza com Raio Interno (Donut)"
          className="col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-2 gap-y-4"
        >
          <PieChart
            data={pieChartMockData}
            config={pieChartConfig}
            dataKey="value"
            nameKey="name"
            innerRadius={60}
            strokeWidth={2}
          />
        </ChartCard>
        <ChartCard
          title="Pie Chart - Variant 3"
          description="Gráfico de Pizza com Raio Interno e Texto Central (Donut)"
          className="col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-2 gap-y-4"
        >
          <PieChart
            data={pieChartMockData}
            config={pieChartConfig}
            dataKey="value"
            nameKey="name"
            innerRadius={60}
            strokeWidth={2}
            centralText="1050"
            centralTextLabel="Total"
          />
        </ChartCard>
        <ChartCard
          title="Line Chart - Variant 1"
          description="Gráfico de Linha Simples"
          className="col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-2 gap-y-4"
        >
          <LineChart
            data={lineChartSingleMockData}
            config={lineChartSingleConfig}
            xAxisKey="Mes"
            lineType="monotone"
            strokeWidth={3}
            margin={{ top: 20 }}
          />
        </ChartCard>
        <ChartCard
          title="Line Chart - Variant 2"
          description="Gráfico de Linha Múltipla"
          className="col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-2 gap-y-4"
        >
          <LineChart
            data={lineChartMultipleMockData}
            config={lineChartMultipleConfig}
            xAxisKey="Mes"
            lineType="monotone"
            strokeWidth={3}
            margin={{ top: 20 }}
          />
        </ChartCard>
        <ChartCard
          title="Area Chart"
          description="Gráfico de Área"
          className="col-span-1 sm:col-span-1 md:col-span-2 lg:col-span-2 gap-y-4"
        >
          <AreaChart
            data={areaChartMockData}
            config={areaChartConfig}
            xAxisKey="Mes"
          />
        </ChartCard>
        <ChartCard
          title="Radar Chart"
          description="Gráfico de Radar"
          className="col-span-1 md:col-span-1 lg:col-span-3"
        >
          <RadarChart data={radarChartMockData} config={radarChartConfig} />
        </ChartCard>
        <ChartCard
          title="Radial Chart"
          description="Gráfico Radial"
          className="col-span-1 md:col-span-1 lg:col-span-3 min-h-full gap-4"
        >
          <RadialChart
            data={radialChartMockData}
            config={radialChartConfig}
            dataKey="value"
            nameKey="name"
          />
        </ChartCard>
      </div>
      <div className="absolute inset-0 bg-white/50 flex flex-col items-center justify-center z-10 pointer-events-auto" />
    </Container>
  );
}
