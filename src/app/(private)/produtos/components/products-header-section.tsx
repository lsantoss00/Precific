"use client";

import { Button, Input, Label } from "@/src/components/core";
import Column from "@/src/components/core/column";
import Flex from "@/src/components/core/flex";
import Row from "@/src/components/core/row";
import ExportDataButton from "@/src/components/export-data-button";
import MultipleImportDialog from "@/src/components/multiple-import-dialog";
import { Plus, Upload } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const ProductsHeaderSection = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("filtro") || ""
  );

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
          <ExportDataButton search={searchTerm} />
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
