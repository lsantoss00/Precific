"use client";

import Column from "@/src/components/core/column";
import ProductResult from "./product-result";

const ProductFormResultPageContent = () => {
  return (
    <Column className="w-full py-8 px-6 xl:px-0 space-y-3 max-w-7xl xl:max-w-5xl 2xl:max-w-[1500px]">
      <h2 className="text-3xl text-black font-bold">Resultado</h2>
      <ProductResult />
    </Column>
  );
};

export default ProductFormResultPageContent;
