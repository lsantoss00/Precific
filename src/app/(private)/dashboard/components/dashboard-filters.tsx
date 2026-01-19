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
import { useDebounce } from "@/src/hooks/use-debounce";
import { useMediaQuery } from "@/src/hooks/use-media-query";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

interface DashboardFiltersProps {}

const DashboardFilters = ({}: DashboardFiltersProps) => {
  const maxIsXs = useMediaQuery("(max-width: 480px)");
  const maxIsSm = useMediaQuery("(max-width: 640px)");
  const maxIsMd = useMediaQuery("(max-width: 768px)");
  const minIsXl = useMediaQuery("(min-width: 1280px)");
  const minIs2Xl = useMediaQuery("(min-width: 1536px)");

  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  const [selectedProducts, setSelectedProducts] = useState<MultiSelectOption[]>(
    [],
  );
  const [searchTerm, setSearchTerm] = useState<string>("");

  const debouncedSearched = useDebounce(searchTerm, 300);
  const isDebouncing = searchTerm !== debouncedSearched;

  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
    queryKey: ["products", debouncedSearched],
    queryFn: ({ pageParam = 1 }) =>
      getProducts({
        page: pageParam,
        pageSize: 10,
        search: debouncedSearched,
      }),
    getNextPageParam: (lastPage) => {
      return lastPage.currentPage < lastPage.totalPages
        ? lastPage.currentPage + 1
        : undefined;
    },
    initialPageParam: 1,
  });

  const products = useMemo(() => {
    if (!data?.pages) return [];

    return data.pages.flatMap((page) =>
      page.data.map((product) => ({
        label: product.name,
        value: product.id,
      })),
    );
  }, [data]);

  const options = useMemo(() => {
    const map = new Map<string, MultiSelectOption>();

    selectedProducts.forEach((option) => map.set(option.value, option));

    products.forEach((option) => map.set(option.value, option));

    return Array.from(map.values());
  }, [products, selectedProducts]);

  const handleLoadMore = () => {
    if (hasNextPage && !isFetching) {
      fetchNextPage();
    }
  };

  const handleValueChange = (values: string[]) => {
    const newSelection = values
      .map((value) => options.find((opt) => opt.value === value))
      .filter(Boolean) as MultiSelectOption[];

    setSelectedProducts(newSelection);
  };

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
          options={options}
          defaultValue={selectedProducts.map((p) => p.value)}
          onValueChange={handleValueChange}
          commandInputPlaceholder="Busque produtos..."
          maxCount={multiSelectMaxCount}
          className="w-full 2xl:max-w-90.5!"
          onScrollEnd={handleLoadMore}
          isLoadingMore={isFetching || isDebouncing}
          onSearch={setSearchTerm}
          onSearchValue={searchTerm}
        />
      </Column>
    </Flex>
  );
};

export default DashboardFilters;
