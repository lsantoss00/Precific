import Column from "@/src/components/core/column";
import ProductsHeaderSection from "./products-header-section";
import { ProductsTable } from "./products-table";

const Products = () => {
  return (
    <Column className="max-w-5xl w-full mx-auto mt-24 space-y-4">
      <ProductsHeaderSection />
      <ProductsTable />
    </Column>
  );
};

export default Products;
