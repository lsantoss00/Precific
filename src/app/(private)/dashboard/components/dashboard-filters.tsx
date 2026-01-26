"use client";

import { ChartFiltersType } from "@/src/app/(private)/dashboard/types/chart-filters-type";
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
import { useEffect, useMemo, useState } from "react";

interface DashboardFiltersProps {
  value: ChartFiltersType;
  onChange: (filters: ChartFiltersType) => void;
}

const DashboardFilters = ({ value, onChange }: DashboardFiltersProps) => {
  const maxIsXs = useMediaQuery("(max-width: 480px)");
  const maxIsSm = useMediaQuery("(max-width: 640px)");
  const maxIsMd = useMediaQuery("(max-width: 768px)");
  const minIsXl = useMediaQuery("(min-width: 1280px)");
  const minIs2Xl = useMediaQuery("(min-width: 1536px)");

  const { fromDate: dateFrom, toDate: dateTo, productIds: products } = value;

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<
    string[] | undefined
  >(undefined);
  const [selectedFromDate, setSelectedFromDate] = useState<Date | undefined>(
    dateFrom,
  );
  const [selectedToDate, setSelectedToDate] = useState<Date | undefined>(
    dateTo,
  );
  const [selectedProductsMap, setSelectedProductsMap] = useState<
    Map<string, string>
  >(new Map());

  const debouncedSearched = useDebounce(searchTerm);
  const debouncedProducts = useDebounce(selectedProducts, 500);
  const debouncedFromDate = useDebounce(selectedFromDate, 500);
  const debouncedToDate = useDebounce(selectedToDate, 500);

  const isDebouncing = searchTerm !== debouncedSearched;

  const handleStartDateChange = (dateFrom?: Date) => {
    setSelectedFromDate(dateFrom);
  };

  const handleEndDateChange = (dateTo?: Date) => {
    setSelectedToDate(dateTo);
  };

  const handleProductsChange = (products: string[] | undefined) => {
    setSelectedProducts(products);
  };

  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
    queryKey: ["products", debouncedSearched],
    queryFn: ({ pageParam = 1 }) =>
      getProducts({
        page: pageParam,
        pageSize: 10,
        search: debouncedSearched,
      }),
    getNextPageParam: (lastPage) =>
      lastPage.currentPage < lastPage.totalPages
        ? lastPage.currentPage + 1
        : undefined,
    initialPageParam: 1,
  });

  const fetchedOptions = useMemo<MultiSelectOption[]>(() => {
    if (!data?.pages) return [];

    return data.pages.flatMap((page) =>
      page.data.map((product) => ({
        label: product.name,
        value: product.id,
      })),
    );
  }, [data]);

  const options = useMemo<MultiSelectOption[]>(() => {
    const map = new Map<string, MultiSelectOption>();

    fetchedOptions.forEach((option) => map.set(option.value, option));

    selectedProductsMap.forEach((label, id) => {
      if (!map.has(id)) {
        map.set(id, { label, value: id });
      }
    });

    return Array.from(map.values());
  }, [fetchedOptions, selectedProductsMap]);

  useMemo(() => {
    const newMap = new Map(selectedProductsMap);
    let hasChanges = false;

    fetchedOptions.forEach((option) => {
      if (
        selectedProducts?.includes(option.value) &&
        !newMap.has(option.value)
      ) {
        newMap.set(option.value, option.label);
        hasChanges = true;
      }
    });

    if (hasChanges) {
      setSelectedProductsMap(newMap);
    }
  }, [fetchedOptions, selectedProducts]);

  const handleLoadMore = () => {
    if (hasNextPage && !isFetching) {
      fetchNextPage();
    }
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

  useEffect(() => {
    if (products) {
      setSelectedProducts(products);
    }
  }, [products]);

  useEffect(() => {
    setSelectedFromDate(dateFrom);
  }, [dateFrom]);

  useEffect(() => {
    setSelectedToDate(dateTo);
  }, [dateTo]);

  useEffect(() => {
    if (JSON.stringify(debouncedProducts) !== JSON.stringify(products)) {
      onChange({ ...value, productIds: debouncedProducts });
    }
  }, [debouncedProducts]);

  useEffect(() => {
    // Verifica se ambas as datas existem antes de comparar
    if (debouncedFromDate && dateFrom) {
      if (debouncedFromDate.getTime() !== dateFrom.getTime()) {
        onChange({ ...value, fromDate: debouncedFromDate });
      }
    } else if (debouncedFromDate !== dateFrom) {
      // Se uma é undefined e a outra não, atualiza
      onChange({ ...value, fromDate: debouncedFromDate });
    }
  }, [debouncedFromDate]);

  useEffect(() => {
    // Verifica se ambas as datas existem antes de comparar
    if (debouncedToDate && dateTo) {
      if (debouncedToDate.getTime() !== dateTo.getTime()) {
        onChange({ ...value, toDate: debouncedToDate });
      }
    } else if (debouncedToDate !== dateTo) {
      // Se uma é undefined e a outra não, atualiza
      onChange({ ...value, toDate: debouncedToDate });
    }
  }, [debouncedToDate]);

  return (
    <Flex className="flex-col sm:flex-row gap-4">
      <Row className="w-full 2xl:w-fit gap-4">
        <Column className="gap-2 w-full 2xl:w-43.5">
          <Label>De:</Label>
          <DatePicker
            value={selectedFromDate}
            onValueChange={handleStartDateChange}
          />
        </Column>
        <Column className="gap-2 w-full 2xl:w-43.5">
          <Label>Até:</Label>
          <DatePicker
            value={selectedToDate}
            onValueChange={handleEndDateChange}
          />
        </Column>
      </Row>
      <Column className="gap-2 w-full">
        <Label>Produtos:</Label>
        <MultiSelect
          options={options}
          value={selectedProducts}
          onValueChange={handleProductsChange}
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
