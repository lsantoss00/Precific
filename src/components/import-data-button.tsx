"use client";

import { useMutation } from "@tanstack/react-query";
import { Loader2, Upload } from "lucide-react";
import Papa from "papaparse";
import { useRef } from "react";
import { toast } from "sonner";
import { importProducts } from "../app/produtos/services/post-products-by-import";
import { queryClient } from "../libs/tanstack-query/query-client";
import { Button } from "./core";

interface CSVRow {
  sku: string;
  nome: string;
  ncm: string;
  preço?: string;
  "preço em 2026"?: string;
  "preço em 2027"?: string;
  status?: string;
}

interface ImportDataButtonProps {
  onImportSuccess?: () => void;
}

const ImportDataButton = ({ onImportSuccess }: ImportDataButtonProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // TO-DO: Remover isso daqui para que vire um componente independente.
  const importMutation = useMutation({
    mutationFn: async (csvData: CSVRow[]) => {
      const productsToImport = csvData.map((row) => ({
        sku: row.sku === "-" || !row.sku ? "-" : row.sku,
        name: row.nome === "-" || !row.nome ? "-" : row.nome,
        ncm: row.ncm === "-" || !row.ncm ? "-" : row.ncm,
        price_today: row.preço ? parseCurrency(row.preço) : 0,
        price_in_2026: row["preço em 2026"]
          ? parseCurrency(row["preço em 2026"])
          : 0,
        price_in_2027: row["preço em 2027"]
          ? parseCurrency(row["preço em 2027"])
          : 0,
        status: "ACTIVE",
      }));

      return await importProducts(productsToImport);
    },
    onSuccess: async () => {
      toast.success(`Produtos importados com sucesso!`, {
        className: "!bg-green-600 !text-white",
      });

      await queryClient?.invalidateQueries({ queryKey: ["products"] });
      await queryClient?.invalidateQueries({ queryKey: ["product-summaries"] });

      if (fileInputRef.current) fileInputRef.current.value = "";
      onImportSuccess?.();
    },
    onError: () => {
      toast.error(
        "Erro ao importar dados. Verifique o arquivo e tente novamente.",
        {
          className: "!bg-red-600 !text-white",
        }
      );
      if (fileInputRef.current) fileInputRef.current.value = "";
    },
  });

  const parseCurrency = (value: string): number => {
    if (!value || value === "-") return 0;
    const cleaned = value
      .replace(/R\$\s?/g, "")
      .replace(/\./g, "")
      .replace(",", ".");
    return parseFloat(cleaned) || 0;
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) return;

    if (!selectedFile.name.endsWith(".csv")) {
      toast.error("Por favor, selecione um arquivo CSV", {
        className: "!bg-red-600 !text-white",
      });
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    toast.info("Processando arquivo... Isso pode demorar um pouco.", {
      className: "!bg-blue-600 !text-white",
    });

    Papa.parse(selectedFile, {
      header: true,
      transformHeader: (header) => header.toLowerCase().trim(),
      skipEmptyLines: true,
      quoteChar: '"',
      escapeChar: '"',
      delimitersToGuess: [",", "\t", "|", ";"],
      transform: (value) => value.trim(),
      complete: (results) => {
        const errorRows = new Set(results.errors.map((error) => error.row));
        const validData = results.data.filter(
          (_, index) => !errorRows.has(index)
        );

        if (results.errors.length > 0) {
          toast.warning(
            `${results.errors.length} linha(s) com problema foram ignoradas. ${validData.length} linha(s) válidas serão importadas.`,
            {
              className: "!bg-yellow-600 !text-white",
            }
          );
        }

        if (!validData || validData.length === 0) {
          toast.error("Nenhum dado válido encontrado no arquivo", {
            className: "!bg-red-600 !text-white",
          });
          if (fileInputRef.current) fileInputRef.current.value = "";
          return;
        }

        const firstRow = validData[0] as any;
        const requiredColumns = ["sku", "nome"];
        const missingColumns = requiredColumns.filter(
          (col) => !(col in firstRow)
        );

        if (missingColumns.length > 0) {
          toast.error(`Colunas faltando no CSV: ${missingColumns.join(", ")}`, {
            className: "!bg-red-600 !text-white",
          });
          if (fileInputRef.current) fileInputRef.current.value = "";
          return;
        }

        importMutation.mutate(validData as CSVRow[]);
      },
      error: () => {
        toast.error("Erro ao ler o arquivo CSV", {
          className: "!bg-red-600 !text-white",
        });
        if (fileInputRef.current) fileInputRef.current.value = "";
      },
    });
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv"
        onChange={handleFileSelect}
        className="hidden"
        id="csv-upload"
        disabled={importMutation.isPending}
      />
      <Button
        asChild
        className="hover:cursor-pointer w-fit"
        disabled={importMutation.isPending}
      >
        <label htmlFor="csv-upload">
          {importMutation.isPending && <Loader2 className="animate-spin" />}
          <Upload className="text-white" />
          <span className="hidden sm:flex">Importar CSV</span>
        </label>
      </Button>
    </>
  );
};

export default ImportDataButton;
