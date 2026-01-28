import KpiCard from "@/src/app/(private)/dashboard/components/kpi-card";
import { getProductsAveragePrice } from "@/src/app/(private)/dashboard/services/get-products-average-price";
import { ChartFiltersType } from "@/src/app/(private)/dashboard/types/chart-filters-type";
import { useQuery } from "@tanstack/react-query";
import { BanknoteArrowUp } from "lucide-react";

interface ProductsMarkupChartProps {
  filters?: ChartFiltersType;
}

const ProductsAveragePriceKpiCard = ({ filters }: ProductsMarkupChartProps) => {
  const { data: averagePrice } = useQuery({
    queryKey: ["products-average-price", filters],
    queryFn: () =>
      getProductsAveragePrice({
        filters,
      }),
  });

  return (
    <KpiCard
      title="Preço Médio de Venda"
      icon={<BanknoteArrowUp className="text-muted-foreground h-4 w-4" />}
      value={averagePrice ?? 0}
      type="currency"
    />
  );
};

export default ProductsAveragePriceKpiCard;
