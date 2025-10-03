import Column from "@/src/components/core/column";
import ProductsHeaderSection from "./products-header-section";
import ProductsTable from "./products-table";

const Products = () => {
  return (
    <Column className="w-full space-y-4">
      <ProductsHeaderSection />
      <ProductsTable />
    </Column>
  );
};

export default Products;
