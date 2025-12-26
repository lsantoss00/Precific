"use client";

import { Container } from "@/src/components/core";
import ProductResult from "./product-result";

const ProductFormResultPageContent = () => {
  return (
    <Container variant="page">
      <h2 className="text-3xl text-black font-bold">Resultado</h2>
      <ProductResult />
    </Container>
  );
};

export default ProductFormResultPageContent;
