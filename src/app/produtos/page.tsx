import Column from "@/src/components/core/column";
import ProductsHeaderSection from "./components/products-header-section";
import ProductInfoCards from "./components/products-info-cards";
import ProductsTable from "./components/products-table";

export default function ProductsPage() {
  return (
    <Column className="w-full h-full pt-28 pb-10 xl:pl-12 xl:pr-20 space-y-4">
      <ProductsHeaderSection />
      <ProductInfoCards />
      <ProductsTable />
    </Column>
  );
}
