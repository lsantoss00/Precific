"use client";

import { Button } from "@/src/components/core";
import Row from "@/src/components/core/row";
import { useProductForm } from "@/src/contexts/product-form-context";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getProductById } from "../services/get-product-by-id";
import { ProductResponseType } from "../types/product-type";
import AcquisitionCostForm from "./acquisition-cost-form";
import PrecificationForm from "./precification-form";
import ProductDetailsForm from "./product-details-form";

interface ProductFormProps {
  productId?: ProductResponseType["id"];
}

const ProductForm = ({ productId }: ProductFormProps) => {
  const router = useRouter();
  const { form, isEditMode } = useProductForm();

  const { data: product } = useQuery({
    queryFn: () => getProductById({ productId: productId! }),
    queryKey: ["product", productId],
    enabled: !!productId && isEditMode,
  });

  useEffect(() => {
    if (product && isEditMode) {
      form.reset({
        name: product.name,
        sku: product.sku,
        ncm: product.ncm,
        observations: product.observations,
        unit_price: product.unit_price,
        icms: product.icms,
        pis_cofins: product.pis_cofins,
        icms_st: product.icms_st,
        ipi: product.ipi,
        others: product.others,
        fixed_costs: product.fixed_costs,
        sales_icms: product.sales_icms,
        sales_pis_cofins: product.sales_pis_cofins,
        shipping: product.shipping,
        other_costs: product.other_costs,
        profit: product.profit,
      });
    }
  }, [product, form, isEditMode]);

  const handleNext = () => {
    form.handleSubmit(
      () => {
        const resultPath =
          isEditMode && productId
            ? `/produtos/${productId}/resultado`
            : `/produtos/novo/resultado`;
        router.push(resultPath);
      },
      (errors) => {
        console.error("Erros de validação:", errors);
      }
    )();
  };

  const isFormValid = form.formState.isValid;

  return (
    <Row className="w-full h-full space-x-2">
      <ProductDetailsForm />
      <div className="w-20 h-1 bg-[#66289B] rounded-full self-center" />
      <AcquisitionCostForm />
      <div className="w-20 h-1 bg-[#66289B] rounded-full self-center" />
      <PrecificationForm />
      <Button
        className="h-full w-20"
        onClick={handleNext}
        disabled={!isFormValid}
      >
        <ChevronRight className="!w-12 !h-12" />
      </Button>
    </Row>
  );
};

export default ProductForm;
