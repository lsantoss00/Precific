import {
  AreaChart,
  LineChart,
  PieChart,
  RadarChart,
  RadialChart,
} from "@/src/app/(private)/dashboard/components";
import { ChartCard } from "@/src/app/(private)/dashboard/components/chart-card";
import {
  areaChartConfig,
  lineChartMultipleConfig,
  lineChartSingleConfig,
  pieChartConfig,
  radarChartConfig,
  radialChartConfig,
} from "@/src/app/(private)/dashboard/constants/chart-config";
import {
  areaChartMockData,
  lineChartMultipleMockData,
  lineChartSingleMockData,
  pieChartMockData,
  radarChartMockData,
  radialChartMockData,
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
    <Container
      variant="page"
      className="max-w-7xl xl:max-w-5xl 2xl:max-w-[1500px] space-y-4 flex flex-col"
    >
      <Row className="items-center gap-4">
        <h1 className="text-3xl text-black font-bold">Dashboard</h1>
        <ComingSoonBadge />
      </Row>
      <div className="grid grid-cols-6 gap-4">
        <ChartCard
          title="Pie Chart - Variant 1 (Pizza)"
          description="Pie Chart Basic"
          className="col-span-2"
        >
          <PieChart
            data={pieChartMockData}
            config={pieChartConfig}
            dataKey="value"
            nameKey="name"
          />
        </ChartCard>
        <ChartCard
          title="Pie Chart - Variant 2 (Donut)"
          description="Pie Chart InnerRadius"
          className="col-span-2"
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
          title="Pie Chart - Variant 3 (Donut)"
          description="Pie Chart InnerRadius & Central Text"
          className="col-span-2"
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
          title="Area Chart"
          description="Area Chart with gradients"
          className="col-span-2"
        >
          <AreaChart
            data={areaChartMockData}
            config={areaChartConfig}
            xAxisKey="Mes"
          />
        </ChartCard>
        <ChartCard
          title="Line Chart - Variant 1 (Single)"
          description="Line Chart with single line"
          className="col-span-2"
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
          title="Line Chart - Variant 2 (Multiple)"
          description="Line Chart with multiple lines"
          className="col-span-2"
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
        <ChartCard title="Radar Chart" className="col-span-3">
          <RadarChart data={radarChartMockData} config={radarChartConfig} />
        </ChartCard>
        <ChartCard title="Radial Chart" className="col-span-3">
          <RadialChart
            data={radialChartMockData}
            config={radialChartConfig}
            dataKey="value"
            nameKey="name"
          />
        </ChartCard>
      </div>
    </Container>
  );
}
