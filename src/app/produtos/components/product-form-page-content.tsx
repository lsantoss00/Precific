"use client";

import { Button } from "@/src/components/core";
import Column from "@/src/components/core/column";
import Row from "@/src/components/core/row";
import Show from "@/src/components/core/show";
import { ScrollText } from "lucide-react";
import { useProductForm } from "../contexts/product-form-context";
import ProductForm from "./product-form";
import ProductPriceHistoryDialog from "./product-price-history-dialog";

const ProductFormPageContent = () => {
  const { isEditMode, productId } = useProductForm();

  return (
    <Column className="w-full h-full pt-28 pb-10 xl:pl-12 xl:pr-20 space-y-3">
      <Row className="gap-2 justify-between">
        <h2 className="text-3xl text-black font-bold">
          {isEditMode ? "Editar Produto" : "Novo Produto"}
        </h2>
        <Show when={isEditMode}>
          <ProductPriceHistoryDialog
            productId={productId!}
            trigger={
              <Button className="cursor-pointer" variant="secondary">
                <ScrollText className="!w-5 !h-5" />
                <span>Histórico de Preço</span>
              </Button>
            }
          />
        </Show>
      </Row>
      <ProductForm productId={productId} />
    </Column>
  );
};

export default ProductFormPageContent;
