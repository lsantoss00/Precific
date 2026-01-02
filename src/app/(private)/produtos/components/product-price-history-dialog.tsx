"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/src/components/core";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getProductPriceHistory } from "../services/get-product-price-history";
import { ProductRequestType } from "../types/product-type";
import ProductPriceHistoryTable from "./product-price-history-table";

interface ProductPriceHistoryDialogProps {
  trigger: React.ReactNode;
  productId: ProductRequestType["id"];
}

const ProductPriceHistoryDialog = ({
  trigger,
  productId,
}: ProductPriceHistoryDialogProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { data, isPending } = useQuery({
    queryFn: () => getProductPriceHistory({ productId: productId! }),
    queryKey: ["product-price-history", productId],
  });

  const productPriceHistory = data || [];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} modal>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogTitle>Histórico de Preços</DialogTitle>
        <ProductPriceHistoryTable productPriceHistory={productPriceHistory} />
      </DialogContent>
    </Dialog>
  );
};

export default ProductPriceHistoryDialog;
