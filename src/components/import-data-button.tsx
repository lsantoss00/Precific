"use client";

import { useMutation } from "@tanstack/react-query";
import { Loader2, Upload } from "lucide-react";
import Papa from "papaparse";
import { useRef } from "react";
import { toast } from "sonner";
import { importProducts } from "../app/produtos/services/post-products-by-import";
import { Button } from "./core";

interface CSVRow {
  SKU: string;
  Nome: string;
  NCM: string;
  Preço: string;
  "Preço em 2026": string;
  "Preço em 2027": string;
  Status: string;
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
        sku: row.SKU === "-" || !row.SKU ? "-" : row.SKU,
        name: row.Nome === "-" || !row.Nome ? "-" : row.Nome,
        ncm: row.NCM === "-" || !row.NCM ? "-" : row.NCM,
        price_today: parseCurrency(row["Preço"]),
        price_in_2026: parseCurrency(row["Preço em 2026"]),
        price_in_2027: parseCurrency(row["Preço em 2027"]),
        status: row.Status === "Inativo" ? "INACTIVE" : "ACTIVE",
      }));

      return await importProducts(productsToImport);
    },
    onSuccess: (data) => {
      toast.success(`${data.count || 0} produtos importados com sucesso!`, {
        className: "!bg-green-600 !text-white",
      });

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

    if (
      !selectedFile.name.endsWith(".csv") &&
      !selectedFile.name.endsWith(".xlsx")
    ) {
      toast.error("Por favor, selecione um arquivo CSV ou XLSX");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    toast.info("Processando arquivo... Isso pode demorar um pouco.", {
      className: "!bg-yellow-600 !text-white",
      id: "import-toast",
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
              duration: 5000,
            }
          );
        }

        if (!validData || validData.length === 0) {
          toast.error("Nenhum dado válido encontrado no arquivo");
          if (fileInputRef.current) fileInputRef.current.value = "";
          return;
        }

        const firstRow = validData[0] as any;
        const requiredColumns = ["sku", "nome"];
        const missingColumns = requiredColumns.filter(
          (col) => !(col in firstRow)
        );

        if (missingColumns.length > 0) {
          toast.error(`Colunas faltando no CSV: ${missingColumns.join(", ")}`);
          if (fileInputRef.current) fileInputRef.current.value = "";
          return;
        }

        importMutation.mutate(validData as CSVRow[]);
      },
      error: () => {
        toast.error("Erro ao ler o arquivo CSV");
        if (fileInputRef.current) fileInputRef.current.value = "";
      },
    });
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv, .xlsx"
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
