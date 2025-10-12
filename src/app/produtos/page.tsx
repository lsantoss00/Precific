import AuthGuard from "@/src/components/core/auth-guard";
import Column from "@/src/components/core/column";
import ProductsHeaderSection from "./components/products-header-section";
import ProductInfoCards from "./components/products-info-cards";
import ProductsTable from "./components/products-table";

export default function ProductsPage() {
  return (
    <AuthGuard requireAuth>
      {/* // TO-DO: Isso ta criando um scroll na tela em dispositivos mobile */}
      <Column className="w-full max-w-7xl h-full pt-28 pb-10 px-6 xl:px-0 space-y-4">
        <ProductsHeaderSection />
        <ProductInfoCards />
        <ProductsTable />
      </Column>
    </AuthGuard>
  );
}
