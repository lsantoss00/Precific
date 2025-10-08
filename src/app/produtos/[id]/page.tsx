"use client";

import AuthGuard from "@/src/components/core/auth-guard";
import Column from "@/src/components/core/column";
import { useProductForm } from "@/src/contexts/product-form-context";
import ProductForm from "../components/product-form";

export default function ProductFormPage() {
  const { isEditMode, productId } = useProductForm();

  return (
    <AuthGuard requireAuth>
      <Column className="w-full h-full pt-28 pb-10 xl:pl-12 xl:pr-20 space-y-3">
        <h2 className="text-3xl text-black font-bold">
          {isEditMode ? "Editar Produto" : "Novo Produto"}
        </h2>
        <ProductForm productId={productId} />
      </Column>
    </AuthGuard>
  );
}
