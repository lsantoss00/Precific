"use client";

import { useAuth } from "@/src/providers/auth-provider";
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
  const { company } = useAuth();
  const isRealProfit = company?.tax_regime === "real_profit";

  const form = useForm<ProductFormDataType>({
    mode: "onChange",
    defaultValues: {
      name: "",
      sku: "",
      ncm: "",
      observations: "",
      unit_price: 0,
      icms: 0,
      pis_cofins: 0,
      icms_st: 0,
      ipi: 0,
      others: 0,
      fixed_costs: 0,
      sales_icms: 0,
      sales_pis_cofins: 0,
      shipping: 0,
      other_costs: 0,
      profit: 0,
      irpj_percent: isRealProfit ? 24 : 0.15,
      interstate_sale: false,
      state_destination: "",
      imported_product: false,
      costumer_taxpayer: false,
    },
  });

  return (
    <ProductFormContext.Provider value={{ form, isEditMode, productId }}>
      {children}
    </ProductFormContext.Provider>
  );
};
