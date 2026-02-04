"use client";

import ProductsHeaderSection from "@/src/app/(private)/produtos/components/products-header-section";
import ProductInfoCards from "@/src/app/(private)/produtos/components/products-info-cards";
import ProductsTable from "@/src/app/(private)/produtos/components/products-table";
import { Container } from "@/src/components/core";
import { useAuth } from "@/src/providers/auth-provider";
import { Loader2 } from "lucide-react";

const ProductsPageContent = () => {
  const { isLoadingAuth } = useAuth();

  if (isLoadingAuth)
    return <Loader2 className="text-primary animate-spin m-auto w-10 h-10" />;

  return (
    <Container variant="page">
      <ProductsHeaderSection />
      <ProductInfoCards />
      <ProductsTable />
    </Container>
  );
};

export default ProductsPageContent;
