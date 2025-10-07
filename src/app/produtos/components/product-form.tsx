"use client";

import { Button } from "@/src/components/core";
import Row from "@/src/components/core/row";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { getProductById } from "../services/get-product-by-id";
import { ProductType } from "../types/product-type";
import AcquisitionCostForm from "./acquisition-cost-form";
import PrecificationForm from "./precification-form";
import ProductDetailsForm from "./product-details-form";

type FormModeType = "create" | "edit";
interface ProductFormProps {
  mode: FormModeType;
  productId?: ProductType["id"];
}

const ProductForm = ({ productId }: ProductFormProps) => {
  const router = useRouter();

  const { data: product, isPending: pendingProduct } = useQuery({
    queryFn: () => getProductById({ productId: productId! }),
    queryKey: ["product", productId],
    enabled: !!productId,
  });

  console.log("product", product);

  return (
    <Row className="w-full h-full space-x-2">
      <ProductDetailsForm />
      <div className="w-20 h-1 bg-[#66289B] rounded-full self-center" />
      <AcquisitionCostForm />
      <div className="w-20 h-1 bg-[#66289B] rounded-full self-center" />
      <PrecificationForm />
      <Button
        className="h-full w-20"
        onClick={() => router.push("/produtos/novo/resultado")}
      >
        <ChevronRight className="!w-12 !h-12" />
      </Button>
    </Row>
  );
};

export default ProductForm;
