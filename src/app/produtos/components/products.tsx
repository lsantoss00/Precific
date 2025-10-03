import Column from "@/src/components/core/column";
import ProductsHeaderSection from "./products-header-section";
import ProductsTable from "./products-table";

const Products = () => {
  return (
    <Column className="w-full pt-28 pb-10 pl-12 pr-20 space-y-4">
      <ProductsHeaderSection />
      <ProductsTable />
    </Column>
  );
};

export default Products;
