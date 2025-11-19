import Column from "@/src/components/core/column";
import { Loader2 } from "lucide-react";
import { Metadata } from "next";
import { Suspense } from "react";
import ProductsHeaderSection from "./components/products-header-section";
import ProductInfoCards from "./components/products-info-cards";
import ProductsTable from "./components/products-table";

export const metadata: Metadata = {
  title: "Produtos | Precific",
};

export default function ProductsPage() {
  return (
    <Column className="w-full max-w-7xl xl:max-w-5xl 2xl:max-w-[1500px] p-6 xl:px-0 space-y-4">
      <Suspense
        fallback={
          <Loader2 className="text-[#66289B] animate-spin m-auto w-10 h-10" />
        }
      >
        <ProductsHeaderSection />
        <ProductInfoCards />
        <ProductsTable />
      </Suspense>
    </Column>
  );
}
