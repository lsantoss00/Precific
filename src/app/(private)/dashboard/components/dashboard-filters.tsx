import { getProducts } from "@/src/app/(private)/produtos/services/get-products";
import { Label } from "@/src/components/core";
import Column from "@/src/components/core/column";
import DatePicker from "@/src/components/core/date-picker";
import {
  MultiSelect,
  MultiSelectOption,
} from "@/src/components/core/multi-select";
import Row from "@/src/components/core/row";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

interface DashboardFiltersProps {}

const DashboardFilters = ({}: DashboardFiltersProps) => {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>([]);

  const { data, isPending } = useQuery({
    queryFn: () => getProducts({}),
    queryKey: ["products"],
  });

  const productOptions = useMemo<MultiSelectOption[]>(() => {
    if (!data?.data) return [];

    return data.data.map((product) => ({
      label: product.name,
      value: product.id,
    }));
  }, [data]);

  return (
    <Row className="gap-1 sm:gap-4 w-full">
      <Column className="gap-2">
        <Label>De:</Label>
        <DatePicker value={startDate} onValueChange={setStartDate} />
      </Column>
      <Column className="gap-2">
        <Label>Até:</Label>
        <DatePicker value={endDate} onValueChange={setEndDate} />
      </Column>
      <Column className="gap-2 w-full">
        <Label>Produtos:</Label>
        <MultiSelect
          options={productOptions}
          onValueChange={setSelectedFrameworks}
          commandInputPlaceholder="Busque produtos..."
          maxCount={2}
          className="w-full max-w-90.5! h-10.5!"
        />
      </Column>
    </Row>
  );
};

export default DashboardFilters;
