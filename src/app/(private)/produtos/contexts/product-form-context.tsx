"use client";

import { createContext, ReactNode, useContext } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { ProductFormDataType } from "../types/product-type";

interface ProductFormContextValue {
  form: UseFormReturn<ProductFormDataType>;
  isEditMode: boolean;
  productId?: string;
}

const ProductFormContext = createContext<ProductFormContextValue | null>(null);

export const useProductForm = () => {
  const context = useContext(ProductFormContext);
  if (!context) {
    throw new Error("ProductFormProvider não configurado.");
  }
  return context;
};

interface ProductFormProviderProps {
  children: ReactNode;
  isEditMode?: boolean;
  productId?: string;
}

export const ProductFormProvider = ({
  children,
  isEditMode = false,
  productId,
}: ProductFormProviderProps) => {
  const form = useForm<ProductFormDataType>({
    mode: "onChange",
    defaultValues: {
      name: "",
      sku: "",
      ncm: "",
      observations: "",
      unitPrice: 0,
      icms: 0,
      pisCofins: 0,
      icmsSt: 0,
      ipi: 0,
      others: 0,
      fixedCosts: 0,
      salesIcms: 0,
      salesPisCofins: 0,
      shipping: 0,
      otherCosts: 0,
      profit: 0,
      irpjPercent: 0,
      interstateSale: false,
      stateDestination: undefined,
      importedProduct: false,
      costumerTaxpayer: false,
      hasIcmsSt: false,
      hasUserProductPrice: false,
      userProductPrice: 0,
    },
  });

  return (
    <ProductFormContext.Provider value={{ form, isEditMode, productId }}>
      {children}
    </ProductFormContext.Provider>
  );
};
