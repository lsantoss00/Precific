"use client";

import { Container } from "@/src/components/core";
import Column from "@/src/components/core/column";
import ProductResult from "./product-result";

const ProductFormResultPageContent = () => {
  return (
    <Container variant="page" className="max-w-7xl xl:max-w-5xl 2xl:max-w-[1500px] py-6 space-y-3">
      <h2 className="text-3xl text-black font-bold">Resultado</h2>
      <ProductResult />
    </Container>
  );
};

export default ProductFormResultPageContent;
