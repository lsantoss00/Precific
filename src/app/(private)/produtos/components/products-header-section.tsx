"use client";

import { getProductsForExport } from "@/src/app/(private)/produtos/services/get-products-for-export";
import { Button, Input, Label } from "@/src/components/core";
import Column from "@/src/components/core/column";
import Flex from "@/src/components/core/flex";
import Row from "@/src/components/core/row";
import ExportDataButton from "@/src/components/export-data-button";
import MultipleImportDialog from "@/src/components/multiple-import-dialog";
import { currencyFormatter } from "@/src/helpers/currency-formatter";
import { useQuery } from "@tanstack/react-query";
import { Plus, Upload } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Papa from "papaparse";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const ProductsHeaderSection = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("filtro") || ""
  );

  const { refetch, isFetching } = useQuery({
    queryFn: () => getProductsForExport({ search: searchTerm }),
    queryKey: ["products-export", searchTerm],
    enabled: false,
  });

  const handleExport = async () => {
    try {
      const result = await refetch();

      if (!result.data || result.data.length === 0) {
        toast.error("Não há dados para exportar", {
          className: "!bg-red-600 !text-white",
        });
        return;
      }

      const formattedData = result.data.map((product) => ({
        SKU: product.sku || "-",
        Nome: product.name || "-",
        NCM: product.ncm || "-",
        Preço: currencyFormatter(Number(product.priceToday)) || "-",
        "Preço em 2026": currencyFormatter(Number(product.priceIn2026)) || "-",
        "Preço em 2027": currencyFormatter(Number(product.priceIn2027)) || "-",
        Status: product.status === "INACTIVE" ? "Inativo" : "Ativo",
      }));

      const csv = Papa.unparse(formattedData);

      const blob = new Blob(["\uFEFF" + csv], {
        type: "text/csv;charset=utf-8;",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `produtos_${new Date().toISOString().split("T")[0]}.csv`;
      link.click();
      URL.revokeObjectURL(url);
      toast.success("Dados exportados com sucesso!", {
        className: "!bg-green-600 !text-white",
      });
    } catch (error) {
      toast.error("Erro ao exportar dados", {
        className: "!bg-red-600 !text-white",
      });
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (searchTerm) {
        params.set("pagina", "1");
        params.set("filtro", searchTerm);
      } else {
        params.delete("filtro");
      }

      router.push(`?${params.toString()}`);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  return (
    <Column as="header" className="space-y-3 w-full">
      <h1 className="text-3xl font-semibold">Produtos</h1>
      <Flex className="flex-col lg:flex-row justify-between lg:items-center w-full gap-4">
        <div className="w-full lg:max-w-120">
          <Label htmlFor="search-products" className="sr-only">
            Buscar produtos
          </Label>
          <Input
            id="search-products"
            className="w-full"
            placeholder="Buscar por SKU, Nome ou NCM"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            aria-label="Buscar produtos por SKU, Nome ou NCM"
          />
        </div>
        <Row
          as="nav"
          className="space-x-2 w-full lg:w-fit lg:justify-end"
          aria-label="Ações de produtos"
        >
          <Button
            asChild
            className="hover:cursor-pointer w-fit h-12"
            variant="secondary"
          >
            <Link href="/produtos/novo">
              <Plus aria-hidden="true" />
              <span>Novo Produto</span>
            </Link>
          </Button>
          <ExportDataButton onClick={handleExport} pending={isFetching} />
          <MultipleImportDialog
            trigger={
              <Button className="hover:cursor-pointer flex-1 md:flex-none md:w-fit h-12">
                <Upload className="text-white" aria-hidden="true" />
                <span className="hidden sm:flex">Importar</span>
                <span className="sr-only sm:hidden">Importar produtos</span>
              </Button>
            }
          />
        </Row>
      </Flex>
    </Column>
  );
};

export default ProductsHeaderSection;
