"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/src/components/core";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useState } from "react";

interface ProductsDialogProps {
  trigger: React.ReactNode;
}

const ProductsDialog = ({ trigger }: ProductsDialogProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogTitle>Dialog de Produtos</DialogTitle>
      </DialogContent>
    </Dialog>
  );
};

export default ProductsDialog;
