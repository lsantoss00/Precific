"use client";

import { Button } from "@/src/components/core";
import Column from "@/src/components/core/column";
import Flex from "@/src/components/core/flex";
import Show from "@/src/components/core/show";
import { ScrollText } from "lucide-react";
import { useProductForm } from "../contexts/product-form-context";
import ProductForm from "./product-form";
import ProductPriceHistoryDialog from "./product-price-history-dialog";

const ProductFormPageContent = () => {
  const { isEditMode, productId } = useProductForm();

  return (
    <Column className="w-full h-full py-8 px-6 xl:px-0 space-y-3 max-w-7xl 2xl:!max-w-[1500px]">
      <Flex className="flex-col md:flex-row gap-2 justify-between">
        <h2 className="text-3xl text-black font-bold">
          {isEditMode ? "Editar Produto" : "Novo Produto"}
        </h2>
        <Show when={isEditMode}>
          <ProductPriceHistoryDialog
            productId={productId!}
            trigger={
              <Button className="cursor-pointer h-12" variant="secondary">
                <ScrollText className="!w-5 !h-5" />
                <span>Histórico de Preço</span>
              </Button>
            }
          />
        </Show>
      </Flex>
      <ProductForm productId={productId} />
    </Column>
  );
};

export default ProductFormPageContent;
