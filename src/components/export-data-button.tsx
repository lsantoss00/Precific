"use client";

import { useQuery } from "@tanstack/react-query";
import { Download, Loader2Icon } from "lucide-react";
import Papa from "papaparse";
import { toast } from "sonner";
import { getProductsForExport } from "../app/produtos/services/get-products-for-export";
import { currencyFormatter } from "../helpers/currency-formatter";
import { Button } from "./core";
import Show from "./core/show";

interface ExportDataButtonProps {
  search?: string;
}

const ExportDataButton = ({ search }: ExportDataButtonProps) => {
  // TO-DO: Mover isso pra fora, pra ser um componente independente
  const { data, isLoading, refetch } = useQuery({
    queryFn: () => getProductsForExport({ search }),
    queryKey: ["products-export", search],
  });

  const handleExport = async () => {
    try {
      const result = await refetch();

      if (!result.data || result.data.length === 0) {
        alert("Não há dados para exportar");
        return;
      }

      const formattedData = result.data.map((product) => ({
        SKU: product.sku || "-",
        Nome: product.name || "-",
        NCM: product.ncm || "-",
        Preço: currencyFormatter(product.price_today) || "-",
        "Preço em 2026": currencyFormatter(product.price_in_2026) || "-",
        "Preço em 2027": currencyFormatter(product.price_in_2027) || "-",
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
    } catch (error) {
      alert("Erro ao exportar dados");
    } finally {
      toast.success("Dados exportados com sucesso!", {
        className: "!bg-green-600 !text-white",
      });
    }
  };
  return (
    <Button
      className="hover:cursor-pointer w-fit"
      type="button"
      disabled={isLoading || !data}
      onClick={handleExport}
    >
      <Show when={isLoading} fallback={<Download className="text-white" />}>
        <Loader2Icon className="animate-spin" />
      </Show>

      <span className="hidden sm:flex">Exportar CSV</span>
    </Button>
  );
};

export default ExportDataButton;
