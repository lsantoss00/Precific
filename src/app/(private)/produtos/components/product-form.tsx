"use client";

import { useProductForm } from "@/src/app/(private)/produtos/contexts/product-form-context";
import { Button } from "@/src/components/core";
import Flex from "@/src/components/core/flex";
import Row from "@/src/components/core/row";
import { useQuery } from "@tanstack/react-query";
import { Calculator, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
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
        interstate_sale: product.interstate_sale,
        state_destination: product.state_destination,
        imported_product: product.imported_product,
        costumer_taxpayer: product.costumer_taxpayer,
        irpj_percent: product.irpj_percent,
        mva: product.mva,
        has_user_product_price: product.has_user_product_price,
        user_product_price: product.user_product_price,
        has_icms_st: product.has_icms_st,
      });
    }
  }, [product, form, isEditMode]);

  const isFormValid = form.formState.isValid && form.getValues("profit") > 0;

  const resultPath =
    isEditMode && productId
      ? `/produtos/${productId}/resultado`
      : `/produtos/novo/resultado`;

  return (
    <Flex className="flex flex-col lg:flex-row w-full flex-1 gap-4">
      <ProductDetailsForm />
      <AcquisitionCostForm />
      <PricingForm />
      <Row className="gap-2 md:w-fit md:self-end lg:self-auto">
        <Button asChild className="lg:hidden h-full" variant="outline">
          <Link href="/produtos">
            <ChevronLeft className="w-6! h-6!" />
          </Link>
        </Button>
        <Button
          asChild
          className="flex-1 md:flex-none md:w-40 h-12 lg:h-full! lg:w-20 flex items-center"
          disabled={!isFormValid}
        >
          <Link
            href={resultPath}
            aria-disabled={!isFormValid}
            tabIndex={!isFormValid ? -1 : undefined}
            className={!isFormValid ? "opacity-50 pointer-events-none" : ""}
          >
            <Calculator className="lg:hidden" />
            <ChevronRight className="max-lg:hidden w-12! h-12!" />
            <span className="lg:hidden">Calcular</span>
          </Link>
        </Button>
      </Row>
    </Flex>
  );
};

export default ProductForm;
