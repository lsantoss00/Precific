import { getProducts } from "@/src/app/(private)/produtos/services/get-products";
import { Label } from "@/src/components/core";
import Column from "@/src/components/core/column";
import DatePicker from "@/src/components/core/date-picker";
import Flex from "@/src/components/core/flex";
import {
  MultiSelect,
  MultiSelectOption,
} from "@/src/components/core/multi-select";
import Row from "@/src/components/core/row";
import { useMediaQuery } from "@/src/hooks/use-media-query";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

interface DashboardFiltersProps {}

const DashboardFilters = ({}: DashboardFiltersProps) => {
  const maxIsXs = useMediaQuery(`(max-width: 480px)`);
  const maxIsSm = useMediaQuery(`(max-width: 640px)`);
  const maxIsMd = useMediaQuery(`(max-width: 768px)`);
  const minIsXl = useMediaQuery(`(min-width: 1280px)`);
  const minIs2Xl = useMediaQuery(`(min-width: 1536px)`);

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

  const multiSelectMaxCount = maxIsXs
    ? 1
    : maxIsSm
      ? 2
      : maxIsMd
        ? 1
        : minIs2Xl
          ? 2
          : minIsXl
            ? 3
            : 2;

  return (
    <Flex className="flex-col sm:flex-row gap-4">
      <Row className="w-full 2xl:w-fit gap-4">
        <Column className="gap-2 w-full 2xl:w-43.5">
          <Label>De:</Label>
          <DatePicker value={startDate} onValueChange={setStartDate} />
        </Column>
        <Column className="gap-2 w-full 2xl:w-43.5">
          <Label>Até:</Label>
          <DatePicker value={endDate} onValueChange={setEndDate} />
        </Column>
      </Row>
      <Column className="gap-2 w-full">
        <Label>Produtos:</Label>
        <MultiSelect
          options={productOptions}
          onValueChange={setSelectedFrameworks}
          commandInputPlaceholder="Busque produtos..."
          maxCount={multiSelectMaxCount}
          className="w-full 2xl:max-w-90.5!"
        />
      </Column>
    </Flex>
  );
};

export default DashboardFilters;
