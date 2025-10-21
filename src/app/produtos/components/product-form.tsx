"use client";

import { useProductForm } from "@/src/app/produtos/contexts/product-form-context";
import { Button } from "@/src/components/core";
import Flex from "@/src/components/core/flex";
import Row from "@/src/components/core/row";
import { useQuery } from "@tanstack/react-query";
import { Calculator, ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getProductById } from "../services/get-product-by-id";
import { ProductResponseType } from "../types/product-type";
import AcquisitionCostForm from "./acquisition-cost-form";
import PricingForm from "./pricing-form";
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
    <Flex className="flex flex-col lg:flex-row w-full flex-1 gap-4">
      <ProductDetailsForm />
      <AcquisitionCostForm />
      <PricingForm />
      <Row className="gap-2 md:w-fit md:self-end  lg:self-auto">
        <Button
          className="lg:hidden h-full"
          onClick={() => router.push("/produtos")}
          variant={"outline"}
        >
          <ChevronLeft className="!w-6 !h-6" />
        </Button>
        <Button
          className="flex-1 md:flex-none md:w-40 h-12 lg:!h-full lg:w-20 flex items-center"
          onClick={handleNext}
          disabled={!isFormValid}
        >
          <Calculator className="lg:hidden" />
          <ChevronRight className="max-lg:hidden !w-12 !h-12" />
          <span className="lg:hidden">Calcular</span>
        </Button>
      </Row>
    </Flex>
  );
};

export default ProductForm;
