"use client";

import { useProductForm } from "@/src/app/produtos/contexts/product-form-context";
import { Button } from "@/src/components/core";
import Flex from "@/src/components/core/flex";
import Row from "@/src/components/core/row";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
    <Flex className="flex flex-col lg:flex-row w-full h-full gap-1 md:gap-2 2xl:gap-4">
      <ProductDetailsForm />
      {/* <div className="w-20 h-1 bg-[#66289B] rounded-full self-center" /> */}
      <AcquisitionCostForm />
      {/* <div className="w-20 h-1 bg-[#66289B] rounded-full self-center" /> */}
      <PricingForm />
      <Row className="gap-2">
        {/* TO-DO: Alterar cor deste botão 'Voltar'  */}
        <Button className="w-1/2 h-10 lg:h-full lg:w-20 lg:hidden">
          <ChevronLeft className="lg:!w-12 lg:!h-12" />
          <span>Voltar</span>
        </Button>
        <Button
          className="w-1/2 h-10 lg:h-full lg:w-20"
          onClick={handleNext}
          disabled={!isFormValid}
        >
          <span className="lg:hidden">Calcular</span>
          <ChevronRight className="lg:!w-12 lg:!h-12" />
        </Button>
      </Row>
    </Flex>
  );
};

export default ProductForm;
