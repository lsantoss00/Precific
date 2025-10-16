import AuthGuard from "@/src/components/core/auth-guard";
import Column from "@/src/components/core/column";
import ProductsHeaderSection from "./components/products-header-section";
import ProductInfoCards from "./components/products-info-cards";
import ProductsTable from "./components/products-table";

export default function ProductsPage() {
  return (
    <AuthGuard requireAuth>
      <Column className="w-full !max-w-7xl xl:!max-w-6xl 2xl:!max-w-[1500px] py-10 px-6 xl:!px-0 space-y-4 mx-auto">
        <ProductsHeaderSection />
        <ProductInfoCards />
        <ProductsTable />
      </Column>
    </AuthGuard>
  );
}
