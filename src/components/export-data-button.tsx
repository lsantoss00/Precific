"use client";

import { currencyFormatter } from "@/src/helpers/currency-formatter";
import { useQuery } from "@tanstack/react-query";
import { Download, Loader2Icon } from "lucide-react";
import Papa from "papaparse";
import { toast } from "sonner";
import { getProductsForExport } from "../app/(private)/produtos/services/get-products-for-export";
import { Button } from "./core";
import Show from "./core/show";

interface ExportDataButtonProps {
  search?: string;
}

const ExportDataButton = ({ search }: ExportDataButtonProps) => {
  // TO-DO: Mover isso pra fora, pra ser um componente independente
  const { isFetching, refetch } = useQuery({
    queryFn: () => getProductsForExport({ search }),
    queryKey: ["products-export", search],
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
        Preço: currencyFormatter(Number(product.price_today)) || "-",
        "Preço em 2026":
          currencyFormatter(Number(product.price_in_2026)) || "-",
        "Preço em 2027":
          currencyFormatter(Number(product.price_in_2027)) || "-",
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
  return (
    <Button
      className="hover:cursor-pointer flex-1 md:flex-none md:w-fit h-12"
      type="button"
      disabled={isFetching}
      onClick={handleExport}
    >
      <Show when={isFetching} fallback={<Download className="text-white" />}>
        <Loader2Icon className="animate-spin" />
      </Show>

      <span className="hidden sm:flex">Exportar</span>
    </Button>
  );
};

export default ExportDataButton;
