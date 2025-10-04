import AuthGuard from "@/src/components/core/auth-guard";
import Column from "@/src/components/core/column";
import NewProductForm from "./components/new-product-form";

export default function NewProductPage() {
  return (
    <AuthGuard requireAuth>
      <Column className="w-full h-full pt-28 pb-10 xl:pl-12 xl:pr-20 space-y-3">
        <h2 className="text-3xl text-black font-bold">Novo Produto</h2>
        <NewProductForm />
      </Column>
    </AuthGuard>
  );
}
