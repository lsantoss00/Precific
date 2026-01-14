"use client";

import {
  areaChartConfig,
  barChartConfig,
  lineChartSingleConfig,
  pieChartConfig,
  radarChartConfig,
  stackedBarChartConfig,
} from "@/src/app/(private)/dashboard/constants/chart-config";
import {
  areaChartMockData,
  barChartMockData,
  kpiCardsMockData,
  lineChartSingleMockData,
  pieChartMockData,
  radarChartMockData,
  stackedBarChartMockData,
} from "@/src/app/(private)/dashboard/constants/dashboard-mock-data";
import ComingSoonBadge from "@/src/components/coming-soon-badge";
import Column from "@/src/components/core/column";
import DatePicker from "@/src/components/core/date-picker";
import Row from "@/src/components/core/row";
import {
  AreaChart,
  BarChart,
  ChartCard,
  KpiCard,
  LineChart,
  PieChart,
  RadarChart,
  StackedBarChart,
} from "../components";

import { Label } from "@/src/components/core";
import { useState } from "react";

const DashboardPageContent = () => {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  return (
    <Column className="gap-4 relative">
      <Row className="items-center gap-4 z-20">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <ComingSoonBadge />
      </Row>
      <Row className="gap-1 sm:gap-4">
        <Column className="gap-2">
          <Label>De:</Label>
          <DatePicker value={startDate} onValueChange={setStartDate} />
        </Column>
        <Column className="gap-2">
          <Label>Até:</Label>
          <DatePicker value={endDate} onValueChange={setEndDate} />
        </Column>
      </Row>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {kpiCardsMockData.map((card) => (
          <KpiCard
            key={card.id}
            title={card.title}
            value={card.value}
            icon={card.icon}
            pending={false}
            percentage={card.percentage}
          />
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-6 xl:grid-cols-8 gap-4 relative">
        <ChartCard
          title="Area Chart"
          description="Gráfico de Área"
          className="col-span-1 sm:col-span-6 lg:col-span-4 xl:col-span-6 row-span-1 md:row-span-2"
          contentClassName="h-full"
        >
          <AreaChart
            data={areaChartMockData}
            config={areaChartConfig}
            xAxisKey="Mes"
            className="max-sm:aspect-square"
          />
        </ChartCard>
        <ChartCard
          title="Stacked Bar Chart"
          description="Gráfico de Barras Empilhadas"
          className="sm:col-span-3 lg:col-span-2 md:row-span-1"
          contentClassName="h-full"
        >
          <StackedBarChart
            data={stackedBarChartMockData}
            config={stackedBarChartConfig}
            xAxisKey="Mes"
            barKeys={Object.keys(stackedBarChartConfig)}
            stackId="a"
            barRadius={8}
            className="aspect-square"
          />
        </ChartCard>
        <ChartCard
          title="Line Chart"
          description="Gráfico de Linha Simples"
          className="sm:col-span-3 lg:col-span-2 md:row-span-1"
          contentClassName="h-full w-full"
        >
          <LineChart
            data={lineChartSingleMockData}
            config={lineChartSingleConfig}
            xAxisKey="Mes"
            lineType="monotone"
            strokeWidth={3}
            className="aspect-square"
          />
        </ChartCard>
        <ChartCard
          title="Pie Chart"
          description="Gráfico de Pizza"
          className="sm:col-span-3 lg:col-span-2"
          headerClassName="mb-4"
        >
          <PieChart
            data={pieChartMockData}
            config={pieChartConfig}
            dataKey="value"
            nameKey="name"
            strokeWidth={2}
            className="aspect-square max-h-62.5"
          />
        </ChartCard>
        <ChartCard
          title="Pie Chart"
          description="Gráfico de Pizza com Valor"
          className="sm:col-span-3 lg:col-span-2"
          headerClassName="mb-4"
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
            className="aspect-square max-h-62.5"
          />
        </ChartCard>
        <ChartCard
          title="Bar Chart - Horizontal"
          description="Gráfico de Barras Horizontais"
          className="sm:col-span-6 md:col-span-3 lg:col-span-2 xl:col-span-4"
          headerClassName="mb-4"
        >
          <BarChart
            data={barChartMockData}
            config={barChartConfig}
            yAxisKey="Mes"
            barKey="Valor"
            layout="horizontal"
            margin={{ left: -20 }}
            barRadius={8}
            className="max-sm:aspect-square lg:aspect-square xl:aspect-video max-h-62.5"
          />
        </ChartCard>
        <ChartCard
          title="Bar Chart - Vertical"
          description="Gráfico de Barras Verticais"
          className="sm:col-span-6 md:col-span-3 xl:col-span-4"
          headerClassName="mb-4"
        >
          <BarChart
            data={barChartMockData}
            config={barChartConfig}
            xAxisKey="Mes"
            barKey="Valor"
            layout="vertical"
            barRadius={8}
            className="max-sm:aspect-square max-h-62.5"
          />
        </ChartCard>
        <ChartCard
          title="Radar Chart"
          description="Gráfico de Radar"
          className="sm:col-span-3 md:col-span-6 lg:col-span-3 xl:col-span-4"
          headerClassName="max-xl:mb-4"
        >
          <RadarChart
            data={radarChartMockData}
            config={radarChartConfig}
            className="max-sm:aspect-square max-h-62.5"
          />
        </ChartCard>
      </div>
    </Column>
  );
};

export default DashboardPageContent;
