"use client";

import { Button, Input } from "@/src/components/core";
import Column from "@/src/components/core/column";
import Flex from "@/src/components/core/flex";
import Row from "@/src/components/core/row";
import Show from "@/src/components/core/show";
import ExportDataButton from "@/src/components/export-data-button";
import ImportDataButton from "@/src/components/import-data-button";
import { Loader2Icon, Plus } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const ProductsHeaderSection = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("filtro") || ""
  );

  const mockPending = false;

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (searchTerm) {
        params.set("filtro", searchTerm);
      } else {
        params.delete("filtro");
      }

      router.push(`?${params.toString()}`, { scroll: false });
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  return (
    <Column className="space-y-3 w-full">
      <h2 className="text-3xl text-black font-bold">Produtos</h2>
      <Flex className="flex-col lg:flex-row justify-between lg:items-center w-full gap-4">
        <Input
          className="w-full lg:max-w-120"
          placeholder="Buscar por SKU, Nome ou NCM"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <Row className="space-x-2 w-full lg:w-fit lg:justify-end">
          <Button
            className="hover:cursor-pointer w-fit h-12"
            variant="secondary"
            onClick={() => router.push("/produtos/novo")}
            disabled={mockPending}
          >
            <Show when={mockPending}>
              <Loader2Icon className="animate-spin" />
            </Show>
            <Plus className="text-white" />
            <span>Novo Produto</span>
          </Button>
          <ExportDataButton search={searchTerm} />
          <ImportDataButton />
        </Row>
      </Flex>
    </Column>
  );
};

export default ProductsHeaderSection;
