import { ProductFormProvider } from "@/src/app/(private)/produtos/contexts/product-form-context";
import { use } from "react";

export default function ProductFormLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}>) {
  const { id } = use(params);
  const isNewProduct = id === "novo";
  const productId = isNewProduct ? undefined : id;

  return (
    <ProductFormProvider isEditMode={!isNewProduct} productId={productId}>
      {children}
    </ProductFormProvider>
  );
}
