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
      unitPrice: undefined,
      icms: undefined,
      pisCofins: undefined,
      icmsSt: undefined,
      ipi: undefined,
      others: undefined,
      fixedCosts: undefined,
      salesIcms: undefined,
      salesPisCofins: undefined,
      shipping: undefined,
      otherCosts: undefined,
      profit: undefined,
      irpjPercent: undefined,
      interstateSale: false,
      stateDestination: undefined,
      importedProduct: false,
      costumerTaxpayer: false,
      hasIcmsSt: false,
      hasUserProductPrice: false,
      userProductPrice: undefined,
      mva: undefined,
    },
  });

  return (
    <ProductFormContext.Provider value={{ form, isEditMode, productId }}>
      {children}
    </ProductFormContext.Provider>
  );
};
