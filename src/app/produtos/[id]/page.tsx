"use client";

import AuthGuard from "@/src/components/core/auth-guard";
import Column from "@/src/components/core/column";
import { use } from "react";
import ProductForm from "../components/product-form";

export default function ProductFormPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const isNewProduct = id === "novo";
  const productId = isNewProduct ? undefined : id;

  return (
    <AuthGuard requireAuth>
      <Column className="w-full h-full pt-28 pb-10 xl:pl-12 xl:pr-20 space-y-3">
        <h2 className="text-3xl text-black font-bold">Novo Produto</h2>
        <ProductForm
          mode={isNewProduct ? "create" : "edit"}
          productId={productId}
        />
      </Column>
    </AuthGuard>
  );
}
