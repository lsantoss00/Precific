import { Container } from "@/src/components/core";
import { Loader2 } from "lucide-react";
import { Metadata } from "next";
import { Suspense } from "react";
import ProductsHeaderSection from "./components/products-header-section";
import ProductInfoCards from "./components/products-info-cards";
import ProductsTable from "./components/products-table";

export const metadata: Metadata = {
  title: "Produtos",
  description:
    "Gerencie seus produtos, realize cálculos de precificação, impostos e margens. Simule cenários da Reforma Tributária e otimize seus preços.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ProductsPage() {
  return (
    <Container
      variant="page"
      className="max-w-7xl xl:max-w-5xl 2xl:max-w-[1500px] space-y-4 flex flex-col"
    >
      <Suspense
        fallback={
          <Loader2 className="text-primary animate-spin m-auto w-10 h-10" />
        }
      >
        <ProductsHeaderSection />
        <ProductInfoCards />
        <ProductsTable />
      </Suspense>
    </Container>
  );
}
