import Column from "@/src/components/core/column";
import ProductsHeaderSection from "./products-header-section";
import ProductsTable from "./products-table";

const Products = () => {
  return (
    // TO-DO: Isso ta criando um scroll na tela em dispositivos mobile
    <Column className="w-full h-full pt-28 pb-10 xl:pl-12 xl:pr-20 space-y-4">
      <ProductsHeaderSection />
      <ProductsTable />
    </Column>
  );
};

export default Products;
