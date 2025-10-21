import Column from "@/src/components/core/column";
import ProductsHeaderSection from "./components/products-header-section";
import ProductInfoCards from "./components/products-info-cards";
import ProductsTable from "./components/products-table";

export default function ProductsPage() {
  return (
    <Column className="w-full max-w-7xl xl:max-w-5xl 2xl:max-w-[1500px] py-10 px-6 xl:px-0 space-y-4">
      <ProductsHeaderSection />
      <ProductInfoCards />
      <ProductsTable />
    </Column>
  );
}
