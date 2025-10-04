import AuthGuard from "@/src/components/core/auth-guard";
import Column from "@/src/components/core/column";
import ProductsHeaderSection from "./components/products-header-section";
import ProductsTable from "./components/products-table";

export default function ProductsPage() {
  return (
    <AuthGuard requireAuth>
      {/* // TO-DO: Isso ta criando um scroll na tela em dispositivos mobile */}
      <Column className="w-full h-full pt-28 pb-10 xl:pl-12 xl:pr-20 space-y-4">
        <ProductsHeaderSection />
        <ProductsTable />
      </Column>
    </AuthGuard>
  );
}
